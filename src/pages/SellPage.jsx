import Modal from "../components/Modal";
import Table from "../components/Table";
import { useAppContext } from "../context/AppContext";

function SellPage() {
  const { selectedToken, setSelectedToken } = useAppContext();

  return (
    //add div with background image from assets
    <div className="flex flex-col flex-grow overflow-auto">
      <div className=" mt-5 mx-16 bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white  ">
        <p className="mx-10 mt-5 font-bold">My Tokens</p>
        <div className="mx-10 mb-5">
          <Table />
        </div>
      </div>
      {selectedToken && (
        <div className=" my-5 mx-16 bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white  ">
          <div className="mx-10 my-5 font-bold">
            <div className="flex items-center gap-2">
              <img src={selectedToken?.icon} alt="symbol" className="w-8 h-8" />
              <p>{selectedToken?.name}</p>
            </div>

            <form class="my-5">
              <div>
                <label
                  for="number-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Quantity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      class="border  text-sm rounded-lg  block w-full p-2.5 bg-transparent border-white placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 text-white border border-white text-sm rounded-lg ">
                      25%
                    </button>
                    <button className="p-2.5 text-white border border-white text-sm rounded-lg ">
                      50%
                    </button>
                    <button className="p-2.5 text-white border border-white text-sm rounded-lg ">
                      MAX
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <label
                  for="number-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Selling Strategy
                </label>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal />
    </div>
  );
}

export default SellPage;
