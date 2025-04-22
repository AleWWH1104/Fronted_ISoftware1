import React from 'react';
import Footer from '../Footer';
import './ContactPage.css';

const ContactInfo = () => {
  return (
    <div className="contact-page">
      <h1>Informacion de contacto</h1>

      <div className="info-container">
        <div className="info-block">
          <h3>Dirección</h3>
          <p>Calle Vista Alegre, 123<br />12345 Valencia. España</p>
        </div>

        <div className="info-block">
          <h3>Correo electrónico</h3>
          <p>hola@unsitiogenial.es</p>
        </div>

        <div className="info-block">
          <h3>Teléfonos</h3>
          <p>612 345 678</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactInfo;
