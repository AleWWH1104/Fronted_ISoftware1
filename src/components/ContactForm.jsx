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
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="user_name"
          placeholder="Tu nombre"
          required
          className="border-[#046bb1] border p-4 w-full rounded bg-white"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Tu correo"
          required
          className="border-[#046bb1] border p-4 w-full rounded bg-white"
        />
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Asunto"
        required
        className="border-[#046bb1] border p-4 w-full rounded bg-white"
      />
      <textarea
        name="message"
        placeholder="¿Cómo podemos ayudarle?"
        required
        className="border-[#046bb1] border p-4 w-full rounded h-32 resize-none bg-white"
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