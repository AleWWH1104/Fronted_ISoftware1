import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function ServiceChart() {
  const data = [
    { servicio: 'Piscinas Regulares', proyectos: 26 },
    { servicio: 'Piscinas Irregulares', proyectos: 50 },
    { servicio: 'Jacuzzis', proyectos: 30 },
    { servicio: 'Remodelaciones', proyectos: 44 },
    { servicio: 'Paneles Solares', proyectos: 36 },
  ];

  const colores = ['#046bb1', '#3291d1', '#53ace8', '#8dcdf4', '#cfdde9'];

  return (
    <div className="bg-white p-2 rounded-lg parrafo h-50">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            layout="vertical" // barras horizontales
            data={data}
            barGap="10%"
            >
            
            <XAxis
            type="number"
            label="Cantidad de proyectos"
            tickCount={11} // esto hace que los ticks se aproximen a 0,5,10,...50
            />
            <YAxis type="category" dataKey="servicio" width={100}/>
            <Tooltip />
            <Bar dataKey="proyectos" barSize={20}>
            {data.map((entry, index) => (
                <Cell key={index} fill={colores[index]} />
            ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
