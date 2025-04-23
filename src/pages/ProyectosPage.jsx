import { motion } from "framer-motion";
import { Button } from "../components";
import { Link } from "react-router-dom";

function ProyectosPage() {
  const proyectos = [
    { nombre: "Proyecto 1", img: "/proyecto1.jpg" },
    { nombre: "Proyecto 2", img: "/proyecto2.jpg" },
    { nombre: "Proyecto 3", img: "/proyecto3.jpg" },
    { nombre: "Proyecto 4", img: "/proyecto4.jpg" },
    { nombre: "Proyecto 5", img: "/proyecto5.jpg" },
    { nombre: "Proyecto 6", img: "/proyecto6.jpg" },
    { nombre: "Proyecto 7", img: "/proyecto7.jpg" },
    { nombre: "Proyecto 9", img: "/proyecto9.jpg" },
    { nombre: "Proyecto 10", img: "/proyecto10.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#326789] text-white py-16 px-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-serif font-bold mb-12"
      >
        Nuestros Proyectos
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {proyectos.map((proyecto, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img
              src={proyecto.img}
              alt={proyecto.nombre}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      <Link to="/home">
        <Button className="mt-12 bg-white text-[#326789] hover:bg-gray-200 font-semibold rounded px-6 py-3">
          Volver al Home
        </Button>
      </Link>
    </div>
  );
}

export default ProyectosPage;
