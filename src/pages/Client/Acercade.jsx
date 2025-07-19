import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Acercade() {
  return (
    <div className=" bg-white" id="acercaDe">
      <div className="container mx-auto px-4 py-8 h-[70dvh] flex flex-col justify-center">
    
        <div className="text-center mb-16">
          <h1 className="text-[20px] lg:text-[30px] font-bold text-[#046bb1]">
            Acerca de{" "}
            <span
              className="text-[45px] lg:text-[55px] leading-none"
              style={{ fontFamily: '"Colonna MT", serif', fontWeight: "normal" }}
            >
              Nosotros
            </span>
          </h1>
        </div>


        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">
          {/* Imagen de la piscina */}
          <div className="w-full lg:w-2/5">
            <img
              src="/pool17.jpg"
              alt="Piscina Pool Center"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.svg?height=400&width=600"
              }}
            />
          </div>

          {/* Contenido de texto */}
          <div className="w-full lg:w-3/5 space-y-6">
            <h2 className="text-[#046bb1] text-2xl font-bold mb-6">Acerca de Pool Center</h2>

            <p className="text-gray-800 text-base leading-relaxed text-justify">
              En Pool Center nos especializamos en el diseño y construcción de piscinas y fuentes con un enfoque técnico
              y profesional que nos distingue en el sector. No solo creamos espacios estéticamente atractivos, sino que
              garantizamos calidad y durabilidad a través de una planificación rigurosa, control preciso de materiales y
              seguimiento continuo de cada proyecto.
            </p>

            <p className="text-gray-800 text-base leading-relaxed text-justify">
              Más allá de construir, nos comprometemos con la experiencia de nuestros clientes, ofreciendo resultados
              funcionales, personalizados y entregados a tiempo.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src="/xx.png" alt=""  className="w-full my-8"/>
      </div>
    </div>
  )
}

export default Acercade
