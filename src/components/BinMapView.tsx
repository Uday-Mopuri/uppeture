import React, { useState } from 'react';
import { MapPin, Recycle, Navigation, AlertCircle, Sparkles } from 'lucide-react';
import { SmartBin } from '../types';

interface BinMapViewProps {
  bins: SmartBin[];
  onSelectBinToRecycle: (bin: SmartBin) => void;
}

export const BinMapView: React.FC<BinMapViewProps> = ({
  bins,
  onSelectBinToRecycle,
}) => {
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(bins[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBins = bins.filter((bin) => {
    if (filterStatus === 'available') return bin.status === 'available';
    if (filterStatus === 'almost-full') return bin.status === 'almost-full';
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-[0.2em] uppercase mb-0.5">
            CAMPUS NETWORK
          </p>
          <h1 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight">
            SmartBin Campus Map
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Locate automated SmartBins, check real-time capacities, and earn points on deposit.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-[#16161a] p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto overflow-x-auto max-w-full">
          {['all', 'available', 'almost-full'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono capitalize transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Interactive SVG Campus Map Canvas Bento Tile */}
        <div className="lg:col-span-8 bg-[#16161a] border border-zinc-800/80 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 relative min-h-[320px] sm:min-h-[440px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Map Grid Background Styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          {/* Campus Paths / Buildings SVG illustration */}
          <svg className="absolute inset-0 w-full h-full stroke-zinc-800 stroke-[2] fill-none opacity-60 pointer-events-none">
            {/* Campus Pathways */}
            <path d="M 100 150 Q 250 180 400 120 T 700 250" />
            <path d="M 200 80 L 200 380 Q 450 350 650 380" />
            <path d="M 350 200 C 450 100 550 300 750 180" />
            {/* Building outlines */}
            <rect x="28%" y="20%" width="12%" height="15%" rx="12" className="fill-zinc-900 stroke-zinc-800" />
            <rect x="50%" y="40%" width="15%" height="18%" rx="12" className="fill-zinc-900 stroke-zinc-800" />
            <rect x="15%" y="58%" width="14%" height="16%" rx="12" className="fill-zinc-900 stroke-zinc-800" />
            <rect x="70%" y="28%" width="16%" height="20%" rx="12" className="fill-zinc-900 stroke-zinc-800" />
          </svg>

          {/* SmartBin Pins Plotted */}
          <div className="relative z-10 w-full h-full min-h-[260px] sm:min-h-[380px]">
            {filteredBins.map((bin) => {
              const isSelected = selectedBin?.id === bin.id;
              const isFull = bin.status === 'full';
              const isAlmostFull = bin.status === 'almost-full';

              return (
                <button
                  key={bin.id}
                  onClick={() => setSelectedBin(bin)}
                  style={{ left: `${bin.coordinates.x}%`, top: `${bin.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transition-all border-2 ${
                      isFull
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500'
                        : isAlmostFull
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                        : 'bg-indigo-600 text-white border-indigo-400'
                    } ${isSelected ? 'ring-4 ring-indigo-500/40 animate-pulse' : ''}`}
                  >
                    <Recycle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>

                  {/* Pin Tooltip */}
                  <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d0d0f]/90 backdrop-blur-md text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
                    {bin.name} ({bin.capacityPercentage}%)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 bg-[#0d0d0f]/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-zinc-800 flex items-center gap-3 sm:gap-4 text-xs font-mono max-w-fit shadow-lg flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-indigo-500" />
              <span className="text-white text-[10px] sm:text-[11px]">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-amber-500" />
              <span className="text-zinc-300 text-[10px] sm:text-[11px]">Almost Full</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-rose-500" />
              <span className="text-zinc-300 text-[10px] sm:text-[11px]">Full</span>
            </div>
          </div>
        </div>

        {/* Selected Bin Sidebar Details */}
        <div className="lg:col-span-4 space-y-4">
          {selectedBin ? (
            <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase">
                    ● ONLINE SMARTBIN
                  </span>
                  <h3 className="text-xl font-black font-display text-white mt-2 tracking-tight">
                    {selectedBin.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {selectedBin.location}
                  </p>
                </div>
              </div>

              {/* Capacity Progress Ring */}
              <div className="bg-[#1f1f24] p-4 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Bin Capacity</span>
                  <span className="font-bold text-indigo-400">{selectedBin.capacityPercentage}% Full</span>
                </div>
                <div className="w-full bg-[#0d0d0f] h-3 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      selectedBin.capacityPercentage > 85
                        ? 'bg-rose-500'
                        : selectedBin.capacityPercentage > 60
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${selectedBin.capacityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#1f1f24] p-3 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">BOTTLES TODAY</p>
                  <p className="text-lg font-black text-white mt-0.5">{selectedBin.bottlesToday}</p>
                </div>
                <div className="bg-[#1f1f24] p-3 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">DISTANCE</p>
                  <p className="text-lg font-black text-indigo-400 mt-0.5">{selectedBin.distance}</p>
                </div>
              </div>

              {/* Primary Drop Action */}
              <button
                onClick={() => onSelectBinToRecycle(selectedBin)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-display py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all text-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Deposit Bottles Here</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-6 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-xs font-bold text-white">Select a SmartBin on the map</p>
            </div>
          )}

          {/* Bin List */}
          <div className="bg-[#16161a] border border-zinc-800/80 rounded-[2.5rem] p-5 shadow-2xl space-y-2 max-h-64 overflow-y-auto">
            <h4 className="text-xs font-black font-display text-white px-1">Nearby Bins</h4>
            {bins.map((bin) => (
              <div
                key={bin.id}
                onClick={() => setSelectedBin(bin)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedBin?.id === bin.id
                    ? 'bg-[#1f1f24] border-indigo-500/60 shadow-lg'
                    : 'bg-[#0d0d0f] border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <h5 className="text-xs font-bold text-white">{bin.name}</h5>
                  <p className="text-[10px] text-zinc-500 font-mono">{bin.distance}</p>
                </div>
                <span className="font-mono text-xs font-bold text-indigo-400">
                  {bin.capacityPercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
