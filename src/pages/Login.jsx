"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import apiReq from "../lib/apiReq"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // const handleAPi = async () =>{
  //   try {
  //     const res= await apiReq.get('/Candidate/all')
  //     console.log(res.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock login delay
      console.log("Login attempt", { email, password })
      navigate("/voting")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0F3460] to-[#16213E] text-center px-6 w-full overflow-hidden">
      <div className="bg-opacity-90 backdrop-blur-lg p-12 md:p-16 rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Title */}
        <h2 className="text-5xl font-extrabold mb-6 text-white">Login</h2>

        {/* Error Message */}
        {error && (
          <p className="bg-red-500 text-white py-3 px-4 rounded mb-4 font-medium">
            {error}
          </p>
        )}
        {/* <button className="bg-blue-600 text-white px-20 py-10" onClick={handleAPi}>CLicke Me</button> */}
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-200 font-medium mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-200 font-medium mb-1 text-left">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 pr-10"
              placeholder="Enter your password"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825a8.994 8.994 0 0 1-8.482-2.825M3 3l18 18M4.228 7.228a9 9 0 0 1 15.544 0M9.75 9.75a3 3 0 1 1 4.5 4.5"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c-7.5 0-9 7.5-9 7.5s1.5 7.5 9 7.5 9-7.5 9-7.5-1.5-7.5-9-7.5zm0 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:bg-green-600 shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center mt-4 text-gray-300">
          <a href="#" className="text-blue-400 hover:underline">
            Forgot Password?
          </a>
        </p>

        {/* Back to Home Link */}
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
