"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { X } from "lucide-react"
import HeadingSection from "@/components/sections/heading-section"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-dispatch"
import { fetchGalerieMedias, setCategorie, setPage } from "@/store/slices/galerieSlice"
import { Loader } from "@/components/ui/loader"
import { fetchAllCategories } from "@/store/slices/categorieSlice"
import { API_BASE_URL } from "@/lib/api/client"
import Pagination from "@/components/ui/pagination"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>('')
  const [selectedCategory, setSelectedCategory] = useState<string>("0");
  const { items: images, loading, page, categorie: categorie_Id, filters: { search }, totalPages } = useAppSelector(state => state.galerieMedias);
  const dispatch = useAppDispatch();
  const { items: categoriesItems } = useAppSelector(state => state.categories);


  useEffect(() => {
    dispatch(fetchAllCategories());
    return () => { }
  }, [dispatch])


  useEffect(() => {
    dispatch(fetchGalerieMedias({
      page, search, categorie: categorie_Id
    }));
    return () => { }
  }, [dispatch, page, categorie_Id])


  const categories = [{ id: '0', name: 'Toutes' }, ...categoriesItems];


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
                onClick={() => {
                  setSelectedCategory(cat.id);
                  dispatch(setCategorie(cat.id));
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all cursor-pointer ${selectedCategory === cat.id ? "text-white shadow-lg" : "bg-white text-slate-700 hover:shadow-md"
                  }`}
                style={selectedCategory === cat.id ? { backgroundColor: "#7ac243" } : {}}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ?
            <div className="py-12">
              <Loader />
            </div>
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, idx) => (
                <div
                  key={image.id + '-' + idx}
                  className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={`${API_BASE_URL}/uploads/galerie/images/${image.file}`}
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
          }


          {!loading && images.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune image trouvée selon vos critères</p>
            </div>
          )}
        </div>

        {/* Pagination  */}
        <div className="mt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== '' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage('')}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#40e0d0] transition-colors"
            onClick={() => setSelectedImage('')}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={`${API_BASE_URL}/uploads/galerie/images/${images.find((img) => img.id === selectedImage)?.file}` || "/placeholder.svg"}
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
