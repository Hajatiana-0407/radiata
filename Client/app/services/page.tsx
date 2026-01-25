'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import HeadingSection from '@/components/sections/heading-section';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-dispatch';
import { useEffect } from 'react';
import { fetchAllServices } from '@/store/slices/serviceSlice';
import { Loader } from '@/components/ui/loader';
import { Check, CheckCircle, UserCheck } from 'lucide-react';

export default function ServicesPage() {
  const { items: services, loading, error } = useAppSelector(state => state.services);
  const dispatch = useAppDispatch();

  const packages = [
    // {
    //   name: 'Aventurier Solo',
    //   price: '199€',
    //   description: 'Parfait pour commencer',
    //   features: ['Une destination', 'Guide d\'un jour', 'Repas simple', 'Transport']
    // },
    // {
    //   name: 'Explorateur Pro',
    //   price: '599€',
    //   description: 'Le plus populaire',
    //   features: ['2-3 destinations', 'Guide 3 jours', 'Tous repas inclus', 'Hébergement campement', 'Équipement'],
    //   highlight: true
    // },
    // {
    //   name: 'Expert Aventurier',
    //   price: '1299€',
    //   description: 'Expérience complète',
    //   features: ['5 destinations', 'Guide privé', 'Repas gastronomiques', 'Hotel 3 étoiles', 'Équipement premium', 'Assurance']
    // }
  ];
  useEffect(() => {
    dispatch(fetchAllServices());
    return () => { }
  }, [dispatch])


  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeadingSection title="Nos Services" description="Une gamme complète de services pour une aventure sur mesure" />

      {/* Services Grid */}
      <section className="py-20 px-4 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Nos <span className="text-[#7ac243]">activités</span> principales
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Découvrez nos services sur-mesure conçus pour répondre à vos besoins spécifiques
            </p>
          </div>

          {loading ? (
            <div className='flex items-center justify-center py-20'>
              <Loader />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.name + '-' + service.id}
                  className="group relative bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-[#7ac243]/20 hover:-translate-y-2 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {/* Décoration en haut à droite */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#7ac243]/10 rounded-bl-full transform group-hover:bg-[#7ac243]/20 transition-colors duration-300"></div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-2xl font-bold flex items-center gap-2  text-[#40e0d0] mb-4 capitalize group-hover:text-[#7ac243] transition-colors duration-300">
                    <CheckCircle className='w-5 h-5' />
                    {service.name}
                  </h3>

                  {/* Description */}
                  <div className="relative pb-4 mb-6">
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                    {/* Ligne décorative */}
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-[#7ac243] to-[#40e0d0]"></div>
                  </div>

                  {/* Avantages */}
                  <ul className="space-y-3">
                    {service?.avantages?.map((feature, idx) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-slate-700 group/item hover:text-slate-900 transition-colors duration-200"
                      >
                        <div className="shrink-0 mt-1">
                          <div className="w-5 h-5 text-[#7ac243] group-hover/item:scale-110 transition-transform duration-200">
                            <svg
                              className="w-full h-full"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Packages */}
      {/* <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Nos forfaits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg p-8 transition-all ${pkg.highlight
                  ? 'bg-linear-to-br from-[#7ac243] to-[#40e0d0] text-white shadow-xl scale-105'
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
                  className={`w-full py-3 rounded-lg font-bold transition-all ${pkg.highlight
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
      </section> */}

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
                <div className="h-12 w-12 rounded-lg bg-[#7ac243] shrink-0 flex items-center justify-center text-white font-bold text-xl">
                  <Check />
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
      <section className="py-16 px-4 bg-linear-to-r from-[#7ac243] to-[#40e0d0]">
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
