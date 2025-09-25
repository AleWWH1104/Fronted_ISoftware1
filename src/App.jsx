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

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={<ClientPage/>} />
          <Route path='/equipment' element={<Equipos/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path= '/dashboard' element={<DashboardPage />} />
          <Route path='/inventory' element={<InventoryPage />} />
          
            

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoutes />}>
            {/* <Route path='/projects' element={<ProjectsPage />} /> */}
            <Route path='/reports' element={<ReportsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
