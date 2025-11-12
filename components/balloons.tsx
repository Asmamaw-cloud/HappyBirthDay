"use client"

import { useEffect, useState } from "react"

interface Balloon {
  id: number
  left: number
  color: string
  size: number
  duration: number
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#FF8C94"]

export default function BirthdayBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const newBalloons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: (i / 12) * 100,
      color: COLORS[i % COLORS.length],
      size: Math.random() * 20 + 30,
      duration: Math.random() * 5 + 8,
    }))
    setBalloons(newBalloons)
  }, [])

  return (
    <>
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="fixed pointer-events-none"
          style={{
            left: `${balloon.left}%`,
            bottom: "-100px",
            animation: `balloonFloat ${balloon.duration}s ease-in infinite`,
            animationDelay: `${balloon.id * 0.3}s`,
          }}
        >
          {/* Balloon */}
          <div
            className="rounded-full shadow-lg"
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size}px`,
              backgroundColor: balloon.color,
              marginLeft: `${balloon.size / -2}px`,
              boxShadow: `inset -3px -3px 6px rgba(0, 0, 0, 0.1)`,
            }}
          />
          {/* String */}
          <div
            className="w-px bg-white/40"
            style={{
              height: "60px",
              marginLeft: `${balloon.size / 2 - 1}px`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes balloonFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? 100 : -100}px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
