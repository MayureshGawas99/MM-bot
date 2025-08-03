import React, { useState } from "react";
import {
  Bot,
  Play,
  Pause,
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
} from "lucide-react";

function BotsPage() {
  const [loading, setLoading] = useState(false);
  const [bots, setBots] = useState([
    {
      id: 1,
      name: "Bot 1",
      token: "FLAPPY",
      tokenName: "FLAPPY",
      balance: 1000,
      value: 5000000,
      status: "active",
      pnl: 12.5,
      volume24h: 2500000,
      trades24h: 147,
      lastTrade: "2m ago",
      spread: "0.5%",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      name: "Bot 2",
      token: "MOON",
      tokenName: "MOONMAN",
      balance: 500,
      value: 1250000,
      status: "paused",
      pnl: -3.2,
      volume24h: 850000,
      trades24h: 89,
      lastTrade: "15m ago",
      spread: "0.8%",
      color: "from-red-500 to-pink-600",
    },
    {
      id: 3,
      name: "Bot 3",
      token: "SOL",
      tokenName: "Solana",
      balance: 2000,
      value: 6000000,
      status: "active",
      pnl: 5.0,
      volume24h: 3000000,
      trades24h: 200,
      lastTrade: "5m ago",
      spread: "0.3%",
      color: "from-blue-500 to-indigo-600",
    },
  ]);

  const [showValues, setShowValues] = useState(true);

  const toggleBotStatus = (id) => {
    setBots(
      bots.map((bot) =>
        bot.id === id
          ? { ...bot, status: bot.status === "active" ? "paused" : "active" }
          : bot
      )
    );
  };

  const formatCurrency = (value) => {
    if (!showValues) return "••••••";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (!showValues) return "••••";
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div className="flex flex-col flex-grow overflow-auto">
      <div className="bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto mx-3 sm:mx-4 md:mx-8 lg:mx-16 p-3 sm:p-4 md:p-6 my-3 sm:my-4 md:my-5">
        <div className="mb-6 md:mb-8">
          {/* Header - Responsive */}
          <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Bot className="w-6 h-6 text-purple-400 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <h1 className="text-2xl font-bold text-white sm:text-2xl md:text-3xl">
                My Bots
              </h1>
              <span className="px-2 py-1 text-xs text-purple-300 rounded-full sm:text-sm bg-purple-500/20">
                {bots.length} Active
              </span>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {/* <button
                onClick={() => setShowValues(!showValues)}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-white transition-all duration-300 border rounded-lg sm:text-base bg-white/10 hover:bg-white/20 backdrop-blur-xl border-white/20"
              >
                {showValues ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {showValues ? "Hide Values" : "Show Values"}
                </span>
                <span className="sm:hidden">
                  {showValues ? "Hide" : "Show"}
                </span>
              </button> */}
              <button
                // onClick={fetchData}
                className="flex items-center gap-1 px-3 py-2 text-xs text-white transition-all duration-300 border rounded-lg sm:gap-2 sm:px-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-white/20 sm:text-sm"
              >
                <RefreshCw
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Stats Overview - Responsive Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6 sm:gap-3 md:gap-4 md:mb-8 lg:grid-cols-4">
            <div className="p-3 border sm:p-4 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs text-gray-300 sm:text-sm">
                    Total Value
                  </p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    {formatCurrency(6250000)}
                  </p>
                </div>
                <TrendingUp className="self-start w-6 h-6 text-green-400 sm:w-7 sm:h-7 md:w-8 md:h-8 sm:self-center" />
              </div>
              <p className="mt-1 text-xs text-green-400 sm:text-sm">
                +8.3% today
              </p>
            </div>

            <div className="p-3 border sm:p-4 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs text-gray-300 sm:text-sm">24h Volume</p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    {formatCurrency(3350000)}
                  </p>
                </div>
                <TrendingUp className="self-start w-6 h-6 text-blue-400 sm:w-7 sm:h-7 md:w-8 md:h-8 sm:self-center" />
              </div>
              <p className="mt-1 text-xs text-blue-400 sm:text-sm">
                236 trades
              </p>
            </div>

            <div className="p-3 border sm:p-4 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs text-gray-300 sm:text-sm">
                    Active Bots
                  </p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    1
                  </p>
                </div>
                <Bot className="self-start w-6 h-6 text-purple-400 sm:w-7 sm:h-7 md:w-8 md:h-8 sm:self-center" />
              </div>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">1 paused</p>
            </div>

            <div className="p-3 border sm:p-4 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs text-gray-300 sm:text-sm">Avg PnL</p>
                  <p className="text-lg font-bold text-green-400 sm:text-xl md:text-2xl">
                    +4.7%
                  </p>
                </div>
                <TrendingUp className="self-start w-6 h-6 text-green-400 sm:w-7 sm:h-7 md:w-8 md:h-8 sm:self-center" />
              </div>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">last 24h</p>
            </div>
          </div>
        </div>

        {/* Bots Grid - Responsive */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Bot Header - Responsive */}
              <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${bot.color} flex items-center justify-center`}
                  >
                    <Bot className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {bot.name}
                    </h3>
                    <p className="text-xs text-gray-300 sm:text-sm">
                      Token: {bot.token} ({bot.tokenName})
                    </p>
                  </div>
                </div>
                <div className="flex items-center self-start gap-2 sm:self-center">
                  <div
                    className={`px-2 py-1 sm:px-3 rounded-full text-xs font-medium ${
                      bot.status === "active"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {bot.status === "active" ? "Active" : "Paused"}
                  </div>
                </div>
              </div>

              {/* Bot Stats - Responsive */}
              <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2 sm:gap-4 sm:mb-6">
                <div className="p-3 rounded-lg sm:p-4 bg-black/20">
                  <p className="mb-1 text-xs text-gray-400 sm:text-sm">
                    Balance
                  </p>
                  <p className="text-base font-semibold text-white sm:text-lg">
                    {formatNumber(bot.balance)} {bot.token}
                  </p>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    {formatCurrency(bot.value)}
                  </p>
                </div>
                <div className="p-3 rounded-lg sm:p-4 bg-black/20">
                  <p className="mb-1 text-xs text-gray-400 sm:text-sm">
                    24h PnL
                  </p>
                  <p
                    className={`text-base sm:text-lg font-semibold ${
                      bot.pnl >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {bot.pnl >= 0 ? "+" : ""}
                    {bot.pnl}%
                  </p>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    {bot.trades24h} trades
                  </p>
                </div>
              </div>

              {/* Additional Stats - Responsive */}
              <div className="grid grid-cols-3 gap-2 mb-4 sm:gap-4 sm:mb-6">
                <div className="text-center">
                  <p className="mb-1 text-xs text-gray-400">24h Volume</p>
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {formatCurrency(bot.volume24h)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-xs text-gray-400">Spread</p>
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {bot.spread}
                  </p>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-xs text-gray-400">Last Trade</p>
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {bot.lastTrade}
                  </p>
                </div>
              </div>

              {/* Action Buttons - Responsive */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <button
                  onClick={() => toggleBotStatus(bot.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    bot.status === "active"
                      ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                      : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                  }`}
                >
                  {bot.status === "active" ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start
                    </>
                  )}
                </button>

                <div className="flex gap-2 sm:gap-3">
                  <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white transition-all duration-300 border rounded-lg sm:px-4 bg-white/10 hover:bg-white/20 border-white/20 hover:scale-105">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg sm:px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105">
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for New Users - Responsive */}
        {bots.length === 0 && (
          <div className="py-12 text-center sm:py-16">
            <Bot className="w-16 h-16 mx-auto mb-4 text-gray-600 sm:w-20 sm:h-20 md:w-24 md:h-24 sm:mb-6" />
            <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">
              No Bots Yet
            </h3>
            <p className="max-w-sm mx-auto mb-6 text-sm text-gray-400 sm:max-w-md sm:mb-8 sm:text-base">
              Create your first AI trading bot to start automated market-making
              for your tokens.
            </p>
            <button className="px-6 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg sm:px-8 sm:py-3 sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105">
              <Plus className="inline w-4 h-4 mr-2 sm:w-5 sm:h-5" />
              Create Your First Bot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BotsPage;
