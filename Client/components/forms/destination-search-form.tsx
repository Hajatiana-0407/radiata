"use client"

import { useState } from "react"
import { Search, Gauge, DollarSign, RotateCcw } from "lucide-react"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomSelect } from "@/components/ui/custom-select"
import { Button } from "@/components/ui/button"

interface DestinationSearchFormProps {
  onSearch: (filters: { search: string; difficulty: string; maxPrice: string; minPrice: string }) => void
  onReset: () => void
  compact?: boolean
}

export function DestinationSearchForm({ onSearch, onReset, compact = false }: DestinationSearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [minPrice, setMinPrice] = useState("0")
  const [maxPrice, setMaxPrice] = useState("5000")

  const handleSearch = () => {
    onSearch({ search: searchTerm, difficulty, minPrice, maxPrice })
  }

  const handleReset = () => {
    setSearchTerm("")
    setDifficulty("")
    setMinPrice("0")
    setMaxPrice("5000")
    onReset()
  }

  if (compact) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Search destination */}
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e8f5e0" }}
              >
                <Search className="h-4 w-4" style={{ color: "#7ac243" }} />
              </div>
              Destination
            </label>
            <CustomInput
              placeholder="Où voulez-vous aller?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 focus:border-[#40e0d0] transition-colors"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e0f7f4" }}
              >
                <Gauge className="h-4 w-4" style={{ color: "#40e0d0" }} />
              </div>
              Difficulté
            </label>
            <CustomSelect
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              options={[
                { value: "", label: "Toutes" },
                { value: "easy", label: "🟢 Facile" },
                { value: "moderate", label: "🟡 Moyen" },
                { value: "hard", label: "🔴 Difficile" },
              ]}
              className="border-2 focus:border-[#40e0d0] transition-colors"
            />
          </div>

          {/* Min Price */}
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#f0e8f5" }}
              >
                <DollarSign className="h-4 w-4" style={{ color: "#7ac243" }} />
              </div>
              Prix Min
            </label>
            <CustomInput
              placeholder="0"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border-2 focus:border-[#40e0d0] transition-colors"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#40e0d0" }}>
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e0f7f4" }}
              >
                <DollarSign className="h-4 w-4" style={{ color: "#40e0d0" }} />
              </div>
              Prix Max
            </label>
            <div>
              <CustomInput
                placeholder="5000"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border-2 focus:border-[#40e0d0] transition-colors"
              />
              {maxPrice && (
                <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      backgroundColor: "#7ac243",
                      width: `${Math.min((Number.parseFloat(maxPrice) / 5000) * 100, 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              className="flex-1 text-white font-semibold hover:shadow-lg transition-all"
              style={{ backgroundColor: "#7ac243" }}
            >
              <Search className="h-4 w-4 mr-2" />
              Chercher
            </Button>
            <Button
              onClick={handleReset}
              className="border-2 bg-transparent font-semibold hover:bg-slate-50 transition-all"
              style={{ borderColor: "#40e0d0", color: "#40e0d0" }}
              title="Réinitialiser"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Full version for hero section
  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Trouvez votre prochaine aventure</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e8f5e0" }}>
              <Search className="h-4 w-4" style={{ color: "#7ac243" }} />
            </div>
            Destination
          </label>
          <CustomInput
            placeholder="Où voulez-vous aller?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 focus:border-[#40e0d0] transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e0f7f4" }}>
              <Gauge className="h-4 w-4" style={{ color: "#40e0d0" }} />
            </div>
            Difficulté
          </label>
          <CustomSelect
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: "", label: "Toutes les difficultés" },
              { value: "easy", label: "🟢 Facile" },
              { value: "moderate", label: "🟡 Moyen" },
              { value: "hard", label: "🔴 Difficile" },
            ]}
            className="border-2 focus:border-[#40e0d0] transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#7ac243" }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#f0e8f5" }}>
              <DollarSign className="h-4 w-4" style={{ color: "#7ac243" }} />
            </div>
            Prix Min
          </label>
          <CustomInput
            placeholder="0"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border-2 focus:border-[#40e0d0] transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#40e0d0" }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e0f7f4" }}>
              <DollarSign className="h-4 w-4" style={{ color: "#40e0d0" }} />
            </div>
            Prix Max
          </label>
          <div>
            <CustomInput
              placeholder="5000"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border-2 focus:border-[#40e0d0] transition-colors"
            />
            {maxPrice && (
              <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    backgroundColor: "#7ac243",
                    width: `${Math.min((Number.parseFloat(maxPrice) / 5000) * 100, 100)}%`,
                  }}
                />
              </div>
            )}
            {maxPrice && (
              <p className="text-xs font-semibold mt-1" style={{ color: "#40e0d0" }}>
                Jusqu'à: {Number.parseFloat(maxPrice).toLocaleString("fr-FR")} €
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSearch}
            className="flex-1 text-white font-semibold hover:shadow-lg transition-all"
            style={{ backgroundColor: "#7ac243" }}
          >
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
          <Button
            onClick={handleReset}
            className="border-2 bg-transparent font-semibold hover:bg-slate-50 transition-all"
            style={{ borderColor: "#40e0d0", color: "#40e0d0" }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  )
}
