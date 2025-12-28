import React, { useState } from "react";
 
/**
 
 */
 
export function ForgotPassword({
  title = "Forgot password",
  subtitle = "Enter your email to receive reset instructions",
  loginHref = "/login",
  signupHref = "/register",
  onGoToLogin,
}) {
  // Match your login roles
  const [role, setRole] = useState("manager"); // 'manager' | 'admin'
 
  // Stages
  const [stage, setStage] = useState("REQUEST"); // REQUEST | VERIFY
  const [enableOtpFlow] = useState(true); // set to false for single-step flow
 
  // Form state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
 
  // UI message
  const [message, setMessage] = useState({ type: "", text: "" });
 
  // Helpers
  const showMsg = (type, text) => setMessage({ type, text });
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 
  // Demo handlers (no API calls)
  const handleRequest = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
 
    if (!email || !validateEmail(email)) {
      return showMsg("error", "Please enter a valid email address.");
    }
 
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (enableOtpFlow) {
        setStage("VERIFY");
        showMsg(
          "success",
          `We sent a verification code to ${email}. Enter it below to reset your password.`
        );
      } else {
        showMsg(
          "success",
          `If an account exists for ${email}, a reset link has been sent.`
        );
      }
    }, 800);
  };
 
  const handleVerify = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
 
    if (!otp || otp.length < 4) {
      return showMsg("error", "Please enter the 4–6 digit verification code.");
    }
    if (!newPw || newPw.length < 6) {
      return showMsg("error", "New password must be at least 6 characters.");
    }
    if (newPw !== confirmPw) {
      return showMsg("error", "Passwords do not match.");
    }
 
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showMsg("success", "Password has been reset successfully.");
    }, 800);
  };
 
  return (
    <div className="min-h-screen flex place-items-center bg-blue-100 px-6 md:px-12 py-10 text-slate-200 justify-center">
      {/* Card (no image column) */}
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-gradient-to-b from-[#0b1224] to-[#121a32] shadow-2xl shadow-black/40 p-6"
        role="region"
        aria-label="Forgot password form"
      >
        {/* Header */}
        <div className="mb-3">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-slate-400">{subtitle}</div>
        </div>
 
        {/* Role switch (Manager/Admin) */}
        <div className="mt-3 mb-4">
          <div className="text-sm text-slate-400 mb-2">Reset for role:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("manager")}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition border
                ${
                  role === "manager"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "bg-slate-900/70 text-slate-300 border-slate-700 hover:bg-slate-800/70"
                }`}
              aria-pressed={role === "manager"}
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition border
                ${
                  role === "admin"
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                    : "bg-slate-900/70 text-slate-300 border-slate-700 hover:bg-slate-800/70"
                }`}
              aria-pressed={role === "admin"}
            >
              Admin
            </button>
          </div>
        </div>
 
        {/* Status message */}
        {message.text && (
          <div
            className={
              message.type === "error"
                ? "mt-2 rounded-lg border border-red-500/50 bg-red-500/10 text-red-100 px-3 py-2 text-sm"
                : "mt-2 rounded-lg border border-green-500/50 bg-green-500/10 text-green-100 px-3 py-2 text-sm"
            }
            role="alert"
          >
            {message.text}
          </div>
        )}
 
        {/* Stage: Request reset link/code */}
        {stage === "REQUEST" && (
          <form className="space-y-4 mt-3" onSubmit={handleRequest} noValidate>
            {/* Email */}
            <div>
              <label htmlFor="fp-email" className="text-sm text-slate-400 mb-1 block">
                Email
              </label>
              <div className="relative">
                <input
                  id="fp-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 font-bold text-white shadow-md hover:brightness-110 active:translate-y-px transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending reset email..." : "Send reset email"}
            </button>
          </form>
        )}
 
        {/* Stage: Verify + Reset password (OTP flow) */}
        {stage === "VERIFY" && (
          <form className="space-y-4 mt-3" onSubmit={handleVerify} noValidate>
            {/* OTP */}
            <div>
              <label htmlFor="fp-otp" className="text-sm text-slate-400 mb-1 block">
                Verification code (OTP)
              </label>
              <div className="relative">
                <input
                  id="fp-otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 4–6 digit code"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  minLength={4}
                  maxLength={6}
                />
              </div>
            </div>
 
            {/* New password */}
            <div>
              <label htmlFor="fp-new" className="text-sm text-slate-400 mb-1 block">
                New password
              </label>
              <div className="relative">
                <input
                  id="fp-new"
                  type="password"
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
            </div>
 
            {/* Confirm password */}
            <div>
              <label htmlFor="fp-confirm" className="text-sm text-slate-400 mb-1 block">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="fp-confirm"
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 font-bold text-white shadow-md hover:brightness-110 active:translate-y-px transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}
 
        {/* Footer actions */}
        <div className="mt-4 text-center text-sm text-slate-400">
          Remembered your password?
          {onGoToLogin ? (
            <button
              type="button"
              onClick={onGoToLogin}
              className="ml-1 text-blue-400 hover:underline"
            >
              Go to login
            </button>
          ) : (
            <a href={loginHref} className="ml-1 text-blue-400 hover:underline">
              Go to login
            </a>
          )}
        </div>
 
        <div className="mt-2 text-center text-sm text-slate-400">
          Don’t have an account?
          <a href={signupHref} className="ml-1 text-blue-400 hover:underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}