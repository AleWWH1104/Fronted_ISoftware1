import { useProjectsByService } from '../../hooks/useKPIs';
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
  const { projectsByService, loading, error } = useProjectsByService();
  const colores = ['#046bb1', '#3291d1', '#53ace8', '#8dcdf4', '#cfdde9'];
 
  return (
    <div className="bg-white p-4 rounded-lg parrafo h-60 shadow-xs">
        
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            layout="vertical" // barras horizontales
            data={projectsByService}
            >
            
            <XAxis
            type="number"
            tickCount={11} // esto hace que los ticks se aproximen a 0,5,10,...50
            />
            <YAxis type="category" dataKey="servicio" width={100}/>
            <Tooltip />
            <Bar dataKey="proyectos" barSize={25}>
            {projectsByService.map((entry, index) => (
                <Cell key={index} fill={colores[index]} />
            ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
