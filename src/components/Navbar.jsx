"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="bg-[#16213E] bg-opacity-90 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 overflow-hidden">

      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Online Voting System
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/login" active={location.pathname === "/login"}>Login</NavLink>
          <NavLink to="/register" active={location.pathname === "/register"}>Register</NavLink>
          <NavLink to="/voting" active={location.pathname === "/voting"}>Vote</NavLink>
          <NavLink to="/results" active={location.pathname === "/results"}>Results</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-r from-[#0F3460] to-[#16213E] transition-all duration-300 ease-in-out transform ${
          isOpen ? "max-h-screen opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <div className="flex flex-col text-center space-y-2 py-4">
          <NavLink to="/" active={location.pathname === "/"} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/login" active={location.pathname === "/login"} onClick={() => setIsOpen(false)}>Login</NavLink>
          <NavLink to="/register" active={location.pathname === "/register"} onClick={() => setIsOpen(false)}>Register</NavLink>
          <NavLink to="/voting" active={location.pathname === "/voting"} onClick={() => setIsOpen(false)}>Vote</NavLink>
          <NavLink to="/results" active={location.pathname === "/results"} onClick={() => setIsOpen(false)}>Results</NavLink>
        </div>
      </div>
    </nav>
  )
}

// Custom NavLink Component
const NavLink = ({ to, children, active, onClick }) => (
  <Link
    to={to}
    className={`relative text-white text-lg font-medium px-4 py-2 transition duration-300 hover:text-blue-300 ${
      active ? "text-blue-300 font-bold after:w-full" : "after:w-0"
    } after:absolute after:left-0 after:bottom-[-2px] after:bg-white after:h-[2px] after:transition-all after:duration-300 hover:after:w-full`}
    onClick={onClick}
  >
    {children}
  </Link>
)

export default Navbar
