"use client"

import { ContactForm } from "@/components/forms/contact-form"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#40e0d0] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7ac243] opacity-5 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 text-center">
          <div
            className="mb-4 inline-block px-4 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#7ac243" }}
          >
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#7ac243" }}>
            Prêt pour l'aventure ?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui et commencez à planifier votre prochaine expédition écologique
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Image with overlay info */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[500px] animate-fade-in">
              <img
                src="/mountain-forest-landscape.png"
                alt="Contact Radiata Explorer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Contact info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Nos Coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#40e0d0" }}>
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-white/90">contact@radiata-explorer.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#7ac243" }}>
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-sm text-white/90">+261 34 12 345 67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#40e0d0" }}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Adresse</p>
                      <p className="text-sm text-white/90">123 Avenue de la Nature, Antananarivo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:w-1/2 w-full bg-white p-8 rounded-2xl shadow-xl animate-slide-in-right">
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#7ac243" }}>
              Envoyez-nous un message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
