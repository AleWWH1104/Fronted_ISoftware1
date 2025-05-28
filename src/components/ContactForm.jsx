import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nss499u', 'template_oatw9co', form.current, {
        publicKey: 'Xgw_mjNqM7U1u4k0a',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Mensaje enviado correctamente');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Error al enviar el mensaje');
        },
      );
  };

return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4 text-black mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="user_name"
          placeholder="Tu nombre"
          required
          className="bg-white border-0 rounded-lg px-4 py-4 text-gray-600 placeholder:text-gray-400 shadow-sm"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Tu correo"
          required
          className="bg-white border-0 rounded-lg px-4 py-4 text-gray-600 placeholder:text-gray-400 shadow-sm"
        />
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Asunto"
        required
        className="bg-white border-0 rounded-lg px-4 py-4 text-gray-600 placeholder:text-gray-400 w-full shadow-sm"
      />
      <textarea
        name="message"
        placeholder="¿Cómo podemos ayudarle?"
        required
        className="bg-white border-0 rounded-lg px-4 py-4 text-gray-600 placeholder:text-gray-400 min-h-[140px] w-full resize-none shadow-sm"
      />
      <button
        type="submit"
        className="w-full bg-[#7bb3e0] hover:bg-[#6ba3d0] text-white h-10 text-sm font-medium border-none rounded"
      >
        Contactar
      </button>
    </form>
  )
};