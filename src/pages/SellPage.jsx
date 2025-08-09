// import { useEffect, useState } from "react";
// import Table from "../components/Table";
// import { useAppContext } from "../context/AppContext";
// import axios from "axios";

// const RenderParam = ({ type }) => {
//   if (type === "string") {
//     return (
//       <input
//         type="text"
//         placeholder="HH:MM:SS"
//         className="border text-sm rounded-lg bg-white/10 block w-full p-2.5  border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//       />
//     );
//   } else if (type === "float") {
//     return (
//       <input
//         type="number"
//         className="border text-sm rounded-lg bg-white/10 block w-full p-2.5 border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//       />
//     );
//   }
// };

// function SellPage() {
//   const {
//     selectedToken,
//     setSelectedToken,
//     selectedStrategy,
//     setSelectedStrategy,
//     strategies,
//     setUserTokenData,
//   } = useAppContext();
//   const closeModal = () => setSelectedToken(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     // Fetch data logic here
//     try {
//       setLoading(true);
//       // Simulate fetching data
//       const { data } = await axios.get(
//         "https://api.solana.fm/v1/addresses/45FWtR7cvoRGoyb27BaPfDPfdWnxewTGSvhbjHxL6NcA/tokens"
//       );
//       //convert obj in  array
//       const allTokens = Object.values(data.tokens);
//       const filteredTokens = allTokens.filter((token) => token?.ata !== null);
//       const tokenAddresses = filteredTokens.map((token) => token.mint);
//       const tokenData = await axios.post("https://api.solana.fm/v1/tokens", {
//         tokens: tokenAddresses,
//       });

//       const pricedata = await axios.get(
//         `https://lite-api.jup.ag/price/v2?ids=${tokenAddresses.join(",")}`
//       );

//       // for each key in tokenData obj do something
//       Object.keys(tokenData.data).forEach((mint) => {
//         // Do something with tokenInfo
//         tokenData.data[mint].ata = data?.tokens[mint]?.ata;
//         tokenData.data[mint].balance = data?.tokens[mint]?.balance;
//         tokenData.data[mint].value = pricedata?.data?.data[mint]?.price;
//       });

//       // https://lite-api.jup.ag/price/v2?ids=

//       setUserTokenData(Object.values(tokenData.data));

//       console.log(tokenData.data);
//       setLoading(false);

//       // Process response data if needed
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     //add div with background image from assets
//     <div className="flex flex-col flex-grow overflow-auto">
//       <div className=" my-5 mx-6 md:mx-16 bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto  ">
//         <p className="mx-6 mt-5 font-bold md:mx-10">My Tokens</p>
//         <div className="mx-6 my-5 md:mx-10">
//           {loading ? (
//             <div role="status" className="flex items-center justify-center ">
//               <svg
//                 aria-hidden="true"
//                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//                 viewBox="0 0 100 101"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                   fill="currentColor"
//                 />
//                 <path
//                   d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                   fill="currentFill"
//                 />
//               </svg>
//               <span className="sr-only">Loading...</span>
//             </div>
//           ) : (
//             <Table />
//           )}
//         </div>
//       </div>
//       {selectedToken && (
//         <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative w-full max-w-3xl max-h-full p-4">
//             {/* Modal content */}
//             <div className="relative border border-white shadow-lg bg-white/10 backdrop-blur-md rounded-xl">
//               {/* Modal body */}
//               <div className="m-6 font-bold text-white md:mx-10 md:my-5">
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={selectedToken?.tokenList?.image}
//                     alt="symbol"
//                     className="w-8 h-8"
//                   />
//                   <p>
//                     {selectedToken?.tokenList?.name} (
//                     {selectedToken?.tokenList?.symbol})
//                   </p>
//                 </div>

//                 <form class="my-5">
//                   <div>
//                     <label
//                       for="number-input"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
//                     >
//                       Quantity
//                     </label>
//                     <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                       <div>
//                         <input
//                           type="number"
//                           id="number-input"
//                           aria-describedby="helper-text-explanation"
//                           class="border  text-sm rounded-lg bg-white/10 block w-full p-2.5 bg-transparent border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter quantity"
//                           required
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
//                           25%
//                         </button>
//                         <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
//                           50%
//                         </button>
//                         <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
//                           MAX
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-2 md:mt-5">
//                     <label
//                       for="number-input"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
//                     >
//                       Selling Strategy
//                     </label>
//                     <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
//                       {strategies.map((strategy) => (
//                         <div
//                           onClick={() => setSelectedStrategy(strategy)}
//                           className={`p-2.5 cursor-pointer text-white border bg-white/10 hover:bg-white/20 text-xs md:text-sm rounded-lg ${
//                             selectedStrategy?.title === strategy.title
//                               ? "border-[#184BFF]"
//                               : "border-white"
//                           }`}
//                         >
//                           <p className="text-sm">{strategy.title}</p>
//                           <p className="text-xs text-gray-400">
//                             {strategy.description}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   {selectedStrategy ? (
//                     selectedStrategy?.params.map((param) => (
//                       <div className="mt-2 md:mt-5">
//                         <label
//                           for="number-input"
//                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
//                         >
//                           {param.name}
//                         </label>
//                         <RenderParam type={param.type} />
//                       </div>
//                     ))
//                   ) : (
//                     <></>
//                   )}
//                 </form>
//               </div>

//               {/* Modal footer */}
//               <div className="flex items-center justify-end px-4 pb-4 md:px-10 md:pb-5 ">
//                 <button
//                   onClick={closeModal}
//                   type="button"
//                   className="py-2.5 px-5 ms-3 text-sm font-medium bg-white/10 focus:outline-none  rounded-lg border hover:bg-white/20  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-[#2B2B2B] text-white border-white hover:text-white "
//                 >
//                   Deploy
//                 </button>
//                 <button
//                   onClick={closeModal}
//                   type="button"
//                   className="py-2.5 px-5 ms-3 text-sm font-medium bg-white/10 focus:outline-none  rounded-lg border hover:bg-white/20  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-[#2B2B2B] text-white border-red-500 hover:text-white "
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SellPage;

import React, { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Zap,
  Settings,
  X,
  Info,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const RenderParam = ({ type, param }) => {
  if (type === "string") {
    return (
      <input
        type="text"
        placeholder={param?.placeholder || "HH:MM:SS"}
        className="block w-full p-3 text-sm text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-white/10 backdrop-blur-xl border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
    );
  } else if (type === "float") {
    return (
      <input
        type="number"
        step="0.01"
        placeholder={param?.placeholder || "0.00"}
        className="block w-full p-3 text-sm text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-white/10 backdrop-blur-xl border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
    );
  }
};

const TokenRow = ({ token, onSelect }) => {
  const [showValues, setShowValues] = useState(true);

  const formatCurrency = (value) => {
    if (!showValues) return "••••••";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value || 0);
  };

  const formatNumber = (value) => {
    if (!showValues) return "••••";
    return new Intl.NumberFormat("en-US").format(value || 0);
  };

  const mockPnl = Math.random() * 20 - 10; // Random PnL for demo

  return (
    <div
      onClick={() => onSelect(token)}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] group"
    >
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={token?.tokenList?.image || "/api/placeholder/40/40"}
                alt={token?.tokenList?.symbol}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/40/6366f1/ffffff?text=${
                    token?.tokenList?.symbol?.charAt(0) || "T"
                  }`;
                }}
              />
              <div className="absolute w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full -top-1 -right-1"></div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {token?.tokenList?.name || "Unknown Token"}
              </h3>
              <p className="text-xs text-gray-300">
                {token?.tokenList?.symbol || "N/A"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-semibold ${
                mockPnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {mockPnl >= 0 ? "+" : ""}
              {mockPnl.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-400">Balance</p>
            <p className="font-semibold text-white">
              {formatNumber(token?.balance)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Value</p>
            <p className="font-semibold text-white">
              {formatCurrency(token?.value * token?.balance)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="items-center justify-between hidden sm:flex">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={token?.tokenList?.image || "/api/placeholder/40/40"}
              alt={token?.tokenList?.symbol}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/48/6366f1/ffffff?text=${
                  token?.tokenList?.symbol?.charAt(0) || "T"
                }`;
              }}
            />
            <div className="absolute w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full -top-1 -right-1"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {token?.tokenList?.name || "Unknown Token"}
            </h3>
            <p className="text-sm text-gray-300">
              {token?.tokenList?.symbol || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="text-right">
            <p className="font-semibold text-white">
              {formatNumber(token?.balance)}
            </p>
            <p className="text-sm text-gray-400">Balance</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-white">
              {formatCurrency(token?.value * token?.balance)}
            </p>
            <p className="text-sm text-gray-400">Value</p>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold ${
                mockPnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {mockPnl >= 0 ? "+" : ""}
              {mockPnl.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-400">24h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function SellPage() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showValues, setShowValues] = useState(true);
  const {
    selectedToken,
    setSelectedToken,
    selectedStrategy,
    setSelectedStrategy,
    strategies,
    setUserTokenData,
    userTokenData,
  } = useAppContext();

  const fetchData = async () => {
    // Fetch data logic here
    try {
      setLoading(true);
      // Simulate fetching data
      const { data } = await axios.get(
        "https://api.solana.fm/v1/addresses/45FWtR7cvoRGoyb27BaPfDPfdWnxewTGSvhbjHxL6NcA/tokens"
      );
      //convert obj in  array
      const allTokens = Object.values(data.tokens);
      const filteredTokens = allTokens.filter((token) => token?.ata !== null);
      const tokenAddresses = filteredTokens.map((token) => token.mint);
      const tokenData = await axios.post("https://api.solana.fm/v1/tokens", {
        tokens: tokenAddresses,
      });

      const pricedata = await axios.get(
        `https://lite-api.jup.ag/price/v2?ids=${tokenAddresses.join(",")}`
      );

      // for each key in tokenData obj do something
      Object.keys(tokenData.data).forEach((mint) => {
        // Do something with tokenInfo
        tokenData.data[mint].ata = data?.tokens[mint]?.ata;
        tokenData.data[mint].balance = data?.tokens[mint]?.balance;
        tokenData.data[mint].value = pricedata?.data?.data[mint]?.price;
      });

      // https://lite-api.jup.ag/price/v2?ids=

      setUserTokenData(Object.values(tokenData.data));

      console.log(tokenData.data);
      setLoading(false);

      // Process response data if needed
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Mock data for demonstration

  const closeModal = () => {
    setSelectedToken(null);
    setSelectedStrategy(null);
  };

  const filteredTokens = userTokenData.filter(
    (token) =>
      token?.tokenList?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      token?.tokenList?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = userTokenData.reduce(
    (sum, token) => sum + token.balance * token.value,
    0
  );

  return (
    <div className="flex flex-col flex-grow overflow-auto ">
      {/* Header */}
      <div className="bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto mx-3 sm:mx-6 md:mx-16 p-3 sm:p-6 my-3 sm:my-5">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-row justify-between gap-3 mb-4 sm:items-center sm:mb-6 sm:gap-0">
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <Wallet className="w-6 h-6 text-purple-400 sm:w-8 sm:h-8" />
              <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                My Tokens
              </h1>
              <span className="px-2 py-1 text-xs text-purple-300 rounded-full sm:px-3 sm:text-sm bg-purple-500/20">
                {userTokenData.length} tokens
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={fetchData}
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

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:mb-8">
            <div className="p-4 border sm:p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    Portfolio Value
                  </p>
                  <p className="text-lg font-bold text-white sm:text-2xl lg:text-3xl">
                    {showValues ? `$${totalValue.toLocaleString()}` : "••••••"}
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-400 sm:w-8 sm:h-8" />
              </div>
              <p className="mt-1 text-xs text-green-400 sm:mt-2 sm:text-sm">
                +12.3% today
              </p>
            </div>
            <div className="p-4 border sm:p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    Active Strategies
                  </p>
                  <p className="text-lg font-bold text-white sm:text-2xl lg:text-3xl">
                    3
                  </p>
                </div>
                <Zap className="w-6 h-6 text-purple-400 sm:w-8 sm:h-8" />
              </div>
              <p className="mt-1 text-xs text-purple-400 sm:mt-2 sm:text-sm">
                2 pending
              </p>
            </div>
            <div className="p-4 border sm:p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 sm:text-sm">24h Volume</p>
                  <p className="text-lg font-bold text-white sm:text-2xl lg:text-3xl">
                    {showValues ? "$8,450" : "••••••"}
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-blue-400 sm:w-8 sm:h-8" />
              </div>
              <p className="mt-1 text-xs text-blue-400 sm:mt-2 sm:text-sm">
                15 trades
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col items-stretch gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-all duration-300 border rounded-lg sm:py-3 sm:text-base bg-white/10 backdrop-blur-xl border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-white transition-all duration-300 border rounded-lg sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-white/20 sm:text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Tokens List */}
        <div className="">
          <div className="">
            {loading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="w-8 h-8 border-b-2 border-purple-500 rounded-full sm:w-12 sm:h-12 animate-spin"></div>
                <span className="ml-4 text-sm text-white sm:text-lg">
                  Loading tokens...
                </span>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token, index) => (
                    <TokenRow
                      key={index}
                      token={token}
                      onSelect={setSelectedToken}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center sm:py-16">
                    <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-600 sm:w-16 sm:h-16" />
                    <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                      No Tokens Found
                    </h3>
                    <p className="text-sm text-gray-400 sm:text-base">
                      {searchTerm
                        ? "No tokens match your search."
                        : "You don't have any tokens yet."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 bg-[#1C1C1C]/90 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={selectedToken?.tokenList?.image}
                    alt={selectedToken?.tokenList?.symbol}
                    className="w-10 h-10 rounded-full sm:w-12 sm:h-12"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white sm:text-2xl">
                      {selectedToken?.tokenList?.name}
                    </h2>
                    <p className="text-sm text-gray-300 sm:text-base">
                      ({selectedToken?.tokenList?.symbol})
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 transition-colors duration-300 rounded-lg hover:bg-white/20"
                >
                  <X className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Quantity Section */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:mb-3 sm:text-base">
                    Quantity
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      className="block w-full p-2 text-sm text-white placeholder-gray-400 transition-all duration-300 border rounded-lg sm:p-3 sm:text-base bg-white/10 backdrop-blur-xl border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                      {["25%", "50%", "75%", "MAX"].map((percentage) => (
                        <button
                          key={percentage}
                          type="button"
                          className="py-2 text-xs text-white transition-all duration-300 border rounded-lg sm:py-3 sm:text-sm bg-white/10 hover:bg-white/20 border-white/30 hover:scale-105"
                        >
                          {percentage}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategy Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:mb-3 sm:text-base">
                    Selling Strategy
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
                    {strategies.map((strategy) => (
                      <div
                        key={strategy.title}
                        onClick={() => setSelectedStrategy(strategy)}
                        className={`p-3 sm:p-4 cursor-pointer border rounded-xl transition-all duration-300 hover:scale-105 ${
                          selectedStrategy?.title === strategy.title
                            ? "bg-purple-500/20 border-purple-500"
                            : "bg-white/10 border-white/30 hover:bg-white/15"
                        }`}
                      >
                        <h4 className="text-sm font-medium text-white sm:text-base">
                          {strategy.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                          {strategy.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Parameters */}
                {selectedStrategy && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-400 sm:w-5 sm:h-5" />
                      <h3 className="text-sm font-medium text-white sm:text-base">
                        Strategy Parameters
                      </h3>
                    </div>
                    {selectedStrategy.params.map((param, index) => (
                      <div key={index}>
                        <label className="block mb-2 text-sm font-medium text-white sm:text-base">
                          {param.name}
                        </label>
                        <RenderParam type={param.type} param={param} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col items-stretch justify-end gap-3 pt-4 mt-6 border-t sm:flex-row sm:items-center sm:gap-4 sm:pt-6 sm:mt-8 border-white/20">
                <button
                  onClick={closeModal}
                  className="order-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 border rounded-lg sm:px-6 sm:py-3 sm:text-base bg-white/10 hover:bg-white/20 border-white/30 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModal}
                  className="order-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg sm:px-6 sm:py-3 sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 sm:order-2"
                >
                  Deploy Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellPage;
