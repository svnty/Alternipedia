import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/retry";
import List from '@/app/[lang]/saved/(client-renders)/list';
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function SavedArticlesPage({ params }: { params: Promise<{ lang: string }> }) {
  const session = await getServerSession();
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  if (!session) {
    return (
      <div className="flex justify-center text-center mt-36 min-h-64">
        <h1>Please sign in to view your notes.</h1>
      </div>
    );
  }

  const saved = await withRetry(() => prisma.savedArticle.findMany({
    where: {
      user: {
        email: session.user?.email || '',
      },
    },
    include: {
      article: {
        include: {
          watchers: {
            where: {
              user: {
                email: session.user?.email || '',
              }
            }
          }
        },
      },
    }
  }));

  console.log('Saved articles: ', saved);
  
  // Serialize saved articles into a lightweight shape for the client component
  const serializedSaved: any = saved.map((s) => ({
    articleId: s.articleId,
    title: s.article?.title || decodeURI(s.slug || '').replace(/_/g, ' '),
    slug: s.article?.slug || s.slug,
    savedAt: s.savedAt.toISOString(),
    watching: (s.article?.watchers?.length ?? 0) > 0,
  }));

  return (
    <div className="mx-2 w-full md:max-w-2/3 md:m-auto min-h-64">
      <div className="mt-8 text-xl font-medium">
        Saved Articles
      </div>
      <p className="text-muted-foreground">These are your saved articles.</p>

      <div className="my-6 mx-1 mb-10">
        <List saved={serializedSaved} />
      </div>

    </div>
  );
}
