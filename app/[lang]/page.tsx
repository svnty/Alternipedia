import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <div className="relative bg-white text-center mt-8 flex flex-col justify-center items-center">

      {dict.common.comingSoon}

      <br />
      {dict.common.stayTuned}
      <br />

      <span className="inline mt-8">{dict.common.exampleArticle} <Link href={`/${lang}/wiki/cat`} className="text-blue-600 hover:underline">Cats</Link></span>

    </div>
  );
}
