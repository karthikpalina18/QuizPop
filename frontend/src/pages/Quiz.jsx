// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../api";

// /* ─── THEME SYSTEM (FIXED) ───────────────────────── */
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

//     btnPrimary: e ? "bg-green-600 text-white" : "bg-pink-500 text-white",
//     btnYellow: "bg-yellow-400 text-black",
//     btnGhost: "border border-gray-400 text-gray-400",

//     optBase: "border p-3 rounded cursor-pointer",
//     optSel: "border-2 border-pink-500 bg-pink-100",

//     badge: "bg-pink-500 text-white px-2 py-1 rounded",

//     barBg: "bg-gray-300",
//     bar: "bg-pink-500",

//     navActive: "bg-pink-500 text-white",
//     navInactive: "bg-gray-200",

//     pillActive: "bg-pink-500 text-white",
//     pillInactive: "border text-gray-500",

//     dot: "bg-pink-500",
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

// /* ─── NAVIGATION ───────────────────────── */
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

// /* ─── DEMO QUESTIONS (FALLBACK) ───────────────────────── */
// const DEMO_QS = (topic, count) =>
//   Array.from({ length: count }, (_, i) => ({
//     question: `${topic} Question ${i + 1}`,
//     options: ["Option A", "Option B", "Option C", "Option D"],
//     answer: "Option B",
//   }));

// /* ═════════════════ QUIZ COMPONENT ═════════════════ */
// export default function Quiz() {
//   const [topic, setTopic] = useState("DSA");
//   const [total, setTotal] = useState(5);
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState("");
//   const [score, setScore] = useState(0);
//   const [started, setStarted] = useState(false);
//   const [finished, setFinished] = useState(false);

//   const navigate = useNavigate();
//   const t = useT();

//   /* ─── START QUIZ ───────────────────────── */
//   const startQuiz = async () => {
//     try {
//       const res = await API.get(`/quiz/bulk?topic=${topic}&limit=${total}`);
//       setQuestions(res.data);
//     } catch {
//       setQuestions(DEMO_QS(topic, total));
//     }

//     setStarted(true);
//     setFinished(false);
//     setCurrent(0);
//     setScore(0);
//     setSelected("");
//   };

//   /* ─── NEXT QUESTION ───────────────────────── */
//   const handleNext = () => {
//     if (!selected) return;

//     if (questions[current].answer === selected) {
//       setScore((s) => s + 1);
//     }

//     setSelected("");

//     if (current + 1 >= questions.length) {
//       setFinished(true);
//     } else {
//       setCurrent((c) => c + 1);
//     }
//   };

//   /* ─── RESET ───────────────────────── */
//   const resetQuiz = () => {
//     setStarted(false);
//     setFinished(false);
//     setQuestions([]);
//   };

//   /* ─── SETUP SCREEN ───────────────────────── */
//   if (!started)
//     return (
//       <div className={`min-h-screen p-6 ${t.bg}`}>
//         <ThemeBar t={t} />
//         <NavTabs t={t} />

//         <div className={`p-6 rounded ${t.card}`}>
//           <h2 className={t.text}>Start Quiz</h2>

//           <select
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="mb-4"
//           >
//             <option>DSA</option>
//             <option>DBMS</option>
//             <option>OS</option>
//             <option>CN</option>
//           </select>

//           <input
//             type="number"
//             value={total}
//             onChange={(e) => setTotal(e.target.value)}
//             className="mb-4"
//           />

//           <button onClick={startQuiz} className={t.btnPrimary}>
//             Start Quiz
//           </button>
//         </div>
//       </div>
//     );

//   /* ─── RESULT SCREEN ───────────────────────── */
//   if (finished)
//     return (
//       <div className={`min-h-screen p-6 ${t.bg}`}>
//         <ThemeBar t={t} />
//         <NavTabs t={t} />

//         <div className={`p-6 text-center ${t.card}`}>
//           <h2 className={t.text}>Result</h2>
//           <p className="text-3xl">
//             {score} / {questions.length}
//           </p>

//           <button onClick={resetQuiz} className={t.btnPrimary}>
//             Restart
//           </button>
//         </div>
//       </div>
//     );

//   /* ─── QUIZ SCREEN ───────────────────────── */
//   const q = questions[current];

//   return (
//     <div className={`min-h-screen p-6 ${t.bg}`}>
//       <ThemeBar t={t} />
//       <NavTabs t={t} />

//       <div className={`p-6 rounded ${t.card}`}>
//         <h3 className={t.text}>
//           Question {current + 1} / {questions.length}
//         </h3>

//         <p className="mb-4">{q?.question}</p>

//         {q?.options.map((opt) => (
//           <div
//             key={opt}
//             onClick={() => setSelected(opt)}
//             className={`mb-2 ${
//               selected === opt ? t.optSel : t.optBase
//             }`}
//           >
//             {opt}
//           </div>
//         ))}

//         <button onClick={handleNext} className={t.btnPrimary}>
//           {current + 1 === questions.length ? "Finish" : "Next"}
//         </button>
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
    statCard: e ? "bg-green-950/30 border-green-500/15" : d ? "bg-white/6 border-white/10" : "bg-white/70 border-purple-100/50",
    text:     e ? "text-green-50"  : d ? "text-white"    : "text-slate-800",
    muted:    e ? "text-green-400/70" : d ? "text-slate-400" : "text-slate-500",
    accent:   e ? "text-green-400" : "text-[#e040a0]",
    btnPrimary: e ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white shadow-lg shadow-[#e040a0]/30",
    btnGhost: e ? "border-2 border-green-500/40 text-green-400" : d ? "border-2 border-white/15 text-slate-300" : "border-2 border-purple-200 text-slate-600",
    navActive: e ? "bg-green-600 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    navInactive: d ? "bg-white/8 text-slate-400" : e ? "bg-green-950/30 text-green-400" : "bg-slate-100 text-slate-500",
    themeBtnActive: e ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    themeBtnInactive: d ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-500",
    barBg:    d || e ? "bg-white/10" : "bg-purple-100",
    optBase:  e
      ? "border-green-500/20 bg-green-950/30 text-green-50 hover:border-green-400/60 hover:bg-green-900/40"
      : d
      ? "border-white/10 bg-white/5 text-white hover:border-[#e040a0]/50 hover:bg-[#e040a0]/8"
      : "border-purple-100 bg-white/60 text-slate-800 hover:border-[#e040a0]/50 hover:bg-[#e040a0]/5",
    optSel:   e
      ? "border-green-400 bg-green-900/50 text-green-50"
      : d
      ? "border-[#e040a0] bg-[#e040a0]/10 text-white"
      : "border-[#e040a0] bg-[#e040a0]/8 text-slate-800",
    optCorrect: "border-emerald-400 bg-emerald-400/10 text-emerald-300",
    optWrong:   "border-red-400 bg-red-400/10 text-red-300",
    letterBase: e ? "bg-green-950/60 text-green-400 border-green-500/20"
                  : d ? "bg-white/8 text-slate-400 border-white/10"
                  : "bg-slate-100 text-slate-500 border-purple-100",
    letterSel:  e ? "bg-green-500 text-white border-green-400"
                  : "bg-gradient-to-br from-[#e040a0] to-[#a855f7] text-white border-transparent",
    letterCorrect: "bg-emerald-500 text-white border-transparent",
    letterWrong:   "bg-red-500 text-white border-transparent",
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
      {items.map((p, i) => (
        <div key={i} style={{
          top: p.top, left: p.left, width: p.size, height: p.size,
          backgroundColor: colors[i % colors.length],
          borderRadius: "50%", position: "absolute", opacity: 0.45,
          animation: `qpFloat ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
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
    { path: "/home",      label: "Home"    },
    { path: "/quiz",      label: "Quiz"    },
    { path: "/dashboard", label: "Stats"   },
    { path: "/profile",   label: "Profile" },
  ];
  return (
    <div className={`flex gap-1.5 mb-6 p-1.5 rounded-2xl qp-fu1 ${t.d ? "bg-white/5" : t.e ? "bg-green-950/30" : "bg-white/60"}`}>
      {tabs.map(tab => (
        <button key={tab.path} onClick={() => navigate(tab.path)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === tab.path ? t.navActive : t.navInactive}`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Progress Bar ───────────────────────── */
function ProgressBar({ current, total, t }) {
  const pct = total > 0 ? ((current) / total) * 100 : 0;
  return (
    <div className="mb-6 qp-fu2">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs font-bold ${t.muted}`}>Question {current + 1} of {total}</span>
        <span className={`text-xs font-bold ${t.accent}`}>{Math.round(pct)}% done</span>
      </div>
      <div className={`h-1.5 rounded-full ${t.barBg}`}>
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: t.e
              ? "linear-gradient(90deg,#22c55e,#4ade80)"
              : "linear-gradient(90deg,#e040a0,#a855f7)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Donut (Result) ───────────────────────── */
function ResultDonut({ correct, total, color }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const r = 44, cx = 52, cy = 52, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex justify-center mb-4">
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 1.2s ease" }}/>
        <text x={cx} y={cy - 5} textAnchor="middle" fill="white" fontSize="18" fontWeight="600">{pct}%</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">accuracy</text>
      </svg>
    </div>
  );
}

/* ─── Demo questions ───────────────────────── */
const DEMO_QS = (topic, count) =>
  Array.from({ length: count }, (_, i) => ({
    question: `${topic} — Sample question ${i + 1}: What is the correct answer?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
  }));

const TOPICS = [
  { id: "DSA",  label: "Data Structures" },
  { id: "DBMS", label: "Databases"       },
  { id: "OS",   label: "Operating Sys."  },
  { id: "CN",   label: "Networks"        },
];

const LETTERS = ["A", "B", "C", "D"];

/* ═════════════════ QUIZ COMPONENT ═════════════════ */
export default function Quiz() {
  const [topic,    setTopic]    = useState("DSA");
  const [total,    setTotal]    = useState(5);
  const [questions, setQuestions] = useState([]);
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score,    setScore]    = useState(0);
  const [answers,  setAnswers]  = useState([]);
  const [started,  setStarted]  = useState(false);
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();
  const t = useT();

  const accentColor = t.e ? "#22c55e" : "#e040a0";

  /* ─── Start ───────────────────────── */
  const startQuiz = async () => {
    try {
      const res = await API.get(`/quiz/bulk?topic=${topic}&limit=${total}`);
      setQuestions(res.data);
    } catch {
      setQuestions(DEMO_QS(topic, total));
    }
    setStarted(true);
    setFinished(false);
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
  };

  /* ─── Select option ───────────────────────── */
  const handleSelect = (opt) => {
    if (revealed) return;
    setSelected(opt);
  };

  /* ─── Reveal + advance ───────────────────────── */
  const handleNext = () => {
    if (!selected || revealed) return;
    const correct = questions[current].answer === selected;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: questions[current].question, sel: selected, ans: questions[current].answer, ok: correct }]);
    setRevealed(true);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setRevealed(false);
      }
    }, 900);
  };

  /* ─── Reset ───────────────────────── */
  const resetQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setAnswers([]);
  };

  /* ─── Option style ───────────────────────── */
  const optClass = (opt) => {
    if (!revealed) {
      return selected === opt ? t.optSel : t.optBase;
    }
    if (opt === questions[current]?.answer) return t.optCorrect;
    if (opt === selected) return t.optWrong;
    return t.optBase + " opacity-40";
  };

  const letterClass = (opt) => {
    if (!revealed) {
      return selected === opt ? t.letterSel : t.letterBase;
    }
    if (opt === questions[current]?.answer) return t.letterCorrect;
    if (opt === selected) return t.letterWrong;
    return t.letterBase + " opacity-40";
  };

  /* ══════════ SETUP SCREEN ══════════ */
  if (!started)
    return (
      <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
        <Particles t={t}/>
        <div className="relative z-10 max-w-md mx-auto px-4 pt-5">
          <ThemeBar t={t}/>
          <NavTabs t={t}/>

          <div className="qp-fu2 mb-6">
            <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.muted}`}>Practice</p>
            <h1 className={`text-2xl font-black ${t.text}`}>
              Start a <span className={t.accent}>Quiz</span>
            </h1>
          </div>

          {/* Topic picker */}
          <div className={`qp-fu3 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}>
            <p className={`text-xs font-black mb-3 ${t.muted}`}>Select topic</p>
            <div className="grid grid-cols-2 gap-2">
              {TOPICS.map(tp => (
                <button
                  key={tp.id}
                  onClick={() => setTopic(tp.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 ${
                    topic === tp.id
                      ? (t.e ? "border-green-400 bg-green-900/50" : "border-[#e040a0] bg-[#e040a0]/10")
                      : (t.d ? "border-white/10 bg-white/5" : t.e ? "border-green-500/20 bg-green-950/20" : "border-purple-100 bg-white/50")
                  }`}>
                  <p className={`text-xs font-black ${t.muted}`}>{tp.id}</p>
                  <p className={`text-sm font-bold mt-0.5 ${t.text}`}>{tp.label}</p>
                  {topic === tp.id && (
                    <div className={`w-4 h-4 rounded-full mt-2 flex items-center justify-center text-white text-xs ${t.e ? "bg-green-500" : "bg-[#e040a0]"}`}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Count picker */}
          <div className={`qp-fu4 p-5 rounded-3xl border-2 mb-5 backdrop-blur-md ${t.card}`}>
            <p className={`text-xs font-black mb-3 ${t.muted}`}>Number of questions</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTotal(n => Math.max(3, n - 1))}
                className={`w-10 h-10 rounded-xl border-2 font-bold text-lg transition-all active:scale-95 ${t.d ? "border-white/15 bg-white/8 text-white" : t.e ? "border-green-500/30 bg-green-950/30 text-green-400" : "border-purple-200 bg-white/60 text-slate-700"}`}>
                −
              </button>
              <span className={`text-3xl font-black flex-1 text-center ${t.text}`}>{total}</span>
              <button
                onClick={() => setTotal(n => Math.min(10, n + 1))}
                className={`w-10 h-10 rounded-xl border-2 font-bold text-lg transition-all active:scale-95 ${t.d ? "border-white/15 bg-white/8 text-white" : t.e ? "border-green-500/30 bg-green-950/30 text-green-400" : "border-purple-200 bg-white/60 text-slate-700"}`}>
                +
              </button>
            </div>
            <p className={`text-xs mt-2 text-center ${t.muted}`}>3 – 10 questions</p>
          </div>

          <button onClick={startQuiz}
            className={`qp-fu5 w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 ${t.btnPrimary}`}>
            Begin Quiz
          </button>
        </div>
      </div>
    );

  /* ══════════ RESULT SCREEN ══════════ */
  if (finished)
    return (
      <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
        <Particles t={t}/>
        <div className="relative z-10 max-w-md mx-auto px-4 pt-5">
          <ThemeBar t={t}/>
          <NavTabs t={t}/>

          <div className="qp-fu2 mb-6">
            <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.muted}`}>Complete</p>
            <h1 className={`text-2xl font-black ${t.text}`}>
              Your <span className={t.accent}>Result</span>
            </h1>
          </div>

          {/* Score card */}
          <div className={`qp-fu3 p-6 rounded-3xl border-2 mb-4 backdrop-blur-md text-center ${t.card}`}
            style={{ boxShadow: "0 16px 48px rgba(14,10,30,0.4)" }}>
            <ResultDonut correct={score} total={questions.length} color={accentColor}/>
            <p className={`text-3xl font-black ${t.text}`}>{score} / {questions.length}</p>
            <p className={`text-sm mt-1 ${t.muted}`}>
              {score / questions.length >= 0.8
                ? "Excellent performance"
                : score / questions.length >= 0.5
                ? "Good effort — keep going"
                : "Keep practicing — you'll get there"}
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: "Accuracy",  val: `${Math.round((score / questions.length) * 100)}%` },
                { label: "Correct",   val: score },
                { label: "Wrong",     val: questions.length - score },
              ].map(s => (
                <div key={s.label} className={`p-3 rounded-2xl ${t.statCard} border-2`}>
                  <p className={`text-xl font-black ${t.text}`}>{s.val}</p>
                  <p className={`text-xs ${t.muted}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Answer review */}
          <div className={`qp-fu4 p-5 rounded-3xl border-2 mb-5 backdrop-blur-md ${t.card}`}>
            <p className={`text-sm font-black mb-4 ${t.text}`}>Review answers</p>
            <div className="flex flex-col gap-3">
              {answers.map((a, i) => (
                <div key={i} className={`p-3.5 rounded-2xl border-2 ${
                  a.ok
                    ? (t.d ? "border-emerald-500/30 bg-emerald-500/8" : "border-emerald-400/50 bg-emerald-50")
                    : (t.d ? "border-red-500/30 bg-red-500/8" : "border-red-400/50 bg-red-50")
                }`}>
                  <p className={`text-xs font-bold mb-1.5 ${t.text}`}>{a.q}</p>
                  {a.ok ? (
                    <p className="text-xs text-emerald-400 font-bold">Correct — {a.ans}</p>
                  ) : (
                    <p className="text-xs text-red-400 font-bold">
                      You chose {a.sel} &middot; <span className="text-emerald-400">Correct: {a.ans}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 qp-fu5">
            <button onClick={resetQuiz}
              className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 ${t.btnPrimary}`}>
              Try Again
            </button>
            <button onClick={() => navigate("/dashboard")}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${t.btnGhost}`}>
              View Stats
            </button>
          </div>
        </div>
      </div>
    );

  /* ══════════ QUIZ SCREEN ══════════ */
  const q = questions[current];

  return (
    <div className={`min-h-screen pb-8 transition-colors duration-300 ${t.bg}`}>
      <Particles t={t}/>
      <div className="relative z-10 max-w-md mx-auto px-4 pt-5">
        <ThemeBar t={t}/>
        <NavTabs t={t}/>

        <ProgressBar current={current} total={questions.length} t={t}/>

        {/* Question card */}
        <div className={`qp-fu3 p-5 rounded-3xl border-2 mb-4 backdrop-blur-md ${t.card}`}
          style={{ boxShadow: "0 16px 48px rgba(14,10,30,0.4)" }}>
          <p className={`text-xs font-black mb-3 uppercase tracking-widest ${t.accent}`}>{topic}</p>
          <p className={`text-base font-bold leading-relaxed mb-5 ${t.text}`}>{q?.question}</p>

          <div className="flex flex-col gap-2.5">
            {q?.options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={revealed}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.99] ${optClass(opt)}`}>
                <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-200 ${letterClass(opt)}`}>
                  {LETTERS[i]}
                </span>
                <span className="text-sm font-semibold">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Next / Finish button */}
        <button
          onClick={handleNext}
          disabled={!selected || revealed}
          className={`qp-fu4 w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 active:scale-95 ${
            selected && !revealed
              ? t.btnPrimary
              : (t.d ? "bg-white/5 text-slate-500 cursor-not-allowed" : "bg-slate-100 text-slate-400 cursor-not-allowed")
          }`}>
          {current + 1 === questions.length ? "See Results" : "Continue"}
        </button>
      </div>
    </div>
  );
}