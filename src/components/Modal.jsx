import { motion } from "framer-motion";

export default function Modal({ title, message, onConfirm, onCancel, type = "confirm" }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center m-4"
      >
        <h2 className="text-lg font-semibold mb-2 text-gray-800 subtitulo">{title}</h2>
        <p className="text-gray-600 mb-6 parrafo">{message}</p>

        {type === "confirm" ? (
          <div className="flex justify-center gap-3 parrafo">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-[#046BB1] text-white hover:bg-blue-800 transition"
            >
              Confirmar
            </button>
          </div>
        ) : (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[#046BB1] text-white hover:bg-blue-800 transition parrafo"
          >
            Cerrar
          </button>
        )}
      </motion.div>
    </div>
  );
}
