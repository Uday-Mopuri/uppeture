import React from 'react';
import { UserProfile, Transaction } from '../types';
import { Shield, Award, Recycle, LogOut } from 'lucide-react';

interface SettingsViewProps {
  user: UserProfile;
  transactions: Transaction[];
  onLogout?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, transactions, onLogout }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-[0.2em] uppercase mb-1">
            ACCOUNT & PREFERENCES
          </p>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            Settings & Profile
          </h1>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {/* Profile Bento Card */}
      <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-7 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500/80 shadow-xl shadow-indigo-500/10"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <h2 className="text-2xl font-black font-display text-white tracking-tight">{user.name}</h2>
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold px-3 py-0.5 rounded-full">
              STUDENT
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {user.studentId} • Department of {user.department}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono text-indigo-400 font-bold">
            <span>Rank #{user.rank} Campus-wide</span>
            <span className="text-zinc-600">•</span>
            <span>{user.streakDays} Days Recycling Streak</span>
          </div>
        </div>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2rem] p-6 shadow-xl">
          <div className="flex items-center gap-2.5 text-indigo-400 mb-2">
            <Recycle className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-500">Total Recycled</span>
          </div>
          <p className="text-2xl font-black font-mono text-white tracking-tight">{user.totalBottles} Bottles</p>
        </div>

        <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2rem] p-6 shadow-xl">
          <div className="flex items-center gap-2.5 text-amber-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-500">EcoPts Balance</span>
          </div>
          <p className="text-2xl font-black font-mono text-white tracking-tight">{user.ecoPts.toLocaleString()} EcoPts</p>
        </div>

        <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2rem] p-6 shadow-xl">
          <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-500">CO2 Prevented</span>
          </div>
          <p className="text-2xl font-black font-mono text-white tracking-tight">{user.co2OffsetKg} kg Offset</p>
        </div>
      </div>

      {/* Transaction History Log Bento Tile */}
      <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">ACTIVITY LOG</p>
            <h3 className="text-lg font-black font-display text-white flex items-center gap-2 mt-0.5">
              <span>Recycling & Reward History</span>
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono font-bold">{transactions.length} Records</span>
        </div>

        <div className="space-y-2.5">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 rounded-2xl bg-[#1f1f24] border border-zinc-800/80 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-white text-xs">{txn.title}</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{txn.timestamp}</p>
              </div>
              <span
                className={`font-mono font-black text-xs ${
                  txn.amountPts > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {txn.amountPts > 0 ? `+${txn.amountPts}` : txn.amountPts} EcoPts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
