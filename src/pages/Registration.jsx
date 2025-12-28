// registration.js
import React, { useState } from "react";
 
/**
 * Tailwind-styled Registration component (single file, no backend).
 */
 
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
 
export function Registration({
  onSubmit,           // optional: ({ name, email, password, role, acceptTerms }) => Promise<void> | void
  onGoToLogin,        // optional: () => void
  title = "Create your account",
  subtitle = "Join us and start your journey",
  loginHref = "/login",
  enableRole = true,  // toggle role input if you don't need it
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
 
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
 
    // Basic validation
    if (!name.trim()) {
      setMessage({ type: "error", text: "Please enter your full name." });
      return;
    }
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (!acceptTerms) {
      setMessage({ type: "error", text: "You must accept the Terms & Privacy Policy." });
      return;
    }
 
    setLoading(true);
    try {
      if (typeof onSubmit === "function") {
        await onSubmit({ name, email, password, role, acceptTerms });
        setMessage({ type: "success", text: "Registration successful!" });
      } else {
        await new Promise((r) => setTimeout(r, 800));
        setMessage({ type: "success", text: "Registration successful!" });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen grid place-items-center bg-blue-100 px-6 py-10 text-slate-200">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-gradient-to-b from-[#0b1224] to-[#121a32] shadow-2xl shadow-black/40 p-6"
        role="region"
        aria-label="Registration form"
      >
        {/* Header */}
        <div className="mb-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
 
        {/* Message */}
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
 
        {/* Form */}
        <form className="space-y-4 mt-3" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm text-slate-400 mb-1 block">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
 
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm text-slate-400 mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
 
          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="text-sm text-slate-400 mb-1 block">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm" className="text-sm text-slate-400 mb-1 block">Confirm</label>
              <input
                id="confirm"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </div>
 
          {/* Role */}
          {enableRole && (
            <div>
              <label htmlFor="role" className="text-sm text-slate-400 mb-1 block">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition appearance-none"
              >
                <option value="Manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
 
          {/* Terms */}
          <label className="inline-flex items-start gap-2 text-sm text-slate-400 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-300/40"
              required
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">Terms</a>
              {" "}and{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </span>
          </label>
 
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 font-bold text-white shadow-md hover:brightness-110 active:translate-y-px transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
 
        {/* Footer */}
        <div className="mt-4 text-center text-sm text-slate-400">
          Already have an account?
          {onGoToLogin ? (
            <button
              type="button"
              onClick={onGoToLogin}
              className="ml-1 text-blue-400 hover:underline"
            >
              Sign in
            </button>
          ) : (
            <a href={loginHref} className="ml-1 text-blue-400 hover:underline">
              Sign in
            </a>
          )}
        </div>
      </div>
    </div>
  );
}