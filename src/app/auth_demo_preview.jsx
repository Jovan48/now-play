import { useState, useEffect, useRef } from "react";

const GREEN = "#168978";
const GREEN_HOVER = "#13786a";
const BG = "#0a0f0e";
const CARD = "#111918";
const BORDER = "rgba(22,137,120,0.15)";
const MUTED = "#7a9b96";
const FG = "#f0f4f3";
const INPUT_BG = "#1a2422";

function WaveStep({ step }) {
  const bars = 5;
  const activeCount = step === "credentials" ? 1 : step === "otp" ? 3 : 5;
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 20 }} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            borderRadius: 2,
            height: i % 2 === 0 ? 20 : 12,
            background: i < activeCount ? GREEN : "rgba(22,137,120,0.2)",
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        display: "inline-block",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

function strengthOf(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function AuthModal({ mode, onClose, onSwitchMode }) {
  const [step, setStep] = useState("credentials");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [remember, setRemember] = useState(false);
  const [shake, setShake] = useState(false);
  const otpRefs = useRef([]);

  useEffect(() => {
    setStep("credentials");
    setForm({ name: "", email: "", password: "", confirm: "" });
    setOtp(["", "", "", "", "", ""]);
    setError("");
  }, [mode]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendTimer]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const pwScore = strengthOf(form.password);
  const canSubmitCredentials =
    mode === "login"
      ? emailValid && form.password.length >= 6
      : emailValid && form.name.trim().length > 1 && pwScore >= 2 && form.password === form.confirm;

  function submitCredentials(e) {
    e.preventDefault();
    if (!canSubmitCredentials) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setResendTimer(30);
    }, 900);
  }

  function handleOtpChange(i, val) {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i, e) {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  }

  function handleOtpPaste(e) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("");
    while (next.length < 6) next.push("");
    setOtp(next);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  }

  function verifyOtp() {
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (code === "000000") {
        setError("That code didn't work. Try again.");
        setShake(true);
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
        setTimeout(() => setShake(false), 500);
      } else {
        setStep("success");
      }
    }, 900);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shakeX { 10%,90%{transform:translateX(-1px)} 20%,80%{transform:translateX(2px)} 30%,50%,70%{transform:translateX(-4px)} 40%,60%{transform:translateX(4px)} }
        .authcard { animation: cardIn 0.25s ease; }
        @keyframes cardIn { from{opacity:0; transform:translateY(8px) scale(0.98)} to{opacity:1; transform:translateY(0) scale(1)} }
        .otpbox:focus { outline: none; border-color: ${GREEN}; box-shadow: 0 0 0 3px rgba(22,137,120,0.25); }
        .fld:focus { outline: none; border-color: ${GREEN}; box-shadow: 0 0 0 3px rgba(22,137,120,0.15); }
      `}</style>
      <div
        className="authcard"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 400,
          maxWidth: "100%",
          background: CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          padding: "28px 28px 24px",
          fontFamily: "'Inter', sans-serif",
          color: FG,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #fff", marginLeft: 2 }} />
            </div>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.05em" }}>now-play</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }}
          >
            ✕
          </button>
        </div>

        {step !== "success" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, textTransform: "uppercase", margin: 0 }}>
                {step === "credentials" ? (mode === "login" ? "Welcome back" : "Join as a creator") : "Verify it's you"}
              </h2>
              <p style={{ color: MUTED, fontSize: 13, margin: "4px 0 0" }}>
                {step === "credentials"
                  ? mode === "login"
                    ? "Log in to your creator dashboard"
                    : "Set up your creator account"
                  : `We sent a 6-digit code to ${form.email || "your email"}`}
              </p>
            </div>
            <WaveStep step={step} />
          </div>
        )}

        {step === "credentials" && (
          <form onSubmit={submitCredentials} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <Field label="Full name">
                <input
                  className="fld"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Aria Chen"
                  style={inputStyle}
                />
              </Field>
            )}
            <Field label="Email">
              <input
                className="fld"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={inputStyle}
              />
              {form.email.length > 0 && !emailValid && (
                <span style={hintErr}>Enter a valid email address</span>
              )}
            </Field>
            <Field label="Password">
              <input
                className="fld"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={mode === "login" ? "Your password" : "At least 8 characters"}
                style={inputStyle}
              />
              {mode === "signup" && form.password.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: 3,
                        flex: 1,
                        borderRadius: 2,
                        background: i < pwScore ? (pwScore <= 1 ? "#d4183d" : pwScore === 2 ? "#e0a83f" : GREEN) : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </Field>
            {mode === "signup" && (
              <Field label="Confirm password">
                <input
                  className="fld"
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat your password"
                  style={inputStyle}
                />
                {form.confirm.length > 0 && form.confirm !== form.password && (
                  <span style={hintErr}>Passwords don't match</span>
                )}
              </Field>
            )}
            {mode === "login" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED, cursor: "pointer" }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: GREEN }} />
                  Remember this device
                </label>
                <a href="#" style={{ color: GREEN, textDecoration: "none" }}>Forgot password?</a>
              </div>
            )}
            <button
              type="submit"
              disabled={!canSubmitCredentials || loading}
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 0",
                borderRadius: 999,
                border: "none",
                background: canSubmitCredentials ? GREEN : "rgba(22,137,120,0.35)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: canSubmitCredentials ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => canSubmitCredentials && (e.currentTarget.style.background = GREEN_HOVER)}
              onMouseLeave={(e) => canSubmitCredentials && (e.currentTarget.style.background = GREEN)}
            >
              {loading ? <Spinner /> : mode === "login" ? "Continue" : "Create account"}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, margin: "6px 0 0" }}>
              {mode === "login" ? "New to Now-Play?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={onSwitchMode}
                style={{ background: "none", border: "none", color: GREEN, fontWeight: 600, cursor: "pointer", padding: 0 }}
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </form>
        )}

        {step === "otp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "space-between", animation: shake ? "shakeX 0.4s" : "none" }}
              onPaste={handleOtpPaste}
            >
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  className="otpbox"
                  value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  style={{
                    width: 44,
                    height: 52,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    borderRadius: 10,
                    border: `1px solid ${error ? "#d4183d" : BORDER}`,
                    background: INPUT_BG,
                    color: FG,
                  }}
                />
              ))}
            </div>
            {error && <p style={{ color: "#ff6b7a", fontSize: 13, margin: 0 }}>{error}</p>}
            <button
              onClick={verifyOtp}
              disabled={otp.some((d) => !d) || loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 0",
                borderRadius: 999,
                border: "none",
                background: otp.every((d) => d) ? GREEN : "rgba(22,137,120,0.35)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: otp.every((d) => d) ? "pointer" : "not-allowed",
              }}
            >
              {loading ? <Spinner /> : "Verify"}
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <button
                onClick={() => setStep("credentials")}
                style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", padding: 0 }}
              >
                ← Back
              </button>
              <button
                onClick={() => resendTimer === 0 && setResendTimer(30)}
                disabled={resendTimer > 0}
                style={{
                  background: "none",
                  border: "none",
                  color: resendTimer > 0 ? MUTED : GREEN,
                  cursor: resendTimer > 0 ? "default" : "pointer",
                  padding: 0,
                }}
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
              </button>
            </div>
            <p style={{ fontSize: 11, color: MUTED, textAlign: "center", margin: 0 }}>
              Demo tip: any code works — try 000000 to see the error state.
            </p>
          </div>
        )}

        {step === "success" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0 4px", textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(22,137,120,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                animation: "cardIn 0.3s ease",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3">
                <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, textTransform: "uppercase", margin: "0 0 6px" }}>
              You're verified
            </h2>
            <p style={{ color: MUTED, fontSize: 13, margin: "0 0 22px" }}>
              {mode === "login" ? "Welcome back to your creator dashboard." : "Your creator account is ready to go."}
            </p>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 999,
                border: "none",
                background: GREEN,
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Go to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: MUTED }}>
      {label}
      {children}
    </label>
  );
}

const inputStyle = {
  padding: "11px 12px",
  borderRadius: 10,
  border: `1px solid ${BORDER}`,
  background: INPUT_BG,
  color: FG,
  fontSize: 14,
};

const hintErr = { color: "#ff6b7a", fontSize: 12, marginTop: 2 };

export default function Demo() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  return (
    <div style={{ minHeight: "100vh", background: BG, color: FG, fontFamily: "'Inter', sans-serif", padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid #fff", marginLeft: 2 }} />
      </div>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 800, textTransform: "uppercase", margin: 0 }}>now-play</h1>
      <p style={{ color: MUTED, fontSize: 14, marginTop: -12 }}>Click a button to try the 2FA flow</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => { setMode("login"); setAuthOpen(true); }}
          style={{ padding: "10px 22px", borderRadius: 999, border: `1px solid ${BORDER}`, background: "transparent", color: FG, fontWeight: 600, cursor: "pointer" }}
        >
          Log in
        </button>
        <button
          onClick={() => { setMode("signup"); setAuthOpen(true); }}
          style={{ padding: "10px 22px", borderRadius: 999, border: "none", background: GREEN, color: "#fff", fontWeight: 600, cursor: "pointer" }}
        >
          Sign up
        </button>
      </div>
      {authOpen && (
        <AuthModal
          mode={mode}
          onClose={() => setAuthOpen(false)}
          onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
        />
      )}
    </div>
  );
}
