// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../api";

// /* ─── LOCAL THEME FIX ───────────────────────── */
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
//       : "bg-white/85 border-purple-100/60",
//     text: e ? "text-green-50" : d ? "text-white" : "text-slate-800",
//     muted: e ? "text-green-500/70" : d ? "text-slate-400" : "text-slate-500",
//     inp: "border p-3 rounded w-full",
//     btnPrimary: e
//       ? "bg-green-600 text-white"
//       : "bg-[#e040a0] text-white",
//     btnGhost: "border border-gray-400 text-gray-400",
//     dot: e ? "bg-green-500" : "bg-[#e040a0]",
//     pillActive: "bg-pink-500 text-white",
//     pillInactive: "border text-gray-500",
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

// /* ─── NAV ───────────────────────── */
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

// /* ─── TOPICS ───────────────────────── */
// const ALL_TOPICS = ["DSA","DBMS","OS","CN","OOP","Math","ML","Web"];

// /* ═════════════ PROFILE PAGE ═════════════ */
// export default function Profile() {
//   const [level, setLevel] = useState("beginner");
//   const [topics, setTopics] = useState(["DSA"]);
//   const [saving, setSaving] = useState(false);

//   const navigate = useNavigate();
//   const t = useT();

//   const toggleTopic = (tp) => {
//     setTopics((prev) =>
//       prev.includes(tp)
//         ? prev.filter((x) => x !== tp)
//         : [...prev, tp]
//     );
//   };

//   const handleSubmit = async () => {
//     setSaving(true);
//     try {
//       await API.put("/user/profile", {
//         topics,
//         skillLevel: level,
//       });
//       navigate("/home");
//     } catch {
//       alert("Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen p-6 ${t.bg}`}>
//       <div className="max-w-md mx-auto">

//         <ThemeBar t={t} />
//         <NavTabs t={t} />

//         <div className={`p-6 rounded ${t.card}`}>

//           <h2 className={`text-lg mb-2 ${t.text}`}>
//             Profile Settings
//           </h2>

//           {/* LEVEL */}
//           <select
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             className="mb-4"
//           >
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>

//           {/* TOPICS */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {ALL_TOPICS.map((tp) => (
//               <button
//                 key={tp}
//                 onClick={() => toggleTopic(tp)}
//                 className={`px-3 py-1 rounded ${
//                   topics.includes(tp)
//                     ? t.pillActive
//                     : t.pillInactive
//                 }`}
//               >
//                 {tp}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className={`w-full py-3 mb-2 rounded ${t.btnPrimary}`}
//           >
//             {saving ? "Saving..." : "Save"}
//           </button>

//           <button
//             onClick={() => navigate("/home")}
//             className={`w-full py-3 rounded ${t.btnGhost}`}
//           >
//             Back
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
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
    text:     e ? "text-green-50"  : d ? "text-white"    : "text-slate-800",
    muted:    e ? "text-green-400/70" : d ? "text-slate-400" : "text-slate-500",
    accent:   e ? "text-green-400" : "text-[#e040a0]",
    inp:      e ? "bg-green-950/30 border-green-500/20 text-green-50 focus:border-green-400"
                : d ? "bg-white/6 border-white/12 text-white focus:border-[#e040a0]"
                : "bg-white border-purple-200 text-slate-800 focus:border-[#e040a0]",
    btnPrimary: e ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white shadow-lg shadow-[#e040a0]/30",
    btnGhost: e ? "border-2 border-green-500/40 text-green-400" : d ? "border-2 border-white/15 text-slate-300" : "border-2 border-purple-200 text-slate-600",
    pillActive:   e ? "bg-green-600 text-white border-green-500" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white border-transparent",
    pillInactive: d ? "border-white/15 text-slate-400 bg-white/5" : e ? "border-green-500/20 text-green-400/70 bg-green-950/20" : "border-purple-200 text-slate-500 bg-white/60",
    navActive: e ? "bg-green-600 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    navInactive: d ? "bg-white/8 text-slate-400" : e ? "bg-green-950/30 text-green-400" : "bg-slate-100 text-slate-500",
    themeBtnActive: e ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    themeBtnInactive: d ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-500",
    levelCard: (active) => active
      ? (e ? "border-green-500 bg-green-900/40" : "border-[#e040a0] bg-[#e040a0]/10")
      : (d ? "border-white/10 bg-white/4" : "border-purple-100 bg-white/50"),
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

const ALL_TOPICS = [
  {id:"DSA",  icon:"🌳"},
  {id:"DBMS", icon:"🗄️"},
  {id:"OS",   icon:"💻"},
  {id:"CN",   icon:"🌐"}
  
];

const LEVELS = [
  {id:"beginner",     icon:"🌱", label:"Beginner",     desc:"Just starting out" },
  {id:"intermediate", icon:"⚡", label:"Intermediate",  desc:"Know the basics"   },
  {id:"advanced",     icon:"🔥", label:"Advanced",      desc:"Quiz master"       },
];

/* ═════════════════ PROFILE PAGE ═════════════════ */
export default function Profile() {
  const [level, setLevel] = useState("beginner");
  const [topics, setTopics] = useState(["DSA"]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const t = useT();

  const toggleTopic = (tp) => {
    setTopics(prev => prev.includes(tp) ? prev.filter(x => x !== tp) : [...prev, tp]);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await API.put("/user/profile", { topics, skillLevel: level });
      navigate("/home");
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
      <Particles t={t}/>
      <div className="relative z-10 max-w-md mx-auto px-4 pt-5">

        <ThemeBar t={t}/>
        <NavTabs t={t}/>

        {/* Header */}
        <div className="qp-fu2 mb-6">
          <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.muted}`}>Customize</p>
          <h1 className={`text-2xl font-black ${t.text}`}>Your <span className={t.accent}>Profile</span></h1>
        </div>

        {/* Avatar Card */}
        <div className={`qp-fu3 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md flex items-center gap-4 ${t.card}`}>
          {!t.e ? (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e040a0] to-[#a855f7] flex items-center justify-center text-3xl shadow-lg shadow-[#e040a0]/30 flex-shrink-0">
              🧠
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl border-2 border-green-500/40 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
          <div>
            <p className={`font-black text-lg ${t.text}`}>Quiz Player</p>
            <p className={`text-xs ${t.muted}`}>{topics.length} topic{topics.length !== 1 ? "s" : ""} selected · {level}</p>
            <div className="flex gap-1 mt-1.5">
              {topics.slice(0,4).map(tp => (
                <span key={tp} className={`text-xs px-2 py-0.5 rounded-lg font-bold ${t.e ? "bg-green-900/50 text-green-400" : "bg-[#e040a0]/15 text-[#e040a0]"}`}>{tp}</span>
              ))}
              {topics.length > 4 && <span className={`text-xs px-2 py-0.5 rounded-lg font-bold ${t.muted}`}>+{topics.length-4}</span>}
            </div>
          </div>
        </div>

        {/* Skill Level */}
        <div className={`qp-fu4 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}>
          <h3 className={`text-sm font-black mb-3 ${t.text}`}>Skill Level</h3>
          <div className="flex flex-col gap-2">
            {LEVELS.map(lv => (
              <button key={lv.id} onClick={() => setLevel(lv.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all duration-200 text-left ${t.levelCard(level===lv.id)}`}>
                <span className="text-xl">{lv.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-black ${t.text}`}>{lv.label}</p>
                  <p className={`text-xs ${t.muted}`}>{lv.desc}</p>
                </div>
                {level===lv.id && (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${t.e ? "bg-green-500" : "bg-[#e040a0]"} text-white`}>
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className={`qp-fu5 p-5 rounded-3xl border-2 mb-5 backdrop-blur-md ${t.card}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-black ${t.text}`}>Topics</h3>
            <span className={`text-xs font-bold ${t.accent}`}>{topics.length} selected</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {ALL_TOPICS.map(tp => (
              <button key={tp.id} onClick={() => toggleTopic(tp.id)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${topics.includes(tp.id) ? t.pillActive : t.pillInactive}`}>
                {/* <span className="text-lg">{tp.icon}</span> */}
                <span className="text-xs font-bold">{tp.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 qp-fu5">
          <button onClick={handleSubmit} disabled={saving}
            className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-60 ${t.btnPrimary}`}>
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                Saving…
              </span>
            ) : "💾 Save Profile"}
          </button>
          <button onClick={() => navigate("/home")}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${t.btnGhost}`}>
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}