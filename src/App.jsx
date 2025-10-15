import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Equipos from './pages/Client/Equipos'
import ClientPage from './pages/Client/ClientPage'
import DashboardPage from "./pages/DashboardPage"
import InventoryPage from './pages/InventoryPage'
import ProtectedRoutes from './ProtectedRoutes'
import ProjectsPage from './pages/ProjectsPage'
import ReportsPage from './pages/ReportsPage'
import MovementPage from './pages/MovementPage'
import DetallesMaterialPage from './pages/DetallesMaterialPage'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={<ClientPage/>} />
          <Route path='/equipment' element={<Equipos/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/movements' element={<MovementPage />} />

          {/* <Route path='/projects' element={<ProjectsPage />} /> */}
          
            

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoutes />}>
          <Route path= '/dashboard' element={<DashboardPage />} />
          <Route path='/inventory' element={<InventoryPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/movements' element={<MovementPage />} />
          <Route path='/projects/details' element={<DetallesMaterialPage />} />
           
            <Route path='/reports' element={<ReportsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;