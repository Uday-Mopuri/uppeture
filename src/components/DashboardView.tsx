import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Award, ArrowRight, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { UserProfile, RewardItem, LeaderboardEntry, ViewType } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  rewards: RewardItem[];
  leaderboard: LeaderboardEntry[];
  onNavigateView: (view: ViewType) => void;
  onOpenRecycleModal: () => void;
  onOpenRedeemModal: (reward: RewardItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  rewards,
  leaderboard,
  onNavigateView,
  onOpenRecycleModal,
  onOpenRedeemModal,
}) => {
  const [scanCode, setScanCode] = useState('SCAN-7892');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'CANTEEN' | 'MERCH' | 'STATIONERY'>('ALL');

  const handleRefreshCode = () => {
    const randomCode = `SCAN-${Math.floor(1000 + Math.random() * 9000)}`;
    setScanCode(randomCode);
  };

  const filteredRewards = rewards.filter((r) => {
    if (activeCategory === 'ALL') return true;
    return r.category.toUpperCase() === activeCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
            Welcome back, Eco-Warrior!
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5">Campus Recycling Terminal & Analytics</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] sm:text-[11px] font-bold font-mono self-start sm:self-auto">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          ACTIVE STREAK (+4 DAYS)
        </div>
      </div>

      {/* Hero Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Ready to Recycle Card (High Contrast White Bento Tile) */}
        <div className="lg:col-span-8 bg-zinc-100 text-zinc-950 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden border border-zinc-200">
          <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left w-full">
            <div className="inline-block px-3 py-1 bg-zinc-950 text-indigo-400 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase">
              SMARTBIN SCANNER
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-zinc-950 leading-tight tracking-tight">
              Ready to Recycle?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-md mx-auto sm:mx-0">
              Scan your personal ID at any campus SmartBin to earn 10 points per PET bottle deposited.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1 flex-wrap">
              <button
                onClick={onOpenRecycleModal}
                className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-mono text-xs font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>CODE: {scanCode}</span>
              </button>
              <button
                onClick={handleRefreshCode}
                className="border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white text-zinc-950 px-3.5 py-2.5 rounded-2xl font-display text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* QR Box Container */}
          <div className="bg-[#16161a] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-zinc-800 flex flex-col items-center gap-2 shadow-2xl shrink-0 w-full sm:w-auto">
            <div className="bg-zinc-950 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-zinc-800">
              <QRCodeSVG
                value={`UPETURE:${user.studentId}:${scanCode}`}
                size={100}
                bgColor="#09090b"
                fgColor="#6366f1"
                level="M"
              />
            </div>
            <span className="font-mono text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-0.5">
              ID: {user.studentId}
            </span>
          </div>
        </div>

        {/* Weekly Goal Bento Tile */}
        <div className="lg:col-span-4 bg-[#16161a] border border-zinc-800/80 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] font-mono">CHALLENGE</p>
                <h3 className="text-lg sm:text-xl font-black font-display text-white mt-0.5">Weekly Goal</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Finish to unlock Bonus Chest</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">{user.weeklyBottles}/{user.weeklyGoal} Bottles</span>
              <span className="text-indigo-400 font-bold">{Math.round((user.weeklyBottles / user.weeklyGoal) * 100)}%</span>
            </div>
            <div className="w-full bg-[#0d0d0f] h-3.5 rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (user.weeklyBottles / user.weeklyGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Bento Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Bottles */}
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-xl hover:border-indigo-500/40 transition-all">
          <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em] mb-1 sm:mb-2">Total Bottles</p>
          <p className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {user.totalBottles}
          </p>
        </div>

        {/* Points Earned */}
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-xl hover:border-indigo-500/40 transition-all">
          <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em] mb-1 sm:mb-2">Points Earned</p>
          <p className="text-2xl sm:text-3xl font-black font-mono text-indigo-400 tracking-tight">
            {user.ecoPts}
          </p>
        </div>

        {/* CO2 Offset */}
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-xl hover:border-emerald-500/40 transition-all">
          <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em] mb-1 sm:mb-2">CO2 Offset</p>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
            {user.co2OffsetKg} <span className="text-xs font-sans font-medium text-zinc-500">kg</span>
          </p>
        </div>

        {/* Campus Rank */}
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-xl hover:border-indigo-500/40 transition-all">
          <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em] mb-1 sm:mb-2">Campus Rank</p>
          <p className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            #{user.rank} <span className="text-[11px] sm:text-xs font-sans font-normal text-zinc-500 block xs:inline">in {user.department}</span>
          </p>
        </div>
      </div>

      {/* Bottom Section: Quick Redeem & Mini Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column: Redeem Your EcoPts */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em]">MARKETPLACE</p>
              <h2 className="text-xl font-black font-display text-white">Redeem Your EcoPts</h2>
            </div>
            
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 bg-[#16161a] p-1.5 rounded-2xl border border-zinc-800">
              {(['ALL', 'CANTEEN', 'MERCH'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Rewards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRewards.slice(0, 3).map((reward) => {
              const canAfford = user.ecoPts >= reward.pts;
              return (
                <div
                  key={reward.id}
                  className="bg-[#16161a] border border-zinc-800/80 rounded-[2rem] p-5 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all cursor-pointer group"
                  onClick={() => canAfford && onOpenRedeemModal(reward)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold font-display text-xs text-white leading-snug line-clamp-1">{reward.title}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{reward.vendor}</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-indigo-400">
                      {reward.pts} pts
                    </span>
                    {canAfford ? (
                      <button className="text-[11px] font-bold text-zinc-300 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                        Claim <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Need {reward.pts - user.ecoPts}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right">
            <button
              onClick={() => onNavigateView('rewards')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              View Full Marketplace <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Mini Leaderboard */}
        <div className="lg:col-span-4 bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em]">LEADERBOARD</p>
              <h2 className="text-lg font-black font-display text-white">Eco-Champions</h2>
            </div>
            <button
              onClick={() => onNavigateView('leaderboard')}
              className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="space-y-2.5">
            {leaderboard.slice(0, 3).map((item) => (
              <div
                key={item.rank}
                className="bg-[#1f1f24] border border-zinc-800/80 rounded-2xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono ${
                      item.rank === 1
                        ? 'bg-amber-500 text-zinc-950'
                        : item.rank === 2
                        ? 'bg-zinc-300 text-zinc-950'
                        : 'bg-zinc-700 text-white'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">{item.ecoPts.toLocaleString()} EcoPts</p>
                  </div>
                </div>
                {item.rank === 1 && (
                  <div className="text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Current User Row */}
            <div className="bg-[#1f1f24] border border-indigo-500/50 rounded-2xl p-3 flex items-center justify-between shadow-lg shadow-indigo-500/10">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs font-mono flex items-center justify-center">
                  {user.rank}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    You <span className="text-[10px] text-zinc-500">({user.name})</span>
                  </h4>
                  <p className="text-[10px] text-indigo-400 font-mono font-bold">{user.ecoPts.toLocaleString()} EcoPts</p>
                </div>
              </div>
              <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                Top 5%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
