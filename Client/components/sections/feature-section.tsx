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
    <section className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          {subtitle && (
            <div className="flex items-center justify-center gap-2 text-sm font-semibold mb-3">
              <span className="text-[#7ac243]">//</span>
              <span style={{ color: "#7ac243" }}>{subtitle}</span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1a1a2e" }}>
            {title}
          </h2>
          {description && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-200
    ${idx % 2 === 0 ? "lg:-translate-y-6" : "lg:translate-y-6"}
  `}
            >
              {/* Bordure intérieure en bas */}
              <div className={clsx("pointer-events-none absolute inset-0.5 rounded-3xl border-b-10",
                { "border-[#40e0d0]": idx % 2 === 0 },
                { "border-[#7ac243]": idx % 2 !== 0 },
              )}></div>

              <div className="relative z-10">
                <div className={clsx("flex justify-center mb-4 text-4xl",
                  { "text-[#40e0d0]": idx % 2 === 0 },
                  { "text-[#7ac243]": idx % 2 !== 0 },
                )}>
                  {feature.icon}
                </div>

                <h3 className="font-bold mb-2 text-lg text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
