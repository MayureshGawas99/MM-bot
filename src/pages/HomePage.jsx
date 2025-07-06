import { useAppContext } from "../context/AppContext";

function HomePage() {
  const { connectWallet } = useAppContext();
  return (
    //add div with background image from assets
    <div className="flex-grow flex flex-col items-center justify-center  overflow-hidden">
      <div className="flex-grow text-white flex flex-col items-center justify-center z-10 text-4xl md:text-5xl lg:text-7xl font-bold text-center">
        <p>Automate Your Crypto Moves.</p>
        <p>Trade Smarter with</p>
        <p>ABCD</p>
        <button
          onClick={connectWallet}
          className="text-sm lg:text-base bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] hover:from-[#18C8FF] hover:to-[#933FFE] text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg mt-5"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
