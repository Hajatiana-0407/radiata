"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-selector"
import { fetchDestinations, setFilters, setPage } from "@/store/slices/destinationsSlice"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DestinationCard } from "@/components/cards/destination-card"
import { DestinationSearchForm } from "@/components/forms/destination-search-form"
import { SkeletonCard } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Mountain, Tag } from "lucide-react"
import HeadingSection from "@/components/sections/heading-section"
import Pagination from "@/components/ui/pagination";
import { CategoryType, Destination } from "@/lib/types"


type DestinationsByCategory = Record<
  number,
  {
    category: CategoryType
    destinations: Destination[]
  }
>

export default function DestinationsPage() {
  const dispatch = useAppDispatch()
  const { items, loading, error, page, totalPages, filters } = useAppSelector((state) => state.destinations);

  useEffect(() => {
    dispatch(
      fetchDestinations({
        page,
        search: filters.search,
        tag: filters.tag,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }) as any,
    )
  }, [dispatch, page, filters])

  const handleSearch = (filterData: { search: string; tag: string; minPrice: string; maxPrice: string }) => {
    dispatch(
      setFilters({
        search: filterData.search,
        tag: filterData.tag,
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


  const destinationsByCategory = items?.reduce<DestinationsByCategory>(
    (acc, destination) => {
      destination?.categories?.forEach((category) => {
        if (!acc[parseInt(category.id)]) {
          acc[parseInt(category.id)] = {
            category,
            destinations: []
          }
        }

        acc[parseInt(category.id)].destinations.push(destination)
      })
      return acc
    },
    {}
  )


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">

        <HeadingSection title="Nos Destinations" description="Découvrez nos circuits inoubliables et préparez votre prochaine aventure">
          <DestinationSearchForm onSearch={handleSearch} onReset={handleReset} compact={true} />
        </HeadingSection>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {loading && items?.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-12">{error}</p>
          ) : items?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune destination trouvée selon vos critères</p>
              <Button onClick={handleReset}>Effacer les filtres</Button>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-12">
                {Object.values(destinationsByCategory || {}).map(({ category, destinations }) => (
                  <section key={category.id}>
                    <div className="flex flex-col gap-4 mb-8 group">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Mountain  />
                          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 relative">
                            {category.name}
                          </h2>
                        </div>
                      </div>
                      <span className="h-0.5 w-1/4 bg-linear-to-r from-[#7ac243] to-[#40e0d0] rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {destinations.map((destination) => (
                        <DestinationCard
                          key={`${category.id}-${destination.id}`}
                          destination={destination}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>


              {/* Pagination  */}
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
