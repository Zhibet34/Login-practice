import { Routes, Route} from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/create'
import Profile from './pages/profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/to-do-form" element={<Create />} />
        <Route path="/quotes" element={<Create />} />
      </Routes>
    </>
  )
  
}

export default App