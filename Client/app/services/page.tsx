'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ServicesPage() {
  const services = [
    {
      title: 'Randonnée guidée',
      description: 'Explorez les meilleurs sentiers avec des guides expérimentés qui connaissent chaque recoin de la région',
      features: ['Guides certifiés', 'Petit groupe', 'Équipement fourni', 'Tous niveaux']
    },
    {
      title: 'Camping & bivouac',
      description: 'Passez une nuit sous les étoiles avec tous les équipements nécessaires et l\'expertise locale',
      features: ['Tentes de qualité', 'Repas inclus', 'Réchauds fournis', 'Zones sûres']
    },
    {
      title: 'Escalade',
      description: 'Progressez en escalade avec des instructeurs certifiés sur les plus belles falaises et rochers',
      features: ['Certification possible', 'Tous niveaux', 'Équipement sécurisé', 'Petit groupe']
    },
    {
      title: 'Kayak & Canyoning',
      description: 'Descendez les rivières et canyons dans le respect de l\'environnement naturel',
      features: ['Instructeur attentif', 'Gilets fournis', 'Photo souvenir', 'Pause pique-nique']
    },
    {
      title: 'Photographe privé',
      description: 'Engagez un photographe professionnel pour capturer vos meilleurs moments de voyage',
      features: ['Photos professionnelles', 'Retouche incluse', 'Transfert numérique', 'Album souvenir']
    },
    {
      title: 'Accompagnement personnalisé',
      description: 'Découvrez une destination avec un local passionné qui partage ses secrets',
      features: ['Guide personnel', 'Flexible', 'Authentique', 'Repas locaux']
    }
  ];

  const packages = [
    {
      name: 'Aventurier Solo',
      price: '199€',
      description: 'Parfait pour commencer',
      features: ['Une destination', 'Guide d\'un jour', 'Repas simple', 'Transport']
    },
    {
      name: 'Explorateur Pro',
      price: '599€',
      description: 'Le plus populaire',
      features: ['2-3 destinations', 'Guide 3 jours', 'Tous repas inclus', 'Hébergement campement', 'Équipement'],
      highlight: true
    },
    {
      name: 'Expert Aventurier',
      price: '1299€',
      description: 'Expérience complète',
      features: ['5 destinations', 'Guide privé', 'Repas gastronomiques', 'Hotel 3 étoiles', 'Équipement premium', 'Assurance']
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h1>
          <p className="text-lg opacity-90">
            Une gamme complète de services pour une aventure sur mesure
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Nos activités principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 hover:shadow-lg transition-shadow border border-slate-200">
                <h3 className="text-xl font-bold text-[#7ac243] mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-slate-700">
                      <span className="w-2 h-2 bg-[#40e0d0] rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Nos forfaits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg p-8 transition-all ${
                  pkg.highlight
                    ? 'bg-gradient-to-br from-[#7ac243] to-[#40e0d0] text-white shadow-xl scale-105'
                    : 'bg-white border-2 border-slate-200 text-slate-900'
                }`}
              >
                {pkg.highlight && (
                  <div className="text-center mb-4 bg-white bg-opacity-20 px-3 py-1 rounded-full inline-block">
                    <span className="text-sm font-semibold">PLUS POPULAIRE</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className={`text-sm mb-6 ${pkg.highlight ? 'opacity-90' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>
                <div className="text-4xl font-bold mb-8">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    pkg.highlight
                      ? 'bg-white text-[#7ac243] hover:bg-slate-100'
                      : 'bg-[#7ac243] text-white hover:bg-[#6ab12d]'
                  }`}
                >
                  Choisir ce forfait
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Pourquoi nous choisir?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Expérience de 15 ans', desc: 'Nous connaissons chaque destination comme le fond de notre poche' },
              { title: 'Guides certifiés', desc: 'Tous nos guides ont des qualifications en secourisme et sécurité' },
              { title: 'Petits groupes', desc: 'Groupes de 6 à 12 personnes pour une meilleure expérience' },
              { title: 'Éco-responsable', desc: 'Nous respectons l\'environnement et les communautés locales' }
            ].map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#7ac243] to-[#40e0d0] flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{reason.title}</h3>
                  <p className="text-slate-600">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer?</h2>
          <p className="mb-8 text-lg opacity-90">
            Réservez votre adventure dès maintenant et profitez d'une réduction de 10%
          </p>
          <a href="/destinations" className="inline-block bg-white text-[#7ac243] font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow">
            Voir les destinations
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
