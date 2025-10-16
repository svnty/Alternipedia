
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale } from "@/lib/i18n/config";

export default function Bias({ slug, language, bias }: { slug: string; language: string; bias?: string }) {
  const dict = getDictionary(language as Locale);

  return (
    <article className="wikipedia-article max-w-none">
      {bias && bias === 'socialist' && (
        <div className="self-stretch p-4 m-6 mt-2 bg-red-50 border-l-4 border-red-400 rounded-r flex items-center">
          <img src='/socialist.png' alt="Socialist Bias" width={40} className="flex-shrink-0 mr-4" />
          <p className="text-sm text-red-800 flex-1">
            {dict.article.biasIntro.socialist}
          </p>
        </div>
      )}
      {bias && bias === 'liberal' && (
        <div className="self-stretch p-4 m-6 mt-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-r flex items-center">
          <img src='/liberal.png' alt="Liberal Bias" width={40} className="flex-shrink-0 mr-4" />
          <p className="text-sm text-yellow-800 flex-1">
            {dict.article.biasIntro.liberal}
          </p>
        </div>
      )}
      {bias && bias === 'conservative' && (
        <div className="self-stretch p-4 m-6 mt-2 bg-lime-50 border-l-4 border-lime-400 rounded-r flex items-center">
          <img src='/conservative.png' alt="Conservative Bias" width={40} className="flex-shrink-0 mr-4" />
          <p className="text-sm text-lime-800 flex-1">
            {dict.article.biasIntro.conservative}
          </p>
        </div>
      )}
      {bias && bias === 'nationalist' && (
        <div className="self-stretch p-4 m-6 mt-2 bg-slate-50 border-l-4 border-slate-400 rounded-r flex items-center">
          <img src='/nationalist.png' alt="Nationalist Bias" width={40} className="flex-shrink-0 mr-4" />
          <p className="text-sm text-slate-800 flex-1">
            {dict.article.biasIntro.nationalist}
          </p>
        </div>
      )}

      <main className="mx-auto">
        
      </main>
    </article>
  );
}