'use client';

import { Suspense, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchArticleById } from '@/store/slices/articleDetailSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Loader } from '@/components/ui/loader';
import { API_BASE_URL } from '@/lib/api/client';
import { AlertCircle, MapPin, Calendar, User } from 'lucide-react';

function ArticleDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { article, loading, error } = useAppSelector((state) => state.articlesDetails);

  const id = searchParams.get('id');


  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id) as any);
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <>
        <main className="flex items-center justify-center min-h-screen">
          <Loader />
        </main>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <main className="min-h-screen px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex gap-3 items-start p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-6">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-destructive font-semibold">Erreur lors du chargement de l'article</p>
                <p className="text-sm text-destructive/80">{error || "Article non trouvé"}</p>
              </div>
            </div>
            <button onClick={() => router.back()} className="text-[#40e0d0] font-semibold">Retour</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative h-96 w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${API_BASE_URL}/uploads/articles/${article.image}')`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-end h-full max-w-4xl mx-auto px-4 pb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {article.category?.map((cat, idx) => (
                <span key={idx} className="bg-[#7ac243] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {cat.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{article.title}</h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.date}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {article.author}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none text-gray-800 mb-8">
            {article.content}
          </div>
        </section>
      </main>
    </>
  );
}




// Page principale avec Suspense
export default function BlogArticlePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="flex items-center justify-center min-h-screen">
          <Loader />
        </main>
      }>
        <ArticleDetailPage />
      </Suspense>
      <Footer />
    </>
  );
}

