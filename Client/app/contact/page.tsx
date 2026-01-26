'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/forms/contact-form';
import { Calendar, Facebook, Info, Instagram, Mail, MapPin, MessageSquare, Phone, Send, Twitter, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Section Hero avec effet visuel */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
          <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="h-2 w-16 bg-primary rounded-full" />
                <div className="h-2 w-6 bg-[#40e0d0] rounded-full mx-2" />
                <div className="h-2 w-16 bg-primary rounded-full" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-4 bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Contactez-nous
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Une question ? Nous serions ravis d'échanger avec vous. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Section Informations de contact */}
            <div className="space-y-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MessageSquare className="h-7 w-7 text-primary" />
                  Nos coordonnées
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos services, tarifs ou toute autre demande.
                </p>
              </div>

              {/* Cartes de contact */}
              <div className="space-y-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent rounded-xl transition-all duration-300 group-hover:from-primary/10" />
                  <div className="relative flex gap-6 p-6 items-start">
                    <div className="shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                        <Mail className="h-7 w-7" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground mb-1">
                        info@radiataexplorer.com
                      </p>
                      <p className="text-sm text-primary/80">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent rounded-xl transition-all duration-300 group-hover:from-primary/10" />
                  <div className="relative flex gap-6 p-6 items-start">
                    <div className="shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                        <Phone className="h-7 w-7" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                      <p className="text-muted-foreground mb-1">
                        +33 (0)1 23 45 67 89
                      </p>
                      <p className="text-sm text-primary/80">Lun-Ven : 9h-18h</p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent rounded-xl transition-all duration-300 group-hover:from-primary/10" />
                  <div className="relative flex gap-6 p-6 items-start">
                    <div className="shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                        <MapPin className="h-7 w-7" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Bureau</h3>
                      <p className="text-muted-foreground">
                        123 Avenue des Explorateurs<br />
                        75000 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-8 border-t border-border">
                <h3 className="font-semibold mb-4 text-lg">Suivez-nous</h3>
                <div className="flex gap-3 text-gray-700">
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
            </div>

            {/* Formulaire de contact */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-linear-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl blur opacity-30" />
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Send className="h-6 w-6 text-primary" />
                    Envoyez-nous un message
                  </h2>
                  <p className="text-muted-foreground">
                    Remplissez le formulaire ci-dessous et nous vous contacterons rapidement.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
