import { useEffect } from "react";
import Table from "../components/Table";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const RenderParam = ({ type }) => {
  if (type === "string") {
    return (
      <input
        type="text"
        placeholder="HH:MM:SS"
        className="border text-sm rounded-lg bg-white/10 block w-full p-2.5  border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    );
  } else if (type === "float") {
    return (
      <input
        type="number"
        className="border text-sm rounded-lg bg-white/10 block w-full p-2.5 border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    );
  }
};

function SellPage() {
  const {
    selectedToken,
    setSelectedToken,
    selectedStrategy,
    setSelectedStrategy,
    strategies,
    setUserTokenData,
  } = useAppContext();
  const closeModal = () => setSelectedToken(null);

  const fetchData = async () => {
    // Fetch data logic here
    try {
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

      // Process response data if needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    //add div with background image from assets
    <div className="flex flex-col flex-grow overflow-auto">
      <div className=" my-5 mx-6 md:mx-16 bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto  ">
        <p className="mx-6 mt-5 font-bold md:mx-10">My Tokens</p>
        <div className="mx-6 my-5 md:mx-10">
          <Table />
        </div>
      </div>
      {selectedToken && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-full p-4">
            {/* Modal content */}
            <div className="relative border border-white shadow-lg bg-white/10 backdrop-blur-md rounded-xl">
              {/* Modal body */}
              <div className="m-6 font-bold text-white md:mx-10 md:my-5">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedToken?.tokenList?.image}
                    alt="symbol"
                    className="w-8 h-8"
                  />
                  <p>
                    {selectedToken?.tokenList?.name} (
                    {selectedToken?.tokenList?.symbol})
                  </p>
                </div>

                <form class="my-5">
                  <div>
                    <label
                      for="number-input"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                    >
                      Quantity
                    </label>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      <div>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          class="border  text-sm rounded-lg bg-white/10 block w-full p-2.5 bg-transparent border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter quantity"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
                          25%
                        </button>
                        <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
                          50%
                        </button>
                        <button className="p-2.5 text-white border bg-white/10 hover:bg-white/20 border-white text-xs md:text-sm rounded-lg ">
                          MAX
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-5">
                    <label
                      for="number-input"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                    >
                      Selling Strategy
                    </label>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                      {strategies.map((strategy) => (
                        <div
                          onClick={() => setSelectedStrategy(strategy)}
                          className={`p-2.5 cursor-pointer text-white border bg-white/10 hover:bg-white/20 text-xs md:text-sm rounded-lg ${
                            selectedStrategy?.title === strategy.title
                              ? "border-[#184BFF]"
                              : "border-white"
                          }`}
                        >
                          <p className="text-sm">{strategy.title}</p>
                          <p className="text-xs text-gray-400">
                            {strategy.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedStrategy ? (
                    selectedStrategy?.params.map((param) => (
                      <div className="mt-2 md:mt-5">
                        <label
                          for="number-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                        >
                          {param.name}
                        </label>
                        <RenderParam type={param.type} />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </form>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end px-4 pb-4 md:px-10 md:pb-5 ">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium bg-white/10 focus:outline-none  rounded-lg border hover:bg-white/20  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-[#2B2B2B] text-white border-white hover:text-white "
                >
                  Deploy
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium bg-white/10 focus:outline-none  rounded-lg border hover:bg-white/20  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-[#2B2B2B] text-white border-red-500 hover:text-white "
                >
                  Close
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
