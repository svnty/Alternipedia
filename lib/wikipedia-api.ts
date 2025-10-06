interface WikipediaPage {
  title: string;
  extract: string;
  content?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  images?: string[];
}

interface WikipediaApiResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract?: string;
        thumbnail?: {
          source: string;
          width: number;
          height: number;
        };
        revisions?: Array<{
          '*': string;
        }>;
      };
    };
  };
}

/**
 * Fetches Wikipedia page content using the Wikipedia API
 * @param slug - The page title/slug to fetch
 * @returns Promise<WikipediaPage | null>
 */
// Simple cache for Wikipedia data during server rendering
const cache = new Map<string, WikipediaPage | null>();

export async function fetchWikipediaPage(slug: string, language: string = 'en'): Promise<WikipediaPage | null> {
  // Check cache first
  const cacheKey = `${language}:${slug}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) || null;
  }
  try {
    // Get the full page content including wikitext (with redirect following)
    const contentResponse = await fetch(
      `https://${language}.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(slug)}&redirects=1&origin=*`
    );
    if (!contentResponse.ok) {
      throw new Error(`Content fetch failed: ${contentResponse.status}`);
    }
    const contentData = await contentResponse.json();

    // Also get the summary for extract and thumbnail (REST API automatically follows redirects)
    const summaryResponse = await fetch(`https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
    if (!summaryResponse.ok) {
      throw new Error(`Summary fetch failed: ${summaryResponse.status}`);
    }
    const summaryData = await summaryResponse.json();
    
    // Check if summary indicates page doesn't exist
    if (summaryData.type === 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found') {
      console.log(`Summary not found for "${slug}" in ${language} Wikipedia`);
      return null;
    }

    // Extract page content from the API response
    let content: string | null = null;
    console.log(`Fetching Wikipedia content for "${slug}" in language: ${language}`);
    console.log('Content API response structure:', JSON.stringify(contentData, null, 2).substring(0, 500));
    
    // Check if there were redirects
    if (contentData.query?.redirects) {
      console.log('Redirects found:', contentData.query.redirects);
    }
    
    if (contentData.query && contentData.query.pages) {
      const pages = Object.values(contentData.query.pages) as any[];
      const page = pages[0];
      console.log('Page data:', { 
        hasPage: !!page, 
        pageId: page?.pageid,
        title: page?.title,
        hasRevisions: !!(page?.revisions), 
        revisionsLength: page?.revisions?.length,
        isMissing: !!page?.missing,
        isRedirect: !!page?.redirect
      });
      
      if (page && !page.missing && page.revisions && page.revisions[0] && page.revisions[0].slots && page.revisions[0].slots.main) {
        const rawContent = page.revisions[0].slots.main['*'];
        
        // Check if this is still a redirect (sometimes the API doesn't follow all redirects)
        if (rawContent.match(/^#(REDIRECT|重定向|रीडायरेक्ट|REDIRECTION|REDIRECCIÓN|PRZEKIEROWANIE)/i)) {
          console.log('Content appears to be a redirect, skipping:', rawContent.substring(0, 100));
          return null;
        }
        
        content = rawContent;
        console.log('Content extracted successfully, length:', content?.length);
      } else {
        if (page?.missing) {
          console.log(`Page "${slug}" does not exist in ${language} Wikipedia`);
          return null;
        }
        console.log('Failed to extract content, page structure:', {
          hasRevisions: !!(page?.revisions),
          firstRevision: page?.revisions?.[0] ? 'exists' : 'missing',
          hasSlots: !!(page?.revisions?.[0]?.slots),
          hasMainSlot: !!(page?.revisions?.[0]?.slots?.main)
        });
      }
    } else {
      console.log('No query.pages in response');
    }

    const result = {
      title: summaryData.title,
      extract: summaryData.extract,
      content: content || undefined,
      thumbnail: summaryData.thumbnail?.source ? {
        source: summaryData.thumbnail.source,
        width: summaryData.thumbnail.width || 0,
        height: summaryData.thumbnail.height || 0,
      } : undefined,
    };

    // Cache the result
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching Wikipedia data for "${slug}" in ${language}:`, error);
    // Cache null result to avoid repeated failed requests
    cache.set(cacheKey, null);
    return null;
  }
}

/**
 * Extracts headings from Wikipedia wikitext for table of contents
 */
export function extractWikipediaHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  if (!content) return [];

  const headings: Array<{ level: number; text: string; id: string }> = [];
  
  // Match wiki headings ==Text==, ===Text===, etc.
  const headingRegex = /^(={2,6})\s*(.*?)\s*\1$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Number of = characters
    const text = match[2].trim();
    
    // Create a simple ID from the heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();

    if (text && level >= 2 && level <= 6) {
      headings.push({
        level: level - 1, // Convert to HTML heading levels (h1-h5)
        text,
        id
      });
    }
  }

  return headings;
}

/**
 * Converts Wikipedia wikitext to a simplified HTML structure
 * This is a basic converter - for production, consider using a proper wikitext parser
 */
export function parseWikipediaContent(content: string, language: string = 'en'): string {
  if (!content) return '';

  let html = content;

  // Remove all potentially problematic elements that could cause hydration issues
  
  // Remove all templates and infoboxes (more aggressive approach)
  // This handles nested templates better
  let templateDepth = 0;
  let i = 0;
  while (i < html.length) {
    if (html.substring(i, i + 2) === '{{') {
      templateDepth++;
      if (templateDepth === 1) {
        const templateStart = i;
        let j = i + 2;
        while (j < html.length && templateDepth > 0) {
          if (html.substring(j, j + 2) === '{{') {
            templateDepth++;
            j += 2;
          } else if (html.substring(j, j + 2) === '}}') {
            templateDepth--;
            j += 2;
          } else {
            j++;
          }
        }
        html = html.substring(0, templateStart) + html.substring(j);
        i = templateStart;
        continue;
      }
    }
    i++;
  }
  
  // Remove references like <ref>...</ref>
  html = html.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  html = html.replace(/<ref[^>]*\/>/gi, '');
  
  // Remove file/image references that could cause hydration issues
  html = html.replace(/\[\[(File|Image):[^\]]*\]\]/gi, '');
  
  // Remove categories
  html = html.replace(/\[\[Category:.*?\]\]/gi, '');
  
  // Remove any remaining HTML-like tags that aren't standard
  html = html.replace(/<(?!\/?(p|br|strong|em|a|h[1-6])\b)[^>]*>/gi, '');
  
  // Convert wiki headings to HTML headings with IDs for navigation
  html = html.replace(/^======\s*(.*?)\s*======/gm, (match, text) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    return `<h6 id="${id}">${text}</h6>`;
  });
  html = html.replace(/^=====\s*(.*?)\s*=====/gm, (match, text) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    return `<h5 id="${id}">${text}</h5>`;
  });
  html = html.replace(/^====\s*(.*?)\s*====/gm, (match, text) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    return `<h4 id="${id}">${text}</h4>`;
  });
  html = html.replace(/^===\s*(.*?)\s*===/gm, (match, text) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    return `<h3 id="${id}">${text}</h3>`;
  });
  html = html.replace(/^==\s*(.*?)\s*==/gm, (match, text) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    return `<h2 id="${id}">${text}</h2>`;
  });
  
  // Convert internal links [[Link|Text]] or [[Link]] (keeping them as Wikipedia links for now)
  html = html.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, `<a href="https://${language}.wikipedia.org/wiki/$1" target="_blank" class="text-blue-600 underline">$2</a>`);
  html = html.replace(/\[\[([^\]]+)\]\]/g, `<a href="https://${language}.wikipedia.org/wiki/$1" target="_blank" class="text-blue-600 underline">$1</a>`);
  
  // Convert external links [URL Text]
  html = html.replace(/\[([^\s]+)\s+([^\]]+)\]/g, '<a href="$1" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$2</a>');
  
  // Convert bold '''text'''
  html = html.replace(/'''(.*?)'''/g, '<strong>$1</strong>');
  
  // Convert italic ''text''
  html = html.replace(/''(.*?)''/g, '<em>$1</em>');
  
  // Clean up whitespace and line breaks
  html = html.replace(/\n{3,}/g, '\n\n'); // Normalize multiple line breaks
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Clean up empty paragraphs and fix malformed HTML
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(\s*<h[1-6][^>]*>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>\s*)<\/p>/g, '$1');
  
  // Final cleanup - remove any leftover wiki syntax
  html = html.replace(/\{\{[^}]*\}\}/g, '');
  html = html.replace(/\[\[[^\]]*\]\]/g, '');
  
  return html;
}