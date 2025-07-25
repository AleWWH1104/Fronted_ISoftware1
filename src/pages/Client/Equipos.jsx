import React from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { ContactUs } from '../../components/ContactForm';
import Footer from './Footer';
import Contact from './Contact';

function Equipos() {
  const categories = [
    {
      name: "Filtración y bombeo",
      products: [
        { id: 1, name: "Bombas de filtración", image: "/ep1.png" },
        { id: 2, name: "Filtros de arena", image: "/ep2.png" },
        { id: 3, name: "Filtros de cartucho", image: "/ep3.png" },
        { id: 4, name: "Bombas de achique", image: "/ep4.png" }
      ]
    },
    {
      name: "Iluminación y energía",
      products: [
        { id: 5, name: "Lámparas sumergibles Led", image: "/ep5.png" },
        { id: 6, name: "Transformadores", image: "/ep6.png" },
        { id: 7, name: "Paneles solares", image: "/ep7.png" }
      ]
    },
    {
      name: "Hidráulica y circulación",
      products: [
        { id: 8, name: "Válvulas de globo de PVC", image: "/ep8.png" },
        { id: 9, name: "Skimmers", image: "/ep9.png" },
        { id: 10, name: "Rejillas de fondo", image: "/ep10.png" },
        { id: 11, name: "Boquillas de jets", image: "/ep11.png" }
      ]
    },
    {
      name: "Climatización",
      products: [
        { id: 12, name: "Bombas de calor", image: "/ep12.png" },
        { id: 13, name: "Calentadores de gas", image: "/ep13.png" }
      ]
    },
    {
      name: "Tratamiento de agua (Químicos)",
      products: [
        { id: 14, name: "Tricloro", image: "/ep14.png" },
        { id: 15, name: "Hipoclorito", image: "/ep15.png" },
        { id: 16, name: "Soda Ash", image: "/ep16.png" },
        { id: 17, name: "Alguicida", image: "/ep17.png" },
        { id: 18, name: "Floculante", image: "/ep18.webp" },
        { id: 19, name: "Clarificador", image: "/ep19.png" }
      ]
    },
    {
      name: "Otros",
      products: [
        { id: 20, name: "Clorinadores de sal", image: "/ep20.png" },
        { id: 21, name: "Equipo de limpieza", image: "/pool.png" }
      ]
    }
  ];

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="px-1 py- scroll-mt-20 mx-auto flex flex-col min-h-screen">
      <div className="scroll-mt-20">
        <div
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('/b_equipos.png')" }}
        >
          <div className="absolute inset-0 bg-opacity-30 z-0"></div>
          <div className="relative z-10 text-right text-white px-4 w-full max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-8"
              style={{ fontFamily: '"Colonna MT", serif', fontWeight: 'normal' }}
            >
              Equipos de piscina
            </motion.h1>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#046bb1] hover:bg-[#035a96] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
            >
              Cotiza tus productos →
            </motion.button>
          </div>
        </div>
      </div>

      <NavBar />

      {categories.map((category, categoryIndex) => (
        <motion.div
          key={categoryIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="mb-12 px-[75px] py-[25px]"
        >
          <h2 className="text-xl font-semibold mb-6">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {category.products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center"
              >
                <div className="bg-[#cfdde9] rounded-lg p-4 w-full h-[180px] flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="max-h-[140px] max-w-[140px] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg?height=140&width=140";
                    }}
                  />
                </div>
                <h3 className="text-center font-medium text-gray-800 mt-3">
                  {product.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <Contact />

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}

export default Equipos;
