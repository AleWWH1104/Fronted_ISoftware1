import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

      <div id="contacto" className="h-[50vh] border-[3px] border-purple-400 flex flex-col items-center justify-around">
        <h1 className="text-center text-5xl">Información de contacto</h1>

      <div className="flex justify-evenly flex-wrap text-center w-[100%]">
        <div className="w-[30%]">
          <h3 className="font-bold text-xl mb-3">Dirección</h3>
          <p>
            Aguilar Batres 45-54, zona 11<br />
            oficina 121. Ciudad de Guatemala, Guatemala
          </p>
        </div>

        <div className="w-[30%]">
          <h3 className="font-bold text-xl mb-3">Correo electrónico</h3>
          <p>ventas@poolcenter.com.gt</p>
        </div>

        <div className="w-[30%]">
          <h3 className="font-bold text-xl mb-3">Teléfonos</h3>
          <p>502 2479-0349</p>
          <p>502 5966-7171</p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default ClientPage