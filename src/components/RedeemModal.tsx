import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle2, Clock, Copy, ShieldCheck, Sparkles } from 'lucide-react';
import { RewardItem, UserProfile } from '../types';

interface RedeemModalProps {
  isOpen: boolean;
  reward: RewardItem | null;
  user: UserProfile;
  onClose: () => void;
  onConfirmRedeem: (reward: RewardItem) => void;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  isOpen,
  reward,
  user,
  onClose,
  onConfirmRedeem,
}) => {
  const [step, setStep] = useState<'confirm' | 'ticket'>('confirm');
  const [copied, setCopied] = useState(false);
  const [ticketCode] = useState(() => `ED-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen || !reward) return null;

  const handleConfirm = () => {
    onConfirmRedeem(reward);
    setStep('ticket');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0f]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#16161a] border border-zinc-800/80 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative space-y-5 sm:space-y-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-2xl bg-[#1f1f24] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'confirm' ? (
          <>
            <div className="text-center space-y-3">
              <img
                src={reward.image}
                alt={reward.title}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500/80 shadow-lg"
              />
              <h3 className="text-2xl font-black font-display text-white tracking-tight">{reward.title}</h3>
              <p className="text-xs text-zinc-400">{reward.vendor}</p>
            </div>

            <div className="p-4 bg-[#0d0d0f] rounded-2xl border border-zinc-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Item Cost</span>
                <span className="text-rose-400 font-bold">-{reward.pts} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Current Balance</span>
                <span className="text-white">{user.ecoPts.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold">
                <span className="text-zinc-400">Balance After</span>
                <span className="text-indigo-400">{(user.ecoPts - reward.pts).toLocaleString()} pts</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-display py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm Redemption</span>
            </button>
          </>
        ) : (
          /* Redemption Ticket Display */
          <div className="text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                TICKET READY
              </span>
              <h3 className="text-xl font-black font-display text-white mt-2 tracking-tight">{reward.title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Present code at vendor counter to claim</p>
            </div>

            {/* QR Code Ticket */}
            <div className="bg-white p-4 rounded-3xl border-2 border-indigo-500/80 inline-block shadow-2xl">
              <QRCodeSVG
                value={`UPPETURE-CLAIM:${ticketCode}:${reward.id}`}
                size={140}
                bgColor="#FFFFFF"
                fgColor="#0d0d0f"
                level="M"
              />
            </div>

            {/* Copyable Claim Code */}
            <div className="bg-[#0d0d0f] p-3.5 rounded-2xl border border-zinc-800/80 flex items-center justify-between font-mono">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CLAIM CODE</p>
                <p className="text-sm font-black text-indigo-400">{ticketCode}</p>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 bg-[#1f1f24] text-white hover:text-indigo-400 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-800"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-[11px] text-zinc-500 font-mono flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Expires in 15:00 minutes
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-[#1f1f24] hover:bg-zinc-800 text-white font-bold font-display py-3 rounded-2xl text-xs transition-colors cursor-pointer border border-zinc-800"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
