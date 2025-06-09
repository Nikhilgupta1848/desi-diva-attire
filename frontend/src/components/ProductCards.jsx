import { assets } from "../assets/assets";

const ProductCards = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-0 py-10">
      {/* Weightless Lehengas Card */}
      <div className="w-full sm:w-1/2 h-[500px] relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={assets.lehenga_card}
          alt="Weightless Lehengas"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm sm:text-lg font-semibold">WEIGHTLESS</p>
          <h2 className="text-2xl sm:text-3xl font-bold">LEHENGAS</h2>
        </div>
      </div>

      {/* Classic Kurtas Card */}
      <div className="w-full sm:w-1/2 h-[500px] relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={assets.kurta_card}
          alt="Classic Kurtas"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm sm:text-lg font-semibold">CLASSIC</p>
          <h2 className="text-2xl sm:text-3xl font-bold">KURTAS</h2>
        </div>
      </div>

      {/* Stellar Sarees Card */}
      <div className="w-full sm:w-1/2 h-[500px] relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={assets.saree_card}
          alt="Stellar Sarees"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm sm:text-lg font-semibold">STELLAR</p>
          <h2 className="text-2xl sm:text-3xl font-bold">SAREES</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
