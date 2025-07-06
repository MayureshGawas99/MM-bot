// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
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
    localStorage.removeItem("userDetails");
    setUser(null);
    console.log("Wallet disconnected.");
  };

  return (
    <AppContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        user,
        setUser,
        activeTab,
        setActiveTab,
        selectedToken,
        setSelectedToken,
        connectWallet,
        handleSignOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
