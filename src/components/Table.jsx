import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Table = () => {
  const { selectedToken, setSelectedToken } = useAppContext();
  const data = [
    {
      id: 1,
      name: "Bitcoin (BTC)",
      symbol: "BTC",
      balance: "0.5421 BTC",
      profit: "+$3,245.67",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png",
    },
    {
      id: 2,
      name: "Ethereum (ETH)",
      symbol: "ETH",
      balance: "4.1234 ETH",
      profit: "+$1,204.22",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png", // Replace with ETH icon
    },
    {
      id: 3,
      name: "Solana (SOL)",
      symbol: "SOL",
      balance: "82.45 SOL",
      profit: "-$145.30",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png", // Replace with SOL icon
    },
    {
      id: 4,
      name: "Cardano (ADA)",
      symbol: "ADA",
      balance: "1,200 ADA",
      profit: "+$98.12",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png", // Replace with ADA icon
    },
    {
      id: 5,
      name: "Dogecoin (DOGE)",
      symbol: "DOGE",
      balance: "15,000 DOGE",
      profit: "+$356.45",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png", // Replace with DOGE icon
    },
    {
      id: 6,
      name: "USD Coin (USDC)",
      symbol: "USDC",
      balance: "1,000 USDC",
      profit: "$0.00",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png", // Replace with USDC icon
    },
  ];
  return (
    <div className="relative overflow-x-auto max-h-[20rem] ">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
        <thead className="text-xs ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Profit
            </th>
            <th scope="col" className="px-10 py-3 text-right ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className={`text-white cursor-pointer hover:bg-white/10 ${
                selectedToken?.id === item.id && "bg-white/10"
              }`}
              key={item.id}
              onClick={() => setSelectedToken(item)}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap "
              >
                <div className="flex items-center gap-2">
                  <img src={item?.icon} alt="symbol" className="w-8 h-8" />
                  <p>{item?.name}</p>
                </div>
              </th>
              <td className="px-6 py-4">{item.balance}</td>
              <td className="px-6 py-4">{item.profit}</td>
              <td className="px-6 py-4 text-right">
                <button
                  to="/sell"
                  className={`bg-white/10 px-6 py-1 rounded-md text-sm hover:bg-white/20 text-white transition-colors`}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
