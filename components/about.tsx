"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-black">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl belair-element hidden"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl belair-element hidden"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Kai</h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              From the sunny shores of the Bahamas 🇧🇸 to the glittering lights of Los Angeles 📍, my journey in fashion
              has been defined by bold choices and authentic expression.
            </p>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              With a passion for high fashion and a distinctive personal style, I bring a unique energy to every shoot,
              runway, and creative collaboration.
            </p>

            <div className="flex items-center space-x-6 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">5+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Years Experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">50+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Major Campaigns</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">20+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Magazine Features</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image src="/terracotta-style.png" alt="Kai Strachan Portrait" fill className="object-cover" />
              <div className="absolute -bottom-2 -right-2 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 -z-10 rounded-lg belair-element" />
              <div className="absolute -top-2 -left-2 w-40 h-40 border-2 border-black dark:border-white -z-10 rounded-lg" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-8 text-center">
            Journey Timeline
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 dark:bg-gray-800"></div>

            <div className="space-y-12">
              <TimelineItem year="2018" title="First Major Campaign" side="left">
                Signed with Elite Model Management and booked first national campaign
              </TimelineItem>

              <TimelineItem year="2019" title="International Debut" side="right">
                Walked in Paris Fashion Week for emerging designers
              </TimelineItem>

              <TimelineItem year="2020" title="Digital Expansion" side="left">
                Built social media presence and collaborated with major brands
              </TimelineItem>

              <TimelineItem year="2022" title="Magazine Features" side="right">
                Featured in Vogue, GQ, and Elle magazine editorials
              </TimelineItem>

              <TimelineItem year="2023" title="Creative Direction" side="left">
                Expanded into creative direction and brand consulting
              </TimelineItem>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineItem({
  year,
  title,
  children,
  side,
}: {
  year: string
  title: string
  children: React.ReactNode
  side: "left" | "right"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -20 : 20 }}
      transition={{ duration: 0.6 }}
      className={`relative flex items-center ${side === "left" ? "justify-end md:pr-12" : "justify-start md:pl-12"} md:w-1/2 ${side === "right" ? "md:ml-auto" : ""}`}
    >
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black dark:bg-white z-10`}
      ></div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full md:w-auto max-w-md">
        <span className="inline-block px-3 py-1 text-sm font-semibold bg-gray-100 dark:bg-gray-800 rounded-full mb-2">
          {year}
        </span>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
      </div>
    </motion.div>
  )
}
