import React from 'react'
import { ContactUs } from '../../components/ContactForm'
function Contact() {
  return (
    <div id="contacto" className="flex flex-col items-center justify-around">
      <h1 className="text-5xl font-bold text-center text-[#0d3750]">Información de contacto</h1>

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
      <div className='bg-gray-100'>
        <ContactUs/>
      </div>
    </div>
  )
}

export default Contact