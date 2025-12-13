"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-selector"
import { fetchDestinations, setFilters, setPage } from "@/store/slices/destinationsSlice"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DestinationCard } from "@/components/cards/destination-card"
import { DestinationSearchForm } from "@/components/forms/destination-search-form"
import { SkeletonCard } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DestinationsPage() {
  const dispatch = useAppDispatch()
  const { items, loading, error, page, totalPages, filters } = useAppSelector((state) => state.destinations)

  useEffect(() => {
    dispatch(
      fetchDestinations({
        page,
        search: filters.search,
        difficulty: filters.difficulty,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }) as any,
    )
  }, [dispatch, page, filters])

  const handleSearch = (filterData: { search: string; difficulty: string; minPrice: string; maxPrice: string }) => {
    dispatch(
      setFilters({
        search: filterData.search,
        difficulty: filterData.difficulty,
        minPrice: filterData.minPrice ? Number.parseFloat(filterData.minPrice) : null,
        maxPrice: filterData.maxPrice ? Number.parseFloat(filterData.maxPrice) : null,
      }) as any,
    )
    dispatch(setPage(1) as any)
  }

  const handleReset = () => {
    dispatch(setFilters({ search: "", difficulty: null, minPrice: null, maxPrice: null }) as any)
    dispatch(setPage(1) as any)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3" style={{ color: "#7ac243" }}>
              Nos Destinations
            </h1>
            <p className="text-lg text-slate-600">
              Découvrez nos circuits inoubliables et préparez votre prochaine aventure
            </p>
          </div>

          <DestinationSearchForm onSearch={handleSearch} onReset={handleReset} compact={true} />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-12">{error}</p>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune destination trouvée selon vos critères</p>
              <Button onClick={handleReset}>Effacer les filtres</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-8">
                {items.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => dispatch(setPage(page - 1) as any)}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    Page {page} de {totalPages}
                  </span>
                  <Button
                    onClick={() => dispatch(setPage(page + 1) as any)}
                    disabled={page === totalPages}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
