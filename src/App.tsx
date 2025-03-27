import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from './pages/Landing'
import AuthProvider from "./context/AuthProvider"
import Signin from './pages/singin'
import SignUp from "./pages/signup"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin></Signin>} />
          <Route path="/signup" element={<SignUp></SignUp>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
