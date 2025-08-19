import React, { useState, useEffect } from 'react';


const KPICards = () => {
  const kpiData = [
    {
      title: "Total de productos",
      value: "1000",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 16V8C21 7.45 20.55 7 20 7H4C3.45 7 3 7.45 3 8V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16Z"
            stroke="#046BB1"
            strokeWidth="2"
            fill="none"
          />
          <path d="M3 8L12 13L21 8" stroke="#046BB1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M7 4H17C17.55 4 18 4.45 18 5V7H6V5C6 4.45 6.45 4 7 4Z"
            stroke="#046BB1"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Proyectos en ejecución",
      value: "5",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#374151" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Proyectos finalizados",
      value: "5000",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#374151" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Total de clientes",
      value: "500",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="#374151"
            strokeWidth="2"
          />
          <circle cx="9" cy="7" r="4" stroke="#374151" strokeWidth="2" />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="#374151"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">{kpi.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
              <p className="titulo text-2xl font-bold" style={{ color: index === 0 ? "#046BB1" : "#046BB1" }}>
                {kpi.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KPICards

