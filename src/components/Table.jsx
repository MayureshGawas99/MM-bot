import { useAppContext } from "../context/AppContext";

const Table = () => {
  const { selectedToken, setSelectedToken, userTokenData } = useAppContext();

  return (
    <>
      <div className="relative hidden overflow-auto md:block">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
          <thead className="text-xs ">
            <tr>
              <th scope="col" className="py-3 pr-6 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Balance
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userTokenData.map((token) => (
              <tr
                className={`text-white cursor-pointer hover:bg-white/10 ${
                  selectedToken?.mint === token.mint && "bg-white/10"
                }`}
                key={token?.mint}
                onClick={() => setSelectedToken(token)}
              >
                <th scope="row" className="py-4 pr-6 font-medium ">
                  <div className="flex items-center gap-2">
                    <img
                      src={token?.tokenList?.image}
                      alt="symbol"
                      className="w-8 h-8"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className="line-clamp-1">{token?.tokenList?.name}</p>
                      <p className="text-xs text-gray-400 cursor-pointer">
                        {token?.ata?.substring(0, 4) +
                          "..." +
                          token?.ata?.slice(-4)}
                      </p>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {token?.tokenList?.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{token.balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {token.value ? `$${token.value * token.balance}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative overflow-auto md:hidden">
        {userTokenData.map((token) => (
          <div
            className="p-2 mb-4 border rounded-md"
            onClick={() => setSelectedToken(token)}
            key={token?.mint}
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={token?.tokenList?.image}
                alt="symbol"
                className="w-8 h-8"
                loading="lazy"
              />
              <div className="flex flex-col">
                <p className="text-sm line-clamp-1">
                  {token?.tokenList?.name} ({token?.tokenList?.symbol})
                </p>
                <p className="text-xs text-gray-400 cursor-pointer">
                  {token?.ata?.substring(0, 4) + "..." + token?.ata?.slice(-4)}
                </p>
              </div>
            </div>
            <div className="px-2 py-2 text-xs transition-colors rounded-md bg-white/10 ">
              <p className="mb-2">Balance: {token.balance}</p>
              <p>
                Value: {token.value ? `$${token.value * token.balance}` : "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
