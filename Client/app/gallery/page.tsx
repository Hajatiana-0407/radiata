"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { X } from "lucide-react"
import HeadingSection from "@/components/sections/heading-section"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "mountains", label: "Montagnes" },
    { id: "forests", label: "Forêts" },
    { id: "rivers", label: "Rivières" },
    { id: "wildlife", label: "Faune" },
  ]

  const images = [
    { id: 1, category: "mountains", title: "Sommet du Mont Blanc", url: "/mountain-peak-with-snow.jpg" },
    { id: 2, category: "forests", title: "Forêt de pins", url: "/pine-forest-with-sunlight.jpg" },
    { id: 3, category: "rivers", title: "Cascade naturelle", url: "/forest-waterfall.png" },
    { id: 4, category: "wildlife", title: "Chamois dans les Alpes", url: "/chamois-in-mountains.jpg" },
    { id: 5, category: "mountains", title: "Lever de soleil alpin", url: "/alpine-sunrise-mountains.jpg" },
    { id: 6, category: "forests", title: "Sentier forestier", url: "/forest-hiking-trail.png" },
    { id: 7, category: "rivers", title: "Lac de montagne", url: "/mountain-lake-reflection.png" },
    { id: 8, category: "wildlife", title: "Aigle royal", url: "/golden-eagle-flying.jpg" },
    { id: 9, category: "mountains", title: "Panorama des Alpes", url: "/alps-panorama-view.jpg" },
    { id: 10, category: "forests", title: "Automne en forêt", url: "/autumn-forest-colors.png" },
    { id: 11, category: "rivers", title: "Rivière cristalline", url: "/crystal-clear-river.jpg" },
    { id: 12, category: "wildlife", title: "Marmotte alpine", url: "/alpine-marmot.jpg" },
  ]

  const filteredImages = selectedCategory === "all" ? images : images.filter((img) => img.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeadingSection
        description="Découvrez la beauté naturelle de nos destinations à travers notre collection de photos"
        title="Galerie Photos"
      />

      {/* Category Filter */}
      <section className="py-8 px-4 bg-slate-50 border-b-2" style={{ borderColor: "#40e0d0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === cat.id ? "text-white shadow-lg" : "bg-white text-slate-700 hover:shadow-md"
                  }`}
                style={selectedCategory === cat.id ? { backgroundColor: "#7ac243" } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#40e0d0] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images.find((img) => img.id === selectedImage)?.url || "/placeholder.svg"}
            alt={images.find((img) => img.id === selectedImage)?.title}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  )
}
