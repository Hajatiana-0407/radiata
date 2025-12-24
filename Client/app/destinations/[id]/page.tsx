'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchDestinationById } from '@/store/slices/destinationDetailSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Loader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDificultyLabel } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api/client';
import { MapPin, Clock, Users, Leaf, Shield, Heart, Star, Share2, Calendar, CheckCircle, Trees, AlertCircle, BadgeCheck, ChevronRight } from 'lucide-react';
export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { destination, loading, error } = useAppSelector(
    (state) => state.destinationDetail
  );

  const id = params.id as string;
  // **************************** //
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages = [
    `${API_BASE_URL}/uploads/circuits/${destination?.image}`,
    // Ajoutez d'autres images ici
  ];

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-red-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-amber-600';
    return 'text-red-600';
  };


  const getEcoScoreLabel = (score: number) => {
    if (score >= 4) return 'Excellente';
    if (score >= 3) return 'Bonne';
    return 'À améliorer';
  };


  const sustainabilityFeatures = destination?.sustainability_features || [
    'Soutien aux communautés locales',
    'Impact environnemental minimal',
    'Protection de la biodiversité',
    'Hébergements écologiques',
    'Gestion des déchets responsables'
  ];

  const includedServices = destination?.included_services || [

  ];

  const seasons = destination?.recommended_season || ['Printemps', 'Été', 'Automne', 'Hiver'];
  // **************************** //

  useEffect(() => {
    if (id) {
      dispatch(fetchDestinationById(id) as any);
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

  if (error || !destination) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-3 items-start p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-6">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-destructive font-semibold">Une erreur c'est produite</p>
                <p className="text-sm text-destructive/80">{error || 'Destination non trouvée'}</p>
              </div>
            </div>
            <Button onClick={() => router.back()}>Revenir</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
        {/* Section Hero avec galerie */}
        <div className="relative h-[70vh] w-full ">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${galleryImages[activeImage]}')`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-900/40 to-transparent"></div>
          </div>

          {/* Navigation */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              ← Retour aux destinations
            </Button>
          </div>

          {/* Contenu superposé */}
          <div className="relative z-10 h-full flex items-end ">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-3xl ">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge
                    className={`${getDifficultyColor(destination.difficulty)} text-white border-0 px-4 py-2 font-semibold`}
                  >
                    {getDificultyLabel(destination.difficulty)}
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-0 px-4 py-2">
                    <Leaf className="h-4 w-4 mr-2" />
                    Écotourisme
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-0 px-4 py-2">
                    <Star className="h-4 w-4 mr-2" />
                    Score Éco: {destination.ecotourism_score}/5
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {destination.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow border border-[#40e0d0] bg-[#border ">
                    <MapPin className="h-5 w-5 text-[#40e0d0]" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow border border-[#40e0d0] bg-[#border ">
                    <Clock className="h-5 w-5 text-[#40e0d0]" />
                    <span className="text-sm">{destination.duration} jour(s)</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow border border-[#40e0d0] bg-[#border ">
                    <Users className="h-5 w-5 text-[#40e0d0]" />
                    <span className="text-sm">
                      {destination.group_size ?
                        `Groupe de ${destination.group_size.min}-${destination.group_size.max}` :
                        'Petit groupe'
                      }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicateurs galerie */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeImage === index ? 'bg-white scale-125' : 'bg-white/50'}`}
                  aria-label={`Voir image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Contenu principal */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Colonne gauche - Contenu */}
            <div className="lg:col-span-2 space-y-12">
              {/* Section À propos */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Trees className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Expérience Écologique</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {destination.description}
                </p>

                {/* Score écologique */}
                <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-8 border border-emerald-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Score de Durabilité</h3>
                      <p className="text-gray-600">Évaluation de l'impact écologique</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getEcoScoreColor(destination.ecotourism_score as number)}`}>
                        {destination.ecotourism_score}/5
                      </div>
                      <div className={`text-sm font-medium ${getEcoScoreColor(destination.ecotourism_score as number)}`}>
                        {getEcoScoreLabel(destination.ecotourism_score as number)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-emerald-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(destination.ecotourism_score as number / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Points forts */}
                {destination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Points Forts de l'Expérience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                          <span className="text-gray-800">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Section Durabilité */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Engagement Écologique</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sustainabilityFeatures.map((feature, idx) => (
                    <div key={idx} className="text-center p-6 bg-linear-to-b from-white to-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="font-medium text-gray-800">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Information carbone */}
                <div className="mt-8 pt-8 border-t border-emerald-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.conservation_contribution && (
                      <div className="bg-linear-to-r from-amber-50 to-green-50 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Contribution à la Conservation</h4>
                        <p className="text-gray-600 text-sm mb-3">Dédié à la protection locale</p>
                        <div className="text-3xl font-bold text-green-600">
                          ${destination.conservation_contribution}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Saisons recommandées */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Meilleure Période</h2>
                <div className="flex flex-wrap gap-4">
                  {seasons?.map((season, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-amber-50 text-amber-700 border-amber-200 px-6 py-3 text-lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      {season}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 mt-4">
                  Conditions optimales pour l'observation de la faune et flore locale
                </p>
              </section>

              {/* Services inclus */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Services Inclus</h2>
                <div className="space-y-4">
                  {includedServices.map((service, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl hover:bg-emerald-50 transition-colors duration-200 group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800 text-sm font-medium truncate">{service.name}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                          </div>
                          <p className="text-gray-500 text-xs mt-1 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Colonne droite - Carte de réservation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Carte tarifaire */}
                <div className="bg-linear-to-br from-white to-emerald-50 rounded-2xl shadow-xl border border-emerald-200 p-8">
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-1">Prix tout compris à partir de</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-emerald-600">{destination.price}€</span>
                      <span className="text-gray-500">/personne</span>
                    </div>
                    {/* <p className="text-sm text-gray-600 mt-2">
                      {destination.conservation_contribution &&
                        `Dont ${destination.conservation_contribution}€ dédiés à la conservation`
                      }
                    </p> */}
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={() => router.push(`/reservation?destinationId=${destination.id}`)}
                      className="w-full h-14 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      Réserver cette aventure
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-12 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer rounded-xl"
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Demander un devis groupe
                    </Button>
                  </div>

                  {/* Informations pratiques */}
                  <div className="mt-8 pt-8 border-t border-emerald-200 space-y-6">
                    <h3 className="font-semibold text-lg text-gray-900">Informations Pratiques</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Niveau de difficulté</span>
                        <span className="font-medium capitalize">
                          {getDificultyLabel(destination.difficulty)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-medium">
                          {destination.duration} jours
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Taille du groupe</span>
                        <span className="font-medium">
                          {destination.group_size ?
                            `${destination.group_size.min}-${destination.group_size.max}` :
                            '6-12'
                          } personnes
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Départ garanti</span>
                        <span className="font-medium text-green-600">À partir de {destination.group_size ? destination.group_size.min : 6} personnes</span>
                      </div>
                    </div>

                    {/* Garanties */}
                    <div className="mt-6 pt-6 border-t border-emerald-200">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-emerald-500" />
                        <span>Garantie prix le plus bas</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                        <Leaf className="h-4 w-4 text-emerald-500" />
                        <span>Compensation carbone incluse</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                        <Heart className="h-4 w-4 text-emerald-500" />
                        <span>Soutien aux projets locaux</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Témoignage */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Voyageurs satisfaits</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-sm">
                    "Une expérience unique qui respecte parfaitement la nature. Notre guide était incroyablement passionné par la conservation locale."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
