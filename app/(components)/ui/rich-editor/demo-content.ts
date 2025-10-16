import { ContainerNode, EditorNode, TextNode } from "./types"

/**
 * Creates comprehensive demo content showcasing all editor features.
 *
 * @param timestamp - Optional timestamp for unique IDs (defaults to a stable value for demo content)
 * @returns Array of demo nodes ready to be used as editor content
 *
 * @example
 * ```typescript
 * import { createDemoContent } from '@/lib/demo-content';
 *
 * const demoNodes = createDemoContent();
 * const newContainer: ContainerNode = {
 *   id: 'root',
 *   type: 'container',
 *   children: demoNodes,
 *   attributes: {}
 * };
 * ```
 */
export function createDemoContent(
  timestamp: number = 1000000000000
): EditorNode[] {
  return [
    // ========================================
    // HERO SECTION
    // ========================================
    {
      id: `h1-${timestamp}-1`,
      type: "h1",
      content: "✨ Rich Text Editor",
      attributes: {},
    } as TextNode,

    // ========================================
    // VERSION UPDATE SECTION
    // ========================================
    {
      id: `blockquote-${timestamp}-version-1`,
      type: "blockquote",
      children: [
        {
          content: "🎉 Version 0.1.0 - Major Update!",
          bold: true,
          className: "text-green-600 dark:text-green-400 text-lg",
        },
        { content: " ", italic: true },
        {
          content:
            "Fresh new features just landed! Check out what's new below.",
          italic: true,
        },
      ],
      attributes: {
        className:
          "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500",
      },
    } as TextNode,

    {
      id: `h2-${timestamp}-version-2`,
      type: "h2",
      content: "🆕 What's New in v0.1.0",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-version-3`,
      type: "h3",
      content: "📊 Table Support - Full-Featured Spreadsheet-like Tables",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-version-4`,
      type: "p",
      content:
        "Create powerful, interactive tables with comprehensive editing capabilities. Perfect for data presentation, comparisons, and structured content:",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-version-5`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-version-5-1`,
          type: "li",
          children: [
            { content: "✅ Create tables", bold: true },
            { content: " with custom rows and columns", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-2`,
          type: "li",
          children: [
            { content: "✅ Drag columns", bold: true },
            { content: " to reorder them horizontally", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-3`,
          type: "li",
          children: [
            { content: "✅ Drag rows", bold: true },
            { content: " to reorder them vertically", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-4`,
          type: "li",
          children: [
            { content: "✅ Resize columns", bold: true },
            { content: " by dragging column borders", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-5`,
          type: "li",
          children: [
            { content: "✅ Add/remove", bold: true },
            { content: " rows and columns on the fly", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-6`,
          type: "li",
          children: [
            { content: "✅ Drag entire tables", bold: true },
            { content: " to reorder them between blocks", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-5-7`,
          type: "li",
          children: [
            { content: "✅ Import markdown tables", bold: true },
            {
              content: " - paste from GitHub, Notion, or any markdown source",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `p-${timestamp}-version-6`,
      type: "p",
      content:
        "Here's a live example table - try dragging columns, rows, or resizing:",
      attributes: {},
    } as TextNode,

    {
      id: `table-wrapper-${timestamp}-version-7`,
      type: "container",
      children: [
        {
          id: `table-${timestamp}-version-7`,
          type: "table",
          children: [
            {
              id: `thead-${timestamp}-version-7`,
              type: "thead",
              children: [
                {
                  id: `tr-header-${timestamp}-version-7`,
                  type: "tr",
                  children: [
                    {
                      id: `th-${timestamp}-version-7-0`,
                      type: "th",
                      content: "Feature",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `th-${timestamp}-version-7-1`,
                      type: "th",
                      content: "Status",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `th-${timestamp}-version-7-2`,
                      type: "th",
                      content: "Version",
                      attributes: {},
                    } as TextNode,
                  ],
                  attributes: {},
                },
              ],
              attributes: {},
            },
            {
              id: `tbody-${timestamp}-version-7`,
              type: "tbody",
              children: [
                {
                  id: `tr-${timestamp}-version-7-0`,
                  type: "tr",
                  children: [
                    {
                      id: `td-${timestamp}-version-7-0-0`,
                      type: "td",
                      content: "Table Support",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-0-1`,
                      type: "td",
                      content: "✅ Released",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-0-2`,
                      type: "td",
                      content: "0.1.0",
                      attributes: {},
                    } as TextNode,
                  ],
                  attributes: {},
                },
                {
                  id: `tr-${timestamp}-version-7-1`,
                  type: "tr",
                  children: [
                    {
                      id: `td-${timestamp}-version-7-1-0`,
                      type: "td",
                      content: "Multi-Select Images",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-1-1`,
                      type: "td",
                      content: "✅ Released",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-1-2`,
                      type: "td",
                      content: "0.1.0",
                      attributes: {},
                    } as TextNode,
                  ],
                  attributes: {},
                },
                {
                  id: `tr-${timestamp}-version-7-2`,
                  type: "tr",
                  children: [
                    {
                      id: `td-${timestamp}-version-7-2-0`,
                      type: "td",
                      content: "Enhanced Drag & Drop",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-2-1`,
                      type: "td",
                      content: "✅ Released",
                      attributes: {},
                    } as TextNode,
                    {
                      id: `td-${timestamp}-version-7-2-2`,
                      type: "td",
                      content: "0.1.0",
                      attributes: {},
                    } as TextNode,
                  ],
                  attributes: {},
                },
              ],
              attributes: {},
            },
          ],
          attributes: {},
        },
      ],
      attributes: {},
    } as ContainerNode,

    {
      id: `h3-${timestamp}-version-8`,
      type: "h3",
      content: "🖼️ Multi-Select Images with Ctrl+Click",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-version-9`,
      type: "p",
      children: [
        { content: "Hold ", bold: false },
        { content: "Ctrl (⌘ on Mac)", elementType: "code", bold: true },
        {
          content: " and click multiple images to select them, then:",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-version-10`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-version-10-1`,
          type: "li",
          children: [
            { content: "📦 Group images", bold: true },
            { content: " into a side-by-side flex layout", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-10-2`,
          type: "li",
          children: [
            { content: "🔄 Reverse order", bold: true },
            { content: " of images in a grid", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-10-3`,
          type: "li",
          children: [
            { content: "📤 Extract images", bold: true },
            { content: " from their container", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-10-4`,
          type: "li",
          children: [
            { content: "🎨 Visual feedback", bold: true },
            {
              content: " shows selected images with a blue border",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `blockquote-${timestamp}-version-11`,
      type: "blockquote",
      children: [
        { content: "💡 Pro Tip: ", bold: true },
        {
          content:
            "Select 2+ images from the same grid to reverse their order, or select images from different locations to group them into a beautiful side-by-side layout!",
          italic: true,
        },
      ],
      attributes: {
        className: "bg-blue-50 dark:bg-blue-900/20 border-blue-600",
      },
    } as TextNode,

    // Demo: Multi-select showcase container with multiple images
    {
      id: `p-${timestamp}-version-11a`,
      type: "p",
      children: [
        { content: "Try it yourself! ", bold: true },
        { content: "Hold ", bold: false },
        { content: "Ctrl", elementType: "code", bold: true },
        { content: " (", bold: false },
        { content: "⌘", elementType: "code", bold: true },
        {
          content: " on Mac) and click on multiple images below:",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-multiselect-demo`,
      type: "container",
      attributes: {
        layoutType: "flex",
        gap: "4",
        flexWrap: "wrap",
        className:
          "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-700",
      },
      children: [
        {
          id: `img-${timestamp}-demo-1`,
          type: "img",
          content: "",
          attributes: {
            src: "/images/image_docs/color-picker.png",
            alt: "Color picker demonstration",
            caption: "🎨 Color Picker",
          },
        } as TextNode,
        {
          id: `img-${timestamp}-demo-2`,
          type: "img",
          content: "",
          attributes: {
            src: "/images/image_docs/custom-class.png",
            alt: "Custom class feature",
            caption: "✨ Custom Classes",
          },
        } as TextNode,
        {
          id: `img-${timestamp}-demo-3`,
          type: "img",
          content: "",
          attributes: {
            src: "/images/image_docs/font-size-controller.png",
            alt: "Font size controller",
            caption: "📏 Font Sizes",
          },
        } as TextNode,
        {
          id: `img-${timestamp}-demo-4`,
          type: "img",
          content: "",
          attributes: {
            src: "/images/image_docs/modern-link-popover.png",
            alt: "Modern link popover",
            caption: "🔗 Link Editor",
          },
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `h3-${timestamp}-version-12`,
      type: "h3",
      content: "🎯 Enhanced Drag & Drop System",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-version-13`,
      type: "p",
      content:
        "Major improvements to the drag and drop experience across the entire editor:",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-version-14`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-version-14-1`,
          type: "li",
          children: [
            { content: "🔧 Fixed table dragging", bold: true },
            {
              content: " - tables now move smoothly between blocks",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-14-2`,
          type: "li",
          children: [
            { content: "🔧 Fixed container blocks", bold: true },
            {
              content: " - nested content and lists now drag properly",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-14-3`,
          type: "li",
          children: [
            { content: "✨ Smart drop zones", bold: true },
            {
              content:
                " - visual indicators show exactly where blocks will land",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-14-4`,
          type: "li",
          children: [
            { content: "🚫 No-op prevention", bold: true },
            {
              content: " - won't allow drops that don't change position",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-14-5`,
          type: "li",
          children: [
            { content: "🔀 Block swapping", bold: true },
            {
              content: " - drag any block over another to swap their positions",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `h3-${timestamp}-version-15`,
      type: "h3",
      content: "🎨 Improved Image Grid Operations",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-version-16`,
      type: "p",
      content: "Working with image grids is now more powerful and intuitive:",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-version-17`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-version-17-1`,
          type: "li",
          children: [
            { content: "↔️ Horizontal reordering", bold: true },
            { content: " - drag images left/right within grids", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-17-2`,
          type: "li",
          children: [
            { content: "↕️ Extract vertically", bold: true },
            {
              content: " - drag images out of grids to make them standalone",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-17-3`,
          type: "li",
          children: [
            { content: "➕ Add to existing grids", bold: true },
            {
              content: " - drag standalone images into grids to expand them",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-17-4`,
          type: "li",
          children: [
            { content: "🔗 Merge grids", bold: true },
            {
              content:
                " - drag images from one grid to another to combine them",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `h3-${timestamp}-version-18`,
      type: "h3",
      content: "⚙️ Technical Improvements",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-version-19`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-version-19-1`,
          type: "li",
          children: [
            { content: "🏗️ New structural node types", bold: true },
            {
              content:
                " - table, thead, tbody, tr, th, td for proper HTML semantics",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-19-2`,
          type: "li",
          children: [
            { content: "📦 Improved data transfer", bold: true },
            {
              content:
                " - all block types now properly communicate during drag operations",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-19-3`,
          type: "li",
          children: [
            { content: "🎯 Better type safety", bold: true },
            {
              content:
                " - TypeScript types updated for table structures and multi-select",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-version-19-4`,
          type: "li",
          children: [
            { content: "🧪 Enhanced state management", bold: true },
            {
              content:
                " - reducer actions for table updates, column/row reordering",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `code-${timestamp}-version-20`,
      type: "code",
      content: `// Example: Creating a table programmatically
const table: StructuralNode = {
  id: 'table-1',
  type: 'table',
  children: [
    {
      id: 'thead-1',
      type: 'thead',
      children: [/* header row */]
    },
    {
      id: 'tbody-1',
      type: 'tbody',
      children: [/* body rows */]
    }
  ]
};`,
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-version-21a`,
      type: "blockquote",
      children: [
        {
          content: "💡 Open Source ",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        { content: " ", italic: true },
        {
          content:
            "This component is open source and contributions are welcome! ",
          italic: true,
        },
        {
          content:
            "Whether you're fixing bugs, adding features, or improving documentation - your contributions help make this component better for everyone.",
          italic: true,
        },
      ],
      attributes: {
        className:
          "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-version-22`,
      type: "p",
      content: "---",
      attributes: {
        className: "text-center text-muted-foreground my-8",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-2`,
      type: "p",
      children: [
        { content: "A powerful ", bold: false },
        {
          content: "block-based rich text editor",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        { content: " built with ", bold: false },
        {
          content: "Tailwind CSS",
          bold: true,
          className: "text-cyan-600 dark:text-cyan-400",
        },
        { content: " and ", bold: false },
        {
          content: "shadcn/ui",
          bold: true,
          className: "text-purple-600 dark:text-purple-400",
        },
        { content: " components.", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-3`,
      type: "blockquote",
      children: [
        { content: "💡 Quick Tip: ", bold: true },
        { content: "This entire document is editable! ", italic: true },
        {
          content:
            "Select any text to format it, drag blocks to reorder them, and press ",
          italic: true,
        },
        { content: "Shift+Enter", elementType: "code", bold: true },
        {
          content: " to create nested blocks. Have fun exploring!",
          italic: true,
        },
      ],
      attributes: {
        style:
          "background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)); border-left: 4px solid rgb(59, 130, 246);",
      },
    } as TextNode,

    // ========================================
    // IMPORTANT NOTE
    // ========================================
    {
      id: `blockquote-${timestamp}-9`,
      type: "blockquote",
      children: [
        {
          content: "💡 Advanced Customization: ",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        { content: "The editor ", italic: true },
        { content: "supports all Tailwind classes", italic: true, bold: true },
        {
          content:
            " including gradients, shadows, borders, and custom styles. ",
          italic: true,
        },
        {
          content:
            "You can apply them programmatically through the JSON structure or by using the Custom Class Popover.",
          italic: true,
        },
      ],
      attributes: {
        className: "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600",
      },
    } as TextNode,

    // ========================================
    // TEXT FORMATTING SECTION
    // ========================================
    {
      id: `h2-${timestamp}-10`,
      type: "h2",
      content: "✨ Text Formatting",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-11`,
      type: "p",
      content:
        "Select any text and use the toolbar to apply rich formatting. The editor supports all standard text styles:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-12`,
      type: "p",
      children: [
        { content: "You can make text ", bold: false },
        { content: "bold", bold: true },
        { content: ", ", bold: false },
        { content: "italic", italic: true },
        { content: ", ", bold: false },
        { content: "underlined", underline: true },
        { content: ", or even ", bold: false },
        {
          content: "combine all three styles",
          bold: true,
          italic: true,
          underline: true,
        },
        {
          content: " together! Mix and match to create beautiful content.",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-13`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/block-bold-italic-underline-color.png",
        alt: "Text formatting toolbar showing bold, italic, underline, and color picker options",
        caption:
          "🎨 Select text to reveal the formatting toolbar with bold, italic, underline, and color options",
      },
    } as TextNode,

    // ========================================
    // BLOCK TYPES SECTION
    // ========================================
    {
      id: `h2-${timestamp}-20`,
      type: "h2",
      content: "📋 Block Types",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-21`,
      type: "p",
      content:
        "The editor supports multiple block types. Each block can be changed using the type selector in the toolbar:",
      attributes: {},
    } as TextNode,

    {
      id: `h1-${timestamp}-22`,
      type: "h1",
      content: "Heading 1 - The largest heading",
      attributes: {},
    } as TextNode,

    {
      id: `h2-${timestamp}-23`,
      type: "h2",
      content: "Heading 2 - Major sections",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-24`,
      type: "h3",
      content: "Heading 3 - Subsections",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-25`,
      type: "p",
      content:
        "Paragraph - The standard block type for regular text content. Perfect for body text and descriptions.",
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-26`,
      type: "blockquote",
      children: [
        {
          content: "Blockquote - ",
          italic: true,
          bold: true,
        },
        {
          content:
            'Perfect for quotes, tips, and callouts. "The best way to predict the future is to invent it." - Alan Kay',
          italic: true,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-27`,
      type: "code",
      content: `// Code Block - For displaying code with proper formatting
function greet(name: string) {
  return \`Hello, \${name}! Welcome to Mina Rich Editor.\`;
}

const message = greet("Developer");
console.log(message);`,
      attributes: {},
    } as TextNode,

    // ========================================
    // LISTS SECTION
    // ========================================
    {
      id: `h2-${timestamp}-30`,
      type: "h2",
      content: "📝 Lists - Ordered & Unordered",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-31`,
      type: "p",
      content:
        "Create ordered lists (numbered) or unordered lists (bullet points) for organized content:",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-32`,
      type: "h3",
      content: "Ordered List Example (ol)",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-33`,
      type: "container",
      attributes: {
        listType: "ol",
      },
      children: [
        {
          id: `li-${timestamp}-33-1`,
          type: "li",
          content: "First item - Automatically numbered",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-33-2`,
          type: "li",
          content: "Second item - Numbers increment automatically",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-33-3`,
          type: "li",
          content: "Third item - Perfect for step-by-step instructions",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-33-4`,
          type: "li",
          children: [
            { content: "You can even add ", bold: false },
            { content: "formatting", bold: true },
            { content: " to list items!", italic: true },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `h3-${timestamp}-34`,
      type: "h3",
      content: "Unordered List Example (ul)",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-35`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-35-1`,
          type: "li",
          content: "Bullet point item",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-35-2`,
          type: "li",
          content: "Another bullet point",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-35-3`,
          type: "li",
          content: "Great for feature lists",
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-35-4`,
          type: "li",
          children: [
            { content: "Supports ", bold: false },
            {
              content: "rich text formatting",
              bold: true,
              className: "text-blue-600 dark:text-blue-400",
            },
            { content: " too!", bold: false },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `code-${timestamp}-36`,
      type: "code",
      content: `// List structure in the editor
const orderedList = {
  id: 'container-1',
  type: 'container',
  attributes: {
    listType: 'ol'  // 'ol' for ordered, 'ul' for unordered
  },
  children: [
    { id: 'li-1', type: 'li', content: 'First item' },
    { id: 'li-2', type: 'li', content: 'Second item' },
    { 
      id: 'li-3',
      type: 'li',
      children: [
        { content: 'Formatted ', bold: false },
        { content: 'item', bold: true }
      ]
    }
  ]
};`,
      attributes: {},
    } as TextNode,

    // ========================================
    // INLINE ELEMENT TYPES SECTION
    // ========================================
    {
      id: `h2-${timestamp}-40`,
      type: "h2",
      content: "🎨 Inline Element Types",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-41`,
      type: "p",
      content:
        "Apply heading styles inline within paragraphs. Select text and choose from the element type dropdown to mix different text sizes and styles:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-42`,
      type: "p",
      children: [
        { content: "This paragraph contains ", bold: false },
        { content: "H1 styled text", elementType: "h1" },
        { content: " and ", bold: false },
        { content: "H2 styled text", elementType: "h2" },
        { content: " and ", bold: false },
        { content: "H3 styled text", elementType: "h3" },
        { content: " all mixed together, plus ", bold: false },
        { content: "inline code", elementType: "code" },
        { content: " support for technical content!", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-43`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/element-type-select.png",
        alt: "Element type selector dropdown showing options for h1, h2, h3, h4, h5, h6, p, code, and blockquote",
        caption:
          "📋 Select text and use the element type dropdown to apply heading styles inline",
      },
    } as TextNode,

    {
      id: `code-${timestamp}-44`,
      type: "code",
      content: `// Inline element types structure
const richParagraph = {
  type: 'p',
  children: [
    { content: 'Regular text ' },
    { content: 'Large heading', elementType: 'h1' },
    { content: ' and ' },
    { content: 'inline code', elementType: 'code', bold: true }
  ]
};`,
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-45`,
      type: "blockquote",
      children: [
        {
          content: "🤔 Wait, the block above looks a bit weird, right? ",
          italic: true,
        },
        {
          content:
            "Oh! I wish I could add custom classes using normal Tailwind... ",
          italic: true,
          bold: true,
        },
        {
          content: "Actually, you can! ",
          italic: true,
          className: "text-green-600 dark:text-green-400",
        },
        { content: "Select your text, then click the ", italic: true },
        { content: "pencil ✏️ smart icon", italic: true, bold: true },
        {
          content: ", and type your class or select from preset classes!",
          italic: true,
        },
      ],
      attributes: {
        className:
          "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-600",
      },
    } as TextNode,

    {
      id: `h3-${timestamp}-46`,
      type: "h3",
      content: "✏️ Custom Class Smart Icon",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-47`,
      type: "p",
      content:
        "After selecting text, you'll see a smart pencil icon appear. Click it to access the Custom Class Popover where you can apply any Tailwind CSS class or choose from presets:",
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-48`,
      type: "img",
      content: "",
      attributes: {
        src: "/image_docs/custom-class.png",
        alt: "Pencil icon appearing next to selected text for accessing custom class popover",
        caption:
          "✏️ The smart pencil icon appears when you select text - click it to customize styles",
      },
    } as TextNode,

    {
      id: `h3-${timestamp}-49`,
      type: "h3",
      content: "🎨 Custom Class Popover",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-50`,
      type: "p",
      content:
        "The Custom Class Popover gives you complete control over text styling with preset Tailwind classes organized by category:",
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-51`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/custom-class-2-popver-opened-state.png",
        alt: "Custom class popover showing text colors, background colors, font sizes, and search functionality",
        caption:
          "🎨 Custom Class Popover with organized preset classes and search functionality",
      },
    } as TextNode,

    {
      id: `container-${timestamp}-52`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-52-1`,
          type: "li",
          children: [
            { content: "Text Colors", bold: true },
            {
              content: " - All Tailwind color shades (red, blue, green, etc.)",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-52-2`,
          type: "li",
          children: [
            { content: "Background Colors", bold: true },
            { content: " - Full palette of background colors", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-52-3`,
          type: "li",
          children: [
            { content: "Font Sizes", bold: true },
            { content: " - From xs to 9xl", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-52-4`,
          type: "li",
          children: [
            { content: "Search Functionality", bold: true },
            {
              content: " - Quick class lookup (e.g., 'text', 'bg', 'flex')",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-52-5`,
          type: "li",
          children: [
            { content: "Custom Input", bold: true },
            { content: " - Type any Tailwind class manually", bold: false },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    {
      id: `h3-${timestamp}-53`,
      type: "h3",
      content: "✨ Much Better Results!",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-54`,
      type: "p",
      content:
        "With custom classes, you can create stunning text effects and perfect typography:",
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-55`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/much-better-result.png",
        alt: "Example of beautifully styled text using custom Tailwind classes with mixed heading styles",
        caption:
          "✨ Beautiful results with custom Tailwind classes - perfectly styled inline elements",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-56`,
      type: "p",
      children: [
        { content: "Now let's recreate that beautiful text! ", bold: false },
        { content: "This paragraph contains ", bold: false },
        {
          content: "H1 styled text",
          elementType: "h1",
          className:
            "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
        },
        { content: " and ", bold: false },
        {
          content: "H2 styled text",
          elementType: "h2",
          className:
            "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
        },
        { content: " and ", bold: false },
        {
          content: "H3 styled text",
          elementType: "h3",
          className:
            "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent",
        },
        { content: " all mixed together, plus ", bold: false },
        {
          content: "inline code",
          elementType: "code",
          className:
            "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded",
        },
        { content: " support for technical content!", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-57`,
      type: "code",
      content: `// Custom classes with inline element types
const styledText = {
  type: 'p',
  children: [
    { 
      content: 'Gradient heading',
      elementType: 'h1',
      className: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
    },
    { content: ' and ' },
    { 
      content: 'custom code',
      elementType: 'code',
      className: 'bg-yellow-100 text-yellow-800 px-2 rounded'
    }
  ]
};`,
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-58`,
      type: "blockquote",
      children: [
        { content: "💡 Pro Tip: ", bold: true },
        { content: "You can apply ", italic: true },
        {
          content: "any Tailwind class",
          italic: true,
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        {
          content:
            " including gradients, shadows, borders, spacing, and more! The Custom Class Popover is your gateway to ",
          italic: true,
        },
        {
          content: "unlimited styling possibilities",
          italic: true,
          bold: true,
          className:
            "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
        },
        { content: ".", italic: true },
      ],
      attributes: {
        className: "bg-blue-50 dark:bg-blue-900/20 border-blue-600",
      },
    } as TextNode,

    // ========================================
    // COLOR SECTION
    // ========================================
    {
      id: `h2-${timestamp}-50`,
      type: "h2",
      content: "🎨 Color Customization",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-51`,
      type: "p",
      content:
        "The editor includes a powerful color picker with preset colors and custom color selection. Apply colors to any selected text:",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-52`,
      type: "h3",
      content: "Preset Colors",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-53`,
      type: "p",
      children: [
        {
          content: "Red ",
          bold: true,
          className: "text-red-600 dark:text-red-400",
        },
        {
          content: "Orange ",
          bold: true,
          className: "text-orange-600 dark:text-orange-400",
        },
        {
          content: "Amber ",
          bold: true,
          className: "text-amber-600 dark:text-amber-400",
        },
        {
          content: "Yellow ",
          bold: true,
          className: "text-yellow-600 dark:text-yellow-400",
        },
        {
          content: "Lime ",
          bold: true,
          className: "text-lime-600 dark:text-lime-400",
        },
        {
          content: "Green ",
          bold: true,
          className: "text-green-600 dark:text-green-400",
        },
        {
          content: "Emerald ",
          bold: true,
          className: "text-emerald-600 dark:text-emerald-400",
        },
        {
          content: "Teal ",
          bold: true,
          className: "text-teal-600 dark:text-teal-400",
        },
        {
          content: "Cyan ",
          bold: true,
          className: "text-cyan-600 dark:text-cyan-400",
        },
        {
          content: "Sky ",
          bold: true,
          className: "text-sky-600 dark:text-sky-400",
        },
        {
          content: "Blue ",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        {
          content: "Indigo ",
          bold: true,
          className: "text-indigo-600 dark:text-indigo-400",
        },
        {
          content: "Violet ",
          bold: true,
          className: "text-violet-600 dark:text-violet-400",
        },
        {
          content: "Purple ",
          bold: true,
          className: "text-purple-600 dark:text-purple-400",
        },
        {
          content: "Fuchsia ",
          bold: true,
          className: "text-fuchsia-600 dark:text-fuchsia-400",
        },
        {
          content: "Pink ",
          bold: true,
          className: "text-pink-600 dark:text-pink-400",
        },
        {
          content: "Rose",
          bold: true,
          className: "text-rose-600 dark:text-rose-400",
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-54`,
      type: "h3",
      content: "Custom Colors",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-55`,
      type: "p",
      children: [
        { content: "You can also use ", bold: false },
        {
          content: "custom hex colors",
          bold: true,
          styles: { color: "#FF6B6B" },
        },
        { content: " or ", bold: false },
        {
          content: "RGB values",
          bold: true,
          styles: { color: "#4ECDC4" },
        },
        { content: " or even ", bold: false },
        {
          content: "gradient effects",
          bold: true,
          styles: { color: "#95E1D3" },
        },
        { content: " by using the color picker!", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-56`,
      type: "img",
      content: "",
      attributes: {
        src: "/image_docs/color-picker.png",
        alt: "Color picker popover showing preset Tailwind colors and custom color selector",
        caption:
          "🎨 Beautiful color picker with preset Tailwind colors and custom color selection",
      },
    } as TextNode,

    // ========================================
    // FONT SIZE SECTION
    // ========================================
    {
      id: `h2-${timestamp}-60`,
      type: "h2",
      content: "📏 Font Size Control",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-61`,
      type: "p",
      content:
        "Adjust font sizes for any selected text. Choose from preset sizes or enter a custom value:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-62`,
      type: "p",
      children: [
        {
          content: "Tiny text (12px) ",
          styles: { fontSize: "12px" },
        },
        {
          content: "Small text (14px) ",
          styles: { fontSize: "14px" },
        },
        {
          content: "Normal text (16px) ",
          styles: { fontSize: "16px" },
        },
        {
          content: "Large text (20px) ",
          bold: true,
          styles: { fontSize: "20px" },
        },
        {
          content: "Extra Large (24px) ",
          bold: true,
          styles: { fontSize: "24px" },
        },
        {
          content: "Huge (32px) ",
          bold: true,
          styles: { fontSize: "32px" },
        },
        {
          content: "Massive (48px)",
          bold: true,
          styles: { fontSize: "48px" },
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-63`,
      type: "img",
      content: "",
      attributes: {
        src: "/image_docs/font-size-controller.png",
        alt: "Font size picker with preset sizes and custom input",
        caption:
          "📏 Font size controller with preset sizes and custom value input",
      },
    } as TextNode,

    // ========================================
    // BACKGROUND COLORS SECTION
    // ========================================
    {
      id: `h2-${timestamp}-70`,
      type: "h2",
      content: "🎨 Background Colors",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-71`,
      type: "p",
      content:
        "Apply background colors to entire blocks using preset Tailwind colors or custom colors. Perfect for highlighting important sections:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-72`,
      type: "p",
      content: "This block has a blue background!",
      attributes: {
        className: "bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-73`,
      type: "p",
      content: "This block has a green background with rounded corners!",
      attributes: {
        className: "bg-green-100 dark:bg-green-900/30 p-4 rounded-lg",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-74`,
      type: "p",
      content: "This block has a custom gradient background!",
      attributes: {
        style:
          "background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2)); padding: 1rem; border-radius: 0.5rem;",
      },
    } as TextNode,

    {
      id: `blockquote-${timestamp}-75`,
      type: "blockquote",
      children: [
        { content: "💡 Pro Tip: ", bold: true },
        {
          content:
            "Background colors work with any block type including headings, paragraphs, quotes, and code blocks!",
          italic: true,
        },
      ],
      attributes: {
        className: "bg-purple-100 dark:bg-purple-900/30 border-purple-600",
      },
    } as TextNode,

    // ========================================
    // LINKS SECTION
    // ========================================
    {
      id: `h2-${timestamp}-80`,
      type: "h2",
      content: "🔗 Link Support",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-81`,
      type: "p",
      content:
        "Create beautiful, clickable links with the modern link popover. Select text and add a URL to make it interactive:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-82`,
      type: "p",
      children: [
        { content: "Visit ", bold: false },
        {
          content: "shadcn/ui",
          bold: true,
          underline: true,
          href: "https://ui-v4-livid.vercel.app/",
          className: "text-blue-600 dark:text-blue-400",
        },
        { content: " for more components, or check out the ", bold: false },
        {
          content: "documentation",
          bold: true,
          underline: true,
          href: "https://ui-v4-livid.vercel.app/docs",
          className: "text-purple-600 dark:text-purple-400",
        },
        { content: " to learn more!", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-83`,
      type: "img",
      content: "",
      attributes: {
        src: "/image_docs/modern-link-popover.png",
        alt: "Modern link popover with URL input and save button",
        caption: "🔗 Modern link popover for adding and editing URLs",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-84`,
      type: "p",
      children: [
        { content: "Useful Links: ", bold: true },
        {
          content: "Components",
          href: "https://ui-v4-livid.vercel.app/docs/components",
          underline: true,
          className: "text-gray-800 dark:text-gray-200",
        },
        { content: " • ", bold: false },
        {
          content: "Examples",
          href: "https://ui-v4-livid.vercel.app/examples",
          underline: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        { content: " • ", bold: false },
        {
          content: "Themes",
          href: "https://ui-v4-livid.vercel.app/themes",
          underline: true,
          className: "text-purple-600 dark:text-purple-400",
        },
      ],
      attributes: {},
    } as TextNode,

    // ========================================
    // IMAGES SECTION
    // ========================================
    {
      id: `h2-${timestamp}-90`,
      type: "h2",
      content: "🖼️ Image Support",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-91`,
      type: "p",
      content:
        "Upload and manage images with ease. The editor supports single images, grid layouts, and drag-and-drop reordering:",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-92`,
      type: "h3",
      content: "Single Image",
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-93`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/preview-export-code.png",
        alt: "Preview of HTML export feature with formatted code",
        caption: "📤 Example of the HTML export preview feature",
      },
    } as TextNode,

    {
      id: `h3-${timestamp}-94`,
      type: "h3",
      content: "Image Grid Layout",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-95`,
      type: "p",
      content:
        "Create beautiful image galleries with automatic grid layout. Drag and drop images to reorder them:",
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-96`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/image-grid.png",
        alt: "Image grid layout showing multiple images in a responsive grid",
        caption: "📸 Image grid with drag-and-drop reordering support",
      },
    } as TextNode,

    {
      id: `blockquote-${timestamp}-97`,
      type: "blockquote",
      children: [
        { content: "💡 Image Features: ", bold: true },
        {
          content:
            "Drag to reorder • Click to upload • Add captions • Responsive grid layout • Support for multiple formats (jpg, png, gif, webp)",
          italic: true,
        },
      ],
      attributes: {},
    } as TextNode,

    // ========================================
    // NESTED BLOCKS SECTION
    // ========================================
    {
      id: `h2-${timestamp}-100`,
      type: "h2",
      content: "🪆 Nested Blocks",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-101`,
      type: "p",
      children: [
        { content: "Press ", bold: false },
        { content: "Shift+Enter", elementType: "code", bold: true },
        {
          content:
            " to create nested blocks. Maximum nesting level is 1. Great for grouping related content together:",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-102`,
      type: "container",
      children: [
        {
          id: `p-${timestamp}-103`,
          type: "p",
          children: [
            { content: "📦 This is a ", bold: false },
            {
              content: "nested container",
              bold: true,
              className: "text-blue-600 dark:text-blue-400",
            },
            {
              content:
                "! It groups related content together and can contain any block type.",
              bold: false,
            },
          ],
          attributes: {
            className: "bg-blue-50 dark:bg-blue-900/20 p-3 rounded",
          },
        } as TextNode,

        {
          id: `p-${timestamp}-104`,
          type: "p",
          content:
            "Each nested block maintains its own formatting, type, and attributes. You can have paragraphs, headings, code, lists, and more!",
          attributes: {},
        } as TextNode,

        {
          id: `code-${timestamp}-105`,
          type: "code",
          content: `// Code blocks work perfectly in nested containers
const nestedBlock = {
  type: 'container',
  children: [
    { type: 'p', content: 'First nested item' },
    { type: 'code', content: 'const x = 1;' },
    { type: 'blockquote', content: 'Quote in nest' }
  ]
};`,
          attributes: {},
        } as TextNode,

        {
          id: `blockquote-${timestamp}-106`,
          type: "blockquote",
          children: [
            {
              content: "Even blockquotes work in nested containers! ",
              italic: true,
            },
            {
              content: "Perfect for organizing complex content hierarchically.",
              italic: true,
              bold: true,
            },
          ],
          attributes: {},
        } as TextNode,

        {
          id: `container-${timestamp}-107`,
          type: "container",
          attributes: {
            listType: "ul",
          },
          children: [
            {
              id: `li-${timestamp}-107-1`,
              type: "li",
              content: "Nested lists are supported",
              attributes: {},
            } as TextNode,
            {
              id: `li-${timestamp}-107-2`,
              type: "li",
              content: "Drag handles work in nested blocks too",
              attributes: {},
            } as TextNode,
            {
              id: `li-${timestamp}-107-3`,
              type: "li",
              content: "All formatting features available",
              attributes: {},
            } as TextNode,
          ],
        } as ContainerNode,
      ],
      attributes: {
        style:
          "border: 2px dashed rgba(59, 130, 246, 0.3); padding: 1rem; border-radius: 0.5rem; background: rgba(59, 130, 246, 0.05);",
      },
    } as ContainerNode,

    // ========================================
    // DRAG & DROP SECTION
    // ========================================
    {
      id: `h2-${timestamp}-110`,
      type: "h2",
      content: "🎯 Drag & Drop",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-111`,
      type: "p",
      content:
        "Every block has a drag handle (⋮⋮). Click and drag to reorder blocks, swap images in grids, or reorganize your entire document:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-112`,
      type: "p",
      content: "🎪 Try dragging this block!",
      attributes: {
        className:
          "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-113`,
      type: "p",
      content: "🎨 Or drag this one!",
      attributes: {
        className:
          "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg",
      },
    } as TextNode,

    {
      id: `p-${timestamp}-114`,
      type: "p",
      content: "🚀 Drag and drop works everywhere!",
      attributes: {
        className:
          "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg",
      },
    } as TextNode,

    {
      id: `blockquote-${timestamp}-115`,
      type: "blockquote",
      children: [
        { content: "💡 Drag & Drop Features: ", bold: true },
        {
          content:
            "Reorder any block • Swap images in grids • Move blocks in and out of containers • Visual feedback during drag • Auto-scroll support",
          italic: true,
        },
      ],
      attributes: {},
    } as TextNode,

    // ========================================
    // CUSTOM CLASSES SECTION
    // ========================================
    {
      id: `h2-${timestamp}-120`,
      type: "h2",
      content: "✨ Custom Tailwind Classes",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-121`,
      type: "p",
      content:
        "Apply any Tailwind CSS class to your text. This is where the editor truly shines - unlimited customization with the full power of Tailwind:",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-122`,
      type: "p",
      children: [
        { content: "Add ", bold: false },
        {
          content: "gradients",
          bold: true,
          className:
            "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
        },
        { content: ", ", bold: false },
        {
          content: "shadows",
          bold: true,
          className: "drop-shadow-lg text-blue-600",
        },
        { content: ", ", bold: false },
        {
          content: "borders",
          bold: true,
          className: "border-2 border-green-600 px-2 rounded",
        },
        { content: ", ", bold: false },
        {
          content: "backgrounds",
          bold: true,
          className: "bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded",
        },
        { content: ", and ", bold: false },
        {
          content: "any Tailwind class",
          bold: true,
          className: "ring-2 ring-purple-600 ring-offset-2 px-2 rounded",
        },
        { content: "!", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-123`,
      type: "code",
      content: `// Custom classes in the data structure
const styledText = {
  content: 'Gradient text',
  bold: true,
  className: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
};`,
      attributes: {},
    } as TextNode,

    // ========================================
    // EXPORT SECTION
    // ========================================
    {
      id: `h2-${timestamp}-130`,
      type: "h2",
      content: "📤 HTML Export",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-131`,
      type: "p",
      content:
        "Export your entire document to clean, semantic HTML with all Tailwind classes preserved. Perfect for blogs, documentation, and content management:",
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-132`,
      type: "code",
      content: `import { serializeToHtml } from '@/lib/utils/serialize-to-html';
import { useEditor } from '@/lib';

function MyComponent() {
  const { state } = useEditor();
  
  // Export to HTML
  const html = serializeToHtml(state.history[state.historyIndex]);
  
  // Returns formatted HTML like:
  // <h1>Title</h1>
  // <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
  // <div class="bg-blue-100 p-4">Custom styled block</div>
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}`,
      attributes: {},
    } as TextNode,

    {
      id: `img-${timestamp}-133`,
      type: "img",
      content: "",
      attributes: {
        src: "/images/image_docs/preview-export-code.png",
        alt: "HTML export preview showing formatted code output",
        caption: "📤 Preview and copy HTML export code with one click",
      },
    } as TextNode,

    // ========================================
    // KEYBOARD SHORTCUTS SECTION
    // ========================================
    {
      id: `h2-${timestamp}-140`,
      type: "h2",
      content: "⌨️ Keyboard Shortcuts",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-141`,
      type: "p",
      content:
        "Master these keyboard shortcuts for a blazing-fast editing experience:",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-142`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-142-1`,
          type: "li",
          children: [
            { content: "Enter", elementType: "code", bold: true },
            { content: " - Create new block after current one", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-2`,
          type: "li",
          children: [
            { content: "Shift + Enter", elementType: "code", bold: true },
            {
              content: " - Create nested block or add to existing container",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-3`,
          type: "li",
          children: [
            { content: "Ctrl/Cmd + A", elementType: "code", bold: true },
            { content: " - Select all content for copying", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-4`,
          type: "li",
          children: [
            { content: "Backspace/Delete", elementType: "code", bold: true },
            { content: " - Delete current block (when empty)", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-5`,
          type: "li",
          children: [
            { content: "Ctrl/Cmd + B", elementType: "code", bold: true },
            {
              content: " - Toggle bold formatting on selected text",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-6`,
          type: "li",
          children: [
            { content: "Ctrl/Cmd + I", elementType: "code", bold: true },
            {
              content: " - Toggle italic formatting on selected text",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-7`,
          type: "li",
          children: [
            { content: "Ctrl/Cmd + U", elementType: "code", bold: true },
            {
              content: " - Toggle underline formatting on selected text",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-8`,
          type: "li",
          children: [
            { content: "Ctrl/Cmd + Z", elementType: "code", bold: true },
            { content: " - Undo last action", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-142-9`,
          type: "li",
          children: [
            {
              content: "Ctrl/Cmd + Shift + Z",
              elementType: "code",
              bold: true,
            },
            { content: " - Redo last undone action", bold: false },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    // ========================================
    // KEY FEATURES SUMMARY
    // ========================================
    {
      id: `h2-${timestamp}-150`,
      type: "h2",
      content: "🎯 Complete Feature List",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-151`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-151-1`,
          type: "li",
          children: [
            { content: "✅ Block-Based Architecture", bold: true },
            {
              content: " - Each element is an independent, draggable block",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-2`,
          type: "li",
          children: [
            { content: "✅ Rich Text Formatting", bold: true },
            {
              content: " - Bold, italic, underline, and combinations",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-3`,
          type: "li",
          children: [
            { content: "✅ Multiple Block Types", bold: true },
            {
              content: " - h1-h6, paragraph, code, blockquote, lists (ol/ul)",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-4`,
          type: "li",
          children: [
            { content: "✅ Inline Element Types", bold: true },
            { content: " - Mix heading styles within paragraphs", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-5`,
          type: "li",
          children: [
            { content: "✅ Color Support", bold: true },
            {
              content: " - Preset Tailwind colors + custom hex/RGB colors",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-6`,
          type: "li",
          children: [
            { content: "✅ Font Size Control", bold: true },
            { content: " - Preset sizes + custom pixel values", bold: false },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-7`,
          type: "li",
          children: [
            { content: "✅ Background Colors", bold: true },
            {
              content:
                " - Apply backgrounds to any block with presets or custom colors",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-8`,
          type: "li",
          children: [
            { content: "✅ Link Support", bold: true },
            {
              content: " - Beautiful link popover with URL management",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-9`,
          type: "li",
          children: [
            { content: "✅ Image Upload", bold: true },
            {
              content: " - Single images and grid layouts with drag-to-reorder",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-10`,
          type: "li",
          children: [
            { content: "✅ Nested Blocks", bold: true },
            {
              content: " - Create containers for organizing related content",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-11`,
          type: "li",
          children: [
            { content: "✅ Drag & Drop", bold: true },
            {
              content: " - Reorder blocks, swap images, reorganize everything",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-12`,
          type: "li",
          children: [
            { content: "✅ Custom Tailwind Classes", bold: true },
            {
              content:
                " - Unlimited styling possibilities with full Tailwind support",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-13`,
          type: "li",
          children: [
            { content: "✅ HTML Export", bold: true },
            {
              content: " - Clean, semantic HTML with preserved styling",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-14`,
          type: "li",
          children: [
            { content: "✅ TypeScript-First", bold: true },
            {
              content: " - Fully typed API with excellent IntelliSense",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-15`,
          type: "li",
          children: [
            { content: "✅ Immutable State", bold: true },
            {
              content: " - Built with reducers for predictable updates",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-16`,
          type: "li",
          children: [
            { content: "✅ Undo/Redo", bold: true },
            {
              content: " - Full history management for all actions",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-17`,
          type: "li",
          children: [
            { content: "✅ Read-Only Mode", bold: true },
            {
              content: " - Perfect for displaying published content",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-18`,
          type: "li",
          children: [
            { content: "✅ Dark Mode", bold: true },
            {
              content: " - Beautiful themes that work everywhere",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-19`,
          type: "li",
          children: [
            { content: "✅ Keyboard Shortcuts", bold: true },
            {
              content: " - Efficient editing with common shortcuts",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-151-20`,
          type: "li",
          children: [
            { content: "✅ Context Menu", bold: true },
            {
              content:
                " - Right-click for quick actions (duplicate, delete, move)",
              bold: false,
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    // ========================================
    // INSTALLATION & USAGE
    // ========================================
    {
      id: `h2-${timestamp}-160`,
      type: "h2",
      content: "🚀 Quick Start",
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-161`,
      type: "h3",
      content: "Installation",
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-162`,
      type: "code",
      content: `
# Clone the repository      
git clone https://github.com/Mina-Massoud/mina-rich-editor.git

# Install and run
npm install
npm run dev`,
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-163`,
      type: "h3",
      content: "Basic Usage",
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-164`,
      type: "code",
      content: `import { EditorProvider } from '@/lib';
import { SimpleEditor } from '@/components/SimpleEditor';

export default function App() {
  return (
    <EditorProvider>
      <SimpleEditor />
    </EditorProvider>
  );
}`,
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-165`,
      type: "h3",
      content: "Read-Only Mode",
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-166`,
      type: "code",
      content: `// Display content without editing
<SimpleEditor readOnly={true} />`,
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-167`,
      type: "h3",
      content: "With Initial Content",
      attributes: {},
    } as TextNode,

    {
      id: `code-${timestamp}-168`,
      type: "code",
      content: `import { createDemoContent } from '@/lib/demo-content';

const initialContent = {
  id: 'root',
  type: 'container',
  children: createDemoContent(),
  attributes: {}
};

<EditorProvider initialContainer={initialContent}>
  <SimpleEditor />
</EditorProvider>`,
      attributes: {},
    } as TextNode,

    // ========================================
    // LEARN MORE
    // ========================================
    {
      id: `h2-${timestamp}-180`,
      type: "h2",
      content: "📚 Learn More",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-181`,
      type: "p",
      children: [
        { content: "This rich editor component is part of ", bold: false },
        {
          content: "shadcn/ui",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        {
          content:
            " - a collection of beautifully designed, accessible components built with Radix UI and Tailwind CSS.",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `h3-${timestamp}-183`,
      type: "h3",
      content: "Useful Resources",
      attributes: {},
    } as TextNode,

    {
      id: `container-${timestamp}-184`,
      type: "container",
      attributes: {
        listType: "ul",
      },
      children: [
        {
          id: `li-${timestamp}-184-1`,
          type: "li",
          children: [
            { content: "📖 Documentation: ", bold: false },
            {
              content: "ui-v4-livid.vercel.app",
              bold: true,
              underline: true,
              href: "https://ui-v4-livid.vercel.app/",
              className: "text-blue-600 dark:text-blue-400",
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-184-2`,
          type: "li",
          children: [
            { content: "💻 GitHub: ", bold: false },
            {
              content: "github.com/shadcn-ui/ui",
              bold: true,
              underline: true,
              href: "https://github.com/shadcn-ui/ui",
              className: "text-blue-600 dark:text-blue-400",
            },
          ],
          attributes: {},
        } as TextNode,
        {
          id: `li-${timestamp}-184-3`,
          type: "li",
          children: [
            { content: "🎨 Themes: ", bold: false },
            {
              content: "ui-v4-livid.vercel.app/themes",
              bold: true,
              underline: true,
              href: "https://ui-v4-livid.vercel.app/themes",
              className: "text-blue-600 dark:text-blue-400",
            },
          ],
          attributes: {},
        } as TextNode,
      ],
    } as ContainerNode,

    // ========================================
    // CALL TO ACTION
    // ========================================
    {
      id: `h2-${timestamp}-200`,
      type: "h2",
      content: "🎨 Start Creating!",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-201`,
      type: "p",
      children: [
        { content: "👉 ", bold: false },
        {
          content: "Select any text",
          bold: true,
          className: "text-blue-600 dark:text-blue-400",
        },
        {
          content:
            " and use the toolbar to format it with bold, italic, colors, fonts, and more",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-202`,
      type: "p",
      children: [
        { content: "👉 Press ", bold: false },
        { content: "Enter", elementType: "code" },
        { content: " to create new blocks at any time", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-203`,
      type: "p",
      children: [
        { content: "👉 Press ", bold: false },
        { content: "Shift+Enter", elementType: "code" },
        { content: " for nested blocks and hierarchical content", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-204`,
      type: "p",
      children: [
        { content: "👉 Use the ", bold: false },
        { content: "drag handles (⋮⋮)", bold: true },
        {
          content: " to reorder blocks and reorganize your document",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-205`,
      type: "p",
      children: [
        { content: "👉 Toggle ", bold: false },
        { content: "View Only", bold: true },
        {
          content: " mode in the top-right to see the read-only version",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-206`,
      type: "p",
      children: [
        { content: "👉 Switch to ", bold: false },
        { content: "Dark Mode", bold: true },
        {
          content: " using the theme toggle for a different experience",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-207`,
      type: "p",
      children: [
        { content: "👉 Check the ", bold: false },
        { content: "debug panel below", bold: true },
        { content: " to see JSON structure and export HTML", bold: false },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-208`,
      type: "blockquote",
      children: [
        { content: "🚀 Pro Tip: ", bold: true },
        {
          content: "This is your living documentation! ",
          italic: true,
        },
        {
          content:
            "Feel free to edit, experiment, delete sections, add your own content, and explore all features. ",
          italic: true,
        },
        {
          content:
            "The editor is designed to be intuitive and powerful - discover features as you use it!",
          italic: true,
          bold: true,
        },
      ],
      attributes: {
        className:
          "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-l-4 border-green-600",
      },
    } as TextNode,

    // ========================================
    // CLOSING
    // ========================================
    {
      id: `h2-${timestamp}-210`,
      type: "h2",
      content: "🎉 Get Started",
      attributes: {},
    } as TextNode,

    {
      id: `p-${timestamp}-211`,
      type: "p",
      children: [
        { content: "Thank you for exploring the ", bold: false },
        {
          content: "Rich Text Editor",
          bold: true,
          className: "text-purple-600 dark:text-purple-400",
        },
        { content: "! This component is built entirely with ", bold: false },
        {
          content: "Tailwind CSS",
          bold: true,
          className: "text-cyan-600 dark:text-cyan-400",
        },
        { content: " and ", bold: false },
        {
          content: "shadcn/ui",
          bold: true,
          className: "text-purple-600 dark:text-purple-400",
        },
        {
          content:
            ", making it fully customizable and easy to integrate into your project.",
          bold: false,
        },
      ],
      attributes: {},
    } as TextNode,

    {
      id: `blockquote-${timestamp}-213`,
      type: "blockquote",
      children: [
        { content: "Ready to use this component? ", italic: true },
        {
          content: "Copy the code and customize it to fit your needs. ",
          bold: true,
          italic: true,
        },
        {
          content:
            "All components are designed to be flexible and developer-friendly.",
          italic: true,
        },
      ],
      attributes: {
        style:
          "background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1)); border-left: 4px solid rgb(147, 51, 234); text-align: center;",
      },
    } as TextNode,
  ]
}
