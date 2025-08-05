import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Equipos from './pages/Client/Equipos' // Corregido aquí
import ClientPage from './pages/Client/ClientPage'
import DashboardPage from "./pages/DashboardPage"
import Inventory from "./pages/InventoryPage"
import ProtectedRoutes from './ProtectedRoutes'
import InventoryPage from './pages/InventoryPage'

function App (){
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ClientPage/>} />
            <Route path='/equipment' element={<Equipos/>} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/inventory' element={<InventoryPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            {/* Rutas protegidas */}
            <Route element= {<ProtectedRoutes/>}>
              <Route path='/home' element={<HomePage/>} />
        
              {/* <Route path='/register' element={<RegisterPage/>} /> */}
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App