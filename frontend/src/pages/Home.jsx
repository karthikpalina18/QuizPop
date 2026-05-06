// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// /* ─── LOCAL THEME (FIXED) ───────────────────────── */
// function useT() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "dark"
//   );

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const e = theme === "eco";
//   const d = theme === "dark";

//   return {
//     theme,
//     setTheme,
//     e,
//     d,
//     bg: e
//       ? "bg-[#061209]"
//       : d
//       ? "bg-[#0d1117]"
//       : "bg-[#f0f4ff]",
//     card: e
//       ? "bg-green-950/40 border-green-500/15"
//       : d
//       ? "bg-white/5 border-white/10"
//       : "bg-white/85 border-purple-100/60",
//     text: e ? "text-green-50" : d ? "text-white" : "text-slate-800",
//     muted: e
//       ? "text-green-500/70"
//       : d
//       ? "text-slate-400"
//       : "text-slate-500",
//     statCard: e
//       ? "bg-green-950/30 border-green-500/15"
//       : d
//       ? "bg-white/5 border-white/10"
//       : "bg-white/70 border-purple-100/50",
//     btnPrimary: e
//       ? "bg-green-600 text-white"
//       : "bg-[#e040a0] text-white",
//     btnGhost: "border border-gray-400 text-gray-400",
//     dot: e ? "bg-green-500" : "bg-[#e040a0]",
//     navActive: "bg-[#e040a0] text-white",
//     navInactive: "bg-gray-200 text-gray-600",
//   };
// }

// /* ─── THEME BAR ───────────────────────── */
// function ThemeBar({ t }) {
//   return (
//     <div className="flex gap-2 mb-4">
//       {["dark", "light", "eco"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => t.setTheme(tab)}
//           className={`px-3 py-1 rounded ${
//             t.theme === tab ? "bg-pink-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ─── NAV TABS ───────────────────────── */
// function NavTabs({ t }) {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const tabs = [
//     { path: "/home", label: "Home" },
//     { path: "/quiz", label: "Quiz" },
//     { path: "/dashboard", label: "Stats" },
//     { path: "/profile", label: "Profile" },
//   ];

//   return (
//     <div className="flex gap-2 mb-4">
//       {tabs.map((tab) => (
//         <button
//           key={tab.path}
//           onClick={() => navigate(tab.path)}
//           className={`flex-1 py-2 rounded ${
//             pathname === tab.path ? t.navActive : t.navInactive
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ═════════════════ MAIN PAGE ═════════════════ */
// export default function Home() {
//   const navigate = useNavigate();
//   const t = useT();

//   const stats = [
//     { num: "42", label: "Attempts" },
//     { num: "36", label: "Correct" },
//     { num: "86%", label: "Accuracy" },
//   ];

//   return (
//     <div className={`min-h-screen p-6 ${t.bg}`}>
//       <div className="max-w-md mx-auto">

//         <ThemeBar t={t} />
//         <NavTabs t={t} />

//         <div className={`p-6 rounded ${t.card}`}>
//           <h2 className={`text-xl mb-2 ${t.text}`}>
//             Ready to start quiz? 🎯
//           </h2>

//           <button
//             onClick={() => navigate("/quiz")}
//             className={`w-full py-3 mb-2 rounded ${t.btnPrimary}`}
//           >
//             Start Quiz
//           </button>

//           <button
//             onClick={() => navigate("/profile")}
//             className={`w-full py-3 rounded ${t.btnGhost}`}
//           >
//             Profile
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-2 mt-4">
//           {stats.map((s) => (
//             <div key={s.label} className={`p-3 rounded ${t.statCard}`}>
//               <h3 className="text-xl">{s.num}</h3>
//               <p className={`text-xs ${t.muted}`}>{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ─── Theme ───────────────────────── */
function useT() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);
  const e = theme === "eco", d = theme === "dark";
  return {
    theme, setTheme, e, d,
    bg:       e ? "bg-[#061209]"   : d ? "bg-[#0a0d1a]"  : "bg-[#f0f4ff]",
    card:     e ? "bg-green-950/40 border-green-500/15" : d ? "bg-white/5 border-white/8" : "bg-white border-purple-100/60",
    statCard: e ? "bg-green-950/30 border-green-500/15" : d ? "bg-white/6 border-white/10" : "bg-white/70 border-purple-100/50",
    text:     e ? "text-green-50"  : d ? "text-white"    : "text-slate-800",
    muted:    e ? "text-green-400/70" : d ? "text-slate-400" : "text-slate-500",
    accent:   e ? "text-green-400" : "text-[#e040a0]",
    accentBg: e ? "bg-green-500"   : "bg-[#e040a0]",
    btnPrimary: e ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white shadow-lg shadow-[#e040a0]/30",
    btnGhost: e ? "border-2 border-green-500/40 text-green-400" : d ? "border-2 border-white/15 text-slate-300" : "border-2 border-purple-200 text-slate-600",
    navActive: e ? "bg-green-600 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    navInactive: d ? "bg-white/8 text-slate-400 hover:bg-white/12" : e ? "bg-green-950/30 text-green-400" : "bg-slate-100 text-slate-500",
    themeBtnActive: e ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    themeBtnInactive: d ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-500",
    bar:      e ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7]",
    barBg:    d || e ? "bg-white/10" : "bg-purple-100",
  };
}

/* ─── Particles ───────────────────────── */
function Particles({ t }) {
  if (t.e) return null;
  const items = [
    { top:"8%",  left:"6%",  size:6, delay:0,   dur:4   },
    { top:"18%", left:"90%", size:8, delay:0.5, dur:5   },
    { top:"55%", left:"4%",  size:4, delay:1,   dur:3.5 },
    { top:"78%", left:"93%", size:6, delay:1.5, dur:4.5 },
    { top:"40%", left:"96%", size:5, delay:0.8, dur:3   },
    { top:"88%", left:"14%", size:7, delay:0.3, dur:5   },
  ];
  const colors = ["#e040a0","#a855f7","#60a5fa","#facc15"];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((p,i) => (
        <div key={i} style={{
          top:p.top, left:p.left, width:p.size, height:p.size,
          backgroundColor:colors[i%colors.length],
          borderRadius:"50%", position:"absolute", opacity:0.45,
          animation:`qpFloat ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
        }}/>
      ))}
      <style>{`
        @keyframes qpFloat { 0%{transform:translateY(0) scale(1);opacity:.3} 100%{transform:translateY(-16px) scale(1.15);opacity:.65} }
        @keyframes qpFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .qp-fu  { animation:qpFadeUp .45s ease forwards; }
        .qp-fu1 { animation:qpFadeUp .45s .08s ease forwards; opacity:0; }
        .qp-fu2 { animation:qpFadeUp .45s .16s ease forwards; opacity:0; }
        .qp-fu3 { animation:qpFadeUp .45s .24s ease forwards; opacity:0; }
        .qp-fu4 { animation:qpFadeUp .45s .32s ease forwards; opacity:0; }
        .qp-fu5 { animation:qpFadeUp .45s .40s ease forwards; opacity:0; }
      `}</style>
    </div>
  );
}

/* ─── ThemeBar ───────────────────────── */
function ThemeBar({ t }) {
  return (
    <div className="flex gap-2 mb-5 qp-fu">
      {[["dark","🌙"],["light","☀️"],["eco","🌿"]].map(([id,icon]) => (
        <button key={id} onClick={() => t.setTheme(id)}
          className={`flex-1 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${t.theme===id ? t.themeBtnActive : t.themeBtnInactive}`}>
          {icon} {id.charAt(0).toUpperCase()+id.slice(1)}
        </button>
      ))}
    </div>
  );
}

/* ─── NavTabs ───────────────────────── */
function NavTabs({ t }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = [
    { path:"/home",      icon:"🏠", label:"Home"    },
    { path:"/quiz",      icon:"⚡", label:"Quiz"    },
    { path:"/dashboard", icon:"📊", label:"Stats"   },
    { path:"/profile",   icon:"👤", label:"Profile" },
  ];
  return (
    <div className={`flex gap-1.5 mb-6 p-1.5 rounded-2xl qp-fu1 ${t.d ? "bg-white/5" : t.e ? "bg-green-950/30" : "bg-white/60"}`}>
      {tabs.map(tab => (
        <button key={tab.path} onClick={() => navigate(tab.path)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center gap-0.5 ${pathname===tab.path ? t.navActive : t.navInactive}`}>
          {/* <span className="text-sm">{tab.icon}</span> */}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── Mini Sparkline ───────────────────────── */
function Sparkline({ data, color }) {
  const w = 120, h = 36;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i) => {
    const x = (i / (data.length-1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]} r="3" fill={color}/>
    </svg>
  );
}

/* ─── Radial Progress ───────────────────────── */
function RadialProgress({ value, color, size=80 }) {
  const r = 30, cx = 40, cy = 40;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{transition:"stroke-dasharray 1s ease"}}/>
      <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize="13" fontWeight="bold">{value}%</text>
    </svg>
  );
}

/* ═════════════════ HOME PAGE ═════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const t = useT();

  const stats = [
    { num:"42", label:"Attempts", icon:"🎯", trend:[20,28,32,38,40,42], delta:"+5 this week" },
    { num:"36", label:"Correct",  icon:"✅", trend:[15,22,25,30,33,36], delta:"+4 this week" },
    { num:"86%",label:"Accuracy", icon:"🔥", trend:[60,70,72,80,84,86], delta:"+2% this week"},
  ];

  const recentTopics = [
    { name:"DSA",   score:90, color:"#e040a0" },
    { name:"DBMS",  score:74, color:"#a855f7" },
    { name:"OS",    score:60, color:"#60a5fa" },
    { name:"CN",    score:82, color:"#34d399" },
  ];

  return (
    <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
      <Particles t={t}/>
      <div className="relative z-10 max-w-md mx-auto px-4 pt-5">

        <ThemeBar t={t}/>
        <NavTabs t={t}/>

        {/* Header */}
        <div className="qp-fu2 mb-6 flex items-center justify-between">
          <div>
            <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.muted}`}>Welcome back 👋</p>
            <h1 className={`text-2xl font-black ${t.text}`}>Ready to <span className={t.accent}>Pop</span> a Quiz?</h1>
          </div>
          {!t.e && (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e040a0] to-[#a855f7] flex items-center justify-center text-2xl shadow-lg shadow-[#e040a0]/30">
              🧠
            </div>
          )}
        </div>

        {/* CTA Card */}
        <div className={`qp-fu3 p-6 rounded-3xl border-2 mb-5 backdrop-blur-md ${t.card}`}
          style={{boxShadow: t.e ? "0 16px 48px rgba(34,197,94,0.1)" : "0 16px 48px rgba(14,10,30,0.4)"}}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-lg font-black mb-1 ${t.text}`}>Daily Challenge</h2>
              <p className={`text-xs ${t.muted}`}>Streak: 🔥 5 days</p>
            </div>
            <RadialProgress value={86} color={t.e ? "#22c55e" : "#e040a0"} size={72}/>
          </div>
          <button onClick={() => navigate("/quiz")}
            className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 ${t.btnPrimary}`}>
            ⚡ Start Quiz Now
          </button>
          <button onClick={() => navigate("/profile")}
            className={`w-full py-3 mt-2.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${t.btnGhost}`}>
            Edit Profile
          </button>
        </div>

        {/* Stat Cards */}
        <div className="qp-fu4 grid grid-cols-3 gap-3 mb-5">
          {stats.map(s => (
            <div key={s.label} className={`p-3.5 rounded-2xl border-2 ${t.statCard}`}>
              <span className="text-lg">{s.icon}</span>
              <p className={`text-xl font-black mt-1 ${t.text}`}>{s.num}</p>
              <p className={`text-xs font-semibold ${t.muted}`}>{s.label}</p>
              {!t.e && <Sparkline data={s.trend} color={t.e ? "#22c55e" : "#e040a0"}/>}
              <p className={`text-xs mt-1 font-bold ${t.accent}`}>{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Topic Performance */}
        <div className={`qp-fu5 p-5 rounded-3xl border-2 backdrop-blur-md ${t.card}`}>
          <h3 className={`text-sm font-black mb-4 ${t.text}`}>Topic Performance</h3>
          <div className="flex flex-col gap-3">
            {recentTopics.map(tp => (
              <div key={tp.name}>
                <div className="flex justify-between mb-1.5">
                  <span className={`text-xs font-bold ${t.text}`}>{tp.name}</span>
                  <span className={`text-xs font-black ${t.accent}`}>{tp.score}%</span>
                </div>
                <div className={`h-2 rounded-full ${t.barBg}`}>
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width:`${tp.score}%`,
                      background: t.e
                        ? "linear-gradient(90deg,#22c55e,#4ade80)"
                        : `linear-gradient(90deg,${tp.color},${tp.color}99)`,
                    }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}