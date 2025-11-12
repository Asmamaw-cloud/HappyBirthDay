"use client"

import { useEffect, useState } from "react"

interface Confetti {
  id: number
  left: number
  delay: number
  duration: number
  rotation: number
}

export default function ConfettiCannon() {
  const [confetti, setConfetti] = useState<Confetti[]>([])

  useEffect(() => {
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2.5,
      rotation: Math.random() * 360,
    }))
    setConfetti(pieces)
  }, [])

  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animation: `confettiFall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA"][
                Math.floor(Math.random() * 6)
              ],
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
