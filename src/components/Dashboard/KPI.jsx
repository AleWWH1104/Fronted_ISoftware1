import React, { useState, useEffect } from 'react';
const KPICards = () => {
  const kpiData = [
    {
      title: "Total de productos",
      value: "1000",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 8C21 7.45 20.55 7 20 7H4C3.45 7 3 7.45 3 8V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V8Z"
            stroke="#046BB1"
            strokeWidth="2"
            fill="none"
          />
          <path d="M3 8L12 13L21 8" stroke="#046BB1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 4H17V7H7V4Z" stroke="#046BB1" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      title: "Proyectos en ejecución",
      value: "5",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="2" />
          <path
            d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Proyectos finalizados",
      value: "5000",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 12L8 9C7.5 8.5 7.5 7.5 8 7S9.5 7.5 10 8L13 11"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 11L16 8C16.5 7.5 17.5 7.5 18 8S18.5 9.5 18 10L15 13"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 12L14 15C14.5 15.5 14.5 16.5 14 17S12.5 17.5 12 17L9 14"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 14L6 17C5.5 17.5 4.5 17.5 4 17S3.5 15.5 4 15L7 12"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Total de clientes",
      value: "500",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M21 21V19C20.9993 18.1137 20.7044 17.2528 20.1614 16.5523C19.6184 15.8519 18.8581 15.3516 18 15.13"
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
              <p className="titulo text-2xl font-bold" style={{ color: index === 0 ? "#046BB1" : "#374151" }}>
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


