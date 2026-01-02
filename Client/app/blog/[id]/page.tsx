'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchArticleById } from '@/store/slices/articleDetailSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Loader } from '@/components/ui/loader';
import { API_BASE_URL } from '@/lib/api/client';
import { AlertCircle, MapPin, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { article, loading, error } = useAppSelector((state) => state.articlesDetails);

  const id = params.id as string;

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id) as any);
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center min-h-screen">
          <Loader />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
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

          {/* Lien vers la destination associée */}
          {/* {article.destination && (
            <div className="mt-12 p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-6">
              <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0"
                style={{
                  backgroundImage: `url('${API_BASE_URL}/uploads/circuits/${article.destination.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{article.destination.title}</h3>
                <div className="flex items-center gap-3 text-gray-600 text-sm mb-2">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {article.destination.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.destination.duration} jours</span>
                </div>
                <p className="text-gray-700 line-clamp-2 mb-2">{article.destination.description}</p>
                <Link
                  href={`/destinations/${article.destination.id}`}
                  className="inline-block mt-2 px-5 py-2 bg-[#40e0d0] text-white rounded-lg font-semibold hover:bg-[#7ac243] transition"
                >
                  Voir la destination
                </Link>
              </div>
            </div>
          )} */}
        </section>
      </main>
      <Footer />
    </>
  );
}