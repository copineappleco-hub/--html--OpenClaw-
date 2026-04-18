"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, FileText } from "lucide-react"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-center items-center">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
        speed={0.2}
      />

      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6">
        <motion.div
          className="flex items-center group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.svg
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="size-10 text-white"
            style={{ filter: "url(#logo-glow)" }}
          >
             <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
             <path d="M50 20 L50 80 M20 50 L80 50" stroke="white" strokeWidth="4" />
          </motion.svg>
          <span className="ml-3 text-white font-bold tracking-tighter text-xl">ROBOTICS GROUP</span>
        </motion.div>

        <div className="flex gap-4">
           <a 
            href="https://lcn5e67ov8j2.feishu.cn/wiki/LGD7wQN8riRtZtkq343c0t3tnAe?from=from_copylink" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all text-sm"
           >
             <FileText size={16} /> 原始小组文档
           </a>
           <a 
            href="https://docs.openclaw.ai/" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md text-white border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm"
           >
             <BookOpen size={16} /> OpenClaw 文档
           </a>
        </div>
      </header>

      <main className="relative z-20 text-center px-4 max-w-5xl">
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white/90 text-sm font-medium tracking-wide">
            智能视觉工程设计 · 2026 课题汇报
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden">
             <motion.span 
               className="block font-light text-white/70 text-3xl md:text-4xl lg:text-5xl mb-4"
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
             >
               从 “会聊天的 AI”
             </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span 
              className="block tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #f97316 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#text-glow)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              到 “会动手的 AI”
            </motion.span>
          </div>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          OpenClaw 与国产 Claw 生态观察
        </motion.p>

        <motion.div 
          className="p-6 border-l-4 border-cyan-500 bg-white/5 backdrop-blur-sm max-w-2xl mx-auto text-left mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-white/90 italic text-lg">
            “OpenClaw 的意义，不在于它今天是否已经成熟，而在于它标志着 AI 正从认知工具走向行动主体。”
          </p>
        </motion.div>

        <motion.div
           className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/60 text-sm font-mono tracking-widest uppercase"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.2 }}
        >
          <div>小组：艺术与科技二班人机器人小组</div>
          <div>日期：2026年4月17日</div>
          <div>地点：智能视觉实验室</div>
        </motion.div>

        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </motion.div>
      </main>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 100 + 50,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
