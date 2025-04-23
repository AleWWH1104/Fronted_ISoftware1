import { useState } from "react";

const images = [
  "/pool6.jpg",
  "/pool8.jpg",
  "/pool10.jpg",
  "/pool12.jpg",
  "/pool13.jpg",
];

function Services() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const nextImage = () => setIndex((index + 1) % images.length);
  const prevImage = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div id="servicios" className="scroll-mt-20 py-16 px-6 lg:px-20">
      <h1 className="text-5xl font-bold text-center mb-12 text-[#0d3750]">Servicios</h1>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Carrusel */}
        <div
          className="relative w-full lg:w-1/2 h-[400px] overflow-hidden rounded-lg border-4 border-[#0d3750] shadow-lg"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={images[index]}
            alt="Servicio"
            className="w-full h-full object-cover rounded-lg transition duration-500"
          />
          {hovered && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-4xl bg-white/60 border-none rounded-full px-3 cursor-pointer z-10"
                onClick={prevImage}
              >
                ‹
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-4xl bg-white/60 border-none rounded-full px-3 cursor-pointer z-10"
                onClick={nextImage}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Cards */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#cbd7de] rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5">
            <h3 className="text-lg font-semibold mb-3 text-[#0d3750]">Construcción de piscinas</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="bg-white px-3 py-1 rounded shadow-sm">Regulares</li>
              <li className="bg-white px-3 py-1 rounded shadow-sm">Irregulares</li>
              <li className="bg-white px-3 py-1 rounded shadow-sm">Jacuzzis</li>
              <li className="bg-white px-3 py-1 rounded shadow-sm">Piscinas con vidrio</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#cbd7de] rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-[#0d3750]">Remodelaciones</h3>
          </div>

          {/* Card 3 */}
          <div className="bg-[#cbd7de] rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-[#0d3750]">Fuentes y Cascadas</h3>
          </div>

          {/* Card 4 */}
          <div className="bg-[#cbd7de] rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-[#0d3750]">Paneles solares</h3>
          </div>

          {/* Card 5 */}
          <div className="bg-[#cbd7de] rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 flex items-center justify-center col-span-full">
            <h3 className="text-lg font-semibold text-[#0d3750]">Equipos para piscina</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
