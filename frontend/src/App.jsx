import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Desafios from './pages/Desafios'

const RotaProtegida = ({ children }) => {
  const { usuario, carregando } = useAuth()
  if (carregando) return (
    <div className="min-h-screen bg-[#0a0520] flex items-center justify-center text-white text-xl">
      Carregando...
    </div>
  )
  return usuario ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/desafios" element={
            <RotaProtegida>
              <Desafios />
            </RotaProtegida>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App