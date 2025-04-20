"use client"

import type React from "react"

import { useState } from "react"
import RotatingGallery from "@/components/RotatingGallery"

type Category = "all" | "fashion" | "editorial" | "commercial"

type PortfolioItem = {
  id: number
  title: string
  category: Exclude<Category, "all">
  image: string
  description: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Nike Campaign",
    category: "commercial",
    image: "/nike-campaign.png",
    description: "Featured in Nike's seasonal streetwear collection campaign",
  },
  {
    id: 2,
    title: "Elegant Evening",
    category: "editorial",
    image: "/piano-elegance.png",
    description: "Editorial shoot for luxury lifestyle magazine",
  },
  {
    id: 3,
    title: "Terracotta Tones",
    category: "fashion",
    image: "/terracotta-style.png",
    description: "Fashion editorial featuring earth tones and minimalist styling",
  },
  {
    id: 4,
    title: "NY Expression",
    category: "fashion",
    image: "/ny-expression.png",
    description: "Expressive portrait series featuring vintage sportswear",
  },
  {
    id: 5,
    title: "Red Gloves",
    category: "editorial",
    image: "/hero-red-gloves.png",
    description: "Conceptual fashion shoot exploring themes of vision and perception",
  },
  {
    id: 6,
    title: "Urban Attitude",
    category: "commercial",
    image: "/nike-campaign.png",
    description: "Urban streetwear campaign highlighting contemporary fashion",
  },
]

export default function Portfolio() {
  return (
    <section className="w-full py-24">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Portfolio</h2>
      <div className="max-w-6xl mx-auto">
        <RotatingGallery projects={portfolioItems} autoplayInterval={3000} tiltAngle={10} />
      </div>
    </section>
  )
}
