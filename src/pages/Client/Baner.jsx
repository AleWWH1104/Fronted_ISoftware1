

import { useEffect, useState } from "react"

export default function AnniversaryBanner() {
  const [years, setYears] = useState(0)

  useEffect(() => {
    // LÓGICA DE CÁLCULO DE AÑOS
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
      {/* principal */}
      <div
        className="w-full h-48 sm:h-52 md:h-56 lg:h-60 relative overflow-hidden py-6 sm:py-8 md:py-10"
        style={{ backgroundColor: "#046bb1" }}
      >
        {/* ondas */}
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

        {/* . */}
        <div
          className="absolute top-6 left-10 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: "#fefeff", opacity: 0.3 }}
        ></div>
        <div
          className="absolute top-10 right-14 w-2 h-2 rounded-full animate-pulse delay-300"
          style={{ backgroundColor: "#cfdde9", opacity: 0.4 }}
        ></div>
        <div
          className="absolute bottom-8 left-20 w-4 h-4 rounded-full animate-pulse delay-700"
          style={{ backgroundColor: "#8dcdf4", opacity: 0.2 }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-2 h-2 rounded-full animate-pulse delay-500"
          style={{ backgroundColor: "#fefeff", opacity: 0.5 }}
        ></div>
        <div
          className="absolute top-16 left-1/4 w-3 h-3 rounded-full animate-pulse delay-1000"
          style={{ backgroundColor: "#cfdde9", opacity: 0.25 }}
        ></div>
        <div
          className="absolute bottom-6 right-1/4 w-3 h-3 rounded-full animate-pulse delay-200"
          style={{ backgroundColor: "#8dcdf4", opacity: 0.35 }}
        ></div>

        {/* a */}
        <div className="relative z-10 h-full flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
          <div
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12"
            style={{ color: "#fefeff" }}
          >
            {/* a */}
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
              {/* a*/}
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

            {/* texto */}
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

        {/* onda*/}
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
