import React, { useState } from 'react';
import { Sparkles, Clock, Lock, ShoppingBag, QrCode, Store } from 'lucide-react';
import { RewardItem, UserProfile } from '../types';

interface MarketplaceViewProps {
  user: UserProfile;
  rewards: RewardItem[];
  onOpenRedeemModal: (reward: RewardItem) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  user,
  rewards,
  onOpenRedeemModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredRewards = rewards.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const hoodieItem: RewardItem = {
    id: 'RWD-HOODIE',
    title: 'Eco-Warrior Hoodie',
    category: 'merch',
    pts: 2000,
    description: 'Made from 100% recycled ocean plastic and organic cotton. Stand out as a top-tier contributor to campus sustainability.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    isLimited: true,
    endsIn: '2 days',
    vendor: 'Campus Eco Store',
  };

  const canAffordHoodie = user.ecoPts >= hoodieItem.pts;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Title & Wallet Balance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-[0.2em] uppercase mb-0.5">
            REDEEM YOUR IMPACT
          </p>
          <h1 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight">
            Marketplace
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
            Turn your recycled plastics and paper into exclusive campus perks, digital credits, and premium merchandise.
          </p>
        </div>

        {/* Current Balance Box Bento Tile */}
        <div className="bg-[#16161a] border border-indigo-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center gap-3.5 shadow-2xl shrink-0 self-start md:self-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg sm:text-xl font-mono">
            ★
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">CURRENT BALANCE</p>
            <p className="text-xl sm:text-2xl font-black font-mono text-white">
              {user.ecoPts.toLocaleString()} <span className="text-xs font-sans font-medium text-indigo-400">pts</span>
            </p>
          </div>
        </div>
      </div>

      {/* Featured Hero Banner Bento Card */}
      <div className="relative bg-[#16161a] border border-zinc-800/80 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[260px] sm:min-h-[280px] flex items-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hoodieItem.image}
            alt={hoodieItem.title}
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#16161a] via-[#16161a]/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-10 max-w-2xl space-y-3 sm:space-y-4">
          <span className="bg-amber-500 text-zinc-950 font-black font-mono text-[10px] uppercase px-3 py-0.5 rounded-full shadow-md inline-block tracking-wider">
            LIMITED EDITION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            {hoodieItem.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {hoodieItem.description}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 pt-1 flex-wrap">
            <button
              onClick={() => canAffordHoodie && onOpenRedeemModal(hoodieItem)}
              disabled={!canAffordHoodie}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl font-bold font-display text-xs transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
                canAffordHoodie
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim for 2,000 pts</span>
            </button>

            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-[#0d0d0f]/80 backdrop-blur-sm px-3 py-2 rounded-2xl border border-zinc-800">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Ends in 2 days
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Rewards' },
          { id: 'canteen', label: 'Canteen' },
          { id: 'stationery', label: 'Stationery' },
          { id: 'merch', label: 'Merch' },
          { id: 'events', label: 'Events' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-[11px] font-bold font-mono transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-[#16161a] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = user.ecoPts >= reward.pts;

          return (
            <div
              key={reward.id}
              className={`bg-[#16161a] border border-zinc-800/80 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-indigo-500/50 shadow-xl ${
                !canAfford ? 'opacity-80' : ''
              }`}
            >
              {/* Image Container */}
              <div className="relative h-44 overflow-hidden bg-[#0d0d0f]">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#0d0d0f]/90 backdrop-blur-md text-indigo-400 font-mono font-bold text-xs px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1 shadow-md">
                  <span>★</span> {reward.pts}
                </div>

                {!canAfford && (
                  <div className="absolute inset-0 bg-[#0d0d0f]/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="text-center space-y-1">
                      <Lock className="w-7 h-7 text-zinc-500 mx-auto" />
                      <p className="text-[11px] font-bold text-zinc-400">
                        Need {reward.pts - user.ecoPts} more pts
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold font-display text-white text-sm leading-snug">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {reward.description}
                  </p>
                </div>

                <button
                  onClick={() => canAfford && onOpenRedeemModal(reward)}
                  disabled={!canAfford}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all text-center ${
                    canAfford
                      ? 'bg-zinc-800 hover:bg-indigo-600 text-white cursor-pointer'
                      : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Redeem Now' : `Need ${reward.pts - user.ecoPts} pts`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* How Redemption Works Footer Section */}
      <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">SIMPLE 3-STEP PROCESS</p>
          <h3 className="font-black font-display text-white text-xl mt-1">
            How Redemption Works
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Step 1 */}
          <div className="text-center space-y-3 p-5 bg-[#1f1f24] rounded-[2rem] border border-zinc-800/80">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-bold font-display text-white text-sm">1. Select Reward</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Browse our marketplace and pick an item that matches your points balance.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-3 p-5 bg-[#1f1f24] rounded-[2rem] border border-zinc-800/80">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="font-bold font-display text-white text-sm">2. Generate Code</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Points are deducted and a unique dynamic QR code is instantly generated.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-3 p-5 bg-[#1f1f24] rounded-[2rem] border border-zinc-800/80">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
              <Store className="w-6 h-6" />
            </div>
            <h4 className="font-bold font-display text-white text-sm">3. Claim Locally</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Present your QR code at participating vendors or stationery counters to claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
