import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Modal() {
  const [isOpenModal, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const ModalOpened = localStorage.getItem("modalOpened");
    if (!ModalOpened) {
      openModal();
      localStorage.setItem("modalOpened", "true");
    }
  }, []);

  return (
    <>
      {isOpenModal && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative  bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white">
              {/* Modal body */}
              <div className="p-4 md:p-5 flex justify-center">
                <ol className="relative text-white border-s-2 border-white mt-5 ">
                  <li className="mb-10 ms-6">
                    <div className="flex items-center">
                      <span className="absolute flex items-center justify-center w-10 h-10  rounded-full -start-5 ring-4  ring-[#6C6C6D] bg-[#333333]">
                        1
                      </span>
                      <h3 className="font-medium  ml-2">Select the Token</h3>
                    </div>
                  </li>
                  <li className="mb-10 ms-6">
                    <div className="flex items-center">
                      <span className="absolute flex items-center justify-center w-10 h-10  rounded-full -start-5 ring-4  ring-[#6C6C6D] bg-[#333333]">
                        2
                      </span>
                      <h3 className="font-medium  ml-2">
                        Select the Selling Strategy
                      </h3>
                    </div>
                  </li>
                  <li className="ms-6">
                    <div className="flex items-center">
                      <span className="absolute flex items-center justify-center w-10 h-10  rounded-full -start-5 ring-4  ring-[#6C6C6D] bg-[#333333]">
                        3
                      </span>
                      <h3 className="font-medium  ml-2">Deploy the Bot</h3>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-center p-4 md:p-5 ">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-[#2B2B2B] text-white border-white hover:text-white hover:bg-gray-700"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
