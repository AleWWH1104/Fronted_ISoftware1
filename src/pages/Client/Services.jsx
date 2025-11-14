import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Services() {
  const categories = [
    { id: "reg", name: "Piscinas Regulares" },
    { id: "irre", name: "Piscinas Irregulares" },
    { id: "fyc", name: "Fuentes y cascadas" },
    { id: "sol", name: "Paneles solares" },
    { id: "remo", name: "Remodelaciones" },
    { id: "ja", name: "Jacuzzis" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const carouselRef = useRef(null);

  // Cargar imágenes
  useEffect(() => {
    const images = [
      { src: "/reg2.JPG", category: "reg", alt: "Piscina Regular 2" },
      { src: "/reg4.jpg", category: "reg", alt: "Piscina Regular 4" },
      { src: "/reg5.JPG", category: "reg", alt: "Piscina Regular 5" },
      { src: "/reg6.JPG", category: "reg", alt: "Piscina Regular 6" },
      { src: "/reg7.JPG", category: "reg", alt: "Piscina Regular 7" },

      { src: "/irre1.JPG", category: "irre", alt: "Piscina Irregular 1" },
      { src: "/irre2.JPG", category: "irre", alt: "Piscina Irregular 2" },
      { src: "/irre3.JPG", category: "irre", alt: "Piscina Irregular 3" },
      { src: "/irre4.JPG", category: "irre", alt: "Piscina Irregular 4" },
      { src: "/irre5.JPG", category: "irre", alt: "Piscina Irregular 5" },
      { src: "/irre6.JPG", category: "irre", alt: "Piscina Irregular 6" },
      { src: "/irre7.JPG", category: "irre", alt: "Piscina Irregular 7" },

      { src: "/ja2.JPG", category: "ja", alt: "Jacuzzi 2" },
      { src: "/ja3.JPG", category: "ja", alt: "Jacuzzi 3" },
      { src: "/ja4.JPG", category: "ja", alt: "Jacuzzi 4" },
      { src: "/ja7.JPG", category: "ja", alt: "Jacuzzi 7" },
      { src: "/ja8.JPG", category: "ja", alt: "Jacuzzi 8" },

      { src: "/fyc1.jpg", category: "fyc", alt: "Fuente y Cascada 1" },
      { src: "/fyc3.JPG", category: "fyc", alt: "Fuente y Cascada 3" },
      { src: "/fyc4.JPG", category: "fyc", alt: "Fuente y Cascada 4" },
      { src: "/fyc5.JPG", category: "fyc", alt: "Fuente y Cascada 5" },
      { src: "/fyc6.JPG", category: "fyc", alt: "Fuente y Cascada 6" },
      { src: "/fyc7.JPG", category: "fyc", alt: "Fuente y Cascada 7" },
      { src: "/fyc8.JPG", category: "fyc", alt: "Fuente y Cascada 8" },

      { src: "/remo1.JPG", category: "remo", alt: "Remodelación 1" },
      { src: "/remo2.JPG", category: "remo", alt: "Remodelación 2" },
      { src: "/remo3.JPG", category: "remo", alt: "Remodelación 3" },
      { src: "/remo4.jpg", category: "remo", alt: "Remodelación 4" },
      { src: "/remo5.JPG", category: "remo", alt: "Remodelación 5" },
      { src: "/remo6.JPG", category: "remo", alt: "Remodelación 6" },
      { src: "/remo7.JPG", category: "remo", alt: "Remodelación 7" },

      { src: "/sol1.JPG", category: "sol", alt: "Panel Solar 1" },
      { src: "/sol2.JPG", category: "sol", alt: "Panel Solar 2" },
      { src: "/sol3.JPG", category: "sol", alt: "Panel Solar 3" },
      { src: "/sol4.JPG", category: "sol", alt: "Panel Solar 4" },
      { src: "/sol5.JPG", category: "sol", alt: "Panel Solar 5" },
      { src: "/sol6.JPG", category: "sol", alt: "Panel Solar 6" },
      { src: "/sol7.JPG", category: "sol", alt: "Panel Solar 7" },
    ];

    const shuffled = [...images].sort(() => Math.random() - 0.5);

    setAllImages(shuffled);
    setFilteredImages(shuffled);
  }, []);

  // Filtro de categorías
  const filterByCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredImages(allImages);
    } else {
      const filtered = allImages.filter((img) => img.category === categoryId);
      setSelectedCategory(categoryId);
      setFilteredImages(filtered);
    }
  };

  // 🔥 Reiniciar scroll cuando cambien las imágenes filtradas
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [filteredImages]);

  // Crear loop infinito suave
  const infiniteImages = [
    ...filteredImages,
    ...filteredImages,
    ...filteredImages,
  ];

  // Botones desktop
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div id="servicios" className="container mx-auto px-4 py-8 lg:py-16">

      {/* Titulo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center sm:flex sm:justify-center sm:items-center gap-1.5 text-[#046bb1]"
      >
        <h2 className="text-[20px] lg:text-[30px] font-bold">Nuestros</h2>
        <h1
          className="text-[50px] lg:text-[70px]"
          style={{ fontFamily: '"Colonna MT", serif', fontWeight: "normal" }}
        >
          Servicios
        </h1>
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 mt-12"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => filterByCategory(category.id)}
            className={`py-4 px-6 text-black font-medium rounded transition-colors ${
              selectedCategory === category.id
                ? "bg-[#046bb1] text-white"
                : "bg-[#8dcdf4]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Carrusel */}
      <div className="relative overflow-hidden">

        {/* Botón Izquierda */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#046bb1] text-white p-3 rounded-full shadow-lg"
        >
          ❮
        </button>

        {/* Lista infinita */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {infiniteImages.map((image, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Botón Derecha */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#046bb1] text-white p-3 rounded-full shadow-lg"
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default Services;
