import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Recycle, CheckCircle2, Sparkles, Plus, Minus, MapPin } from 'lucide-react';
import { SmartBin } from '../types';

interface RecycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bins: SmartBin[];
  initialBin?: SmartBin;
  onDepositComplete: (bottlesCount: number, ptsEarned: number, co2Saved: number, binId: string) => void;
}

export const RecycleModal: React.FC<RecycleModalProps> = ({
  isOpen,
  onClose,
  bins,
  initialBin,
  onDepositComplete,
}) => {
  const [selectedBinId, setSelectedBinId] = useState<string>(initialBin?.id || bins[0]?.id || '');
  const [bottleCount, setBottleCount] = useState<number>(3);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const ptsEarned = bottleCount * 10;
  const co2Saved = Number((bottleCount * 0.04).toFixed(2));

  const handleDeposit = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setDepositSuccess(true);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b'],
        });
      } catch (err) {
        console.error(err);
      }

      onDepositComplete(bottleCount, ptsEarned, co2Saved, selectedBinId);
    }, 1200);
  };

  const handleReset = () => {
    setDepositSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0f]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#16161a] border border-zinc-800/80 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative space-y-5 sm:space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-2xl bg-[#1f1f24] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!depositSuccess ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Recycle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black font-display text-white tracking-tight">SmartBin Bottle Recycler</h3>
                <p className="text-xs text-zinc-400">Deposit PET bottles to earn EcoPts instantly</p>
              </div>
            </div>

            {/* Select SmartBin Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">
                1. Select SmartBin Location
              </label>
              <select
                value={selectedBinId}
                onChange={(e) => setSelectedBinId(e.target.value)}
                className="w-full bg-[#1f1f24] border border-zinc-800 focus:border-indigo-500 text-white text-xs font-mono rounded-2xl p-3.5 focus:outline-none transition-all"
              >
                {bins.map((bin) => (
                  <option key={bin.id} value={bin.id}>
                    {bin.name} ({bin.distance})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Counter */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">
                2. Number of Plastic Bottles
              </label>
              <div className="bg-[#1f1f24] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between">
                <button
                  onClick={() => setBottleCount(Math.max(1, bottleCount - 1))}
                  className="w-10 h-10 rounded-xl bg-[#0d0d0f] text-white hover:bg-indigo-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <p className="text-3xl font-black font-mono text-indigo-400">{bottleCount}</p>
                  <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">BOTTLES</p>
                </div>

                <button
                  onClick={() => setBottleCount(bottleCount + 1)}
                  className="w-10 h-10 rounded-xl bg-[#0d0d0f] text-white hover:bg-indigo-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calculated Earnings Preview */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#0d0d0f] rounded-2xl border border-zinc-800/80">
              <div>
                <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">POINTS REWARD</p>
                <p className="text-xl font-black font-mono text-indigo-400">+{ptsEarned} pts</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">CO2 OFFSET</p>
                <p className="text-xl font-black font-mono text-emerald-400">+{co2Saved} kg</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleDeposit}
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-display py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all text-xs cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning SmartBin...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Bottle Deposit</span>
                </>
              )}
            </button>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black font-display text-white tracking-tight">Deposit Confirmed!</h3>
              <p className="text-xs text-zinc-400 mt-1">
                You deposited {bottleCount} bottles at SmartBin location.
              </p>
            </div>

            <div className="p-5 bg-[#1f1f24] rounded-2xl border border-indigo-500/40 max-w-sm mx-auto space-y-1">
              <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">REWARD CREDITED</p>
              <p className="text-3xl font-black font-mono text-indigo-400">+{ptsEarned} EcoPts</p>
              <p className="text-xs text-emerald-400 font-mono font-bold">Streak Active (+1 Day)</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-display py-3.5 rounded-2xl transition-all text-xs cursor-pointer"
            >
              Back to App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
