import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App (){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page for clients</h1>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/dashboard' element={<h1>Bienvenido al dashboard principal</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
