import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🎉 Happy Birthday Merry! 🎂",
  description: "Join the celebration for Merry's special day with sparkles, balloons, and lots of joy!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "faivon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
