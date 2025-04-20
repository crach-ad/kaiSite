"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const pressFeatures = [
  {
    id: 1,
    publication: "Vogue",
    title: "Rising Stars in Fashion",
    date: "June 2023",
    image: "/nike-campaign.png",
    link: "#",
  },
  {
    id: 2,
    publication: "GQ",
    title: "Style Icons of Tomorrow",
    date: "March 2023",
    image: "/terracotta-style.png",
    link: "#",
  },
  {
    id: 3,
    publication: "Elle",
    title: "Breaking Boundaries in Fashion",
    date: "September 2022",
    image: "/ny-expression.png",
    link: "#",
  },
  {
    id: 4,
    publication: "Harper's Bazaar",
    title: "The New Face of Luxury",
    date: "January 2023",
    image: "/piano-elegance.png",
    link: "#",
  },
]

export default function Press() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="press" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Press & Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Featured in leading publications and media outlets around the world.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pressFeatures.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-80">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.publication}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{feature.publication}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{feature.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{feature.title}</p>
                  <a href={feature.link} className="text-sm font-medium inline-flex items-center hover:underline">
                    Read Article
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border-2 border-black dark:border-white font-medium rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            View All Press
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
