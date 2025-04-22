import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

function ClientPage() {
  return (
    <div className="scroll-smooth pt-[8dvh]">
      <NavBar />

      {/* Sección de bienvenida */}
      <div
        id="inicio"
        className="relative flex flex-col justify-center items-center h-[90dvh] w-full text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/foto-gratis/piscina_74190-2110.jpg?t=st=1745282524~exp=1745286124~hmac=8732449a38b3f8554011cd9d36701ad91f7a27dcb006abcbc63fd0cb97c9a243&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
          <motion.h4
            className="text-[30px] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Bienvenido a
          </motion.h4>

          <motion.h1
            className="text-[100px] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Pool Center
          </motion.h1>
      </div>

      {/* Otras secciones */}
      <section id="servicios" className="h-screen bg-gray-100 p-10">
        <h2 className="text-4xl font-bold">Servicios</h2>
      </section>

      <section id="proyectos" className="h-screen bg-gray-200 p-10">
        <h2 className="text-4xl font-bold">Proyectos</h2>
      </section>

      <section id="contacto" className="h-screen bg-gray-300 p-10">
        <h2 className="text-4xl font-bold">Contacto</h2>
      </section>
  </div>
  );
}

export default ClientPage