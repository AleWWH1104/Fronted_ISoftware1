"use client"

import { useEffect, useState } from "react"

export default function AnniversaryBanner() {
  const [years, setYears] = useState(0)

  useEffect(() => {
    //  LÓGICA DE CÁLCULO DE AÑOS
    const calculateYears = () => {
      const startDate = new Date(2007, 6, 6) // 6 de julio de 2007
      const currentDate = new Date()

      let yearsDiff = currentDate.getFullYear() - startDate.getFullYear()

      if (currentDate.getMonth() < 6 || (currentDate.getMonth() === 6 && currentDate.getDate() < 6)) {
        yearsDiff--
      }

      return yearsDiff
    }

    setYears(calculateYears())
  }, [])

  return (
    <>
      {/*  ANIMACIONES DE BURBUJAS */}
      <style jsx>{`
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-40px) translateX(-3px);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-60px) translateX(8px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-80px) translateX(0px);
            opacity: 0.1;
          }
        }
        
        @keyframes bubbleFloat2 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          30% {
            transform: translateY(-25px) translateX(-7px);
            opacity: 0.6;
          }
          60% {
            transform: translateY(-50px) translateX(4px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-90px) translateX(-2px);
            opacity: 0;
          }
        }
        
        @keyframes bubbleFloat3 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          20% {
            transform: translateY(-15px) translateX(6px);
            opacity: 0.7;
          }
          70% {
            transform: translateY(-55px) translateX(-5px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-75px) translateX(3px);
            opacity: 0;
          }
        }
        
        .bubble-1 {
          animation: bubbleFloat 4s ease-in-out infinite;
        }
        
        .bubble-2 {
          animation: bubbleFloat2 5s ease-in-out infinite 1s;
        }
        
        .bubble-3 {
          animation: bubbleFloat3 3.5s ease-in-out infinite 2s;
        }
        
        .bubble-4 {
          animation: bubbleFloat 6s ease-in-out infinite 0.5s;
        }
        
        .bubble-5 {
          animation: bubbleFloat2 4.5s ease-in-out infinite 3s;
        }
        
        .bubble-6 {
          animation: bubbleFloat3 5.5s ease-in-out infinite 1.5s;
        }
      `}</style>

      {/* CONTENEDOR PRINCIPAL */}
      <div
        className="w-full h-48 sm:h-52 md:h-56 lg:h-60 relative overflow-hidden py-6 sm:py-8 md:py-10"
        style={{ backgroundColor: "#046bb1" }}
      >
        {/* 🌊 PATRÓN DE ONDAS DE FONDO CON TUS COLORES */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 C300,150 600,50 900,100 C1050,125 1150,75 1200,100 L1200,200 L0,200 Z" fill="#8dcdf4" />
            <path
              d="M0,120 C300,170 600,70 900,120 C1050,145 1150,95 1200,120 L1200,200 L0,200 Z"
              fill="#cfdde9"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* BURBUJAS ANIMADAS */}
        <div
          className="absolute bottom-8 left-12 w-2 h-2 rounded-full bubble-1"
          style={{ backgroundColor: "#fefeff" }}
        ></div>
        <div
          className="absolute bottom-12 left-1/4 w-3 h-3 rounded-full bubble-2"
          style={{ backgroundColor: "#8dcdf4" }}
        ></div>
        <div
          className="absolute bottom-6 left-1/3 w-1.5 h-1.5 rounded-full bubble-3"
          style={{ backgroundColor: "#cfdde9" }}
        ></div>
        <div
          className="absolute bottom-10 right-1/4 w-2.5 h-2.5 rounded-full bubble-4"
          style={{ backgroundColor: "#fefeff" }}
        ></div>
        <div
          className="absolute bottom-4 right-16 w-2 h-2 rounded-full bubble-5"
          style={{ backgroundColor: "#8dcdf4" }}
        ></div>
        <div
          className="absolute bottom-14 right-1/3 w-1 h-1 rounded-full bubble-6"
          style={{ backgroundColor: "#cfdde9" }}
        ></div>

        {/* ) */}
        <div
          className="absolute top-6 left-10 w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#fefeff", opacity: 0.2 }}
        ></div>
        <div
          className="absolute top-10 right-14 w-1.5 h-1.5 rounded-full animate-pulse delay-300"
          style={{ backgroundColor: "#cfdde9", opacity: 0.3 }}
        ></div>
        <div
          className="absolute top-16 left-1/4 w-2.5 h-2.5 rounded-full animate-pulse delay-1000"
          style={{ backgroundColor: "#8dcdf4", opacity: 0.15 }}
        ></div>

        {/* */}
        <div className="relative z-10 h-full flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
          <div
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12"
            style={{ color: "#fefeff" }}
          >
            {/* 🔢 SECCIÓN DEL NÚMERO - MÁS GRANDE */}
            <div className="text-center flex-shrink-0 relative">
              <div
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] leading-none"
                style={{
                  fontFamily: '"Colonna MT", serif',
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                {years}
              </div>
              {/* */}
              <div
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl -mt-4 sm:-mt-5 md:-mt-6 lg:-mt-7"
                style={{
                  fontFamily: '"Colonna MT", serif',
                  fontWeight: "normal",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                años
              </div>
            </div>

            {/*  */}
            <div className="text-center sm:text-left">
              <div
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-tight"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
              >
                ofreciendo soluciones en diseño
                <br />y construcción de piscinas
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path
              d="M0,30 C300,15 600,45 900,30 C1050,22 1150,38 1200,30 L1200,60 L0,60 Z"
              fill="#8dcdf4"
              opacity="0.1"
            />
          </svg>
        </div>
      </div>
    </>
  )
}
