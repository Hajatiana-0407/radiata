import Link from "next/link"
import type { Destination } from "@/lib/types"
import { MapPin, Clock, Star } from "lucide-react"

interface DestinationCardProps {
  destination: Destination
  link?: boolean
}

export function DestinationCard({ destination, link = true }: DestinationCardProps) {
  const content = (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white hover:shadow-2xl hover:border-[#7ac243] transition-all duration-300 group">
      <div
        className="relative h-56 w-full bg-muted overflow-hidden"
        style={{
          backgroundImage: `url('${destination.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>

        <div className="absolute top-4 right-4">
          <div
            className="px-4 py-1 rounded-full text-sm font-bold text-white shadow-lg"
            style={{ backgroundColor: "#7ac243" }}
          >
            {destination.difficulty}
          </div>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm">
          <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
          <span className="text-sm font-bold text-white">4.8/5</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-xl group-hover:translate-x-1 transition-transform" style={{ color: "#7ac243" }}>
          {destination.name}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{destination.description}</p>

        <div className="flex items-center gap-3 text-sm text-slate-600 border-t border-slate-200 pt-4 flex-wrap">
          <div className="flex items-center gap-2 bg-[#40e0d0]/10 px-3 py-2 rounded-lg">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#40e0d0" }}
            >
              <MapPin className="h-3 w-3 text-slate-900" />
            </div>
            <span className="font-semibold text-slate-800">{destination.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#7ac243]/10 px-3 py-2 rounded-lg">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#7ac243" }}
            >
              <Clock className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-slate-800">{destination.duration}h</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-500 font-bold">À PARTIR DE</p>
            <p className="text-2xl font-bold" style={{ color: "#7ac243" }}>
              {destination.price}€
            </p>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: "#40e0d0", color: "#333", border: "2px solid #40e0d0" }}
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  )

  if (link) {
    return <Link href={`/destinations/${destination.id}`}>{content}</Link>
  }

  return content
}
