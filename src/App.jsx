import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ClientPage from './pages/Client/ClientPage'
import ProtectedRoutes from './ProtectedRoutes'

function App (){
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ClientPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            {/* Rutas protegidas */}
            <Route element= {<ProtectedRoutes/>}>
              <Route path='/home' element={<HomePage/>} />
              <Route path='/register' element={<RegisterPage/>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App