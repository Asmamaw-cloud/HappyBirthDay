"use client"

import { useState, useEffect, useRef } from "react"
import Sparkles from "@/components/sparkles"
import ConfettiCannon from "@/components/confetti"
import BirthdayMessage from "@/components/birthday-message"
import GiftAnimation from "@/components/gift-animation"
import BirthdayBalloons from "@/components/balloons"

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasStartedAudioRef = useRef(false)

  // Function to play a musical note
  const playNote = (frequency: number, duration: number, startTime: number, audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = "sine"
    
    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.7, startTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
    
    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  }

  // Happy Birthday melody notes (in Hz)
  // Traditional melody: C C D C F E | C C D C G F | C C C(high) A F E D | B B A F G F
  const playHappyBirthday = (audioContext: AudioContext) => {
    const notes = [
      // Happy (C C D C)
      { freq: 261.63, duration: 0.25 }, // C4
      { freq: 261.63, duration: 0.25 }, // C4
      { freq: 293.66, duration: 0.5 },  // D4
      { freq: 261.63, duration: 0.5 },   // C4
      // Birthday (F E)
      { freq: 349.23, duration: 0.5 },  // F4
      { freq: 329.63, duration: 1.0 },   // E4 (held)
      // To (C C D C)
      { freq: 261.63, duration: 0.25 }, // C4
      { freq: 261.63, duration: 0.25 }, // C4
      { freq: 293.66, duration: 0.5 },  // D4
      { freq: 261.63, duration: 0.5 },   // C4
      // You (G F)
      { freq: 392.00, duration: 0.5 },  // G4
      { freq: 349.23, duration: 1.0 },  // F4 (held)
      // Happy (C C)
      { freq: 261.63, duration: 0.25 }, // C4
      { freq: 261.63, duration: 0.25 }, // C4
      // Birthday (C(high) A)
      { freq: 523.25, duration: 0.5 },  // C5 (high)
      { freq: 440.00, duration: 0.5 },  // A4
      // Dear (F E D)
      { freq: 349.23, duration: 0.5 },  // F4
      { freq: 329.63, duration: 0.5 },  // E4
      { freq: 293.66, duration: 1.0 },  // D4 (held)
      // Happy (B B)
      { freq: 493.88, duration: 0.25 }, // B4
      { freq: 493.88, duration: 0.25 }, // B4
      // Birthday (A F)
      { freq: 440.00, duration: 0.5 },  // A4
      { freq: 349.23, duration: 0.5 },  // F4
      // To (G F)
      { freq: 392.00, duration: 0.5 },  // G4
      { freq: 349.23, duration: 1.5 },  // F4 (final note, held longer)
    ]

    const startTime = audioContext.currentTime
    let currentTime = startTime
    notes.forEach((note) => {
      playNote(note.freq, note.duration, currentTime, audioContext)
      currentTime += note.duration + 0.02 // Small gap between notes
    })

    // Return total duration in seconds
    return currentTime - startTime
  }

  // Function to start playing the song
  const startPlaying = (audioContext: AudioContext) => {
    if (hasStartedAudioRef.current) return
    
    hasStartedAudioRef.current = true

    // Play the song initially
    const songDuration = playHappyBirthday(audioContext)

    // Set up looping - play again after the song finishes
    loopIntervalRef.current = setInterval(() => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        playHappyBirthday(audioContextRef.current)
      }
    }, songDuration * 1000 + 500) // Convert to milliseconds and add small buffer
  }

  useEffect(() => {
    // Trigger confetti on page load
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)

    // Initialize and start audio immediately on page load
    const initAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext

        // Try to resume if suspended (some browsers allow this)
        if (audioContext.state === "suspended") {
          try {
            await audioContext.resume()
          } catch (e) {
            // If resume fails, try again after a short delay
            setTimeout(async () => {
              try {
                await audioContext.resume()
                startPlaying(audioContext)
              } catch (err) {
                console.log("Audio autoplay blocked by browser")
              }
            }, 100)
            return
          }
        }

        // Start playing immediately
        startPlaying(audioContext)
      } catch (error) {
        console.error("Error initializing audio:", error)
      }
    }

    // Start audio immediately
    initAudio()

    return () => {
      clearTimeout(timer)
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
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
    </div>
  )
}
