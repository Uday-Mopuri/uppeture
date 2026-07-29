import React from 'react';
import { X, History, Sparkles } from 'lucide-react';
import { Transaction } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0f]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#16161a] border border-zinc-800/80 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-7 shadow-2xl relative space-y-4 sm:space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-2xl bg-[#1f1f24] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black font-display text-white tracking-tight">Recycling Activity History</h3>
            <p className="text-xs text-zinc-400">Your recent deposits and rewards redeemed</p>
          </div>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 rounded-2xl bg-[#1f1f24] border border-zinc-800/80 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-white mb-0.5">{txn.title}</p>
                <p className="text-zinc-500 font-mono text-[10px]">{txn.timestamp}</p>
                {txn.code && (
                  <span className="text-[10px] text-indigo-400 font-mono mt-1 block">
                    Code: {txn.code}
                  </span>
                )}
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

        <button
          onClick={onClose}
          className="w-full bg-[#1f1f24] hover:bg-zinc-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors cursor-pointer border border-zinc-800"
        >
          Close History
        </button>
      </div>
    </div>
  );
};
