"use client"

import Image from "next/image"
import { AnimatePresence, motion, type PanInfo } from "framer-motion"
import { useEffect, useState } from "react"

const packs = [
  {
    name: "Icon Pack | Total Look",
    image: "/pack1.webp",
    link: "https://www.yelloworiginal.com/pack/icon-pack",
    comparePrice: 99.94,
    packPrice: 89.94,
  },
  {
    name: "Basic T-Shirt",
    image: "/pack3.webp",
    link: "https://www.yelloworiginal.com/pack/basic-t-shirt",
    comparePrice: 39.98,
    packPrice: 29.98,
  },
  {
    name: "Original Pack | Total Look",
    image: "/pack2.webp",
    link: "https://www.yelloworiginal.com/pack/original-pack",
    comparePrice: 109.9,
    packPrice: 99.9,
  },
  {
    name: "Casual Look",
    image: "/pack4.webp",
    link: "https://www.yelloworiginal.com/pack/casual-look",
    comparePrice: 95.92,
    packPrice: 85.92,
  },
  {
    name: "San Valentine Total Look",
    image: "/pack6.webp",
    link: "https://www.yelloworiginal.com/pack/san-valentine-total-look",
    comparePrice: 105.9,
    packPrice: 95.9,
  },
  {
    name: "Camisas Sarga",
    image: "/pack5.webp",
    link: "https://www.yelloworiginal.com/pack/camisas-sarga",
    comparePrice: 99.9,
    packPrice: 89.9,
  },
  {
    name: "Urban Smart Pack",
    image: "/pack7.webp",
    link: "https://www.yelloworiginal.com/pack/urban-smart-pack",
    comparePrice: 105.9,
    packPrice: 95.9,
  }
]

const INTRO_STEP_MS = 3000
const SWIPE_OFFSET = 70
const SWIPE_VELOCITY = 500
const TRUST_BADGES = ["Envio rapido", "Cambios faciles", "Pago 100% seguro"]
const OFFICIAL_PACKS_LINK = "https://www.yelloworiginal.com/colecciones/packs"
const euroFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})

export default function Home() {
  const [introIndex, setIntroIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activePack = packs[introIndex]
  const progress = ((introIndex + 1) / packs.length) * 100
  const mobileCtaHref = activePack.link
  const mobileCtaLabel = "Comprar este pack y ahorrar 10€"
  const activePackSavings = Number((activePack.comparePrice - activePack.packPrice).toFixed(2))
  const hasPreviousPack = introIndex > 0
  const hasNextPack = introIndex < packs.length - 1

  const goToOfficialPacks = () => {
    window.location.href = OFFICIAL_PACKS_LINK
  }

  const goToPrevPack = () => {
    setIntroIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goToNextPack = () => {
    if (introIndex >= packs.length - 1) {
      goToOfficialPacks()
      return
    }

    setIntroIndex((prev) => prev + 1)
  }

  const handleTeaserSwipe = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeLeft = info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY
    const swipeRight = info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY

    if (swipeLeft) {
      goToNextPack()
      return
    }

    if (swipeRight) {
      goToPrevPack()
    }
  }

  useEffect(() => {
    if (isPaused) return

    if (introIndex >= packs.length - 1) {
      const revealTimer = window.setTimeout(() => {
        goToOfficialPacks()
      }, INTRO_STEP_MS)
      return () => window.clearTimeout(revealTimer)
    }

    const nextTimer = window.setTimeout(() => {
      setIntroIndex((prev) => prev + 1)
    }, INTRO_STEP_MS)

    return () => window.clearTimeout(nextTimer)
  }, [introIndex, isPaused])

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 text-white md:pb-0">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#c29c03]/45 blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, 40, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-28 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#5f7fb0]/70 blur-3xl"
          animate={{ x: [0, -25, 20, 0], y: [0, -30, 10, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#3e5d86] blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        key="intro-sequence"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 md:py-8"
      >
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col">
          <div className="flex items-start justify-start">
            <div>
              <Image
                src="/logo.png"
                alt="Yellow Original"
                width={420}
                height={140}
                priority
                className="h-auto w-[210px] md:w-[330px]"
              />
              <p className="mt-3 max-w-md text-sm font-medium text-white/85 md:text-base">
                Estrena outfit hoy y aprovecha packs exclusivos con <strong className="text-white">10€ de ahorro</strong>.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`teaser-${activePack.name}`}
              initial={{ opacity: 0, y: 36, rotate: -1.4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, y: -32, rotate: 1.2, scale: 0.98 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleTeaserSwipe}
              whileDrag={{ scale: 0.99 }}
              style={{ touchAction: "pan-y" }}
              className="relative mx-auto mt-6 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/25 bg-black/35 shadow-[0_20px_90px_rgba(0,0,0,0.45)] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="relative h-[38vh] min-h-[220px] max-h-[420px] overflow-hidden bg-black/35 sm:min-h-[270px] md:h-[45vh] md:max-h-[520px]">
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ clipPath: "inset(0 0 0 100%)" }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activePack.image}
                    alt={activePack.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-contain p-4 md:p-6"
                  />
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "100% 6px",
                  }}
                  animate={{ opacity: [0.06, 0.14, 0.06] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute right-4 top-4 rounded-full border border-[#c29c03]/55 bg-[#c29c03]/20 px-4 py-2 text-xs font-semibold tracking-wide md:text-sm">
                  Ahorra 10€
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 px-6 py-7 md:px-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/75 uppercase">
                  Pack {introIndex + 1} de {packs.length}
                </p>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                  {activePack.name}
                </h1>
                <p className="max-w-2xl text-sm text-white/85 sm:text-base md:text-lg">
                  Elige tu estilo en segundos y paga menos desde hoy:
                  <strong className="text-white"> cada pack incluye 10€ de ahorro directo</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-white/65 line-through md:text-base">
                    {euroFormatter.format(activePack.comparePrice)}
                  </span>
                  <span className="text-2xl font-bold text-white md:text-3xl">
                    {euroFormatter.format(activePack.packPrice)}
                  </span>
                  <span className="rounded-full border border-[#c29c03]/55 bg-[#c29c03]/20 px-3 py-1 text-xs font-semibold text-white">
                    Ahorras {euroFormatter.format(activePackSavings)}
                  </span>
                </div>
                <a
                  href={activePack.link}
                  className="inline-flex w-full justify-center rounded-full border border-[#c29c03] bg-[#c29c03]/25 px-7 py-3 text-sm font-semibold transition duration-300 hover:scale-105 hover:bg-[#c29c03]/40 sm:w-fit md:text-base"
                >
                  Lo quiero
                </a>
                <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
                  Desliza para ver {hasNextPack ? "el siguiente pack" : "todos los packs"}
                  {hasPreviousPack ? " o volver al anterior" : ""}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-3 pb-8">
            <button
              type="button"
              onClick={() => {
                setIntroIndex(0)
                setIsPaused(false)
              }}
              className="w-full rounded-full border border-white/45 bg-white/5 px-7 py-3 text-sm font-semibold transition duration-300 hover:bg-white/15 sm:w-auto md:text-base"
            >
              Volver a ver
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="w-full rounded-full border border-white/45 bg-white/5 px-7 py-3 text-sm font-semibold transition duration-300 hover:bg-white/15 sm:w-auto md:text-base"
            >
              {isPaused ? "Reanudar" : "Pausar"}
            </button>
            <button
              type="button"
              onClick={goToOfficialPacks}
              className="w-full rounded-full border border-white/45 bg-white/5 px-7 py-3 text-sm font-semibold transition duration-300 hover:bg-white/15 sm:w-auto md:text-base"
            >
              Saltar
            </button>
          </div>

          <div className="pb-4">
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-[#c29c03]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
        <a
          href={mobileCtaHref}
          className="block w-full rounded-full border border-[#c29c03] bg-[#c29c03]/90 px-5 py-3 text-center text-sm font-bold text-[#0b1020] shadow-[0_10px_35px_rgba(194,156,3,0.35)]"
        >
          {mobileCtaLabel}
        </a>
      </div>
    </main>
  )
}
