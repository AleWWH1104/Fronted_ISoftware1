import { useState } from "react";
import "./ServiciosPage.css"; // Creamos este CSS para los estilos

const images = [
  "/public/servicio1.jpg",
  "/public/servicio2.jpg",
  "/public/servicio3.jpg",
  "/public/servicio4.jpg",
  "/public/servicio5.jpg",
  "/public/servicio6.jpg"
];

const ServiciosPage = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const nextImage = () => setIndex((index + 1) % images.length);
  const prevImage = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="servicios-wrapper">
      <h1 className="servicios-titulo">Servicios</h1>
  
      <div className="servicios-container">
        <div
          className="image-gallery"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={images[index]} alt="Servicio" className="main-image" />
          {hovered && (
            <>
              <button className="arrow left" onClick={prevImage}>‹</button>
              <button className="arrow right" onClick={nextImage}>›</button>
            </>
          )}
        </div>
  
        <ul className="servicios-lista">
            <li>Construcción de piscinas
            <ul>
                <li>Regulares</li>
                <li>Irregulares</li>
                <li>Jacuzzis</li>
                <li>Piscinas con vidrio</li>
            </ul>
            </li>
            <li>Remodelaciones</li>
            <li>Fuentes y Cascadas</li>
            <li>Paneles solares</li>
            <li>Equipos para piscina</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiciosPage;
