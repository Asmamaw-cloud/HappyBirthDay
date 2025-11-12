"use client"

import { useState, useEffect } from "react"
import Sparkles from "@/components/sparkles"
import ConfettiCannon from "@/components/confetti"
import BirthdayMessage from "@/components/birthday-message"
import GiftAnimation from "@/components/gift-animation"
import BirthdayBalloons from "@/components/balloons"

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti on page load
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div
      onClick={handleClick}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end cursor-pointer"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Sparkles />
      </div>

      {/* Balloons */}
      <BirthdayBalloons />

      {/* Floating gifts */}
      <GiftAnimation />

      {/* Confetti */}
      {showConfetti && <ConfettiCannon />}

      {/* Main message */}
      <BirthdayMessage />

      {/* Click instruction */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-center animate-bounce">
        <p className="text-sm font-medium">Click anywhere for more sparkles! ✨</p>
      </div>
    </div>
  )
}
