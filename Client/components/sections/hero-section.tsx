"use client"

import { ArrowRight } from "lucide-react"
import { DestinationSearchForm } from "@/components/forms/destination-search-form"

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage?: string
  backgroundVideo?: string
  cta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showSearchBar?: boolean
}

export function HeroSection({
  title,
  description,
  backgroundImage,
  backgroundVideo,
  cta,
  secondaryCta,
  showSearchBar,
}: HeroSectionProps) {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters)
  }

  const handleReset = () => {
    console.log("Reset filters")
  }

  return (
    <section className="relative min-h-[80vh] md:h-auto w-full overflow-hidden">
      {backgroundVideo ? (
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ) : null}

      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative flex h-full flex-col items-center justify-between gap-8 text-center text-white px-4 py-12 md:py-20 min-h-screen md:min-h-[600px]">
        <div className="max-w-3xl mt-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition-all hover:shadow-2xl hover:scale-105 text-lg"
            style={{ backgroundColor: "#7ac243", color: "white" }}
          >
            Tous les Circuits
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition-all hover:shadow-2xl hover:scale-105 text-lg border-2"
            style={{ backgroundColor: "#40e0d0", color: "#333", borderColor: "#40e0d0" }}
          >
            Nous Contacter
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {showSearchBar && (
          <div className="w-full max-w-6xl mb-8">
            <DestinationSearchForm onSearch={handleSearch} onReset={handleReset} compact={true} />
          </div>
        )}
      </div>
    </section>
  )
}
