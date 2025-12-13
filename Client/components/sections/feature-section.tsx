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
              className="rounded-xl border border-slate-200 bg-white p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4 text-4xl text-[#7ac243]">{feature.icon}</div>
              <h3 className="font-bold mb-2 text-lg text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
