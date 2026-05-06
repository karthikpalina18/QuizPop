import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

/* ─── Theme Helper ───────────────────────── */
function useT() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);

  const e = theme === "eco";
  const d = theme === "dark";

  return {
    theme, setTheme, e, d,
    bg:         e ? "bg-[#061209]"                : d ? "bg-[#0a0d1a]"              : "bg-[#f0f4ff]",
    card:       e ? "bg-green-950/40 border-green-500/15" : d ? "bg-white/5 border-white/8"  : "bg-white border-purple-100/60",
    text:       e ? "text-green-50"               : d ? "text-white"                : "text-slate-800",
    muted:      e ? "text-green-400/70"            : d ? "text-slate-400"            : "text-slate-500",
    inp:        e ? "bg-green-950/30 border-green-500/20 text-green-50 placeholder-green-500/40 focus:border-green-400 focus:ring-green-400/20"
                  : d ? "bg-white/6 border-white/12 text-white placeholder-white/25 focus:border-[#e040a0] focus:ring-[#e040a0]/20"
                  : "bg-white border-purple-200 text-slate-800 placeholder-slate-300 focus:border-[#e040a0] focus:ring-[#e040a0]/20",
    btnPrimary: e ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                  : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white shadow-lg shadow-[#e040a0]/30 hover:shadow-[#e040a0]/50",
    link:       e ? "text-green-400 hover:text-green-300" : "text-[#e040a0] hover:text-[#ec4dc4]",
    accent:     e ? "text-green-400" : "text-[#e040a0]",
    glow:       e ? "shadow-green-500/20" : "shadow-[#e040a0]/20",
    divLine:    e ? "bg-green-500/15" : d ? "bg-white/10" : "bg-purple-100",
    themeBtnActive: e ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#e040a0] to-[#a855f7] text-white",
    themeBtnInactive: d ? "bg-white/10 text-slate-400 hover:bg-white/15" : "bg-slate-100 text-slate-500 hover:bg-slate-200",
  };
}

/* ─── Floating Particles ───────────────────────── */
function Particles({ t }) {
  const items = [
    { top: "10%", left: "8%",  size: 6,  delay: 0,   dur: 4 },
    { top: "20%", left: "88%", size: 8,  delay: 0.5, dur: 5 },
    { top: "55%", left: "5%",  size: 4,  delay: 1,   dur: 3.5 },
    { top: "75%", left: "92%", size: 6,  delay: 1.5, dur: 4.5 },
    { top: "40%", left: "95%", size: 5,  delay: 0.8, dur: 3 },
    { top: "85%", left: "15%", size: 7,  delay: 0.3, dur: 5 },
    { top: "30%", left: "3%",  size: 4,  delay: 2,   dur: 4 },
  ];
  const colors = t.e
    ? ["#22c55e", "#4ade80", "#86efac"]
    : ["#e040a0", "#a855f7", "#60a5fa", "#facc15"];

  if (t.e) return null; // eco: no decorative animations

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((p, i) => (
        <div
          key={i}
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            backgroundColor: colors[i % colors.length],
            borderRadius: "50%",
            position: "absolute",
            opacity: 0.5,
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px) scale(1); opacity: 0.3; }
          100% { transform: translateY(-18px) scale(1.15); opacity: 0.7; }
        }
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224,64,160,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(224,64,160,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224,64,160,0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s ease 0.1s forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.5s ease 0.2s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.5s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.5s ease 0.4s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

/* ─── Theme Switch ───────────────────────── */
function ThemeBar({ t }) {
  const tabs = [
    { id: "dark",  label: "🌙 Dark" },
    { id: "light", label: "☀️ Light" },
    { id: "eco",   label: "🌿 Eco" },
  ];
  return (
    <div className="flex gap-2 mb-8 fade-up">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => t.setTheme(tab.id)}
          className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
            t.theme === tab.id ? t.themeBtnActive : t.themeBtnInactive
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Input Field ───────────────────────── */
function Field({ label, type, value, onChange, placeholder, icon, t }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-5 relative">
      <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 ${t.muted}`}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-base ${focused ? t.accent : t.muted} transition-colors duration-200`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full ${icon ? "pl-11" : "px-4"} pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all duration-200 text-sm ring-4 ring-transparent ${t.inp} ${focused ? "ring-opacity-100" : "ring-opacity-0"}`}
        />
      </div>
    </div>
  );
}

/* ─── Logo ───────────────────────── */
function Logo({ t }) {
  return (
    <div className="flex flex-col items-center mb-8 fade-up">
      {/* Eco mode: no images, no glow, no emoji — saves energy */}
      {!t.e && (
        <div className="relative mb-3">
          <div className="absolute inset-0 rounded-full blur-xl opacity-40 bg-[#e040a0]" />
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#e040a0] to-[#a855f7] shadow-2xl">
            🧠
          </div>
        </div>
      )}
      {t.e && (
        <div className="w-14 h-14 rounded-full border-2 border-green-500/40 flex items-center justify-center mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-green-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
      )}
      <div className="text-center">
        <span className={`text-3xl font-black tracking-tight ${t.text}`}>
          Quiz<span className={t.accent}>Pop</span>
        </span>
        <p className={`text-xs font-semibold tracking-widest uppercase mt-1 ${t.muted}`}>
          {t.e ? "Eco · Low Power Mode" : "Play · Think · Level Up"}
        </p>
      </div>
    </div>
  );
}

/* ═════════════════ MAIN PAGE ═════════════════ */
export default function Login() {
  const t = useT();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${t.bg}`}>
      <Particles t={t} />

      <div className="relative w-full max-w-sm mx-auto z-10">
        <ThemeBar t={t} />
        <Logo t={t} />

        {/* Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl backdrop-blur-md fade-up-1 ${t.card} ${t.glow}`}
          style={{ boxShadow: t.e ? "0 24px 64px rgba(34,197,94,0.12)" : "0 24px 64px rgba(14,10,30,0.5)" }}
        >
          <h2 className={`text-2xl font-black mb-1 fade-up-2 ${t.text}`}>Welcome back 👋</h2>
          <p className={`text-sm mb-7 fade-up-2 ${t.muted}`}>Sign in to continue playing</p>

          <div className="fade-up-3">
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon="✉️"
              t={t}
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon="🔒"
              t={t}
            />
          </div>

          <div className="flex justify-end mb-6 fade-up-3">
            <button className={`text-xs font-semibold ${t.link} transition-colors duration-150`}>
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className={`fade-up-4 w-full py-4 rounded-2xl font-black text-base tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${t.btnPrimary}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign In →"
            )}
          </button>
        </div>

        {/* Footer */}
        <p className={`text-center mt-6 text-sm fade-up-4 ${t.muted}`}>
          New here?{" "}
          <button
            className={`font-bold ${t.link} transition-colors duration-150`}
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}