export type ViewType = 'dashboard' | 'rewards' | 'leaderboard' | 'bin-map' | 'settings' | 'landing';

export interface UserProfile {
  id: string;
  name: string;
  studentId: string;
  department: string;
  avatar: string;
  ecoPts: number;
  totalBottles: number;
  co2OffsetKg: number;
  rank: number;
  streakDays: number;
  weeklyBottles: number;
  weeklyGoal: number;
}

export interface SmartBin {
  id: string;
  name: string;
  location: string;
  capacityPercentage: number;
  status: 'available' | 'almost-full' | 'full' | 'maintenance';
  bottlesToday: number;
  coordinates: { x: number; y: number }; // Percentage relative to campus map
  distance: string;
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'canteen' | 'stationery' | 'merch' | 'events';
  pts: number;
  description: string;
  image: string;
  isLimited?: boolean;
  endsIn?: string;
  vendor: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  studentId?: string;
  department: string;
  bottles: number;
  ecoPts: number;
  avatar: string;
  badge?: string;
  isCurrentUser?: boolean;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'redemption';
  title: string;
  amountPts: number;
  timestamp: string;
  code?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'streak' | 'reward' | 'rank' | 'bin';
}
