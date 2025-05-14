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
    <form ref={form} onSubmit={sendEmail} className="grid grid-cols-2 grid-rows-4 gap-5 text-black mt-6">
      <div className="div1">
        <input type="text" name="user_name" placeholder="Tu nombre" required 
        className="border-[#046bb1] border p-4 w-full rounded"/>
      </div>
      <div className="div2">
        <input type="email" name="user_email" placeholder="Tu correo" required 
        className="border-[#046bb1] border p-4 w-full rounded"/>
      </div>
      <div className="col-span-2 row-start-2">
        <input type="text" name="subject" placeholder="Asunto" required 
        className="border-[#046bb1] border p-4 w-full rounded"/>
      </div>
      <div className="col-span-2 row-start-3 row-span-2">
        <textarea name="message" placeholder="¿Cómo podemos ayudarle?" required 
         className=" border-[#046bb1] border p-4 w-full rounded h-full resize-none"/>
      </div>
      <button type="submit"
      className="col-span-2 bg-[#046bb1] text-white py-4 px-8 cursor-pointer rounded"
      >Contactar</button>
    </form>
  );
};