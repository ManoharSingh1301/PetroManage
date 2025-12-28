import React, { useState } from "react";
// import  oilimg from "../img/oil-login.png"
 
 
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
 
export  function Login({
  onSubmit,              // optional: (email, password, rememberMe, role) => Promise<void> | void
  onGoToRegister,        // optional: () => void
  title = "Welcome back",
  subtitle = "Sign in to your account",
  forgotHref = "/forgot",
  signupHref = "/register", // route to registration page
}) {
  const [role, setRole] = useState("manager"); // "manager" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
 
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
 
    setLoading(true);
    try {
      if (typeof onSubmit === "function") {
        await onSubmit(email, password, rememberMe, role);
        setMessage({ type: "success", text: `Signed in successfully as ${role === "admin" ? "Admin" : "Manager"}!` });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        setMessage({ type: "success", text: `Signed in successfully as ${role === "admin" ? "Admin" : "Manager"}!` });
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
   
 
 
    <div className="min-h-screen flex  place-items-center bg-blue-200 px-20 py-10 text-slate-200 justify-around">
     
     
     
        <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center pr-6">
          <img
            // src={oilimg}
            alt="Oil assets"
            className="w-80 lg:w-[40rem] xl:w-[40rem] h-auto max-w-none"
            aria-hidden="true"
          />
        </div>  
 
     
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-gradient-to-b from-[#0b1224] to-[#121a32] shadow-2xl shadow-black/40 p-6"
        role="region"
        aria-label="Login form"
      >
       
        {/* Header */}
        <div className="mb-3">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-slate-400">{subtitle}</div>
        </div>
 
        {/* Role switch */}
        <div className="mt-3 mb-4">
          <div className="text-sm text-slate-400 mb-2">Login as:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("manager")}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition border
                ${role === "manager"
                  ? "bg-blue-600 text-white border-blue-500 shadow-md"
                  : "bg-slate-900/70 text-slate-300 border-slate-700 hover:bg-slate-800/70"}
              `}
              aria-pressed={role === "manager"}
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition border
                ${role === "admin"
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                  : "bg-slate-900/70 text-slate-300 border-slate-700 hover:bg-slate-800/70"}
              `}
              aria-pressed={role === "admin"}
            >
              Admin
            </button>
          </div>
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
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm text-slate-400 mb-1 block">
              Email
            </label>
            <div className="relative">
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
          </div>
 
          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm text-slate-400 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 px-3 py-3 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-blue-400 px-2 py-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
 
          {/* Row */}
          <div className="flex items-center justify-between mt-1">
            <label className="inline-flex items-center gap-2 text-sm text-slate-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-300/40"
              />
              <span>Remember me</span>
            </label>
            <a href={forgotHref} className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>
 
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 font-bold text-white shadow-md hover:brightness-110 active:translate-y-px transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? `Loging in as ${role}...` : `Log in as ${role}`}
          </button>
        </form>
 
        {/* Footer: go to Registration */}
        <div className="mt-4 text-center text-sm text-slate-400">
          Don’t have an account?
          {onGoToRegister ? (
            <button
              type="button"
              onClick={onGoToRegister}
              className="ml-1 text-blue-400 hover:underline"
            >
              Create one
            </button>
          ) : (
            <a href={signupHref} className="ml-1 text-blue-400 hover:underline">
              Create one
            </a>
          )}
        </div>
      </div>
    </div>
  );
}