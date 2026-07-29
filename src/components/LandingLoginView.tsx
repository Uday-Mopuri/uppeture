import React, { useState } from 'react';
import {
  Recycle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  QrCode,
  MapPin,
  Lock,
  UserCheck,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Building2,
  LogIn,
} from 'lucide-react';
import { UserProfile } from '../types';

interface LandingLoginViewProps {
  onLoginSuccess: (customProfile?: Partial<UserProfile>) => void;
  onExploreAsGuest?: () => void;
}

export const LandingLoginView: React.FC<LandingLoginViewProps> = ({
  onLoginSuccess,
  onExploreAsGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [studentId, setStudentId] = useState<string>('UP-2024-8841');
  const [password, setPassword] = useState<string>('••••••••');
  const [name, setName] = useState<string>('Alex Rivera');
  const [department, setDepartment] = useState<string>('Computer Science');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) {
      setErrorMsg('Please enter your Campus ID and password.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        studentId: studentId.toUpperCase(),
        name: activeTab === 'register' ? name : 'Alex Rivera',
        department: department,
      });
    }, 800);
  };

  const handleDemoLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
              <Recycle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-1">
                up<span className="text-indigo-400">PET</span>ure
              </h1>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase -mt-0.5">
                Campus Recycling Terminal
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#impact" className="hover:text-white transition-colors">Campus Impact</a>
            <a href="#bins" className="hover:text-white transition-colors">SmartBins</a>
            <a href="#rewards" className="hover:text-white transition-colors">Marketplace</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDemoLogin}
              className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Demo Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Auth Section */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-10 space-y-10 sm:space-y-16 flex-1 w-full">
        {/* Hero & Login Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[11px] font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEXT-GEN SUSTAINABLE CAMPUS INITIATIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.1]">
              Recycle PET plastics.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-400">
                Earn canteen cash.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              Turn your plastic bottles into real campus rewards. Scan your personal Student ID at any connected SmartBin, drop your bottles, and instantly receive EcoPts redeemable for coffee, food, stationery, and merchandise.
            </p>

            {/* Quick Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#16161a] border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">10 Pts/Bottle</p>
                  <p className="text-[10px] text-zinc-500">Instant Credit</p>
                </div>
              </div>

              <div className="bg-[#16161a] border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4-Day Streak</p>
                  <p className="text-[10px] text-zinc-500">Bonus Chests</p>
                </div>
              </div>

              <div className="bg-[#16161a] border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">28 SmartBins</p>
                  <p className="text-[10px] text-zinc-500">Across Campus</p>
                </div>
              </div>
            </div>

            {/* Live Impact Ticker */}
            <div className="p-4 rounded-3xl bg-[#16161a] border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-zinc-400">Campus Total:</span>
                <span className="font-bold text-white">48,250 Bottles Recycled</span>
              </div>
              <span className="text-indigo-400 font-bold hidden sm:inline">1,240 kg CO2 Prevented</span>
            </div>
          </div>

          {/* Right Auth Card (Bento Login Terminal) */}
          <div className="lg:col-span-5">
            <div className="bg-[#16161a] border border-zinc-800/90 rounded-[2.5rem] p-7 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Tab Switcher */}
              <div className="flex items-center p-1 bg-[#0d0d0f] rounded-2xl border border-zinc-800 mb-6">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  Campus SSO Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  New Account
                </button>
              </div>

              {/* Header */}
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-black font-display text-white tracking-tight">
                  {activeTab === 'login' ? 'Student & Faculty Portal' : 'Register Eco-Warrior ID'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {activeTab === 'login'
                    ? 'Authenticate with your university credentials to access SmartBins'
                    : 'Create your recycling profile and link your student ID'}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs mb-4">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {activeTab === 'register' && (
                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full bg-[#0d0d0f] border border-zinc-800 focus:border-indigo-500 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Campus ID Number
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="UP-2024-8841"
                      className="w-full bg-[#0d0d0f] border border-zinc-800 focus:border-indigo-500 rounded-2xl py-3 pl-10 pr-4 text-xs font-mono font-bold text-white placeholder-zinc-500 focus:outline-none transition-all uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Campus Password / Passcode
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0d0d0f] border border-zinc-800 focus:border-indigo-500 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Department / Faculty
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#0d0d0f] border border-zinc-800 focus:border-indigo-500 text-white text-xs font-medium rounded-2xl p-3 focus:outline-none transition-all"
                  >
                    <option value="Computer Science">Computer Science & AI</option>
                    <option value="Mechanical Eng.">Mechanical Engineering</option>
                    <option value="Biotechnology">Biotechnology & Life Sci</option>
                    <option value="Business Admin">Business & Finance</option>
                    <option value="Design & Arts">Design & Visual Arts</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-zinc-800 bg-[#0d0d0f] text-indigo-600 focus:ring-0" />
                    <span className="text-[11px]">Remember Student Session</span>
                  </label>
                  <a href="#" className="text-[11px] text-indigo-400 hover:underline">Reset Passcode</a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-display py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all text-xs cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{activeTab === 'login' ? 'Sign In via Campus SSO' : 'Create Student Profile'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="bg-[#16161a] px-3 text-zinc-500">OR QUICK ACCESS</span>
                </div>
              </div>

              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-[#1f1f24] hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-mono text-xs font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Instant Demo Login (Alex Rivera)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Feature Bento Tiles Section */}
        <div id="features" className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">
              THE RECYCLING ENGINE
            </p>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              Designed for Speed, Gamification & Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#16161a] border border-zinc-800/80 p-6 rounded-[2rem] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-display text-white text-sm">SmartBin Scanning</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hold your dynamic student QR code up to any campus bin scanner for instant optical detection and bottle counting.
              </p>
            </div>

            <div className="bg-[#16161a] border border-zinc-800/80 p-6 rounded-[2rem] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-display text-white text-sm">EcoPts & Streaks</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Earn 10 points per PET bottle. Maintain consecutive recycling days to unlock bonus reward chests and point multipliers.
              </p>
            </div>

            <div className="bg-[#16161a] border border-zinc-800/80 p-6 rounded-[2rem] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-display text-white text-sm">Canteen Marketplace</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Redeem your points directly at campus coffee stands, food courts, bookshops, and exclusive hoodie drops.
              </p>
            </div>

            <div className="bg-[#16161a] border border-zinc-800/80 p-6 rounded-[2rem] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold font-display text-white text-sm">Department Cup</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Compete with rival faculties. Computer Science, Engineering, and Business fight for the top campus trophy every month.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0d0d0f] py-8 px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">uppPETure</span> • Campus Recycling Network
          </div>
          <p>© 2026 Sustainable Campus Terminal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
