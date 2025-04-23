import { motion } from "framer-motion";

const proyectos = [
    { nombre: "Proyecto 1", img: "/pool1.jpg" },
    { nombre: "Proyecto 2", img: "/pool2.jpg" },
    { nombre: "Proyecto 3", img: "/pool5.jpg" },
    { nombre: "Proyecto 4", img: "/pool9.jpg" },
    { nombre: "Proyecto 5", img: "/pool11.jpg" },
    { nombre: "Proyecto 6", img: "/pool15.jpg" },
    { nombre: "Proyecto 7", img: "/pool16.jpg" },
    { nombre: "Proyecto 9", img: "/pool17.jpg" },
    { nombre: "Proyecto 10", img: "/pool19.jpg" },
  ];

function Projects() {
  return (
    <div id="proyectos" className="min-h-screen bg-[#326789] text-white py-16 px-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-12"
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
    </div>
  )
}

export default Projects