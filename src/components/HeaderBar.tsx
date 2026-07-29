import React, { useState } from 'react';
import { Bell, Sparkles, CheckCircle2, Menu, Recycle } from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderBarProps {
  user: UserProfile;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  title?: string;
  onToggleMobileMenu?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  user,
  notifications,
  onMarkNotificationsRead,
  title,
  onToggleMobileMenu,
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
      {/* Left: Mobile Menu Toggle & Brand Logo "upPETure" */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-2xl bg-[#16161a] border border-zinc-800 text-zinc-300 hover:text-white shrink-0 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Brand Title & Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Recycle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
          <span className="font-black font-display text-base sm:text-lg tracking-tight text-white">
            up<span className="text-indigo-400">PET</span>ure
          </span>
        </div>

        {/* Page Title Sub-label */}
        {title && (
          <div className="hidden md:flex items-center gap-2 text-zinc-500">
            <span className="text-zinc-700">/</span>
            <h2 className="text-xs sm:text-sm font-bold text-zinc-300 truncate tracking-wide">
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Right Controls: Points, Notifications, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* EcoPts Balance Pill */}
        <div className="bg-[#16161a] border border-indigo-500/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="font-mono font-bold text-[11px] sm:text-xs text-indigo-400 whitespace-nowrap">
            {user.ecoPts.toLocaleString()} <span className="text-[10px] sm:text-[11px] font-sans text-zinc-400 font-medium hidden xs:inline">Pts</span>
          </span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              if (unreadCount > 0) onMarkNotificationsRead();
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-[#16161a] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#16161a] border border-zinc-800 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-800">
                <h4 className="font-display font-bold text-xs text-white">Notifications</h4>
                <span className="text-[10px] text-zinc-500 font-mono">{notifications.length} total</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 rounded-2xl bg-[#1f1f24] border border-zinc-800 flex gap-3 text-xs"
                  >
                    <div className="text-indigo-400 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white mb-0.5 text-xs truncate">{notif.title}</p>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">{notif.message}</p>
                      <span className="text-[10px] text-indigo-400 font-mono mt-1 block">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Logo / Avatar */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-indigo-500/40 shrink-0"
        />
      </div>
    </header>
  );
};
