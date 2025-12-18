import React, { ReactNode, useEffect, useState } from 'react'

type HeadingSectionPropsType = {
    title: string
    description: string
    children?: ReactNode
}

const HeadingSection = ({ title, description, children }: HeadingSectionPropsType) => {

    const images = [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000) // 5 secondes

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative overflow-hidden py-20 px-4">

            {/* Images en background (fade) */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}

            {/* Voile couleur (gardé comme tu aimes) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7ac243]/50 to-[#40e0d0]/50 z-10"></div>

            {/* Overlay sombre léger */}
            <div className="absolute inset-0 bg-black/30 z-20"></div>

            {/* Contenu */}
            <div className="relative z-30 max-w-4xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                    {title}
                </h1>
                <p className="text-lg opacity-90 animate-fadeIn animation-delay-200">
                    {description}
                </p>
            </div>

            <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 animate-fadeIn animation-delay-400">
                {children}
            </div>

        </section>
    )
}

export default HeadingSection
