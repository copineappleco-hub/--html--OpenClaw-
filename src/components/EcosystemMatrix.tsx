import { motion } from 'framer-motion';
import { Building2, User, BookText, MousePointerClick } from 'lucide-react';

export default function EcosystemMatrix() {
  const products = [
    { 
      name: '飞书 / 字节', 
      product: 'OpenClaw 飞书官方插件', 
      pos: 'top-left',
      zone: '企业协同',
      icon: <Building2 />,
      color: '#3b82f6'
    },
    { 
      name: '阿里云', 
      product: 'JVS Claw', 
      pos: 'bottom-left',
      zone: '企业自动化',
      icon: <MousePointerClick />,
      color: '#f97316'
    },
    { 
      name: '腾讯云', 
      product: 'QClaw', 
      pos: 'top-right',
      zone: '个人云端助理',
      icon: <User />,
      color: '#06b6d4'
    },
    { 
      name: '百度', 
      product: '文心 DuClaw', 
      pos: 'bottom-right',
      zone: '知识库研究',
      icon: <BookText />,
      color: '#6366f1'
    },
  ];

  return (
    <div className="relative py-20 px-10">
      {/* Axes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-full h-px bg-white/10" />
         <div className="h-full w-px bg-white/10" />
      </div>

      {/* Axis Labels */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Personal / 个人</div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Enterprise / 企业</div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] ml-4">Knowledge / 知识</div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mr-4">Action / 执行</div>

      <div className="grid grid-cols-2 grid-rows-2 gap-12 relative z-10 aspect-video md:aspect-auto">
        {products.map((p, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all cursor-crosshair shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
             <div 
               className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
               style={{ backgroundColor: `${p.color}20`, color: p.color }}
             >
                {p.icon}
             </div>
             <h4 className="text-white font-black text-lg text-center">{p.name}</h4>
             <p className="text-white/40 text-xs text-center mb-4">{p.product}</p>
             <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-white/60 uppercase tracking-widest">
               {p.zone}
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
