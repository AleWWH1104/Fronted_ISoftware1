import React from 'react'
import { ContactUs } from '../../components/ContactForm'


function Contact() {
  return (
    <div className="min-h-screen bg-[#046bb1] overflow-hidden pb-[25px]" id='contacto'>
      {/* Imagen decorativa arriba del todo, sobre fondo azul */}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[#046bb1] z-0" />
        <img
          src="/ghh1.png"
          alt="Decorativo"
          className="w-full h-auto block relative z-10"
          style={{ marginBottom: "-5px" }}
        />
      </div>

      {/* Contenido del contacto sobre fondo azul */}
      <div id="contacto" className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row justify-around items-start gap-8">
          {/* Texto izquierda */}
          <div className="w-full lg:w-[45%] text-white pt-0 lg:pt-2 pl-4 lg:pl-16">
            <div className="mb-8">
              <h1 className="text-[24px] lg:text-[32px] font-normal">
                Contactate con{" "}
                <span
                  className="text-[45px] lg:text-[55px] leading-none"
                  style={{ fontFamily: '"Colonna MT", serif', fontWeight: "normal" }}
                >
                  Nosotros
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2">Dirección</h3>
                <p className="text-white leading-relaxed text-base">
                  Aguilar Batres 45-54, zona 11 oficina 121.
                  <br />
                  Ciudad de Guatemala, Guatemala
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Correos</h3>
                <p className="text-white leading-relaxed text-base">
                  gerencia@poolcenter.com.gt
                  <br />
                  ventas@poolcenter.com.gt
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Teléfonos</h3>
                <p className="text-white leading-relaxed text-base">
                  +502 5516 0480
                  <br />
                  +502 5966 7171
                  <br />
                  +502 2479-0349
                </p>
              </div>
            </div>
          </div>

          {/* Formulario derecha */}
          <div className="w-full lg:w-[40%] pt-0 lg:pt-2 pl-0 lg:pl-8">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;