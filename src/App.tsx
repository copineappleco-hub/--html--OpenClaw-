import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Unlink, 
  Lock, 
  AlertCircle, 
  Terminal, 
  Monitor, 
  Cloud,
  FileText,
  ExternalLink,
  ChevronDown,
  Activity,
  ArrowRight,
  TrendingDown,
  Lightbulb,
  Zap
} from 'lucide-react';
import ShaderShowcase from './components/ui/hero';
import LoopDiagram from './components/LoopDiagram';
import EcosystemMatrix from './components/EcosystemMatrix';
import ComparisonChart, { ValueDistribution } from './components/ComparisonChart';

const navItems = [
  { label: '是什么', id: 'intro' },
  { label: '边界', id: 'boundary' },
  { label: '路径', id: 'path' },
  { label: '案例', id: 'cases' },
  { label: '价值', id: 'value' },
  { label: '反思', id: 'reflection' },
  { label: '附录', id: 'appendix' }
];

export default function App() {
  const [activeNav, setActiveNav] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      sections.forEach((section, idx) => {
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveNav(navItems[idx].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 mt-8 z-[100] hidden md:block">
        <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeNav === item.id 
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <ShaderShowcase />
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32">
        
        {/* Module 1: 是什么 */}
        <section id="intro" className="pt-20">
          <SectionHeader title="什么是动作型 AI？" subtitle="不是对话框，而是工具链" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-white/70 text-lg leading-relaxed">
                OpenClaw 不是一个独立的大模型，而是一个让模型具备“手”的框架。它填补了 AI 在理解决策与最终操作之间的鸿沟，让 AI 能够像人类一样直接操作软件界面。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <AbilityCard title="看见界面" desc="利用 Vision 模型实时识别 UI 坐标" />
                <AbilityCard title="执行操作" desc="精准模拟点击、拖拽与文字录入" />
                <AbilityCard title="多模态接入" desc="支持 GPT-4o, Claude 3.5 等任意模型" />
                <AbilityCard title="本地可控" desc="代码开源，操作轨迹实时可视" />
              </div>
            </div>
            <div className="p-8 rounded-[3rem] bg-gradient-to-b from-cyan-500/10 to-transparent border border-white/5">
               <h4 className="text-center text-sm font-mono text-cyan-400 mb-8 uppercase tracking-widest">核心处理环路 Cycle</h4>
               <LoopDiagram />
            </div>
          </div>
        </section>

        {/* Module 2: 边界 */}
        <section id="boundary">
          <SectionHeader 
            title="行动的边界与克制" 
            subtitle="权限、数据与责任的红线" 
            extraLink={{ href: 'https://lcn5e67ov8j2.feishu.cn/wiki/LGD7wQN8riRtZtkq343c0t3tnAe?from=from_copylink', label: '原始小组文档' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BoundaryItem 
              icon={<ShieldCheck className="text-green-400" />} 
              title="权限边界" 
              desc="Agent 只能在用户授权的窗口内活动" 
              tip="禁止全局 Root 权限"
            />
            <BoundaryItem 
              icon={<Unlink className="text-blue-400" />} 
              title="数据边界" 
              desc="仅读取必要的屏幕像素数据" 
              tip="敏感信息自动脱敏"
            />
            <BoundaryItem 
              icon={<Lock className="text-orange-400" />} 
              title="场景边界" 
              desc="避免进行涉及支付、转账的高危操作" 
              tip="执行前需要人类二次确认"
            />
            <BoundaryItem 
              icon={<AlertCircle className="text-red-400" />} 
              title="责任边界" 
              desc="AI 执行不代表替代人类的法律判断" 
              tip="明确责权利归属"
            />
          </div>
        </section>

        {/* Module 3: 接入路径 */}
        <section id="path">
          <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10">
            <SectionHeader title="三条接入路径" subtitle="选择最适合你的“手”" centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
              <PathOption 
                icon={<Cloud />} 
                title="云端 IM 机器人" 
                desc="最快体验，通过飞书/钉钉直接调用" 
                level="入门级 / 零代码"
              />
              <PathOption 
                icon={<Monitor />} 
                title="本地桌面安装" 
                desc="完整权限，运行在个人电脑后台" 
                level="进阶级 / 低延迟"
              />
              <PathOption 
                icon={<Terminal />} 
                title="高级开发路径" 
                desc="高度定制，通过代码编排工作流" 
                level="专家级 / 生产环境"
              />
            </div>
            <p className="text-center text-white/40 text-sm mt-12 italic">
               * 详细安装部署步骤请参考文档末尾附录
            </p>
          </div>
        </section>

        {/* Module 4: 案例 */}
        <section id="cases">
          <SectionHeader title="实战案例观察" subtitle="解决重复性的“无谓劳动”" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CaseCard 
              title="多平台内容同步 Agent"
              problem="每日需将公众号文章分发至 5 个非 API 开放平台，操作重复且耗时。"
              process={['读取文章库', '识别编辑器', '自动完成排版', '点击发布按钮']}
              result="单次同步耗时从 30分钟 降至 2分钟，且零格式错误。"
            />
            <CaseCard 
              title="智能化竞品分析调研"
              problem="需实时监测 10 个竞品网站的价格变动，传统爬虫易被封锁。"
              process={['定时截图网页', '模型提取数值', '自动生成对比图', '推送到钉钉']}
              result="实现网页即数据，无需编写复杂爬虫逻辑，适应性极强。"
            />
          </div>
        </section>

        {/* Module 5: 现状与价值 (重點) */}
        <section id="value">
          <SectionHeader title="国产 Claw 生态版图" subtitle="大厂入局，Agentic 应用爆发" />
          <ComparisonChart />
          <EcosystemMatrix />
          <div className="mt-12">
            <SectionHeader title="核心应用价值分布" subtitle="我们在为什么买单？" centered />
            <ValueDistribution />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            {['包装多于差异', '热度高于沉淀', '强依赖生态', '仍处早期阶段'].map(tag => (
              <span key={tag} className="px-5 py-2 rounded-full border border-red-500/30 text-red-400 text-sm bg-red-500/5">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Module 6: 判断与反思 */}
        <section id="reflection">
          <SectionHeader title="判断与反思" subtitle="当 AI 具备行动力，世界会变吗？" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ReflectionBlock 
              title="它真正解决了什么？"
              highlight="补上“建议”与“执行”之间的断裂。"
              cards={[
                { t: '重复操作', d: '终结跨软件的僵硬肉体操作' },
                { t: '无 API 孤岛', d: '让老旧系统也能被 AI 调用' },
                { t: '长流闭环', d: '实现无人值守的连续工作流' }
              ]}
            />
            <ReflectionBlock 
              title="方案差异对比"
              highlight="更聪明，但也更不稳定的 RPA。"
              comparison={[
                { n: 'ChatGPT', v: '提供方案', c: '认知' },
                { n: 'RPA', v: '硬性执行', c: '规则' },
                { n: 'OpenClaw', v: '理解后执行', c: '智能' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <CardGrid 
              title="被高估的地方" 
              icon={<TrendingDown className="text-red-400" />}
              items={['全自动执行', '完全替代人工', '企业级大规模落地', '安全绝对可控']}
            />
            <CardGrid 
              title="值得探索的方向" 
              icon={<Lightbulb className="text-cyan-400" />}
              items={['人机协作模式', '跨领域工作流设计', 'AI 产品原型工具', '自然语言编排系统']}
            />
          </div>

          <div className="mt-20 p-12 rounded-[3.5rem] bg-cyan-500 text-black text-center">
            <p className="text-3xl font-black mb-4">
              “OpenClaw 当前仍不成熟，但它代表着 AI 从认知工具向行动主体的转向。”
            </p>
            <p className="text-lg opacity-80">
              这条路径可能会重塑未来的人机协作方式。
            </p>
          </div>
        </section>

        {/* Module 7: 附录 */}
        <section id="appendix" className="pb-32">
          <SectionHeader title="附录与参考资料" subtitle="支持我们的研究来源" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AppendixGroup title="官方资源">
              <AppendixLink href="https://docs.openclaw.ai/" label="OpenClaw 官方文档" />
              <AppendixLink href="https://lcn5e67ov8j2.feishu.cn/wiki/LGD7wQN8riRtZtkq343c0t3tnAe?from=from_copylink" label="小组原始研究文档 (飞书)" />
            </AppendixGroup>
            <AppendixGroup title="国产生态参考">
              <AppendixLink href="https://www.feishu.cn/content/article/7613711414611463386?utm_source=chatgpt.com" label="字节跳动：OpenClaw 飞书集成案例" />
              <AppendixLink href="https://cloud.tencent.com/developer/article/2648718" label="腾讯云：QClaw 开发者观察" />
              <AppendixLink href="https://cloud.baidu.com/product/du.html?from=home_banner" label="百度：文心 DuClaw 架构方案" />
              <AppendixLink href="https://jvsclaw.aliyun.com" label="阿里云：JVS Claw 可视化编排" />
            </AppendixGroup>
          </div>
        </section>
      </div>

      {/* Back to top or simple footer */}
      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-sm">
        <p>© 2026 艺术与科技二班人机器人小组 · 课程汇报专用</p>
      </footer>
    </div>
  );
}

// Sub-components

function SectionHeader({ title, subtitle, centered = false, extraLink }: { title: string, subtitle: string, centered?: boolean, extraLink?: { href: string, label: string } }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.p 
        className="text-cyan-400 font-mono text-sm uppercase tracking-[0.3em] mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
      <div className={`flex items-baseline gap-4 ${centered ? 'justify-center' : ''}`}>
        <motion.h2 
          className="text-4xl md:text-5xl font-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        {extraLink && (
           <motion.a 
            href={extraLink.href} 
            target="_blank"
            className="text-[10px] text-white/30 hover:text-cyan-400 flex items-center gap-1 border border-white/10 px-2 py-1 rounded-md transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
           >
             <FileText size={10} /> {extraLink.label}
           </motion.a>
        )}
      </div>
    </div>
  );
}

function AbilityCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <h5 className="text-white font-bold mb-1 text-sm">{title}</h5>
      <p className="text-white/40 text-xs">{desc}</p>
    </div>
  );
}

function BoundaryItem({ icon, title, desc, tip }: { icon: any, title: string, desc: string, tip: string }) {
  return (
    <motion.div 
      className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="p-3 bg-white/5 rounded-full">{icon}</div>
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      <div className="mt-auto pt-4 border-t border-white/10 w-full text-[10px] text-cyan-400 uppercase font-mono tracking-tighter">
        {tip}
      </div>
    </motion.div>
  );
}

function PathOption({ icon, title, desc, level }: { icon: any, title: string, desc: string, level: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-cyan-400 w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl">
        {icon}
      </div>
      <h4 className="text-white text-xl font-bold">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{level}</span>
    </div>
  );
}

function CaseCard({ title, problem, process, result }: { title: string, problem: string, process: string[], result: string }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Activity className="text-cyan-400" size={24} />
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
      <div>
        <span className="text-[10px] uppercase font-mono text-white/40 block mb-2">Issue / 问题背景</span>
        <p className="text-white/80">{problem}</p>
      </div>
      <div className="space-y-3">
        {process.map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-500 text-black text-[10px] font-bold">{i+1}</span>
            {step}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-white/10 text-cyan-400 flex items-center gap-3">
        <Zap size={18} />
        <span className="text-sm font-bold tracking-tight">成果：{result}</span>
      </div>
    </div>
  );
}

function ReflectionBlock({ title, highlight, cards, comparison }: any) {
  return (
    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10">
      <h3 className="text-2xl font-black mb-2">{title}</h3>
      <p className="text-cyan-400 font-bold text-lg mb-8 italic">“{highlight}”</p>
      
      {cards && (
        <div className="grid grid-cols-1 gap-4">
          {cards.map((c: any, i: number) => (
            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="font-bold text-white mb-1">{c.t}</div>
              <div className="text-xs text-white/40">{c.d}</div>
            </div>
          ))}
        </div>
      )}

      {comparison && (
        <div className="space-y-4">
           {comparison.map((c: any, i: number) => (
             <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                   <div className="font-bold text-white">{c.n}</div>
                   <div className="text-[10px] text-white/30 uppercase tracking-widest">{c.c}</div>
                </div>
                <div className="text-sm text-cyan-400">{c.v}</div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

function CardGrid({ title, icon, items }: { title: string, icon: any, items: string[] }) {
  return (
    <div className="p-8 rounded-[3rem] border border-white/10 bg-white/5">
      <div className="flex items-center gap-4 mb-8">
        {icon}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-sm font-medium">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppendixGroup({ title, children }: any) {
  return (
    <div className="space-y-6">
      <h4 className="text-white font-bold opacity-60 uppercase tracking-widest text-sm">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function AppendixLink({ href, label }: { href: string, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
    >
      <span className="text-white/80 group-hover:text-cyan-400 transition-colors">{label}</span>
      <ExternalLink size={16} className="text-white/20" />
    </a>
  );
}
