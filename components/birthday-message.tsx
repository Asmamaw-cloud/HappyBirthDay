"use client"

import { useEffect, useState } from "react"

export default function BirthdayMessage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      {/* Main heading */}
      <div
        className={`text-center transition-all duration-1000 transform ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-pulse drop-shadow-2xl">🎂</h1>

        {/* Birthday text */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-wider">Happy Birthday</h2>
          <h3 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl animate-bounce">
            Merry!
          </h3>
        </div>

        {/* Decorative text */}
        <div className="mt-12 flex justify-center gap-4 text-4xl md:text-5xl animate-spin-slow">
          <span>✨</span>
          <span>🎉</span>
          <span>🎊</span>
          <span>✨</span>
        </div>

        {/* Tagline */}
        <p className="mt-12 text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-lg">
          Here&apos;s to another year of laughter, joy, and unforgettable moments! 🌟
        </p>

        {/* Hearts floating up */}
        <div className="mt-16 flex justify-center gap-8">
          <span className="text-3xl animate-bounce" style={{ animationDelay: "0s" }}>
            ❤️
          </span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>
            💛
          </span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: "0.4s" }}>
            💜
          </span>
        </div>
      </div>
    </div>
  )
}
