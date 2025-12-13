'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

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
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions fréquentes</h1>
          <p className="text-lg opacity-90">
            Trouvez les réponses à vos questions
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-[#7ac243] mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((faq, itemIndex) => {
                  const globalIndex = `${catIndex}-${itemIndex}`;
                  const isOpen = openItems[globalIndex as any];
                  return (
                    <div
                      key={itemIndex}
                      className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex as any)}
                        className="w-full flex items-center justify-between p-6 hover:bg-slate-100 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-slate-900 text-left">
                          {faq.q}
                        </h3>
                        <span
                          className={`flex-shrink-0 ml-4 text-[#40e0d0] text-2xl transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ⋁
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-slate-700 border-t border-slate-200">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Vous n'avez pas trouvé la réponse?</h2>
          <p className="text-slate-600 mb-8">
            Notre équipe de support est disponible pour vous aider 24/7
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="tel:+33123456789" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">☎</div>
              <p className="font-semibold text-slate-900">Téléphone</p>
              <p className="text-sm text-slate-600">+33 1 23 45 67 89</p>
            </a>
            <a href="mailto:support@radiata.com" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">✉</div>
              <p className="font-semibold text-slate-900">Email</p>
              <p className="text-sm text-slate-600">support@radiata.com</p>
            </a>
            <a href="/contact" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">💬</div>
              <p className="font-semibold text-slate-900">Contact</p>
              <p className="text-sm text-slate-600">Formulaire de contact</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
