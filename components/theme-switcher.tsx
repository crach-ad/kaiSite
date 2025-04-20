"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<"runway" | "belair">("runway")

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply theme class when component mounts and when mode changes
  useEffect(() => {
    if (mounted) {
      if (mode === "belair") {
        document.documentElement.classList.add("belair-mode")
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("belair-mode")
        document.documentElement.classList.remove("dark")
      }
    }
  }, [mode, mounted])

  if (!mounted) return null

  const toggleMode = () => {
    setMode(mode === "runway" ? "belair" : "runway")
  }

  return (
    <motion.div
      className="fixed right-6 top-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        className={`rounded-full w-12 h-12 ${mode === "belair" ? "bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white" : "bg-white text-black"}`}
      >
        {mode === "runway" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <span className="block text-xs mt-1 text-center font-medium">{mode === "runway" ? "Runway" : "Bel-Air"}</span>
    </motion.div>
  )
}
