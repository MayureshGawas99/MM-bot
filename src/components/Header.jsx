import { act, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { useAppContext } from "../context/AppContext";
import { IoIosLogOut } from "react-icons/io";
import {
  Link,
  useLocation,
  useNavigate,
  activeTab,
  setActiveTab,
} from "react-router-dom";

const Header = () => {
  const {
    walletAddress,
    setWalletAddress,
    setUser,
    connectWallet,
    handleSignOut,
    activeTab,
    setActiveTab,
  } = useAppContext();

  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(true);

  // =====================================================
  const isExistingUser = async () => false;
  const getUserDetails = (address) => {
    let name = "Narayan Gawas";
    let email = "narayan@example.com";
    let walletAddress = address;

    return { name, email, walletAddress };
  };
  //   =====================================================

  useEffect(() => {
    isExistingUser();
  }, []);

  useEffect(() => {
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
      let userDetails = localStorage.getItem("userDetails");
      if (userDetails) {
        setUser(JSON.parse(userDetails));
        setWalletAddress(JSON.parse(userDetails).walletAddress);
      } else {
        if (walletAddress) {
          let user = getUserDetails(walletAddress);
          localStorage.setItem("userDetails", JSON.stringify(user));
          setUser(user);
          setWalletAddress(user.walletAddress);
        }
      }
    } catch (error) {
      connectWallet.log(error);
      localStorage.removeItem("userDetails");
      setUser(null);
      setWalletAddress(null);
    }
  };

  useEffect(() => {
    fetechUserData();
  }, [walletAddress]);

  return (
    <header className="text-white z-10">
      <div className="mx-6 lg:mx-16 flex flex-row items-center justify-between my-4">
        <div
          onClick={() => {
            handleSignOut();
            navigate("/");
          }}
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-8 w-8 lg:h-10 lg:w-10" />
          <p className="text-xl lg:text-3xl font-bold">ABCD</p>
        </div>
        {walletAddress && (
          <div className="flex flex-row gap-2 items-center">
            <Link
              to="/sell"
              className={`${
                activeTab === "sell" && "bg-white/10"
              } px-6 py-1 rounded-md text-sm hover:bg-white/20 transition-colors`}
            >
              Sell
            </Link>
            <Link
              to="/bots"
              className={`${
                activeTab === "bots" && "bg-white/10"
              } px-6 py-1 rounded-md text-sm hover:bg-white/20 transition-colors`}
            >
              Bots
            </Link>
          </div>
        )}

        {walletAddress ? (
          <ConnectedWalletUI />
        ) : (
          <button
            onClick={connectWallet}
            className="text-sm lg:text-base bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] hover:from-[#18C8FF] hover:to-[#933FFE] text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

const ConnectedWalletUI = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, handleSignOut } = useAppContext();

  return (
    <div className=" flex items-center flex-row gap-2">
      <div className="flex flex-row gap-2 items-center ">
        <p className="text-sm lg:text-base text-gray-300">{user?.name}</p>
        <img
          className="w-8 h-8  bg-gray-800  border border-white rounded-full focus:ring-4 focus:ring-gray-300 "
          src={userIcon}
          alt="User"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </div>
      <button
        onClick={handleSignOut}
        className=" p-1.5 bg-gray-800 border border-white text-white text-sm rounded-full  hover:bg-gray-700  cursor-pointer"
      >
        <IoIosLogOut size={20} />
      </button>
    </div>
  );
};

export default Header;
