'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { fetchArticles, getArticlesState, setPage } from '@/store/slices/articlesSlice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Loader } from '@/components/ui/loader';
import HeadingSection from '@/components/sections/heading-section';
import { API_BASE_URL } from '@/lib/api/client';
import Pagination from '@/components/ui/pagination';

export default function BlogPage() {
  const { items: articles, page, filters, loading, totalPages } = useAppSelector(state => state.articles);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchArticles({
      page,
      search: filters.search
    }))
  }, [dispatch, page, filters])


  if (loading && articles.length == 0 ) {
    return (
      <>
        <Navbar />
        {/* Hero Section */}
        <HeadingSection
          description='Conseils, histoires et inspirations pour vos prochaines aventures'
          title='Blog Radiata'
        />

        <main className="flex items-center justify-center min-h-screen">
          <Loader />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <HeadingSection
        description='Conseils, histoires et inspirations pour vos prochaines aventures'
        title='Blog Radiata'
      />

      {/* Featured Article */}

      {articles.length > 0 &&
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-full bg-linear-to-br from-[#7ac243] to-[#40e0d0]"
                  style={{
                    backgroundImage: `url(' ${API_BASE_URL}/uploads/articles/${articles[0].image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-col gap-4 mb-4">
                    <div>
                      {articles[0].category.map((category, key) => (
                        <span key={`${key}-categorie-${articles[0].id}`} className="bg-[#7ac243] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">{articles[0].date}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">{articles[0].title}</h2>
                  <p className="text-slate-600 mb-6">{articles[0].content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Par {articles[0].author}</span>
                    <a href="#" className="text-[#40e0d0] font-bold hover:underline">
                      Lire plus →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {/* Articles Grid */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">Articles récents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className={'h-40'}
                  style={{
                    backgroundImage: `url(' ${API_BASE_URL}/uploads/articles/${article.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      {article.category.map((category, key) => (
                        <span key={`${key}-categorie-${article.id}`} className="bg-[#7ac243] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">{article.date}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{article.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{article.author}</span>
                    <a href="#" className="text-[#7ac243] text-sm font-semibold hover:underline">
                      Lire →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination  */}
        <div className='mt-5'>
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Restez informé</h2>
          <p className="text-slate-600 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et actualités
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7ac243]"
            />
            <button
              type="submit"
              className="bg-linear-to-r from-[#7ac243] to-[#40e0d0] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
