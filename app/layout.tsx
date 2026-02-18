import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-main",
})

export const metadata: Metadata = {
  title: "Yellow Original | Packs",
  description: "Descubre los nuevos packs Yellow Original",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} bg-[#1b2f4d] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
