import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "ai",
    icon: "🧠",
    title: "AI автоматизация",
    desc: "Разборы AI-инструментов, кейсы автоматизации, агенты и no-code решения для бизнеса",
    link: "https://t.me/stoneAIC",
    tag: "AI & Tech",
    accent: "#00ffaa",
    featured: true,
    price: "NEW",
  },
  {
    id: "channels",
    icon: "📡",
    title: "Каналы и чаты от 2019",
    desc: "Готовые Telegram-каналы и чаты с историей — для бизнеса, рекламы и продвижения",
    link: "https://t.me/stoneTGgroups",
    tag: "Магазин",
    accent: "#00e5ff",
    price: "от $3",
  },
  {
    id: "news",
    icon: "⚡",
    title: "Stone Baza",
    desc: "Крипта, Telegram-новости, тренды и аналитика рынка — всё в одном месте",
    link: "https://t.me/stonebaza",
    tag: "Новости",
    accent: "#39ff14",
    price: "FREE",
  },
  {
    id: "chat",
    icon: "💬",
    title: "Чат сообщества",
    desc: "Обсуждения, нетворкинг, вопросы — живое комьюнити предпринимателей и разработчиков",
    link: "https://t.me/stonebazachat",
    tag: "Комьюнити",
    accent: "#00ffcc",
    price: "FREE",
  },
  {
    id: "bot",
    icon: "🤖",
    title: "Бот автопродаж",
    desc: "Автоматическая продажа цифровых товаров через Telegram без участия менеджера",
    link: "https://t.me/tgstonebot",
    tag: "Услуги",
    accent: "#00ff88",
    price: "24/7",
  },
  {
    id: "aibot",
    icon: "🔮",
    title: "7 бесплатных ИИ",
    desc: "ChatGPT, Claude, Gemini, генерация изображений и другие AI-инструменты — бесплатно в Telegram",
    link: "https://t.me/drifttt55bot",
    tag: "Бесплатно",
    accent: "#bf5af2",
    price: "FREE",
  },
  {
    id: "contact",
    icon: "📬",
    title: "Обратная связь",
    desc: "Связаться напрямую — вопросы, предложения, сотрудничество, реклама",
    link: "https://t.me/stonemvp",
    tag: "Контакты",
    accent: "#66ffcc",
    price: "→",
  },
];

const STATS = [
  { value: "7 лет", label: "на рынке" },
  { value: "8", label: "проектов" },
  { value: "24/7", label: "онлайн" },
];

const SERVICES = [
  { emoji: "🚀", name: "AI-агенты" },
  { emoji: "📈", name: "Автоворонки" },
  { emoji: "🤖", name: "Telegram-боты" },
  { emoji: "📡", name: "Каналы" },
  { emoji: "💬", name: "No-code" },
  { emoji: "⚙️", name: "Make / n8n" },
  { emoji: "🗨️", name: "Чаты" },
];

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコSTONEAI⚡🧠";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 8, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();

        if (brightness > 0.95) {
          ctx.fillStyle = "#00ff88";
          ctx.shadowColor = "#00ff88";
          ctx.shadowBlur = 15;
        } else if (brightness > 0.8) {
          ctx.fillStyle = "rgba(0, 255, 136, 0.5)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "rgba(0, 255, 100, 0.15)";
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      {[10, 25, 40, 60, 78, 90].map((left, i) => (
        <div key={i} style={{
          position: "absolute", left: `${left}%`, bottom: 0,
          width: 2, height: 2, borderRadius: "50%",
          background: "rgba(0,255,136,0.5)",
          boxShadow: "0 0 6px rgba(0,255,136,0.3)",
          animation: `particleUp ${6 + i * 1.2}s linear infinite`,
          animationDelay: `${i * 0.8}s`,
        }} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [expanded, setExpanded] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleTap = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
    if (expanded) {
      onClick(project.link);
    } else {
      setExpanded(true);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleTap}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? pressed ? "scale(0.97)" : "scale(1)"
          : "translateY(30px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 0.07}s`,
        cursor: "pointer",
        position: "relative",
        borderRadius: 16,
        padding: 1,
        background: project.featured
          ? `linear-gradient(135deg, ${project.accent}, ${project.accent}00, ${project.accent})`
          : `linear-gradient(135deg, ${project.accent}30, transparent, ${project.accent}15)`,
      }}
    >
      {project.featured && (
        <div style={{
          position: "absolute", inset: -1, borderRadius: 17,
          background: `linear-gradient(135deg, ${project.accent}, transparent, ${project.accent})`,
          filter: "blur(10px)", opacity: 0.25, zIndex: -1,
        }} />
      )}

      <div style={{
        background: "rgba(8,16,12,0.92)",
        backdropFilter: "blur(20px)",
        borderRadius: 15,
        padding: expanded ? "18px 18px 14px" : "16px 18px",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Corner glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 80, height: 80,
          background: `radial-gradient(circle at top right, ${project.accent}08, transparent)`,
          pointerEvents: "none",
        }} />

        {/* Main row */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{
            fontSize: 22, width: 44, height: 44, display: "flex",
            alignItems: "center", justifyContent: "center", borderRadius: 12,
            background: `${project.accent}10`, border: `1px solid ${project.accent}20`,
            boxShadow: `0 0 15px ${project.accent}08`,
            flexShrink: 0,
          }}>
            {project.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em", color: project.accent,
                background: `${project.accent}12`, border: `1px solid ${project.accent}25`,
                padding: "2px 7px", borderRadius: 4,
                textShadow: `0 0 8px ${project.accent}40`,
              }}>
                {project.tag}
              </span>
              {project.featured && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700,
                  color: "#000", background: project.accent, padding: "2px 6px", borderRadius: 3,
                  boxShadow: `0 0 10px ${project.accent}60`,
                }}>NEW</span>
              )}
            </div>
            <h3 style={{
              fontFamily: "'Unbounded', 'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700,
              color: "#e0f0e8", margin: 0,
            }}>
              {project.title}
            </h3>
          </div>

          <div style={{
            fontFamily: "'Unbounded', 'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
            background: `linear-gradient(135deg, ${project.accent}, #00e5ff)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            flexShrink: 0,
          }}>
            {project.price}
          </div>
        </div>

        {/* Expandable description */}
        <div style={{
          maxHeight: expanded ? 80 : 0,
          opacity: expanded ? 1 : 0,
          marginTop: expanded ? 12 : 0,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            padding: "10px 12px",
            background: "rgba(0,255,136,0.03)",
            borderRadius: 10,
            border: "1px solid rgba(0,255,136,0.08)",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#5a8a70",
              margin: 0, lineHeight: 1.5, flex: 1,
            }}>
              {project.desc}
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
              color: project.accent, background: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
              padding: "6px 12px", borderRadius: 8, flexShrink: 0, whiteSpace: "nowrap",
              textShadow: `0 0 6px ${project.accent}40`,
            }}>
              Открыть →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicePills() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {SERVICES.map((s, i) => (
        <div key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "8px 12px", background: "rgba(0,255,136,0.12)",
          border: "1px solid rgba(0,255,136,0.3)", borderRadius: 10,
          color: "rgba(224,240,232,0.9)", fontSize: 12, fontWeight: 500,
          backdropFilter: "blur(12px)",
          animation: `pillGlow 4s ease-in-out infinite`,
          animationDelay: `${i * 0.6}s`,
        }}>
          <span style={{ fontSize: 13 }}>{s.emoji}</span> {s.name}
        </div>
      ))}
    </div>
  );
}

function GlitchTitle({ text }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3500 + Math.random() * 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span style={{
        fontFamily: "'Unbounded', 'Orbitron', sans-serif", fontSize: 38, fontWeight: 900,
        background: "linear-gradient(135deg, #aaff00 0%, #00ff88 50%, #ccff00 100%)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        animation: "gradShift 4s ease-in-out infinite",
        filter: `drop-shadow(0 0 20px rgba(170,255,0,0.5)) drop-shadow(0 0 40px rgba(0,255,136,0.2))`,
        position: "relative", zIndex: 1,
      }}>
        {text}
      </span>
      {glitch && (
        <>
          <span style={{
            position: "absolute", top: 0, left: 3,
            fontFamily: "'Unbounded', sans-serif", fontSize: 38, fontWeight: 900,
            color: "#aaff00", clipPath: "inset(15% 0 45% 0)", zIndex: 0,
          }}>{text}</span>
          <span style={{
            position: "absolute", top: 0, left: -3,
            fontFamily: "'Unbounded', sans-serif", fontSize: 38, fontWeight: 900,
            color: "#00ff88", clipPath: "inset(55% 0 15% 0)", zIndex: 0,
          }}>{text}</span>
        </>
      )}
    </div>
  );
}

export default function StoneHub() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#050a08");
      tg.setBackgroundColor("#050a08");
    }
  }, []);

  const handleClick = (link) => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    }
    if (typeof window !== "undefined" && window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(link);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050a08", color: "#e0f0e8", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500&family=Orbitron:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050a08; overflow-x: hidden; }

        @keyframes particleUp {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes pillGlow {
          0%, 100% { border-color: rgba(0,255,136,0.3); background: rgba(0,255,136,0.12); }
          50% { border-color: rgba(0,255,136,0.55); background: rgba(0,255,136,0.2); }
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(0,255,136,0.15); }
          50% { border-color: rgba(0,255,136,0.4); }
        }
        @keyframes gradientBar {
          0% { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050a08; }
        ::-webkit-scrollbar-thumb { background: #00ff4430; border-radius: 4px; }
      `}</style>

      <MatrixRain />
      <Particles />

      {/* Scanlines */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.012) 2px, rgba(0,255,100,0.012) 4px)",
      }} />

      {/* Mesh orbs */}
      <div style={{ position: "fixed", top: "-5%", left: "-10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 1, animation: "pillGlow 6s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: "5%", right: "-10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 1, animation: "pillGlow 6s ease-in-out 3s infinite" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 480, margin: "0 auto", padding: "20px 18px 32px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", animation: "fadeSlideUp 0.8s ease-out 0.2s both" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 100, padding: "6px 14px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
            color: "#00ff88", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, background: "#00ff88", borderRadius: "50%", boxShadow: "0 0 8px #00ff88", animation: "blink 2s ease-in-out infinite" }} />
            Stone Ecosystem
          </div>

          <div onClick={() => handleClick("https://t.me/stonemvp")} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
            background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,229,255,0.1))",
            border: "1px solid rgba(0,255,136,0.2)", borderRadius: 12,
            fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 11, color: "#fff",
            cursor: "pointer", backdropFilter: "blur(12px)",
          }}>
            📬 Контакты
          </div>
        </div>

        {/* Title */}
        <div style={{ animation: "fadeSlideUp 0.9s ease-out 0.4s both", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: "center" }}>
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 38, fontWeight: 900, color: "#fff" }}>TG</span>
            <GlitchTitle text="STONE" />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(224,240,232,0.4)", lineHeight: 1.6, marginTop: 8 }}>
            Экосистема проектов в Telegram — автоматизация, AI-инструменты, торговая площадка каналов и комьюнити
          </p>
        </div>

        {/* Service pills */}
        <div style={{ animation: "fadeSlideUp 0.8s ease-out 0.6s both" }}>
          <ServicePills />
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 0, border: "1px solid rgba(0,255,136,0.12)",
          borderRadius: 12, overflow: "hidden", animation: "fadeSlideUp 0.8s ease-out 0.8s both, borderPulse 4s ease-in-out infinite",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "14px 8px",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(0,255,136,0.08)" : "none",
              background: "rgba(0,255,136,0.02)",
            }}>
              <div style={{
                fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 900,
                color: "#00ff88", textShadow: "0 0 12px rgba(0,255,136,0.4)", lineHeight: 1.2,
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#3a6a50",
                marginTop: 3, textTransform: "uppercase", letterSpacing: "0.05em",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "fadeSlideUp 0.8s ease-out 1s both" }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,255,136,0.3), transparent)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "#00ff8850", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            sys.projects
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, rgba(0,255,136,0.3), transparent)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={handleClick} />
          ))}
        </div>

        {/* Website CTA */}
        <div onClick={() => {
          if (window.Telegram?.WebApp?.HapticFeedback) window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
          if (window.Telegram?.WebApp?.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink("https://t.me/stonemvp");
          } else {
            window.open("https://t.me/stonemvp", "_blank");
          }
        }} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "15px 24px", borderRadius: 14, cursor: "pointer",
          background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,229,255,0.08))",
          border: "1px solid rgba(0,255,136,0.2)",
          boxShadow: "0 0 20px rgba(0,255,136,0.08), 0 0 40px rgba(0,229,255,0.04)",
          position: "relative", overflow: "hidden",
          animation: "fadeSlideUp 0.8s ease-out 1.2s both",
        }}>
          <span style={{ fontSize: 16 }}>🌐</span>
          <span style={{
            fontFamily: "'Unbounded', sans-serif", fontSize: 14, fontWeight: 700,
            color: "#00ff88", textShadow: "0 0 10px rgba(0,255,136,0.4)",
          }}>tgstone.media</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700,
            color: "#050a08", background: "#00e5ff", padding: "3px 10px", borderRadius: 4,
            boxShadow: "0 0 10px rgba(0,229,255,0.5)", textTransform: "uppercase",
          }}>скоро</span>
        </div>

        {/* Gradient bar */}
        <div style={{
          width: "100%", height: 3, borderRadius: 2,
          background: "linear-gradient(90deg, #00ff88, #00e5ff, #39ff14, #00ffcc, #00ff88)",
          backgroundSize: "300% 100%",
          animation: "gradientBar 4s linear infinite",
          marginTop: 4,
        }} />

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#1a3a28" }}>
            {'>'} built with 🪨 by Stone _ © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
