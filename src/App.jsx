import { AppProvider, useAppContext } from './context/AppContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

function AppRoutes() {
  const { token } = useAppContext();
  return (
    <main className='main-content'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/chat/:groupId" element={token ? <Chat /> : <Navigate to="/login" replace />} />
      </Routes>
    </main>
  )

}

export default App
