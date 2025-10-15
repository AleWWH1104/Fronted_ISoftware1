import { useState, useMemo } from 'react';
import { useProjectsByService } from '../../hooks/useKPIs';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const ESTADOS = ['Solicitado', 'En Progreso', 'Finalizado', 'Cancelado'];
const COLORES = ['#046bb1', '#3291d1', '#53ace8', '#8dcdf4', '#cfdde9', '#a4c2d0'];

export default function ServiceChart() {
  const [estado, setEstado] = useState('En Progreso');
  const { data, loading, error } = useProjectsByService(estado);

  const total = useMemo(() => data.reduce((acc, r) => acc + r.cantidad, 0), [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs h-72 flex flex-col parrafo">
      <div className="flex justify-between items-center my-2">
      <h2 className="subtitulo">Proyectos por servicio</h2>
      <select
        id="estadoSelect"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#046bb1] parrafo"
      >
        {ESTADOS.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
</div>


      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="servicio" width={100}/>
            <Tooltip
              formatter={(value) => [value, 'Proyectos']}
            />
            <Bar dataKey="cantidad"  radius={[0, 4, 4, 0]}>
              {data.map((entry, idx) => (
                <Cell key={entry.servicio} fill={COLORES[idx % COLORES.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {loading && <div className="text-xs text-gray-500 mt-2">Cargando…</div>}
      {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
    </div>
  );
}
