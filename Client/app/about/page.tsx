'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À Propos de Radiata</h1>
          <p className="text-lg opacity-90">
            Découvrez notre histoire et notre mission de rendre l'exploration accessible à tous
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Notre Histoire</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Radiata Explorer a été fondée en 2020 par une équipe de passionnés de voyage et de nature. Notre vision était simple : créer une plateforme qui rend l'exploration accessible à tous, peu importe leur niveau d'expérience.
              </p>
              <p>
                Nous croyons que la nature a le pouvoir de transformer, d'inspirer et de connecter. Chaque destination que nous proposons a été soigneusement sélectionnée pour garantir une expérience inoubliable et sécurisée.
              </p>
              <p>
                Aujourd'hui, nous avons aidé plus de 10 000 voyageurs à découvrir les merveilles de notre planète. Notre communauté grandit chaque jour, et nous sommes fiers de faire partie de votre voyage.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#7ac243]/10 to-[#40e0d0]/10 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#7ac243] mb-2">10K+</div>
                <p className="text-slate-700">Voyageurs satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Durabilité',
                description: 'Nous nous engageons à protéger l\'environnement pour les générations futures'
              },
              {
                title: 'Accessibilité',
                description: 'L\'exploration ne doit pas être réservée aux élites. Elle est pour tous'
              },
              {
                title: 'Qualité',
                description: 'Chaque expérience est conçue avec soin pour surpasser vos attentes'
              }
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-6 shadow-md text-center">
                <h3 className="text-xl font-bold text-[#7ac243] mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sophie Martin', role: 'Fondatrice & PDG' },
              { name: 'Jean Dupont', role: 'Directeur des Opérations' },
              { name: 'Marie Laurent', role: 'Responsable Destinations' }
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0] mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                <p className="text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
          <p className="mb-8 text-lg opacity-90">
            Commencez votre prochaine aventure dès aujourd'hui
          </p>
          <a href="/destinations" className="inline-block bg-white text-[#7ac243] font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow">
            Explorer les destinations
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
