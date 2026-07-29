import React from 'react';
import { LayoutDashboard, Gift, Trophy, MapPin, Settings, HelpCircle, Recycle, LogOut, X } from 'lucide-react';
import { ViewType, UserProfile } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  user: UserProfile;
  onOpenRecycleModal: () => void;
  onLogout?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  user,
  onOpenRecycleModal,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navContent = (
    <>
      <div>
        {/* Brand Logo */}
        <div
          className="flex items-center justify-between px-2 py-2 mb-7 cursor-pointer"
          onClick={() => {
            onSelectView('dashboard');
            if (onCloseMobile) onCloseMobile();
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Recycle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black font-display tracking-tight text-white flex items-center gap-1">
                up<span className="text-indigo-400">PET</span>ure
              </h1>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase -mt-0.5">
                Recycle & Earn
              </p>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseMobile();
              }}
              className="lg:hidden p-2 rounded-xl bg-[#16161a] border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="bg-[#16161a] border border-zinc-800/80 rounded-2xl p-3.5 mb-6 flex items-center gap-3 shadow-md">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover border border-indigo-500/40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-indigo-500 border-2 border-[#16161a] rounded-full" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-white truncate font-display">{user.name}</h3>
            <p className="text-[11px] text-zinc-500 font-mono truncate mt-0.5">
              {user.studentId} • {user.department}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'rewards', label: 'Rewards Marketplace', icon: Gift },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'bin-map', label: 'SmartBin Map', icon: MapPin },
            { id: 'settings', label: 'Settings & Profile', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id as ViewType);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 space-y-2.5">
        <button
          onClick={() => {
            onOpenRecycleModal();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-extrabold font-display py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all text-xs cursor-pointer"
        >
          <Recycle className="w-4 h-4 stroke-[2.5]" />
          <span>Drop & Earn</span>
        </button>

        {onLogout && (
          <button
            onClick={() => {
              if (onLogout) onLogout();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 py-2.5 px-3 rounded-2xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        )}

        <button
          onClick={() => {
            onSelectView('settings');
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 text-[11px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors py-1 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help Center</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0d0d0f] border-r border-zinc-800/80 flex-col justify-between shrink-0 min-h-screen p-5 select-none">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#0d0d0f]/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 bg-[#0d0d0f] border-r border-zinc-800 p-5 flex flex-col justify-between h-full z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};
