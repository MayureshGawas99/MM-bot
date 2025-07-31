import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import BotsPage from "./pages/BotsPage";
import Header from "./components/Header";

import glow1 from "./assets/glow-1.png";
import glow2 from "./assets/glow-2.png";
import glow3 from "./assets/glow-3.png";

import leftPlanets from "./assets/left_planets.png";
import rightPlanets from "./assets/right_planets.png";
import { useAppContext } from "./context/AppContext";
function App() {
  const { activeTab } = useAppContext();
  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden bg-black App">
      {activeTab === "dashboard" ? (
        <>
          <img
            src={glow1}
            className="absolute top-[-25rem] left-[-10rem] h-[50rem]"
            alt="Glow 1"
          />
          <img
            src={glow2}
            className="absolute bottom-[-5rem] right-[-10rem] lg:right-[-5rem] h-[50rem]"
            alt="Glow 2"
          />
          <img
            src={leftPlanets}
            className="absolute hidden md:block bottom-0 left-0 lg:left-20 h-[90%]"
            alt="left Planets"
          />
          <img
            src={rightPlanets}
            className="absolute hidden md:block bottom-0 right-[-10rem] lg:right-[-5rem] h-[90%]"
            alt="Right Planets"
          />
        </>
      ) : (
        <>
          <img
            src={glow3}
            className="absolute bottom-[-15rem]  left-[-12rem] md:left-[-20rem] h-[60rem]"
            alt="Glow 1"
          />
          <img
            src={glow3}
            className="absolute  top-[-25rem] right-[-12rem] md:right-[-20rem]  h-[60rem]"
            alt="Glow 2"
          />
        </>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/bots" element={<BotsPage />} />
      </Routes>
    </div>
  );
}

export default App;
