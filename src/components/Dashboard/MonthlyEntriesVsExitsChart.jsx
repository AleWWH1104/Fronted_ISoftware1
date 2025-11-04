// src/components/Dashboard/MonthlyEntriesVsExitsChart.jsx
import React from 'react';
import { useEntriesAndExits } from '../../hooks/useKPIs';
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

const MonthlyEntriesVsExitsChart = () => {
  const { entriesExits: data, loading, error } = useEntriesAndExits();

  const getTotal = (data, key) => data.reduce((sum, item) => sum + item[key], 0);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-72 parrafo">
        <h2 className="subtitulo mb-4">Entradas vs Salidas Mensuales</h2>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-72 parrafo">
        <h2 className="subtitulo mb-4">Entradas vs Salidas Mensuales</h2>
        <div className="text-gray-500 text-center h-full flex items-center justify-center">
          No hay datos disponibles.
        </div>
      </div>
    );
  }

  const totalEntradas = getTotal(data, 'entradas');
  const totalSalidas = getTotal(data, 'salidas');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-blue-800">Entradas: {payload[0].value}</p>
          <p className="text-xs text-red-800">Salidas: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center space-x-8 mt-2">
        {payload.map((entry, index) => {
          const total = index === 0 ? totalEntradas : totalSalidas;
          return (
            <div key={`item-${index}`} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <div className="parrafo flex text-sm">
                <span className="font-medium mr-1">{entry.value}:</span>
                <span>{total}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs parrafo">
      <h2 className="subtitulo mb-2">Entradas vs Salidas Mensuales</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" content={<CustomLegend />} />

            <Area
              type="monotone"
              dataKey="entradas"
              stackId="1"
              stroke="#046bb1"
              fill="#cfdde9"
              dot={{
                r: 4,
                stroke: '#046bb1',
                strokeWidth: 2,
                fill: '#046bb1',
              }}
            />
            <Area
              type="monotone"
              dataKey="salidas"
              stackId="2"
              stroke="#b10000"
              fill="#f9d0d0"
              dot={{
                r: 4,
                stroke: '#b10000',
                strokeWidth: 2,
                fill: '#b10000',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyEntriesVsExitsChart;
