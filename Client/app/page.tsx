"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { fetchHomeContent, fetchPopularDestinations } from "@/store/slices/homeSlice"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeatureSection } from "@/components/sections/feature-section"
import { ContactSection } from "@/components/sections/contact-section"
import { DestinationCard } from "@/components/cards/destination-card"
import { Loader } from "@/components/ui/loader"
import { Leaf, Users, Heart, Globe } from "lucide-react"

export default function Home() {
  const dispatch = useAppDispatch()
  const { content, popularDestinations, loading, error } = useAppSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchHomeContent() as any)
    dispatch(fetchPopularDestinations() as any)
  }, [dispatch])

  const features = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Écologique",
      description: "Voyages durables qui respectent la nature et les communautés locales",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Guides Experts",
      description: "Des guides expérimentés passionnés par la conservation",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Soutien Local",
      description: "Soutien direct aux communautés locales et à la faune",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Portée Mondiale",
      description: "Explorez les plus belles destinations naturelles du monde",
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title={content?.heroTitle || "Explorez la nature avec un objectif"}
          description={
            content?.heroDescription ||
            "Découvrez des destinations à couper le souffle tout en soutenant les efforts de conservation"
          }
          backgroundVideo="/hero_video.mp4"
          backgroundImage="/beautiful-nature-landscape.jpg"
          cta={{ text: "Commencer l'exploration", href: "/destinations" }}
          showSearchBar={true}
        />

        <FeatureSection
          title="Pourquoi choisir Radiata"
          description="Vivez un voyage qui fait la différence"
          features={features}
        />

        <section className="py-20 px-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url('/nature-pattern-with-leaves-and-trees.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="mb-16 text-center animate-fade-in">
              <div
                className="mb-4 inline-block px-4 py-2 rounded-full text-white font-semibold"
                style={{ backgroundColor: "#40e0d0" }}
              >
                Nos destinations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ color: "#7ac243" }}>
                Destinations Populaires
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Des aventures soigneusement sélectionnées pour chaque explorateur. Découvrez des expériences
                inoubliables dans les lieux les plus spectaculaires de la nature.
              </p>
            </div>

            {loading ? (
              <div className="py-12">
                <Loader />
              </div>
            ) : error ? (
              <p className="text-center text-red-500 text-lg">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: "#40e0d0" }}></div>
          <div className="mx-auto max-w-3xl text-center relative z-10 animate-fade-in">
            <div
              className="mb-6 inline-block px-4 py-2 rounded-full"
              style={{ backgroundColor: "#40e0d0", color: "white" }}
            >
              <span className="text-sm font-semibold">Notre mission</span>
            </div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#7ac243" }}>
              Rendre les voyages significatifs
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Chez Radiata Explorer, nous croyons que le voyage doit inspirer, éduquer et avoir un impact positif. Nous
              nous associons à des communautés locales et à des organisations de conservation pour créer des expériences
              significatives tout en protégeant le monde naturel pour les générations futures.
            </p>
          </div>
        </section>

        <section className="py-16 px-4" style={{ backgroundColor: "#40e0d0", color: "white" }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-white/90">Destinations explorées</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-white/90">Voyageurs heureux</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-white/90">Certifiés écologiques</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
