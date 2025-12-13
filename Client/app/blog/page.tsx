'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: 'Les 5 meilleurs sentiers de randonnée en Europe',
      excerpt: 'Découvrez nos recommandations pour les plus beaux sentiers d\'Europe. Une aventure inoubliable vous attend.',
      date: '2024-11-10',
      author: 'Sophie Martin',
      category: 'Randonnée',
      image: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: 'Guide complet du camping responsable',
      excerpt: 'Apprenez comment camper en respectant l\'environnement et les communautés locales.',
      date: '2024-11-08',
      author: 'Jean Dupont',
      category: 'Éco-tourisme',
      image: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      id: 3,
      title: 'Préparer votre premier voyage en montagne',
      excerpt: 'Conseils essentiels pour débuter la montagne en toute sécurité. Équipement, entraînement et préparation mentale.',
      date: '2024-11-05',
      author: 'Marie Laurent',
      category: 'Guide pratique',
      image: 'bg-gradient-to-br from-orange-400 to-orange-600'
    },
    {
      id: 4,
      title: 'Rencontres avec les communautés locales',
      excerpt: 'Découvrez comment nos voyageurs créent des liens authentiques avec les populations des régions visitées.',
      date: '2024-10-30',
      author: 'Sophie Martin',
      category: 'Reportage',
      image: 'bg-gradient-to-br from-purple-400 to-purple-600'
    },
    {
      id: 5,
      title: 'Les meilleurs moments pour voyager',
      excerpt: 'Calendrier des meilleures périodes pour visiter nos destinations populaires.',
      date: '2024-10-25',
      author: 'Jean Dupont',
      category: 'Planification',
      image: 'bg-gradient-to-br from-pink-400 to-pink-600'
    },
    {
      id: 6,
      title: 'Photographie de voyage: Capturer les moments',
      excerpt: 'Techniques et conseils pour prendre de magnifiques photos lors de vos aventures.',
      date: '2024-10-20',
      author: 'Marie Laurent',
      category: 'Photography',
      image: 'bg-gradient-to-br from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Radiata</h1>
          <p className="text-lg opacity-90">
            Conseils, histoires et inspirations pour vos prochaines aventures
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0]"></div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#7ac243] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {articles[0].category}
                  </span>
                  <span className="text-sm text-slate-500">{articles[0].date}</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">{articles[0].title}</h2>
                <p className="text-slate-600 mb-6">{articles[0].excerpt}</p>
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

      {/* Articles Grid */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">Articles récents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className={`h-40 ${article.image}`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#40e0d0] text-white px-2 py-1 rounded text-xs font-semibold">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{article.excerpt}</p>
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
              className="bg-gradient-to-r from-[#7ac243] to-[#40e0d0] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow"
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
