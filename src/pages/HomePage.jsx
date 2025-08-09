import { useAppContext } from "../context/AppContext";
import {
  ChevronDown,
  Zap,
  Shield,
  TrendingUp,
  BarChart3,
  Rocket,
  Wallet,
  Search,
  Bot,
} from "lucide-react";
function HomePage() {
  const { connectWallet } = useAppContext();
  const steps = [
    {
      title: "Connect Wallet",
      description: "No sign-up. Just connect via Solana.",
    },
    {
      title: "Select Token",
      description: "Paste Pump.fun address or pick from trending.",
    },
    {
      title: "Deploy AI Bot",
      description: "Moonman manages liquidity and volatility automatically.",
    },
  ];
  const features = [
    {
      title: "Smart Spread",
      description: "AI adjusts buy/sell spread based on token momentum.",
      icon: Zap,
      detail: "Advanced algorithms analyze market conditions in real-time",
    },
    {
      title: "Liquidity Guard",
      description: "Preserves runway and protects against instant rugs.",
      icon: Shield,
      detail: "Multi-layer protection against sudden liquidity pulls",
    },
    {
      title: "Volume Boost",
      description: "Optional AI buy-side support for fair launches.",
      icon: TrendingUp,
      detail: "Organic volume generation for healthy price discovery",
    },
    {
      title: "Market Dashboard",
      description: "Real-time charts and order depth at a glance.",
      icon: BarChart3,
      detail: "Professional-grade analytics and monitoring tools",
    },
  ];

  return (
    <div className="z-10 flex flex-col flex-grow overflow-y-auto ">
      <div className=" flex flex-col items-center justify-center min-h-[calc(100vh-40px)] flex-shrink-0 text-2xl font-bold text-center text-white md:text-5xl lg:text-7xl">
        <div className="p-4 mx-6 border border-white shadow-lg md:mx-32 md:p-6 md:rounded-3xl bg-white/10 backdrop-blur-xl rounded-xl">
          <p className="mb-4">Send Your Token to the </p>
          <p className="mb-4 te.xt-lg lg:mb-8 md:text-3xl lg:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Moon with AI
            </span>{" "}
            <span>🚀</span>
          </p>
          {/* <p></p> */}
          <p className="mb-2 text-xs md:text-xl text-wrap">
            AI-powered market-making for Pump.fun, Solana, and beyond.
          </p>
          <button
            onClick={connectWallet}
            className="order-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg sm:px-6 sm:py-3 sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 sm:order-2"

            // className="text-sm lg:text-base bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] hover:from-[#18C8FF] hover:to-[#933FFE] text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg mt-5 "
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="z-10  h-[calc(100vh-40px)] justify-center items-center flex  flex-shrink-0">
        <div className="relative w-full max-w-xl max-h-full p-4">
          <div className="flex flex-col justify-center p-4 md:p-5">
            <p className="mb-10 text-2xl font-bold text-center text-white md:text-5xl">
              How it Works
            </p>
            <div className="flex flex-col items-center gap-4 mb-5">
              <ol className="flex flex-row flex-wrap gap-5">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className="w-full p-6 border border-white shadow-lg bg-white/10 backdrop-blur-xl rounded-xl"
                  >
                    <div className="flex flex-row items-center text-white">
                      <span className=" flex items-center justify-center w-10 h-10  rounded-full  ring-4  ring-[#6C6C6D] bg-[#333333] flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex flex-col ml-2">
                        <h3 className="ml-2 text-sm font-medium md:text-base">
                          {step.title}
                        </h3>
                        <h3 className="ml-2 text-xs text-gray-300 md:text-sm">
                          {step.description}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10  h-[calc(100vh-40px)] justify-center items-center flex  flex-shrink-0">
        <div className="relative w-full max-w-5xl max-h-full p-4">
          <div className="flex flex-col justify-center p-4 md:p-5">
            <p className="mb-10 text-2xl font-bold text-center text-white md:text-5xl">
              Mission Control Features
            </p>
            {/* <div className="flex flex-col items-center gap-4 mb-5">
              <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="w-full p-6 border border-white shadow-lg bg-white/10 backdrop-blur-xl rounded-xl"
                  >
                    <div className="flex flex-row items-center text-white">
                      <span className=" flex items-center justify-center w-10 h-10  rounded-full  ring-4  ring-[#6C6C6D] bg-[#333333] flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex flex-col ml-2">
                        <h3 className="ml-2 text-sm font-medium md:text-base">
                          {feature.title}
                        </h3>
                        <h3 className="ml-2 text-xs text-gray-300 md:text-sm">
                          {feature.description}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}

              </ol>
            </div> */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-2 transition-all duration-300 border border-white cursor-pointer md:p-8 group bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/15"
                    // onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start gap-2 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
                          <Icon className="text-white w-7 h-7" />
                        </div>
                      </div>
                      <div className="">
                        <h3 className="mb-1 text-base font-semibold text-white md:mb-2 md:text-xl">
                          {feature.title}
                        </h3>
                        <p className="mb-1 text-sm leading-relaxed text-gray-300 md:mb-2 md:text-base">
                          {feature.description}
                        </p>
                        <p className="text-xs font-medium text-purple-300 transition-colors md: group-hover:text-purple-200">
                          {feature.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
