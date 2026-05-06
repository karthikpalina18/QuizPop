// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../api";

// /* ───────── SIMPLE THEME (NO CRASH) ───────── */
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
//     bg: e ? "bg-[#061209]" : d ? "bg-[#0d1117]" : "bg-[#f0f4ff]",
//     card: e
//       ? "bg-green-950/40 border-green-500/15"
//       : d
//       ? "bg-white/5 border-white/10"
//       : "bg-white border-purple-100",
//     text: e ? "text-green-50" : d ? "text-white" : "text-slate-800",
//     muted: e ? "text-green-400" : d ? "text-slate-400" : "text-slate-500",
//     statCard:
//       "p-4 rounded-xl border text-center transition hover:scale-105",
//     barBg: "bg-gray-200 dark:bg-white/10",
//     bar: "bg-gradient-to-r from-pink-500 to-purple-500",
//     navActive: "bg-pink-500 text-white",
//     navInactive: "border text-gray-500 hover:bg-gray-100",
//   };
// }

// /* ───────── THEME SWITCH ───────── */
// function ThemeBar() {
//   const { theme, setTheme } = useT();

//   return (
//     <div className="flex justify-between mb-4">
//       {["dark", "light", "eco"].map((t) => (
//         <button
//           key={t}
//           onClick={() => setTheme(t)}
//           className={`px-3 py-1 rounded ${
//             theme === t ? "bg-pink-500 text-white" : "border"
//           }`}
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ───────── NAVIGATION ───────── */
// function NavTabs() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const t = useT();

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

// /* ───────── DASHBOARD ───────── */
// export default function Dashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const t = useT();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await API.get("/quiz/stats");
//         setStats(res.data);
//       } catch {
//         console.log("Using fallback stats");

//         setStats({
//           total: 10,
//           correct: 7,
//           accuracy: 70,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className={`min-h-screen p-5 ${t.bg}`}>
//       <ThemeBar />
//       <NavTabs />

//       {/* LOADING */}
//       {loading && (
//         <p className={`text-center ${t.muted}`}>Loading stats...</p>
//       )}

//       {/* CONTENT */}
//       {!loading && stats && (
//         <>
//           {/* STATS CARDS */}
//           <div className={`p-5 rounded-xl mb-4 border ${t.card}`}>
//             <h2 className={`text-lg mb-4 font-bold ${t.text}`}>
//               Performance Overview
//             </h2>

//             <div className="grid grid-cols-3 gap-3">
//               <div className={t.statCard}>
//                 <p className={`text-xl font-bold ${t.text}`}>
//                   {stats.total}
//                 </p>
//                 <p className={t.muted}>Attempts</p>
//               </div>

//               <div className={t.statCard}>
//                 <p className={`text-xl font-bold ${t.text}`}>
//                   {stats.correct}
//                 </p>
//                 <p className={t.muted}>Correct</p>
//               </div>

//               <div className={t.statCard}>
//                 <p className={`text-xl font-bold ${t.text}`}>
//                   {stats.accuracy}%
//                 </p>
//                 <p className={t.muted}>Accuracy</p>
//               </div>
//             </div>
//           </div>

//           {/* PROGRESS BAR */}
//           <div className={`p-5 rounded-xl border ${t.card}`}>
//             <p className={`mb-2 ${t.muted}`}>Overall Accuracy</p>

//             <div className={`h-3 rounded ${t.barBg}`}>
//               <div
//                 className={`h-3 rounded ${t.bar}`}
//                 style={{ width: `${stats.accuracy}%` }}
//               />
//             </div>
//           </div>

//           {/* ACTION BUTTON */}
//           <button
//             onClick={() => navigate("/quiz")}
//             className="w-full mt-5 py-3 rounded bg-pink-500 text-white font-bold hover:scale-105 transition"
//           >
//             🚀 Start New Quiz
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";

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
    btnPrimary: e ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white shadow-lg shadow-[#e040a0]/30",
    navActive: e ? "bg-green-600 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    navInactive: d ? "bg-white/8 text-slate-400" : e ? "bg-green-950/30 text-green-400" : "bg-slate-100 text-slate-500",
    themeBtnActive: e ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    themeBtnInactive: d ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-500",
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
        .qp-fu6 { animation:qpFadeUp .45s .48s ease forwards; opacity:0; }
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

/* ─── Donut Chart ───────────────────────── */
function DonutChart({ correct, total, color }) {
  const pct = total > 0 ? Math.round((correct/total)*100) : 0;
  const r = 36, cx = 44, cy = 44, circ = 2*Math.PI*r;
  const dash = (pct/100)*circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{transition:"stroke-dasharray 1.2s ease"}}/>
        <text x={cx} y={cy-4} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{pct}%</text>
        <text x={cx} y={cy+10} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">accuracy</text>
      </svg>
    </div>
  );
}

/* ─── Bar Chart ───────────────────────── */
function BarChart({ data, color, t }) {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="flex items-end gap-1.5 h-24 mt-2">
      {data.map((d,i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-lg transition-all duration-700 relative group"
            style={{
              height:`${(d.val/max)*72}px`,
              minHeight:"4px",
              background: t.e
                ? "linear-gradient(180deg,#22c55e,#16a34a)"
                : `linear-gradient(180deg,${color},${color}88)`,
            }}>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{color}}>
              {d.val}
            </span>
          </div>
          <span className={`text-xs font-bold ${t.muted}`} style={{fontSize:"9px"}}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Line Sparkline ───────────────────────── */
function LineChart({ data, color, w=240, h=60 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*w;
    const y = h - ((v-min)/(max-min||1))*(h-8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const area = `M 0,${h} L ${pts.split(" ").map(p => p).join(" L ")} L ${w},${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v,i) => {
        const x = (i/(data.length-1))*w;
        const y = h - ((v-min)/(max-min||1))*(h-8) - 4;
        return <circle key={i} cx={x} cy={y} r="3" fill={color}/>;
      })}
    </svg>
  );
}

/* ═════════════════ DASHBOARD PAGE ═════════════════ */
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("week");
  const navigate = useNavigate();
  const t = useT();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/quiz/stats");
        setStats(res.data);
      } catch {
        setStats({ total:42, correct:36, accuracy:86 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const weekData = [
    {label:"Mon",val:6},{label:"Tue",val:4},{label:"Wed",val:8},
    {label:"Thu",val:5},{label:"Fri",val:9},{label:"Sat",val:4},{label:"Sun",val:6},
  ];
  const trendData = [62,68,70,74,79,82,86];
  const topicData = [
    {name:"DSA",  score:90, color:"#e040a0"},
    {name:"DBMS", score:74, color:"#a855f7"},
    {name:"OS",   score:60, color:"#60a5fa"},
    {name:"CN",   score:82, color:"#34d399"},
    {name:"OOP",  score:88, color:"#facc15"},
    {name:"Math", score:55, color:"#f87171"},
  ];

  const accentColor = t.e ? "#22c55e" : "#e040a0";

  return (
    <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
      <Particles t={t}/>
      <div className="relative z-10 max-w-md mx-auto px-4 pt-5">

        <ThemeBar t={t}/>
        <NavTabs t={t}/>

        {/* Header */}
        <div className="qp-fu2 mb-6">
          <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.muted}`}>Your Progress</p>
          <h1 className={`text-2xl font-black ${t.text}`}>Performance <span className={t.accent}>Stats</span></h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#e040a0] rounded-full animate-spin"/>
            <p className={`text-sm ${t.muted}`}>Loading stats…</p>
          </div>
        ) : stats && (
          <>
            {/* Main Overview Card */}
            <div className={`qp-fu3 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}
              style={{boxShadow:"0 16px 48px rgba(14,10,30,0.4)"}}>
              <h2 className={`text-sm font-black mb-4 ${t.text}`}>Performance Overview</h2>
              <div className="flex items-center gap-4">
                <DonutChart correct={stats.correct} total={stats.total} color={accentColor}/>
                <div className="flex-1 flex flex-col gap-3">
                  {[
                    {label:"Total Attempts", val:stats.total, icon:"🎯"},
                    {label:"Correct",        val:stats.correct, icon:"✅"},
                    {label:"Accuracy",       val:`${stats.accuracy}%`, icon:"🔥"},
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className={`text-xs ${t.muted}`}>{item.icon} {item.label}</span>
                      <span className={`text-sm font-black ${t.text}`}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accuracy Trend */}
            <div className={`qp-fu4 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-black ${t.text}`}>Accuracy Trend</h3>
                <div className={`flex gap-1 p-1 rounded-xl ${t.d ? "bg-white/8" : t.e ? "bg-green-950/30" : "bg-slate-100"}`}>
                  {["week","month"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${activeTab===tab ? t.themeBtnActive : t.themeBtnInactive}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <LineChart data={trendData} color={accentColor}/>
              <div className="flex justify-between mt-2">
                {["M","T","W","T","F","S","S"].map((d,i) => (
                  <span key={i} className={`text-xs font-bold flex-1 text-center ${t.muted}`}>{d}</span>
                ))}
              </div>
            </div>

            {/* Daily Activity */}
            <div className={`qp-fu5 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}>
              <h3 className={`text-sm font-black mb-1 ${t.text}`}>Daily Activity</h3>
              <p className={`text-xs mb-3 ${t.muted}`}>Questions answered per day</p>
              <BarChart data={weekData} color={accentColor} t={t}/>
            </div>

            {/* Topic Breakdown */}
            <div className={`qp-fu6 p-5 rounded-3xl border-2 mb-5 backdrop-blur-md ${t.card}`}>
              <h3 className={`text-sm font-black mb-4 ${t.text}`}>Topic Breakdown</h3>
              <div className="flex flex-col gap-3">
                {topicData.map(tp => (
                  <div key={tp.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className={`text-xs font-bold ${t.text}`}>{tp.name}</span>
                      <span className="text-xs font-black" style={{color: t.e ? "#22c55e" : tp.color}}>{tp.score}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${t.barBg}`}>
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{
                          width:`${tp.score}%`,
                          background: t.e ? "linear-gradient(90deg,#22c55e,#4ade80)" : `linear-gradient(90deg,${tp.color},${tp.color}88)`,
                        }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={() => navigate("/quiz")}
              className={`qp-fu6 w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 ${t.btnPrimary}`}>
              🚀 Start New Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}