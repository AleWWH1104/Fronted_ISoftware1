import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './ProtectedRoutes'

function App (){
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<h1>Home page for clients</h1>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            {/* Rutas protegidas */}
            <Route element= {<ProtectedRoutes/>}>
              <Route path='/home' element={HomePage} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
