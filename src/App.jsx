import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Register from "./pages/Register"
import VotingPage from "./pages/VotingPage"
import ResultsPage from "./pages/ResultsPage"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import AdminPanel from "./pages/AdminPanel"


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

