'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Laurent Bonneau',
      location: 'Paris, France',
      rating: 5,
      text: 'Une expérience incroyable! Les guides étaient professionnels et passionnés. J\'ai découvert des endroits magnifiques que je n\'aurais jamais trouvés seul.',
      image: 'LB'
    },
    {
      name: 'Marie Rossi',
      location: 'Lyon, France',
      rating: 5,
      text: 'Radiata m\'a permis de réaliser mon rêve d\'escalade. Les instructeurs étaient patientss et encourageants. Je recommande vivement!',
      image: 'MR'
    },
    {
      name: 'Thomas Leclerc',
      location: 'Marseille, France',
      rating: 5,
      text: 'Meilleur voyage d\'aventure de ma vie. L\'organisation était parfaite et l\'équipe était comme une famille. Merci Radiata!',
      image: 'TL'
    },
    {
      name: 'Sophie Mercier',
      location: 'Toulouse, France',
      rating: 5,
      text: 'J\'ai voyagé seule pour la première fois. Grâce à Radiata, j\'ai rencontré d\'autres voyageurs incroyables et créé des souvenirs pour la vie.',
      image: 'SM'
    },
    {
      name: 'Pierre Garnaud',
      location: 'Nice, France',
      rating: 5,
      text: 'Les repas locaux et l\'accueil des communautés était exceptionnels. Radiata respecte vraiment la nature et les gens.',
      image: 'PG'
    },
    {
      name: 'Julie Fontaine',
      location: 'Nantes, France',
      rating: 5,
      text: 'Mon fils a adoré! C\'est une super façon de l\'initier à l\'aventure en toute sécurité. Nous allons revenir l\'année prochaine!',
      image: 'JF'
    }
  ];

  const team = [
    {
      name: 'Sophie Martin',
      role: 'Fondatrice & PDG',
      speciality: 'Randonnée alpine',
      exp: '20 ans',
      image: 'SM'
    },
    {
      name: 'Jean Dupont',
      role: 'Directeur des Opérations',
      speciality: 'Kayak & Canyoning',
      exp: '18 ans',
      image: 'JD'
    },
    {
      name: 'Marie Laurent',
      role: 'Responsable Destinations',
      speciality: 'Escalade',
      exp: '15 ans',
      image: 'ML'
    },
    {
      name: 'André Rousseau',
      role: 'Guide Principal',
      speciality: 'Trekking',
      exp: '12 ans',
      image: 'AR'
    },
    {
      name: 'Nathalie Petit',
      role: 'Guide Spécialisée',
      speciality: 'Survie & Camping',
      exp: '10 ans',
      image: 'NP'
    },
    {
      name: 'Claude Bernard',
      role: 'Guide Photographe',
      speciality: 'Photo aventure',
      exp: '8 ans',
      image: 'CB'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Témoignages & Équipe</h1>
          <p className="text-lg opacity-90">
            Découvrez l'impact de Radiata à travers les histoires de nos voyageurs et guides
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10K+', label: 'Voyageurs satisfaits' },
            { number: '50+', label: 'Destinations' },
            { number: '4.9/5', label: 'Note moyenne' },
            { number: '15+', label: 'Années d\'expérience' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-[#7ac243] mb-2">{stat.number}</div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Ce que nos voyageurs disent</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#7ac243]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0] flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#40e0d0]">★</span>
                  ))}
                </div>
                <p className="text-slate-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Notre équipe de guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-[#7ac243]/20 to-[#40e0d0]/20 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0] flex items-center justify-center text-white text-3xl font-bold">
                    {member.image}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-[#7ac243] font-semibold mb-3">{member.role}</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-900">Spécialité:</span> {member.speciality}</p>
                    <p><span className="font-semibold text-slate-900">Expérience:</span> {member.exp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Rejoignez nos aventuriers</h2>
          <p className="text-slate-600 mb-8">
            Créez votre propre histoire d'aventure avec Radiata. Des souvenirs inoubliables vous attendent!
          </p>
          <a href="/destinations" className="inline-block bg-gradient-to-r from-[#7ac243] to-[#40e0d0] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow">
            Explorer maintenant
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
