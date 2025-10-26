import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FeaturedArticles from '@/app/(client-renders)/FeaturedArticles';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <div className="relative min-h-96 bg-white text-center flex flex-col justify-center items-center gap-28">
      <section className="py-16 text-center mt-12">
        <h1 className="text-4xl font-bold">Discover Every Side of the Story</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Alternipedia is a collaborative encyclopedia showing how the same topic is explained from different political, cultural, and ideological perspectives.
        </p>
        <div className="mt-12">
          <Link href={`/${lang}/random`} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
            Explore an Article
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50 px-12 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">What is Alternipedia?</h2>
          <p className="text-gray-700 leading-relaxed">
            On Alternipedia, every article can be viewed through multiple perspectives — from conservative to socialist, secular to religious.
            We believe that understanding bias helps readers form balanced opinions and make informed decisions.
            Articles are collaboratively edited by users, just like Wikipedia, but with open acknowledgment of differing viewpoints.
          </p>
        </div>
      </section>


      <section className="py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">1. Choose a Topic</h3>
            <p className="text-gray-600">Search or browse thousands of articles written from multiple perspectives.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">2. Compare Biases</h3>
            <p className="text-gray-600">Switch between biases — like Socialist, Liberal, Conservative — to see how narratives differ.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">3. Join the Editors</h3>
            <p className="text-gray-600">Create your account and help make information more transparent and inclusive.</p>
          </div>
        </div>
      </section>

      <FeaturedArticles lang={lang} />
    </div>
  );
}
