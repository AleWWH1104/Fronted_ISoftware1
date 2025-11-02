// src/components/Dashboard/MonthlyEntriesVsExitsChart.jsx
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Datos simulados para el gráfico
const mockData = [
  { mes: 'Ene', entradas: 200, salidas: 300 },
  { mes: 'Feb', entradas: 250, salidas: 280 },
  { mes: 'Mar', entradas: 180, salidas: 320 },
  { mes: 'Abr', entradas: 220, salidas: 260 },
  { mes: 'May', entradas: 270, salidas: 310 },
  { mes: 'Jun', entradas: 240, salidas: 290 },
  { mes: 'Jul', entradas: 260, salidas: 330 },
  { mes: 'Ago', entradas: 230, salidas: 270 },
  { mes: 'Sep', entradas: 280, salidas: 340 },
  { mes: 'Oct', entradas: 300, salidas: 350 },
];

// Función para calcular el total de una serie
const getTotal = (data, key) => {
  return data.reduce((sum, item) => sum + item[key], 0);
};

const MonthlyEntriesVsExitsChart = ({ data = mockData }) => {
  const totalEntradas = getTotal(data, 'entradas');
  const totalSalidas = getTotal(data, 'salidas');

  // Tooltip personalizado con mejor diseño
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
              <span className="text-xs text-gray-600">Entradas:</span>
              <span className="text-xs font-semibold text-gray-900">Q{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
              <span className="text-xs text-gray-600">Salidas:</span>
              <span className="text-xs font-semibold text-gray-900">Q{payload[1].value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Leyenda personalizada con totales
  const CustomLegend = () => {
    return (
      <div className="flex justify-center items-center gap-8 mt-2 pb-2">
        {/* Entradas */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#3b82f6] rounded"></div>
            <span className="text-sm font-medium text-gray-700">Entradas</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Q{totalEntradas.toLocaleString()}</span>
        </div>

        {/* Separador */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Salidas */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#10b981] rounded"></div>
            <span className="text-sm font-medium text-gray-700">Salidas</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Q{totalSalidas.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs h-72 parrafo">
      <h2 className="subtitulo mb-4">Entradas vs Salidas Mensuales</h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* Grid con líneas más suaves */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false}
          />

          {/* Ejes */}
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip y Leyenda personalizados */}
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d1d5db', strokeWidth: 1 }} />
          <Legend content={<CustomLegend />} />

          {/* Definimos gradientes para las áreas */}
          <defs>
            <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorSalidas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
            </linearGradient>
          </defs>

          {/* Área para Entradas */}
          <Area
            type="monotone"
            dataKey="entradas"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#colorEntradas)"
            dot={{
              r: 4,
              stroke: '#3b82f6',
              strokeWidth: 2,
              fill: '#ffffff',
            }}
            activeDot={{
              r: 6,
              stroke: '#3b82f6',
              strokeWidth: 2,
              fill: '#3b82f6',
            }}
          />

          {/* Área para Salidas */}
          <Area
            type="monotone"
            dataKey="salidas"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#colorSalidas)"
            dot={{
              r: 4,
              stroke: '#10b981',
              strokeWidth: 2,
              fill: '#ffffff',
            }}
            activeDot={{
              r: 6,
              stroke: '#10b981',
              strokeWidth: 2,
              fill: '#10b981',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyEntriesVsExitsChart;