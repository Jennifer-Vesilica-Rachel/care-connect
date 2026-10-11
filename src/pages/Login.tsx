import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareConnectLogo } from '../components/common/CareConnectLogo';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Email or phone number is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login(identifier);
    navigate('/appointments?tab=my-appointments');
  };

  const handleFillDemo = () => {
    setIdentifier('alex.morgan@example.com');
    setPassword('DemoPatient2026!');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.includes('@')) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <CareConnectLogo size="md" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#172B46] tracking-tight">
            Patient Portal Login
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your appointments and manage doctor bookings.
          </p>
        </div>

        {/* Prototype notice */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Prototype Notice:</strong> This is a demo authentication flow for application preview. Do not enter real medical or confidential banking credentials.
          </span>
        </div>

        {/* Quick Fill Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-[#56B7AD] font-semibold hover:underline"
          >
            ⚡ Auto-fill Demo Patient Credentials
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email or Phone Number *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="alex.morgan@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
              />
            </div>
            {errors.identifier && (
              <p className="text-xs text-rose-500 mt-1">{errors.identifier}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-[#172B46] focus:ring-[#56B7AD]"
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => {
                setForgotSubmitted(false);
                setForgotModalOpen(true);
              }}
              className="text-[#56B7AD] font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Sign In to Patient Portal
          </button>
        </form>

        {/* Link to Register */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
          Don't have a demo account?{' '}
          <Link to="/register" className="text-[#56B7AD] font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#172B46]">Reset Demo Password</h3>
            {forgotSubmitted ? (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#56B7AD] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-center">
                  A demo password reset link has been simulated for <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full py-2 bg-[#172B46] text-white rounded-xl font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3 text-xs">
                <p className="text-slate-500">
                  Enter your email address to simulate a password recovery message.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#172B46] text-white rounded-lg font-semibold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
