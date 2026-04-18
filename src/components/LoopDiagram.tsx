import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Brain, Zap, RefreshCcw } from 'lucide-react';

const steps = [
  { icon: <Eye />, label: '感知 (Perception)', color: '#22d3ee', angle: 0 },
  { icon: <Brain />, label: '决策 (Decision)', color: '#60a5fa', angle: 90 },
  { icon: <Zap />, label: '执行 (Execution)', color: '#f59e0b', angle: 180 },
  { icon: <RefreshCcw />, label: '反馈 (Feedback)', color: '#10b981', angle: 270 },
];

export default function LoopDiagram() {
  const radius = 160;

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Outer Rotating Ring */}
      <motion.div 
        className="absolute inset-0 border border-dashed border-white/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Flowing Particles along the circle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id="particle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            r="2"
            fill="cyan"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: steps.map(s => 250 + Math.cos((s.angle - 90 + i * 45) * Math.PI / 180) * radius),
              cy: steps.map(s => 250 + Math.sin((s.angle - 90 + i * 45) * Math.PI / 180) * radius),
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear"
            }}
            className="blur-[1px]"
          />
        ))}
      </svg>
      
      {/* Center Core */}
      <div className="relative z-10 w-36 h-36 rounded-full bg-white/5 backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center text-center p-4">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Autonomous</div>
        <div className="text-white font-black text-sm">Claw Engine</div>
        <div className="mt-2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>

      {/* Steps mapping to circle */}
      {steps.map((step, i) => {
        const x = Math.cos((step.angle - 90) * (Math.PI / 180)) * radius;
        const y = Math.sin((step.angle - 90) * (Math.PI / 180)) * radius;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="relative group cursor-pointer">
              {/* Glow */}
              <div 
                className="absolute inset-0 blur-3xl opacity-10 group-hover:opacity-40 transition-opacity rounded-full"
                style={{ backgroundColor: step.color }}
              />
              
              {/* Content Card */}
              <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-colors w-32 shadow-2xl">
                <div className="p-3 rounded-xl bg-white/5" style={{ color: step.color }}>
                  {React.cloneElement(step.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[12px] font-black text-white whitespace-nowrap">{step.label.split(' ')[0]}</span>
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">{step.label.split(' ')[1]}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Connecting Arcs SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="white" strokeWidth="1" strokeDasharray="8 8" />
      </svg>
    </div>
  );
}


