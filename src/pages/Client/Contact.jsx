import React from 'react'
import { ContactUs } from '../../components/ContactForm'

function Contact() {
  return (
    <div id="contacto" className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center text-[#046bb1] mb-12">Información de contacto</h1>

      {/* Contenedor principal con flex para poner info a la izquierda y formulario a la derecha */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Columna izquierda - Información de contacto */}
        <div className="w-full md:w-[45%] space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-[#046bb1]">Dirección</h3>
            <p className="text-gray-700">
              Aguilar Batres 45-54, zona 11<br />
              oficina 121. Ciudad de Guatemala, Guatemala
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-[#046bb1]">Correo electrónico</h3>
            <p className="text-gray-700">ventas@poolcenter.com.gt</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-[#046bb1]">Teléfonos</h3>
            <p className="text-gray-700">502 2479-0349</p>
            <p className="text-gray-700">502 5966-7171</p>
          </div>
        </div>
        
        {/* Columna derecha - Formulario de contacto */}
        <div className="w-full md:w-[50%] bg-white rounded-lg shadow-md p-6">
          <ContactUs />
        </div>
      </div>
    </div>
  )
}

export default Contact