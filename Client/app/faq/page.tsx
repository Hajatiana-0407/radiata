'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import HeadingSection from '@/components/sections/heading-section';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const faqs = [
    {
      category: 'Réservations',
      items: [
        {
          q: 'Comment puis-je réserver une destination?',
          a: 'Rendez-vous sur notre page Destinations, sélectionnez votre destination préférée, puis cliquez sur "Réserver". Remplissez le formulaire avec vos informations et confirmez votre réservation.'
        },
        {
          q: 'Puis-je annuler ou modifier ma réservation?',
          a: 'Oui, vous pouvez annuler jusqu\'à 14 jours avant la date de départ pour un remboursement complet. Les modifications sont acceptées jusqu\'à 7 jours avant.'
        },
        {
          q: 'Y a-t-il des réductions pour les groupes?',
          a: 'Absolument! Nous offrons des réductions spéciales pour les groupes de 10 personnes ou plus. Contactez-nous pour un devis personnalisé.'
        },
        {
          q: 'Quels modes de paiement acceptez-vous?',
          a: 'Nous acceptons les cartes bancaires, PayPal, virements bancaires et paiements échelonnés.'
        }
      ]
    },
    {
      category: 'Avant le voyage',
      items: [
        {
          q: 'Quel équipement dois-je apporter?',
          a: 'Une liste détaillée d\'équipement est envoyée avec votre confirmation de réservation. L\'équipement essentiel (tentes, sacs de couchage) est fourni, mais apportez des vêtements adaptés et des chaussures de randonnée.'
        },
        {
          q: 'Quel est le niveau de forme physique requis?',
          a: 'Cela dépend de la destination. Nous proposons des voyages pour tous les niveaux: débutants, intermédiaires et experts. Lisez la description de chaque destination pour les détails.'
        },
        {
          q: 'Dois-je prendre une assurance?',
          a: 'Nous recommandons fortement une assurance voyage. Une assurance groupe est disponible à un tarif réduit.'
        },
        {
          q: 'Faut-il des vaccins?',
          a: 'Consultez votre médecin pour les recommandations selon votre destination. Certains vaccins peuvent être recommandés pour certaines régions.'
        }
      ]
    },
    {
      category: 'Pendant le voyage',
      items: [
        {
          q: 'Quel est le ratio guide-voyageurs?',
          a: 'Notre ratio est généralement 1 guide pour 6-8 voyageurs, garantissant une attention et une sécurité optimales.'
        },
        {
          q: 'Comment sont les repas?',
          a: 'Les repas sont préparés par nos cuisiniers expérimentés avec des produits locaux. Nous pouvons accommoder les régimes spéciaux (végétarien, allergies, etc.).'
        },
        {
          q: 'Y a-t-il une couverture médicale?',
          a: 'Tous nos guides sont certifiés en premiers secours. Nous avons une trousse de secours complète et communiquons avec les services d\'urgence si nécessaire.'
        },
        {
          q: 'Que se passe-t-il en cas de mauvais temps?',
          a: 'La sécurité est notre priorité. En cas de mauvais temps, nous modifierons l\'itinéraire ou reporterons les activités si nécessaire.'
        }
      ]
    },
    {
      category: 'Sécurité & Environnement',
      items: [
        {
          q: 'Radiata est-elle écologiquement responsable?',
          a: 'Oui, absolument. Nous suivons une politique zéro déchet, respectons les écosystèmes locaux et soutienons les communautés locales.'
        },
        {
          q: 'Comment Radiata soutient les communautés locales?',
          a: 'Nous emploient des guides locaux, achetons des produits locaux et contribuons au développement des régions que nous visitons.'
        },
        {
          q: 'Quelle est la politique de sécurité de Radiata?',
          a: 'La sécurité est notre priorité absolue. Tous nos guides sont certifiés, nos routes d\'accès sont régulièrement inspectées, et nous avons des protocoles d\'urgence en place.'
        }
      ]
    },
    {
      category: 'Après le voyage',
      items: [
        {
          q: 'Recevoir-je des photos?',
          a: 'Oui, les photos prises pendant votre voyage vous seront envoyées par email dans les 2 semaines suivant votre retour.'
        },
        {
          q: 'Puis-je laisser un avis?',
          a: 'Nous aimerions beaucoup! Vous recevrez un email après le voyage avec un lien pour partager votre expérience.'
        },
        {
          q: 'Y a-t-il une section communauté?',
          a: 'Oui, rejoignez notre communauté de voyageurs sur notre plateforme pour partager vos photos, histoires et conseils.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-emerald-50/20 to-white">
      <Navbar />

      <HeadingSection title="FAQ & Support" description="Trouvez rapidement les réponses à toutes vos questions concernant nos voyages écologiques"/>

      {/* FAQ Content améliorée */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Questions par catégories */}
          <div className="space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={category.category} className="relative">
                {/* En-tête de catégorie */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={clsx(
                    "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-linear-to-br from-[#7ac243]/10 to-[#7ac243]/5",
                    "border border-[#7ac243]/20"
                  )}>
                    <span className="text-lg font-bold text-[#7ac243]">
                      {catIndex + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                    <p className="text-slate-600 mt-1">{category.items.length} questions</p>
                  </div>
                </div>

                {/* Liste des questions */}
                <div className="space-y-4">
                  {category.items.map((faq, itemIndex) => {
                    const globalIndex = `${catIndex}-${itemIndex}`;
                    const isOpen = openItems[globalIndex as any];

                    return (
                      <div
                        key={itemIndex}
                        className={clsx(
                          "group relative overflow-hidden rounded-2xl",
                          "transition-all duration-300",
                          isOpen
                            ? "bg-linear-to-br from-white to-slate-50 shadow-lg"
                            : "bg-white shadow-sm hover:shadow-md"
                        )}
                      >
                        {/* Effet de bordure colorée */}
                        <div className={clsx(
                          "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300",
                          isOpen
                            ? "bg-linear-to-b from-[#40e0d0] to-[#20b2aa]"
                            : "bg-linear-to-b from-[#7ac243]/20 to-[#5a9e30]/20 group-hover:from-[#7ac243]/40 group-hover:to-[#5a9e30]/40"
                        )} />

                        <button
                          onClick={() => toggleItem(globalIndex as any)}
                          className="w-full flex items-start justify-between p-6 text-left"
                        >
                          <div className="flex-1 pr-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#40e0d0] transition-colors">
                              {faq.q}
                            </h3>
                            {!isOpen && (
                              <p className="text-sm text-slate-500 line-clamp-2">
                                {typeof faq.a === 'string' && faq.a.length > 120
                                  ? `${faq.a.substring(0, 120)}...`
                                  : faq.a}
                              </p>
                            )}
                          </div>

                          {/* Icône d'expansion améliorée */}
                          <div className={clsx(
                            "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                            "transition-all duration-300",
                            isOpen
                              ? "bg-linear-to-br from-[#40e0d0] to-[#20b2aa] text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-[#40e0d0]/10 group-hover:text-[#40e0d0]"
                          )}>
                            <svg
                              className={clsx(
                                "w-5 h-5 transition-transform duration-300",
                                isOpen ? "rotate-180" : ""
                              )}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {/* Réponse détaillée */}
                        {isOpen && (
                          <div className="px-6 pb-8">
                            <div className="border-t border-slate-200 pt-6">
                              <div className="prose prose-slate max-w-none">
                                {typeof faq.a === 'string' ? (
                                  <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                                ) : (
                                  <div className="text-slate-700 leading-relaxed">{faq.a}</div>
                                )}
                              </div>

                              {/* Action supplémentaire */}
                              <div className="mt-6 flex items-center gap-4">
                                <span className="text-sm text-slate-500">Cette réponse vous a-t-elle été utile ?</span>
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors">
                                    👍 Oui
                                  </button>
                                  <button className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors">
                                    👎 Non
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support amélioré */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Arrière-plan */}
        <div className="absolute inset-0 bg-linear-to-br from-white via-emerald-50/30 to-white" />
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-[#7ac243]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#40e0d0]/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#7ac243]/10 to-[#40e0d0]/10 border border-slate-200/50 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#7ac243] animate-pulse" />
              <span className="text-sm font-medium text-slate-700">Support 24/7</span>
              <span className="w-2 h-2 rounded-full bg-[#40e0d0] animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Besoin d&apos;une assistance personnalisée ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Notre équipe d&apos;experts en écotourisme est à votre disposition pour vous accompagner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Téléphone */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-[#7ac243]/20 to-[#40e0d0]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[#40e0d0]/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-[#7ac243]/10 to-[#7ac243]/5 border border-[#7ac243]/20 mb-6">
                  <svg className="w-8 h-8 text-[#7ac243]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Par téléphone</h3>
                <p className="text-slate-600 mb-4">Appelez-nous pour une réponse immédiate</p>
                <a href="tel:+33123456789" className="inline-flex items-center gap-2 text-lg font-semibold text-[#7ac243] hover:text-[#5a9e30] transition-colors">
                  +33 1 23 45 67 89
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-sm text-slate-500 mt-2">Lun-Ven: 8h-20h, Sam: 9h-18h</p>
              </div>
            </div>

            {/* Email */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-[#40e0d0]/20 to-[#20b2aa]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[#40e0d0]/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-[#40e0d0]/10 to-[#20b2aa]/5 border border-[#40e0d0]/20 mb-6">
                  <svg className="w-8 h-8 text-[#40e0d0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Par email</h3>
                <p className="text-slate-600 mb-4">Réponse garantie sous 24h</p>
                <a href="mailto:support@radiata.com" className="inline-flex items-center gap-2 text-lg font-semibold text-[#40e0d0] hover:text-[#20b2aa] transition-colors">
                  support@radiata.com
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-sm text-slate-500 mt-2">Réponse sous 24h ouvrées</p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-[#7ac243]/20 via-[#40e0d0]/20 to-[#20b2aa]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[#7ac243]/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-[#7ac243]/10 to-[#40e0d0]/10 border border-slate-300/50 mb-6">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Formulaire de contact</h3>
                <p className="text-slate-600 mb-4">Décrivez votre besoin en détail</p>
                <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#7ac243] to-[#40e0d0] text-white font-semibold hover:shadow-lg transition-all hover:scale-105">
                  Remplir le formulaire
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-sm text-slate-500 mt-2">Prise en charge personnalisée</p>
              </div>
            </div>
          </div>

          {/* Message d'assurance */}
          <div className="mt-16 p-6 rounded-2xl bg-linear-to-r from-[#7ac243]/5 to-[#40e0d0]/5 border border-slate-200/50 text-center">
            <p className="text-slate-700">
              <span className="font-semibold text-[#7ac243]">✅ 100% satisfaction garantie</span> -
              Notre équipe s'engage à vous répondre dans les plus brefs délais avec des solutions adaptées à vos besoins.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
