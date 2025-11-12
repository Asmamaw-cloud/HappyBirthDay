"use client"

import { useEffect, useState } from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  duration: number
}

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
      }))
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animation: `float ${sparkle.duration}s ease-in-out infinite`,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px);
          }
        }
      `}</style>
    </>
  )
}
