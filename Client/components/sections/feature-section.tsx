import clsx from "clsx"
import type React from "react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface FeatureSectionProps {
  title: string
  subtitle?: string
  description?: string
  features: Feature[]
}

export function FeatureSection({ title, subtitle, description, features }: FeatureSectionProps) {
  return (
    <section className="py-28 px-4 bg-linear-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Arrière-plan avec image subtile */}
      <div className="absolute inset-0 opacity-[0.03]">
        {/* Image de fond stylisée (patterns géométriques) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #7ac243 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 75%, #40e0d0 0.5px, transparent 0.5px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />
      </div>

      {/* Élément décoratif en bordure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#40e0d0]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#7ac243]/30 to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          {subtitle && (
            <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-linear-to-r from-white/90 to-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm mb-8 group">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7ac243] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7ac243]" />
                </span>
                <span className="text-sm font-semibold tracking-wider uppercase text-slate-700 group-hover:text-[#7ac243] transition-colors duration-300">
                  {subtitle}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40e0d0] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40e0d0]" />
                </span>
              </div>
            </div>
          )}
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight relative">
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-800 to-slate-700">
                {title}
              </span>
              {/* Effet de soulignement élégant */}
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-[#40e0d0]/0 via-[#7ac243] to-[#40e0d0]/0" />
            </span>
          </h2>
          
          {description && (
            <div className="relative">
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                {description}
              </p>
              {/* Points décoratifs de texte */}
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#40e0d0]/20 hidden md:block" />
              <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#7ac243]/20 hidden md:block" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={clsx(
                "group relative overflow-hidden",
                "transition-all duration-700 ease-out"
              )}
            >
              {/* Numéro d'ordre bien visible */}
              <div className="absolute -top-2 -right-2 z-20">
                <div className={clsx(
                  "relative w-10 h-10 rounded-full flex items-center justify-center",
                  "border-2 shadow-lg",
                  idx % 2 === 0 
                    ? "border-white bg-linear-to-br from-[#40e0d0] to-[#20b2aa]" 
                    : "border-white bg-linear-to-br from-[#7ac243] to-[#5a9e30]"
                )}>
                  <span className="text-white font-bold text-lg relative z-10">
                    {idx + 1}
                  </span>
                  {/* Effet de brillance sur le numéro */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/30 to-transparent opacity-50" />
                </div>
              </div>

              {/* Élément décoratif externe */}
              <div className={clsx(
                "absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-100",
                "transition-opacity duration-500",
                idx % 2 === 0 
                  ? "bg-linear-to-r from-[#40e0d0]/20 to-[#20b2aa]/10" 
                  : "bg-linear-to-r from-[#7ac243]/20 to-[#5a9e30]/10"
              )} />
              
              <div className={clsx(
                "relative rounded-2xl bg-white/95 backdrop-blur-sm",
                "border border-slate-200/60 transition-all duration-500",
                "group-hover:scale-[1.02] group-hover:border-slate-300/80",
                "group-hover:shadow-xl group-hover:shadow-slate-200/30",
                "group-hover:bg-linear-to-br group-hover:from-white group-hover:to-slate-50/50"
              )}>
                {/* Image de fond subtile sur la carte */}
                <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 48%, ${idx % 2 === 0 ? '#40e0d0' : '#7ac243'} 50%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, ${idx % 2 === 0 ? '#40e0d0' : '#7ac243'} 50%, transparent 52%)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>

                {/* Effet de bordure supérieure */}
                <div className={clsx(
                  "absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-current to-transparent",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                  idx % 2 === 0 ? "text-[#40e0d0]" : "text-[#7ac243]"
                )} />
                
                {/* Effet de lumière interne */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/0 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8">
                  {/* Conteneur d'icône amélioré */}
                  <div className={clsx(
                    "inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-8 relative",
                    "transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    "before:absolute before:inset-0 before:rounded-2xl",
                    idx % 2 === 0 
                      ? "before:bg-linear-to-br before:from-[#40e0d0]/10 before:to-[#20b2aa]/5" 
                      : "before:bg-linear-to-br before:from-[#7ac243]/10 before:to-[#5a9e30]/5",
                    "after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-br after:from-white/30 after:to-transparent",
                    "after:opacity-0 after:group-hover:opacity-100 after:transition-opacity after:duration-500"
                  )}>
                    {/* Bordure animée autour de l'icône */}
                    <div className={clsx(
                      "absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100",
                      "transition-all duration-700 blur-sm",
                      idx % 2 === 0 
                        ? "bg-linear-to-r from-[#40e0d0]/30 to-transparent" 
                        : "bg-linear-to-r from-[#7ac243]/30 to-transparent"
                    )} />
                    
                    <div className={clsx(
                      "relative z-10 text-3xl transition-transform duration-500 group-hover:scale-110",
                      idx % 2 === 0 ? "text-[#40e0d0]" : "text-[#7ac243]"
                    )}>
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-900 relative">
                    <span className="relative inline-block">
                      {feature.title}
                      {/* Effet de surlignement au hover */}
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 rounded-full",
                        "transition-all duration-500 ease-out group-hover:w-full",
                        idx % 2 === 0 ? "bg-[#40e0d0]/30" : "bg-[#7ac243]/30"
                      )} />
                    </span>
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px] font-light mb-6 
                    group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Indicateur de hover amélioré */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100/80 group-hover:border-slate-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-8 h-1 rounded-full transition-all duration-500",
                        "group-hover:w-12 group-hover:shadow-sm",
                        idx % 2 === 0 
                          ? "bg-linear-to-r from-[#40e0d0] to-[#20b2aa]" 
                          : "bg-linear-to-r from-[#7ac243] to-[#5a9e30]"
                      )} />
                      <span className={clsx(
                        "text-sm font-medium transition-all duration-300",
                        "opacity-0 -translate-x-2",
                        "group-hover:opacity-100 group-hover:translate-x-0",
                        idx % 2 === 0 ? "text-[#40e0d0]" : "text-[#7ac243]"
                      )}>
                        Explorer
                      </span>
                    </div>
                    
                    {/* Flèche d'action */}
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      "border border-slate-200 bg-white/50",
                      "transform -rotate-45 group-hover:rotate-0",
                      "transition-all duration-500 group-hover:border-transparent",
                      idx % 2 === 0 
                        ? "group-hover:bg-linear-to-br group-hover:from-[#40e0d0] group-hover:to-[#20b2aa]" 
                        : "group-hover:bg-linear-to-br group-hover:from-[#7ac243] group-hover:to-[#5a9e30]"
                    )}>
                      <svg 
                        className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Effet de coin décoratif */}
                <div className={clsx(
                  "absolute top-0 right-0 w-12 h-12 overflow-hidden",
                  "before:absolute before:top-0 before:right-0 before:w-12 before:h-12",
                  idx % 2 === 0 
                    ? "before:bg-linear-to-bl before:from-[#40e0d0]/10 before:to-transparent" 
                    : "before:bg-linear-to-bl before:from-[#7ac243]/10 before:to-transparent"
                )} />
              </div>
            </div>
          ))}
        </div>

        {/* Séparateur décoratif amélioré */}
        <div className="mt-24 pt-12 border-t border-slate-200/50 relative">

          <div className="text-center">
            <p className="text-slate-500 text-sm font-light tracking-wider uppercase">
              Des expériences 
              <span className="mx-2 text-[#40e0d0]">•</span>
              <span className="text-slate-700 font-medium">mémorables</span>
              <span className="mx-2 text-[#7ac243]">•</span>
              pour chaque voyageur
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}