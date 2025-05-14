import { motion } from "framer-motion";

function Hover() {
  return (
    <div
        id="inicio"
        className="relative flex flex-col justify-center items-center h-[90dvh] w-full text-white bg-cover bg-center scroll-mt-20 "
        style={{backgroundImage: "url('/pool16.jpg')"}}
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
            className="text-[100px] font-bold z-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Pool Center
          </motion.h1>
      </div>
  )
}

export default Hover