import { motion } from 'framer-motion';
import { MessageSquare, Zap, Target, Layout, Box, Users, Search, Play, CheckCircle2 } from 'lucide-react';

export default function ComparisonChart() {
  const data = [
    {
      title: '会聊天的 AI (LMM)',
      icon: <MessageSquare className="text-blue-400" />,
      color: 'from-blue-600/20 to-indigo-600/20',
      border: 'border-blue-500/30',
      tag: 'COGNITIVE',
      features: ['消除“认知差”', '多轮对话理解', '文本/代码交付'],
      process: [
        { label: 'Input', val: '你好，帮我写个脚本' },
        { label: 'Process', val: '逻辑推理 + 语言生成' },
        { label: 'Output', val: '纯文本代码块' }
      ]
    },
    {
      title: '会动手的 AI (Agentic)',
      icon: <Zap className="text-orange-400" />,
      color: 'from-orange-600/20 to-red-600/20',
      border: 'border-orange-500/30',
      tag: 'ACTION',
      features: ['消除“执行差”', '意图驱动执行', '流程结果交付'],
      process: [
        { label: 'Input', val: '帮我同步这篇文章到飞书' },
        { label: 'Process', val: '屏幕识别 + 动作模拟' },
        { label: 'Output', val: '任务执行完毕 (闭环)' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">
      {data.map((col, idx) => (
        <motion.div
          key={idx}
          className={`relative p-8 rounded-[3rem] border-2 ${col.border} bg-gradient-to-br ${col.color} backdrop-blur-xl group overflow-hidden`}
          initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-6 opacity-5 select-none">
             <h2 className="text-8xl font-black">{col.tag}</h2>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-3xl bg-white/10">{col.icon}</div>
            <h3 className="text-2xl font-black text-white">{col.title}</h3>
          </div>
          
          <div className="space-y-4 mb-8">
            {col.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-4">
             {col.process.map((p, i) => (
               <div key={i} className="flex flex-col gap-1">
                 <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{p.label}</span>
                 <span className="text-sm text-white/90">{p.val}</span>
                 {i < col.process.length - 1 && <div className="h-4 w-px bg-white/10 ml-2 mt-1" />}
               </div>
             ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ValueDistribution() {
  const categories = [
    { 
      title: '企业协同', 
      val: '跨软件信息孤岛消除', 
      icon: <Users />, 
      stats: '80% 效率提升',
      details: '自动化审批、跨部门数据同步、日报生成'
    },
    { 
      title: '知识管理', 
      val: '行业动态自动追踪', 
      icon: <Target />, 
      stats: '5x 调研速度',
      details: '竞品监控、结构化研究报告、信息筛选'
    },
    { 
      title: '内容生产', 
      val: '多平台素材自动采集', 
      icon: <Layout />, 
      stats: '零代码分发',
      details: '社交媒体搬运、排版自动化、素材入库'
    },
    { 
      title: '云端执行', 
      val: '服务器自动化运维', 
      icon: <Box />, 
      stats: '7/24 无人值守',
      details: '故障自愈、云端常驻脚本、远程操作'
    },
  ];

  return (
    <div className="relative py-12">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-4 opacity-5 pointer-events-none">
         {[...Array(4)].map((_, i) => <div key={i} className="border-r border-white" />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute top-4 right-6 text-2xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors">0{i+1}</div>
            
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
               {cat.icon}
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{cat.title}</h4>
            <div className="text-cyan-400 font-mono text-xs mb-4 uppercase tracking-tighter">{cat.stats}</div>
            
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              {cat.details}
            </p>
            
            <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/5">
               <span className="text-[10px] text-white/60 font-medium">{cat.val}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
