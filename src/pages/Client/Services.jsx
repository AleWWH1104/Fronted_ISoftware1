import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Services() {
  // Categorías disponibles
  const categories = [
    { id: "reg", name: "Piscinas Regulares" },
    { id: "irre", name: "Piscinas Irregulares" },
    { id: "fyc", name: "Fuentes y cascadas" },
    { id: "sol", name: "Paneles solares" },
    { id: "remo", name: "Remodelaciones" },
    { id: "ja", name: "Jacuzzis" },
  ];

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Estado para el índice actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  // Estado para almacenar todas las imágenes
  const [allImages, setAllImages] = useState([]);
  // Estado para las imágenes filtradas según la categoría
  const [filteredImages, setFilteredImages] = useState([]);

  // Función para obtener todas las imágenes
  useEffect(() => {
    // Crear un array con todas las imágenes
    const images = [
      // Piscinas Regulares
      { src: "/reg1.HEIC", category: "reg", alt: "Piscina Regular 1" },
      { src: "/reg2.JPG", category: "reg", alt: "Piscina Regular 2" },
      { src: "/reg3.heic", category: "reg", alt: "Piscina Regular 3" },
      { src: "/reg4.jpg", category: "reg", alt: "Piscina Regular 4" },
      { src: "/reg5.JPG", category: "reg", alt: "Piscina Regular 5" },
      { src: "/reg6.JPG", category: "reg", alt: "Piscina Regular 6" },
      { src: "/reg7.JPG", category: "reg", alt: "Piscina Regular 7" },

      // Piscinas Irregulares
      { src: "/irre1.JPG", category: "irre", alt: "Piscina Irregular 1" },
      { src: "/irre2.JPG", category: "irre", alt: "Piscina Irregular 2" },
      { src: "/irre3.JPG", category: "irre", alt: "Piscina Irregular 3" },
      { src: "/irre4.JPG", category: "irre", alt: "Piscina Irregular 4" },
      { src: "/irre5.JPG", category: "irre", alt: "Piscina Irregular 5" },
      { src: "/irre6.JPG", category: "irre", alt: "Piscina Irregular 6" },
      { src: "/irre7.JPG", category: "irre", alt: "Piscina Irregular 7" },

      // Jacuzzis
      { src: "/ja1.HEIC", category: "ja", alt: "Jacuzzi 1" },
      { src: "/ja2.JPG", category: "ja", alt: "Jacuzzi 2" },
      { src: "/ja3.JPG", category: "ja", alt: "Jacuzzi 3" },
      { src: "/ja4.JPG", category: "ja", alt: "Jacuzzi 4" },
      { src: "/ja5.heic", category: "ja", alt: "Jacuzzi 5" },
      { src: "/ja6.heic", category: "ja", alt: "Jacuzzi 6" },
      { src: "/ja7.JPG", category: "ja", alt: "Jacuzzi 7" },
      { src: "/ja8.JPG", category: "ja", alt: "Jacuzzi 8" },

      // Fuentes y cascadas
      { src: "/fyc1.jpg", category: "fyc", alt: "Fuente y Cascada 1" },
      { src: "/fyc2.HEIC", category: "fyc", alt: "Fuente y Cascada 2" },
      { src: "/fyc3.JPG", category: "fyc", alt: "Fuente y Cascada 3" },
      { src: "/fyc4.JPG", category: "fyc", alt: "Fuente y Cascada 4" },
      { src: "/fyc5.JPG", category: "fyc", alt: "Fuente y Cascada 5" },
      { src: "/fyc6.JPG", category: "fyc", alt: "Fuente y Cascada 6" },
      { src: "/fyc7.JPG", category: "fyc", alt: "Fuente y Cascada 7" },
      { src: "/fyc8.JPG", category: "fyc", alt: "Fuente y Cascada 8" },

      // Remodelaciones
      { src: "/remo1.JPG", category: "remo", alt: "Remodelación 1" },
      { src: "/remo2.JPG", category: "remo", alt: "Remodelación 2" },
      { src: "/remo3.JPG", category: "remo", alt: "Remodelación 3" },
      { src: "/remo4.jpg", category: "remo", alt: "Remodelación 4" },
      { src: "/remo5.JPG", category: "remo", alt: "Remodelación 5" },
      { src: "/remo6.JPG", category: "remo", alt: "Remodelación 6" },
      { src: "/remo7.JPG", category: "remo", alt: "Remodelación 7" },

      // Paneles solares
      { src: "/sol1.JPG", category: "sol", alt: "Panel Solar 1" },
      { src: "/sol2.JPG", category: "sol", alt: "Panel Solar 2" },
      { src: "/sol3.JPG", category: "sol", alt: "Panel Solar 3" },
      { src: "/sol4.JPG", category: "sol", alt: "Panel Solar 4" },
      { src: "/sol5.JPG", category: "sol", alt: "Panel Solar 5" },
      { src: "/sol6.JPG", category: "sol", alt: "Panel Solar 6" },
      { src: "/sol7.JPG", category: "sol", alt: "Panel Solar 7" },
    ];

    // Mezclar las imágenes para mostrarlas en orden aleatorio
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);

    setAllImages(shuffledImages);
    setFilteredImages(shuffledImages);
  }, []);

  // Función para filtrar imágenes por categoría
  const filterByCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Si ya está seleccionada, mostrar todas las imágenes
      setSelectedCategory(null);
      setFilteredImages(allImages);
    } else {
      // Filtrar por la categoría seleccionada
      setSelectedCategory(categoryId);
      const filtered = allImages.filter((img) => img.category === categoryId);
      setFilteredImages(filtered);
    }
    // Resetear el índice del carrusel
    setCurrentIndex(0);
  };

  // Función para navegar al siguiente slide
  const nextSlide = () => {
    if (filteredImages.length <= 3) return;
    setCurrentIndex((prevIndex) => (prevIndex === filteredImages.length - 3 ? 0 : prevIndex + 1));
  };

  // Función para navegar al slide anterior
  const prevSlide = () => {
    if (filteredImages.length <= 3) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredImages.length - 3 : prevIndex - 1));
  };

  return (
    <div id="servicios" className="container mx-auto px-4 py-8 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center sm:flex sm:justify-center sm:items-center gap-1.5 text-[#046bb1]"
      >
        <h2 className="text-[20px] lg:text-[30px] font-bold">Nuestros</h2>
        <h1 className="text-[50px] lg:text-[70px]" style={{ fontFamily: '"Colonna MT", serif', fontWeight:'normal'}}
        >Servicios</h1>
      </motion.div>

      {/* Botones de categorías */}
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
            className={`py-4 px-6 text-white font-medium rounded transition-colors ${
              selectedCategory === category.id ? "bg-[#046bb1] text-gray-800" : "bg-[#8dcdf4]"
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

      {/* Carrusel de imágenes */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Botón anterior */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#046bb1] text-white p-2 rounded-full shadow-lg"
          aria-label="Anterior"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        {/* Contenedor de imágenes */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            animate={{ x: `-${currentIndex * (100 / 3)}%` }}
          >
            {filteredImages.map((image, index) => (
              <div 
                key={index} 
                className="w-full md:w-1/3 flex-shrink-0 px-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=300&width=400";
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Botón siguiente */}
        <motion.button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#046bb1] text-white p-2 rounded-full shadow-lg"
          aria-label="Siguiente"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Services;