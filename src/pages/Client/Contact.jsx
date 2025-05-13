import { h1 } from 'framer-motion/client';
import React from 'react';

function Contact() {
  return (
    
    <div id="contacto" className="min-h-[80vh] px-10 py-16 flex flex-col items-center">
     <h1 className=" font-mifuente text-5xl text-center text-[#0d3750] mb-12">Contactanos</h1>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-10">
        {/* INFO */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-10 text-black text-lg pl-45">
          <div>
            <h3 className="font-bold text-xl mb-2">Dirección</h3>
            <p>20 avenida A 11-13 Zona 11<br />Ciudad de Guatemala, Guatemala</p>
          </div>

          <div>
            <h3 className="font-decorative text-4xl">Correo electrónico</h3>
            <p>gerencia@poolcenter.com.gt</p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-2">Teléfonos</h3>
            <p>502 55160480</p>
            <p>502 59667171</p>
          </div>
        </div>

        {/* FORM */}
        <form className="w-full lg:w-1/2 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="flex-1 p-3 bg-[#2e6a8f] text-white placeholder-white rounded"
            />
            <input
              type="email"
              placeholder="Tu correo"
              className="flex-1 p-3 bg-[#2e6a8f] text-white placeholder-white rounded"
            />
          </div>
          <input
            type="text"
            placeholder="Asunto"
            className="w-full p-3 bg-[#2e6a8f] text-white placeholder-white rounded"
          />
          <textarea
            placeholder="En que te podemos ayudar?"
            className="w-full p-3 bg-[#2e6a8f] text-white placeholder-white rounded h-40"
          />
        </form>
      </div>
    </div>
  );
}

export default Contact;
