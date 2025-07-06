import Modal from "../components/Modal";

function BotsPage() {
  return (
    //add div with background image from assets
    <div className="flex-grow flex flex-col items-center justify-center overflow-hidden">
      <div className="flex-grow text-white flex flex-col items-center justify-center z-10 text-4xl md:text-5xl lg:text-7xl font-bold text-center">
        <p className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white">
          Bots
        </p>
      </div>
      <Modal />
    </div>
  );
}

export default BotsPage;
