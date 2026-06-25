import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Desafios from './pages/Desafios'
import Perfil from './pages/Perfil'

const RotaProtegida = ({ children }) => {
  const { usuario, carregando } = useAuth()
  if (carregando) return (
    <div style={{
      minHeight: '100vh', background: '#0a0520',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#a78bfa', fontSize: 18
    }}>Carregando...</div>
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
          <Route path="/desafios" element={<RotaProtegida><Desafios /></RotaProtegida>} />
          <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App