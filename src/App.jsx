import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Equipos from './pages/Client/Equipos' // Corregido aquí
import ClientPage from './pages/Client/ClientPage'
import ProtectedRoutes from './ProtectedRoutes'
import InventoryPage from './pages/InventoryPage'

function App (){
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ClientPage/>} />
            <Route path='/equipment' element={<Equipos/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/inventory' element={<InventoryPage/>} />
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