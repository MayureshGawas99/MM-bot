import { FaRobot } from "react-icons/fa";

function BotsPage() {
  const bots = [
    {
      name: "Bot 1",
      tokenList: {
        name: "FLAPPY",
        symbol: "FLAPPY",
        image:
          "https://bafkreih5f225i4wqjjmyjlssbumig4d3xj3mzmq57qos7n5c2s4fty73su.ipfs.nftstorage.link",
        extensions: null,
      },
      balance: 1000,
      value: 5000,
      status: "active",
    },
    {
      name: "Bot 2",
      tokenList: {
        name: "MOONMAN",
        symbol: "MOON",
        image:
          "https://bafkreih5f225i4wqjjmyjlssbumig4d3xj3mzmq57qos7n5c2s4fty73su.ipfs.nftstorage.link",
        extensions: null,
      },
      balance: 500,
      value: 2500,
      status: "inactive",
    },
  ];
  return (
    //add div with background image from assets
    <div className="flex flex-col flex-grow overflow-auto">
      <div className=" my-5 mx-6 md:mx-16 bg-[#1C1C1C]/60 backdrop-blur-md rounded-xl shadow-lg border border-white text-white overflow-auto  ">
        <p className="mx-6 my-5 font-bold md:mx-10">My Bots</p>
        <div className="relative overflow-auto">
          {bots.map((bot) => (
            <div
              className="p-2 mx-6 mb-4 border rounded-md md:mx-10 md:p-4"
              // onClick={() => setSelectedToken(token)}
              key={bot?.mint}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`flex items-center justify-center p-2 rounded-full ${
                    bot?.status === "active" ? "bg-green-500" : "bg-red-500"
                  } `}
                >
                  <FaRobot size={28} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold line-clamp-1">{bot?.name}</p>
                  <p className="text-xs line-clamp-1">
                    Token: {bot?.tokenList?.name} ({bot?.tokenList?.symbol})
                  </p>
                </div>
              </div>
              <div className="px-2 py-2 text-xs transition-colors rounded-md bg-white/10 ">
                <p className="mb-2">Balance: {bot.balance}</p>
                <p>Value: {bot.value ? `$${bot.value * bot.balance}` : "-"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BotsPage;
