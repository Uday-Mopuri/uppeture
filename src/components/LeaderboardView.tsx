import React, { useState } from 'react';
import { Award, Flame, Search, ChevronRight, Trophy } from 'lucide-react';
import { LeaderboardEntry, UserProfile } from '../types';

interface LeaderboardViewProps {
  user: UserProfile;
  leaderboard: LeaderboardEntry[];
  onOpenRecycleModal: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  user,
  leaderboard,
  onOpenRecycleModal,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const firstPlace = leaderboard.find((item) => item.rank === 1);
  const secondPlace = leaderboard.find((item) => item.rank === 2);
  const thirdPlace = leaderboard.find((item) => item.rank === 3);

  const tableEntries = leaderboard.filter((item) => {
    if (item.rank <= 3) return false;
    const matchesDept = selectedDept === 'ALL' || item.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.2em]">GLOBAL RANKINGS</p>
        <h1 className="text-3xl font-black font-display text-white tracking-tight">
          Campus Eco-Champions
        </h1>
        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
          Join the race to make our campus green. Every bottle deposited counts towards your department's glory and your individual streak.
        </p>
      </div>

      {/* Top 3 Bento Podium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-2">
        {/* #2 Rank Bento Tile (Left) */}
        {secondPlace && (
          <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-7 text-center space-y-4 shadow-2xl relative order-2 md:order-1">
            <div className="absolute top-5 right-6 text-3xl font-black font-display text-zinc-700">
              02
            </div>
            <div className="relative inline-block mx-auto">
              <img
                src={secondPlace.avatar}
                alt={secondPlace.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-300"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-zinc-300 text-zinc-950 font-black rounded-xl flex items-center justify-center text-xs shadow-md">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-black font-display text-white">{secondPlace.name}</h3>
              <p className="text-xs text-indigo-400 font-semibold mt-0.5">{secondPlace.department}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/80">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">BOTTLES</p>
                <p className="text-base font-black font-mono text-white">{secondPlace.bottles}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">ECOPTS</p>
                <p className="text-base font-black font-mono text-indigo-400">
                  {(secondPlace.ecoPts / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        )}

        {/* #1 Rank Bento Tile (Center) */}
        {firstPlace && (
          <div className="bg-[#16161a] border-2 border-amber-500/80 rounded-[2.5rem] p-8 text-center space-y-4 shadow-2xl shadow-amber-500/10 relative order-1 md:order-2 md:-translate-y-4">
            <div className="absolute top-5 right-6 text-4xl font-black font-display text-amber-500/30">
              01
            </div>
            <div className="relative inline-block mx-auto">
              <img
                src={firstPlace.avatar}
                alt={firstPlace.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-amber-500 shadow-xl shadow-amber-500/20"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-500 text-zinc-950 font-black rounded-xl flex items-center justify-center text-sm shadow-xl">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-white">{firstPlace.name}</h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">{firstPlace.department}</p>
            </div>

            {/* Badge Tag */}
            {firstPlace.badge && (
              <span className="inline-block bg-amber-500 text-zinc-950 font-black font-mono text-[10px] uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider">
                ● {firstPlace.badge}
              </span>
            )}

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/80">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">BOTTLES</p>
                <p className="text-lg font-black font-mono text-emerald-400">{firstPlace.bottles.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">ECOPTS</p>
                <p className="text-lg font-black font-mono text-amber-400">
                  {(firstPlace.ecoPts / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        )}

        {/* #3 Rank Bento Tile (Right) */}
        {thirdPlace && (
          <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-7 text-center space-y-4 shadow-2xl relative order-3">
            <div className="absolute top-5 right-6 text-3xl font-black font-display text-amber-700/30">
              03
            </div>
            <div className="relative inline-block mx-auto">
              <img
                src={thirdPlace.avatar}
                alt={thirdPlace.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-700/80"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-amber-700 text-amber-100 font-black rounded-xl flex items-center justify-center text-xs shadow-md">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-black font-display text-white">{thirdPlace.name}</h3>
              <p className="text-xs text-indigo-400 font-semibold mt-0.5">{thirdPlace.department}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/80">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">BOTTLES</p>
                <p className="text-base font-black font-mono text-white">{thirdPlace.bottles}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-bold">ECOPTS</p>
                <p className="text-base font-black font-mono text-indigo-400">
                  {(thirdPlace.ecoPts / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Rankings Table Bento Section */}
      <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-7 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.15em]">LEADERBOARD INDEX</p>
            <h2 className="text-lg font-black font-display text-white">Top Rankings</h2>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            {['ALL', 'CSE', 'EEE', 'Mech', 'Economics', 'Biotech'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-2xl text-[10px] font-bold font-mono transition-all shrink-0 cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-[#1f1f24] text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Search input for table */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or department..."
            className="w-full bg-[#0d0d0f] border border-zinc-800 focus:border-indigo-500 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
          />
        </div>

        {/* Rankings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">
                <th className="py-3 px-4">RANK</th>
                <th className="py-3 px-4">STUDENT</th>
                <th className="py-3 px-4">DEPT</th>
                <th className="py-3 px-4 text-right">BOTTLES</th>
                <th className="py-3 px-4 text-right">ECOPTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-xs">
              {tableEntries.map((row) => (
                <tr
                  key={row.rank}
                  className={`hover:bg-[#1f1f24] transition-colors ${
                    row.isCurrentUser ? 'bg-indigo-500/10 font-bold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-zinc-500">
                    {row.rank < 10 ? `0${row.rank}` : row.rank}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-8 h-8 rounded-xl object-cover border border-zinc-800"
                      />
                      <span className="font-bold text-white">{row.name}</span>
                      {row.isCurrentUser && (
                        <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full font-mono">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#0d0d0f] border border-zinc-800 text-indigo-400 text-[10px] font-bold font-mono px-2.5 py-1 rounded-xl uppercase">
                      {row.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    {row.bottles}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-400">
                    {row.ecoPts.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bottom Rank Banner for Current User */}
      <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-indigo-600 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl shadow-indigo-600/30 border border-indigo-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 z-30">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl object-cover border-2 border-white/20"
              />
              <span className="absolute -bottom-1 -right-1 bg-zinc-950 text-indigo-400 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full font-mono">
                #{user.rank}
              </span>
            </div>
            <div>
              <h4 className="font-extrabold font-display text-xs sm:text-sm leading-tight text-white">
                {user.name}
              </h4>
              <p className="text-[10px] sm:text-[11px] font-bold text-indigo-200 font-mono">
                RANK #{user.rank} IN {user.department}
              </p>
            </div>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <div className="text-right">
              <p className="text-[9px] font-extrabold uppercase font-mono text-indigo-200 flex items-center gap-1 justify-end">
                <Flame className="w-3 h-3 fill-amber-400 text-amber-400" /> {user.streakDays}d Streak
              </p>
            </div>
            <button
              onClick={onOpenRecycleModal}
              className="bg-zinc-950 hover:bg-zinc-900 text-white p-2 rounded-xl shadow-xl transition-all cursor-pointer"
              title="Recycle Now"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Streak & Progress for Desktop/Tablet */}
        <div className="hidden sm:flex items-center gap-6 flex-1 justify-end max-w-md w-full">
          <div className="text-left">
            <p className="text-[10px] font-extrabold uppercase font-mono text-indigo-200 flex items-center justify-start gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> STREAK
            </p>
            <p className="text-lg font-black font-mono text-white">{user.streakDays} Days</p>
          </div>

          <div className="flex-1 max-w-xs space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-indigo-200 font-mono">
              <span>5 bottles to #{user.rank - 1}</span>
            </div>
            <div className="w-full bg-indigo-950/40 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full w-3/4" />
            </div>
          </div>

          <button
            onClick={onOpenRecycleModal}
            className="bg-zinc-950 hover:bg-zinc-900 text-white p-3 rounded-2xl shadow-xl transition-all cursor-pointer shrink-0"
            title="Recycle Now"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
