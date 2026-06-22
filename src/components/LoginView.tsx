import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (role: 'Admin' | 'Tutor' | 'Student') => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('admin@tutormatch.vn');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<'Admin' | 'Tutor' | 'Student'>('Admin');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ email và mật khẩu!');
      return;
    }
    // Simple sign in simulation
    onLoginSuccess(role);
  };

  return (
    <div id="loginPage" className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left Column: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-white shadow-2xl z-10">
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-brand-primary-600 flex items-center justify-center text-white shadow-md shadow-brand-primary-200">
              <span className="font-bold text-lg">T</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-brand-primary-900">TutorMatch</span>
              <span className="text-xs block text-slate-400 font-semibold uppercase tracking-wider">Console Panel</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
              Đăng nhập Cổng Quản Trị
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Nhập tài khoản quản trị viên của bạn để tiếp tục quản lý hệ thống
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Choose Role for easy testing */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Vai trò truy cập thử nghiệm
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Admin', 'Tutor', 'Student'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                      role === r
                        ? 'bg-brand-primary-50 border-brand-primary-500 text-brand-primary-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r === 'Admin' ? 'Admin' : r === 'Tutor' ? 'Gia sư' : 'Học viên'}
                  </button>
                ))}
              </div>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tài khoản / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 text-sm transition-all"
                  placeholder="admin@tutormatch.vn"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <a href="#" className="text-xs font-semibold text-brand-primary-600 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 font-medium"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & submit */}
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-primary-600 border-slate-300 focus:ring-brand-primary-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-600">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-brand-primary-600 hover:bg-brand-primary-700 rounded-xl text-white font-bold text-sm shadow-lg shadow-brand-primary-500/15 cursor-pointer hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
              Đăng Nhập Khóa Quản Trị
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-400 font-medium flex justify-between pt-8 border-t border-slate-100">
          <span>&copy; 2026 TutorMatch Inc.</span>
          <span className="hover:underline cursor-pointer">Điều khoản bảo mật</span>
        </div>
      </div>

      {/* Right Column: Prominent Display Graphic panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-tr from-brand-primary-900 via-brand-primary-800 to-brand-primary-600 p-16 flex-col justify-between relative overflow-hidden select-none">
        {/* Abstract background graphics */}
        <div className="absolute -top-40 -right-40 w-120 h-120 bg-brand-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-100 h-100 bg-brand-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="self-end bg-brand-primary-950/20 px-4 py-1.5 rounded-full text-brand-primary-200 text-xs font-bold tracking-widest flex items-center gap-2 border border-white/10 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange-500 animate-pulse" />
          Intellectual System
        </div>

        {/* Elegant Central Graphic mimicking a notepad with educational insights */}
        <div className="max-w-md mx-auto my-auto relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-orange-500 to-brand-primary-400 opacity-20 blur-xl animate-pulse" />
          <div className="relative bg-slate-900/45 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
            {/* Notepad wireframe decoration */}
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 bg-brand-primary-700 rounded-full border border-white/20" />
              ))}
            </div>

            {/* Simulated Data */}
            <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
              Empowering educators with intelligent data
            </h2>
            <p className="text-brand-primary-100/80 text-sm leading-relaxed mb-6">
              Hệ thống lõi quản trị thống nhất, phân tích dữ liệu nhu cầu lớp học chính xác theo thời gian thực tại khu vực miền Trung.
            </p>

            {/* Mini data metric */}
            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <span className="text-xl font-extrabold text-brand-orange-500">12,482</span>
                <span className="text-[10px] block text-brand-primary-300 font-bold tracking-wider uppercase">Tổng Người Dùng</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="text-xl font-extrabold text-white">94.2%</span>
                <span className="text-[10px] block text-brand-primary-300 font-bold tracking-wider uppercase font-sans">Matching Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stable Build Label */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-green-500 animate-ping absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-green-500" />
            <span className="text-xs font-bold tracking-widest text-[#6ffbbe] uppercase">V4.2.0 STABLE BUILD</span>
          </div>
          <span className="text-xs text-brand-primary-200/50 font-mono">TutorMatch.System.Core</span>
        </div>
      </div>
    </div>
  );
}
