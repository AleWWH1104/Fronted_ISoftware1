import { motion } from "framer-motion";

const navItems = [
  { label: "Inicio", target: "#inicio" },
  { label: "Servicios", target: "#servicios" },
  { label: "Proyectos", target: "#proyectos" },
  { label: "Contacto", target: "#contacto" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#2e6a8f] h-[8dvh] flex justify-center items-center">
      <ul className="flex justify-between w-[40%]">
        {navItems.map((item, index) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
          >
            <a
              href={item.target}
              className="text-white text-[20px] hover:underline hover:scale-110 transition-transform duration-300"
            >
              {item.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
