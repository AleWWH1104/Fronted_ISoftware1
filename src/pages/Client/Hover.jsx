import { motion } from "framer-motion";

function Hover() {
  return (
    <div
        id="inicio"
        className="relative flex flex-col justify-center items-center h-[40dvh] sm:h-[60dvh] w-full text-white bg-cover bg-center scroll-mt-20 lg:h-[90dvh] "
        style={{backgroundImage: "url('/pool16.jpg')"}}
      >
        <div className="absolute inset-0 bg-[#0a4771]/35 z-0 w-full" />
          <motion.h4
            className="text-[20px] sm:text-[30px] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Bienvenido a
          </motion.h4>

          <motion.h1
            className="z-10 text-center text-[70px] sm:text-[120px] lg:text-[150px] leading-tight"
            style={{ fontFamily: '"Colonna MT", serif', fontWeight:'normal'}}
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