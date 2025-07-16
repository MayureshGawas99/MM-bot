// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const strategies = [
    {
      title: "TWAP",
      description: "Time-Weighted Average Price",
      params: [
        { name: "Order Duration", type: "string" },
        { name: "Percent", type: "float" },
      ],
    },
    {
      title: "VWAP",
      description: "Volume-Weighted Average Price",
      params: [
        { name: "Order Duration", type: "string" },
        { name: "Percent", type: "float" },
      ],
    },
    {
      title: "PVOL",
      description: "Participation Volume",
      params: [
        { name: "Order Duration", type: "string" },
        { name: "Paricipation Volume", type: "float" },
      ],
    },
  ];
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [userTokenData, setUserTokenData] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [activeTab, setActiveTab] = useState("dashboard");

  const isPhantomInstalled = () => window.solana && window.solana.isPhantom;

  const connectWallet = async () => {
    if (!isPhantomInstalled()) {
      alert(
        "Phantom Wallet not found. Please install it from https://phantom.app/"
      );
      return;
    }
    try {
      const resp = await window.solana.connect();
      console.log(resp);
      setWalletAddress(resp.publicKey.toString());
    } catch (err) {
      console.error("Connection Error:", err);
    }
  };

  const handleSignOut = () => {
    if (window.solana?.disconnect) {
      window.solana.disconnect();
    }

    setWalletAddress(null);
    console.log("Wallet disconnected.");
  };

  return (
    <AppContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        activeTab,
        setActiveTab,
        selectedToken,
        setSelectedToken,
        selectedStrategy,
        setSelectedStrategy,
        userTokenData,
        setUserTokenData,
        connectWallet,
        handleSignOut,
        strategies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
