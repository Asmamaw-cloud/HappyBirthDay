"use client"

import { useEffect, useState } from "react"

interface Gift {
  id: number
  left: number
  delay: number
  duration: number
  emoji: string
}

const GIFT_EMOJIS = ["🎁", "🎀", "🎊", "🎉", "💝"]

export default function GiftAnimation() {
  const [gifts, setGifts] = useState<Gift[]>([])

  useEffect(() => {
    const generateGifts = () => {
      const newGifts = Array.from({ length: 15 }, (_, i) => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 5,
        emoji: GIFT_EMOJIS[Math.floor(Math.random() * GIFT_EMOJIS.length)],
      }))
      setGifts(newGifts)
    }

    generateGifts()
    const interval = setInterval(generateGifts, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="fixed pointer-events-none text-4xl"
          style={{
            left: `${gift.left}%`,
            top: "-50px",
            animation: `floatGift ${gift.duration}s linear ${gift.delay}s forwards`,
          }}
        >
          {gift.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatGift {
          0% {
            opacity: 1;
            transform: translateY(0) rotateZ(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) rotateZ(180deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotateZ(360deg);
          }
        }
      `}</style>
    </>
  )
}
