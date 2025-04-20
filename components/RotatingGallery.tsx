"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Project {
  id: number | string
  title: string
  image: string
  category?: string
  description?: string
}

export interface RotatingGalleryProps {
  projects: Project[]
  autoplayInterval?: number
  autoplayEnabled?: boolean
  tiltAngle?: number
  carouselScale?: number
  radiusMultiplier?: number
  minRadius?: number
  className?: string
  height?: string
  onProjectClick?: (project: Project) => void
}

export default function RotatingGallery(props: RotatingGalleryProps) {
  // --- Hydration fix: only render on client ---
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  // Destructure as before
  const {
    projects,
    autoplayInterval = 3000,
    autoplayEnabled: initialAutoplay = true,
    tiltAngle = 2,
    carouselScale = 0.8,
    radiusMultiplier = 0.48,
    minRadius = 80,
    className = "",
    height = "80vh",
    onProjectClick,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(initialAutoplay)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        if (clientWidth > 0 && clientHeight > 0) {
          setContainerSize({ width: clientWidth, height: clientHeight })
        }
      }
    }
    updateSize()
    const timeoutId = setTimeout(updateSize, 100)
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
      clearTimeout(timeoutId)
    }
  }, [])

  const navigate = (newDirection: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection
      if (newIndex < 0) newIndex = projects.length - 1
      if (newIndex >= projects.length) newIndex = 0
      return newIndex
    })
    setTimeout(() => setIsAnimating(false), 600)
    setAutoplayEnabled(false)
    setTimeout(() => setAutoplayEnabled(initialAutoplay), 5000)
  }

  useEffect(() => {
    if (!autoplayEnabled) return
    const interval = setInterval(() => {
      navigate(1)
    }, autoplayInterval)
    return () => clearInterval(interval)
  }, [currentIndex, autoplayEnabled, isAnimating, autoplayInterval])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    if ("touches" in e) {
      setStartX(e.touches[0].clientX)
    } else {
      setStartX(e.clientX)
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnimating) return
    let currentX: number
    if ("touches" in e) {
      currentX = e.touches[0].clientX
    } else {
      currentX = e.clientX
    }
    const diff = startX - currentX
    if (Math.abs(diff) > 50) {
      setIsDragging(false)
      if (diff > 0) {
        navigate(1)
      } else {
        navigate(-1)
      }
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleProjectClick = (project: Project) => {
    if (onProjectClick) {
      onProjectClick(project)
    }
  }

  // Only render cards within 2 positions of the center; others are hidden
  const getProjectStyles = (index: number) => {
    const totalProjects = projects.length;
    let relativeIndex = index - currentIndex;
    if (relativeIndex > totalProjects / 2) relativeIndex -= totalProjects;
    if (relativeIndex < -totalProjects / 2) relativeIndex += totalProjects;
    if (Math.abs(relativeIndex) > 2) return { display: "none" };

    const angleStep = (2 * Math.PI) / totalProjects;
    const angle = relativeIndex * angleStep;
    const baseRadius = Math.max(minRadius, Math.min(containerSize.width, containerSize.height) * radiusMultiplier);
    const radiusX = baseRadius;
    const radiusZ = baseRadius * 0.8;
    const tiltAngleRad = tiltAngle * (Math.PI / 180);
    const z = radiusZ * Math.cos(angle);
    const x = radiusX * Math.sin(angle);
    const y = Math.sin(tiltAngleRad) * z * 0.4;
    const isActive = relativeIndex === 0;
    // Center card: large, bright, shadow; sides: small, dim
    const scale = isActive ? 1 : 0.7;
    const opacity = isActive ? 1 : 0.5;
    const zIndex = isActive ? 20 : 10 - Math.abs(relativeIndex);
    const rotateY = -angle * (180 / Math.PI);
    return {
      zIndex,
      opacity,
      transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      filter: isActive ? "none" : "brightness(0.8)",
      cursor: onProjectClick ? "pointer" : "default",
      boxShadow: isActive ? "0 8px 32px 0 rgba(60,60,60,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)" : "none",
      background: isActive ? "#fff" : "none",
      borderRadius: isActive ? "1.5rem" : "1rem",
      display: "block",
    };
  }

  const getCardSize = () => {
    const width = Math.min(45, containerSize.width * 0.45) + "%"
    const height = Math.min(40, containerSize.height * 0.4) + "%"
    const maxWidth = "400px"
    return { width, height, maxWidth }
  }

  const cardSize = getCardSize()

  return (
    <>
      {!hasMounted ? null : (
        <div 
          className={`relative w-full overflow-hidden ${className}`} 
          style={{ height }}
        >
          <button
            onClick={() => navigate(-1)}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm p-2 rounded-full"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm p-2 rounded-full"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${tiltAngle}deg) scale(${carouselScale})`,
              }}
            >
              <div
                className="carousel-container"
                style={{
                  transformStyle: "preserve-3d",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`absolute overflow-hidden ${index === currentIndex ? "shadow-2xl bg-white rounded-2xl" : "rounded-xl"}`}
                    style={{
                      ...getProjectStyles(index),
                      width: cardSize.width,
                      maxWidth: cardSize.maxWidth,
                      height: cardSize.height,
                    }}
                    onClick={() => index === currentIndex && handleProjectClick(project)}
                  >
                    {/* White card background for center card */}
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl z-0" />
                    )}
                    <div className="relative w-full h-full z-10">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover rounded-2xl"
                        priority={index === currentIndex}
                      />
                      <div
                        className={`absolute inset-0 flex flex-col justify-center p-4 md:p-6 ${index === currentIndex ? "bg-white/0" : "bg-black/40"}`}
                        style={{
                          opacity: index === currentIndex ? 1 : 0.3,
                          transition: "opacity 0.6s ease",
                        }}
                      >
                        <h2 className={`text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 ${index === currentIndex ? "text-black" : "text-white"}`}>
                          {project.title}
                        </h2>
                        {project.category && (
                          <p className={`text-xs md:text-sm ${index === currentIndex ? "text-gray-700" : "text-white/80"}`}>{project.category}</p>
                        )}
                        {project.description && index === currentIndex && (
                          <p className="text-gray-700 mt-1 md:mt-2 max-w-md text-xs hidden md:block">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    const direction =
                      (index - currentIndex + projects.length) % projects.length <= projects.length / 2 ? 1 : -1
                    const steps = Math.min(
                      (index - currentIndex + projects.length) % projects.length,
                      (currentIndex - index + projects.length) % projects.length,
                    )
                    let currentStep = 0
                    const animateStep = () => {
                      if (currentStep < steps) {
                        navigate(direction)
                        currentStep++
                        setTimeout(animateStep, 600)
                      }
                    }
                    animateStep()
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
