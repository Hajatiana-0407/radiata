"use client"

import { useState } from "react"
import Link from "next/link"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Services", href: "/services" },
    { label: "À Propos", href: "/about" },
    { label: "Gallerie", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <div className="bg-[#7ac243]">
        <div className="flex items-center justify-end flex-wrap gap-4">
          <div className="flex items-center gap-6 flex-wrap md:bg-[#40e0d0] px-15 py-2 pr-6 sm:pr-10 md:pr-16 lg:pr-24 xl:pr-32 rounded-l-full">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-white hover:text-white hover:scale-105 transition-transform font-medium"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#40e0d0" }}
              >
                <Phone className="h-4 w-4 text-slate-900" />
              </div>
              <span>+33 (0)1 23 45 67 89</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="mailto:info@radiata.com"
              className="flex items-center gap-2 text-white hover:text-white hover:scale-105 transition-transform font-medium"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#40e0d0" }}
              >
                <Mail className="h-4 w-4 text-slate-900" />
              </div>
              <span>info@radiata.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity h-full">
              <img src="./logo-no-bg.png" alt="" className="h-32" />
            </Link>

            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#7ac243] hover:bg-slate-100 rounded-lg transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link href="/reservation">
                  <Button
                    className="font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    style={{ backgroundColor: "#40e0d0", color: "#333" }}
                  >
                    Réserver Maintenant
                  </Button>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-slate-900">{isMenuOpen ? "✕" : "☰"}</span>
                </button>
              </div>
            </div>


          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#7ac243] rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="absolute left-0 right-0 wave-border min-h-1"></div>
      </nav>
    </>
  )
}
