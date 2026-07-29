/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewType, UserProfile, SmartBin, RewardItem, LeaderboardEntry, Transaction, NotificationItem } from './types';
import {
  initialProfile,
  initialBins,
  initialRewards,
  initialLeaderboard,
  initialTransactions,
  initialNotifications,
} from './mockData';
import { LayoutDashboard, Gift, Trophy, MapPin, Recycle, Settings } from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { DashboardView } from './components/DashboardView';
import { LeaderboardView } from './components/LeaderboardView';
import { MarketplaceView } from './components/MarketplaceView';
import { BinMapView } from './components/BinMapView';
import { SettingsView } from './components/SettingsView';
import { LandingLoginView } from './components/LandingLoginView';
import { RecycleModal } from './components/RecycleModal';
import { RedeemModal } from './components/RedeemModal';
import { HistoryModal } from './components/HistoryModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [user, setUser] = useState<UserProfile>(initialProfile);
  const [bins, setBins] = useState<SmartBin[]>(initialBins);
  const [rewards] = useState<RewardItem[]>(initialRewards);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modals
  const [isRecycleModalOpen, setIsRecycleModalOpen] = useState<boolean>(false);
  const [selectedBinForRecycle, setSelectedBinForRecycle] = useState<SmartBin | undefined>(undefined);
  const [selectedRewardForRedeem, setSelectedRewardForRedeem] = useState<RewardItem | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  // Handle bottle deposit completion from SmartBin
  const handleDepositComplete = (
    bottlesCount: number,
    ptsEarned: number,
    co2Saved: number,
    binId: string
  ) => {
    // 1. Update User State
    const updatedUser: UserProfile = {
      ...user,
      ecoPts: user.ecoPts + ptsEarned,
      totalBottles: user.totalBottles + bottlesCount,
      co2OffsetKg: Number((user.co2OffsetKg + co2Saved).toFixed(2)),
      weeklyBottles: user.weeklyBottles + bottlesCount,
    };
    setUser(updatedUser);

    // 2. Update Bin state
    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          const newPercentage = Math.min(100, bin.capacityPercentage + bottlesCount * 2);
          return {
            ...bin,
            capacityPercentage: newPercentage,
            bottlesToday: bin.bottlesToday + bottlesCount,
            status: newPercentage >= 90 ? 'almost-full' : bin.status,
          };
        }
        return bin;
      })
    );

    // 3. Update Leaderboard
    setLeaderboard((prevBoard) =>
      prevBoard.map((entry) => {
        if (entry.isCurrentUser) {
          return {
            ...entry,
            bottles: entry.bottles + bottlesCount,
            ecoPts: entry.ecoPts + ptsEarned,
          };
        }
        return entry;
      })
    );

    // 4. Record Transaction
    const selectedBin = bins.find((b) => b.id === binId);
    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'deposit',
      title: `Recycled ${bottlesCount} PET Bottles at ${selectedBin?.name || 'SmartBin'}`,
      amountPts: ptsEarned,
      timestamp: 'Just now',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    // 5. Add Notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Bottles Recycled!',
      message: `Credited +${ptsEarned} EcoPts for ${bottlesCount} plastic bottles.`,
      time: 'Just now',
      read: false,
      type: 'streak',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handle Reward Redemption
  const handleConfirmRedeem = (reward: RewardItem) => {
    if (user.ecoPts < reward.pts) return;

    // Deduct Points
    setUser((prev) => ({
      ...prev,
      ecoPts: prev.ecoPts - reward.pts,
    }));

    // Record Transaction
    const claimCode = `CLAIM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'redemption',
      title: `Redeemed: ${reward.title}`,
      amountPts: -reward.pts,
      timestamp: 'Just now',
      code: claimCode,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    // Add Notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Reward Redeemed!',
      message: `Claim code ${claimCode} generated for ${reward.title}.`,
      time: 'Just now',
      read: false,
      type: 'reward',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLoginSuccess = (customProfile?: Partial<UserProfile>) => {
    if (customProfile) {
      setUser((prev) => ({
        ...prev,
        ...customProfile,
      }));
    }
    setCurrentView('dashboard');
  };

  const getViewTitle = (): string | undefined => {
    switch (currentView) {
      case 'dashboard':
        return undefined; // Uses Search bar in Header
      case 'rewards':
        return 'Campus Marketplace';
      case 'leaderboard':
        return 'Eco-Champions Leaderboard';
      case 'bin-map':
        return 'SmartBin Locations';
      case 'settings':
        return 'Profile & Settings';
      case 'landing':
        return 'Campus Landing & Login';
      default:
        return undefined;
    }
  };

  if (currentView === 'landing') {
    return (
      <LandingLoginView
        onLoginSuccess={handleLoginSuccess}
        onExploreAsGuest={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0d0d0f] text-zinc-100 relative pb-16 lg:pb-0">
      {/* Sidebar Navigation (Desktop Persistent + Mobile Drawer) */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        user={user}
        onOpenRecycleModal={() => {
          setSelectedBinForRecycle(undefined);
          setIsRecycleModalOpen(true);
        }}
        onLogout={() => setCurrentView('landing')}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar
          user={user}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          title={getViewTitle()}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              user={user}
              rewards={rewards}
              leaderboard={leaderboard}
              onNavigateView={setCurrentView}
              onOpenRecycleModal={() => {
                setSelectedBinForRecycle(undefined);
                setIsRecycleModalOpen(true);
              }}
              onOpenRedeemModal={(reward) => setSelectedRewardForRedeem(reward)}
            />
          )}

          {currentView === 'leaderboard' && (
            <LeaderboardView
              user={user}
              leaderboard={leaderboard}
              onOpenRecycleModal={() => {
                setSelectedBinForRecycle(undefined);
                setIsRecycleModalOpen(true);
              }}
            />
          )}

          {currentView === 'rewards' && (
            <MarketplaceView
              user={user}
              rewards={rewards}
              onOpenRedeemModal={(reward) => setSelectedRewardForRedeem(reward)}
            />
          )}

          {currentView === 'bin-map' && (
            <BinMapView
              bins={bins}
              onSelectBinToRecycle={(bin) => {
                setSelectedBinForRecycle(bin);
                setIsRecycleModalOpen(true);
              }}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              user={user}
              transactions={transactions}
              onLogout={() => setCurrentView('landing')}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on < lg screens) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0f]/95 border-t border-zinc-800/80 backdrop-blur-md px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentView === 'dashboard' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentView('rewards')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentView === 'rewards' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span>Market</span>
        </button>

        {/* Center Drop & Earn Floating Action */}
        <button
          onClick={() => {
            setSelectedBinForRecycle(undefined);
            setIsRecycleModalOpen(true);
          }}
          className="-mt-5 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/40 border-2 border-[#0d0d0f] active:scale-95 transition-all cursor-pointer"
          title="Drop & Earn"
        >
          <Recycle className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setCurrentView('leaderboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentView === 'leaderboard' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span>Ranks</span>
        </button>

        <button
          onClick={() => setCurrentView('bin-map')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentView === 'bin-map' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Map</span>
        </button>
      </nav>

      {/* Interactive Modals */}
      <RecycleModal
        isOpen={isRecycleModalOpen}
        onClose={() => setIsRecycleModalOpen(false)}
        bins={bins}
        initialBin={selectedBinForRecycle}
        onDepositComplete={handleDepositComplete}
      />

      <RedeemModal
        isOpen={selectedRewardForRedeem !== null}
        reward={selectedRewardForRedeem}
        user={user}
        onClose={() => setSelectedRewardForRedeem(null)}
        onConfirmRedeem={handleConfirmRedeem}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        transactions={transactions}
      />
    </div>
  );
}
