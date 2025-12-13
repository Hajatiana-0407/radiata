import { Leaf, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/leaf-pattern-nature-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
        {/* Top section with green accent */}
        <div className="h-2 bg-gradient-to-r from-[#7ac243] to-[#40e0d0]"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-full" style={{ backgroundColor: "#7ac243" }}>
                  <Leaf className="h-6 w-6" />
                </div>
                <span className="font-bold text-2xl">Radiata Explorer</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Explorez la nature de manière responsable. Découvrez des destinations exceptionnelles tout en préservant
                notre planète.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 rounded-full hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#40e0d0" }}
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#7ac243" }}
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#40e0d0" }}
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#7ac243" }}
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded" style={{ backgroundColor: "#7ac243" }}></div>
                Liens Rapides
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="/destinations" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-slate-300 hover:text-[#40e0d0] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded" style={{ backgroundColor: "#40e0d0" }}></div>
                Nos Services
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/services#ecotourism" className="text-slate-300 hover:text-[#7ac243] transition-colors">
                    Écotourisme
                  </a>
                </li>
                <li>
                  <a href="/services#hiking" className="text-slate-300 hover:text-[#7ac243] transition-colors">
                    Randonnées guidées
                  </a>
                </li>
                <li>
                  <a href="/services#wildlife" className="text-slate-300 hover:text-[#7ac243] transition-colors">
                    Observation faune
                  </a>
                </li>
                <li>
                  <a href="/services#photography" className="text-slate-300 hover:text-[#7ac243] transition-colors">
                    Safari photo
                  </a>
                </li>
                <li>
                  <a href="/services#custom" className="text-slate-300 hover:text-[#7ac243] transition-colors">
                    Circuits personnalisés
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded" style={{ backgroundColor: "#7ac243" }}></div>
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5" style={{ color: "#40e0d0" }} />
                  <span className="text-slate-300">
                    123 Avenue de la Nature
                    <br />
                    Antananarivo, Madagascar
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5" style={{ color: "#7ac243" }} />
                  <span className="text-slate-300">+261 34 12 345 67</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5" style={{ color: "#40e0d0" }} />
                  <span className="text-slate-300">contact@radiata-explorer.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-slate-600">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
              <p>© 2025 Radiata Explorer. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-[#40e0d0] transition-colors">
                  Politique de confidentialité
                </a>
                <a href="/terms" className="hover:text-[#40e0d0] transition-colors">
                  Conditions d'utilisation
                </a>
                <a href="/cookies" className="hover:text-[#40e0d0] transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
