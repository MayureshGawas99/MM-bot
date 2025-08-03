import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { useAppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    walletAddress,
    setWalletAddress,
    connectWallet,
    handleSignOut,
    activeTab,
    setActiveTab,
  } = useAppContext();

  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(false);

  // =====================================================
  const isExistingUser = async () => setExistingUser(false);
  //   =====================================================

  useEffect(() => {
    isExistingUser();
  }, []);

  useEffect(() => {
    console.log("Wallet Address:", walletAddress);
    if (walletAddress) {
      if (existingUser) {
        navigate("/bots");
      } else {
        navigate("/sell");
      }
    } else {
      navigate("/");
    }
  }, [walletAddress]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("dashboard");
    } else if (location.pathname === "/sell") {
      setActiveTab("sell");
    } else if (location.pathname === "/bots") {
      setActiveTab("bots");
    } else {
      setActiveTab("dashboard");
    }
  }, [location.pathname]);

  const fetechUserData = async () => {
    try {
      let cachedWalletAddress = localStorage.getItem("walletAddress");
      if (cachedWalletAddress) {
        setWalletAddress(cachedWalletAddress);
      } else {
        navigate("/");
      }
    } catch (error) {
      connectWallet.log(error);
      localStorage.removeItem("walletAddress");
      setWalletAddress(null);
    }
  };

  useEffect(() => {
    fetechUserData();
  }, []);

  return (
    <nav className="z-10 text-white">
      <div className="flex flex-wrap items-center justify-between py-4 mx-6 md:mx-16 ">
        <div
          onClick={() => {
            if (walletAddress) {
              navigate("/sell");
            } else {
              navigate("/");
            }
          }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            TokeBro.AI
          </span>
        </div>
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0">
          {walletAddress ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={userIcon}
                  alt="user"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-50 my-4 text-base list-none bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white right-20 md:right-16 top-10">
                  <a
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm cursor-pointer hover:bg-white/20"
                  >
                    <span className="block text-sm text-gray-300 ">
                      {walletAddress?.substring(0, 4) +
                        "..." +
                        walletAddress?.slice(-4)}
                    </span>
                  </a>
                  <a
                    onClick={() => {
                      handleSignOut();
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm cursor-pointer hover:bg-white/20"
                  >
                    Sign out
                  </a>
                </div>
              )}

              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-white rounded-lg md:hidden focus:ring-2 focus:ring-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 17 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              className="order-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg sm:px-6 sm:py-3 sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 sm:order-2"

              // className="text-xs md:text-sm lg:text-base bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] hover:from-[#18C8FF] hover:to-[#933FFE] text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
        {walletAddress && (
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 md:flex-row md:space-x-2 md:mt-0 md:border-0 ">
              <li>
                <div
                  onClick={() => {
                    navigate("/sell");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-6 py-1 text-sm transition-colors rounded-md hover:bg-white/20 cursor-pointer ${
                    activeTab === "sell" && "bg-white/10"
                  }`}
                >
                  Sell
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    navigate("/bots");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-6 py-1 text-sm transition-colors rounded-md hover:bg-white/20 cursor-pointer ${
                    activeTab === "bots" && "bg-white/10"
                  }`}
                >
                  Bots
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
