import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components";

function ProyectosPage() {
  // Proyectos falsos para mostrar
  const proyectos = Array.from({ length: 6 }, (_, i) => ({
    nombre: `Proyecto ${i + 1}`,
    img: "https://via.placeholder.com/150", // Imagen de prueba
  }));

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Mis Proyectos
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {proyectos.map((proyecto, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-blue-100 rounded-xl shadow-md p-4"
          >
            <img
              src={proyecto.img}
              alt={proyecto.nombre}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h2 className="mt-2 text-center font-semibold text-gray-700 capitalize">
              {proyecto.nombre}
            </h2>
          </motion.div>
        ))}
      </motion.div>

      <Link to="/home">
        <Button className="mt-10 bg-blue-700 hover:bg-blue-800 text-white rounded px-4 py-2">
          Volver al Home
        </Button>
      </Link>
    </div>
  );
}

export default ProyectosPage;
