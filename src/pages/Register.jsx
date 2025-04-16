"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { signInWithGoogle } from "../firebase"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!name || !email || !password || !confirmPassword) {
      setError("⚠️ All fields are required")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!agree) {
      setError("⚠️ You must agree to the terms of service")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("🎉 Registration successful!")
    } catch (err) {
      setError("❌ Registration failed. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0F3460] to-[#16213E] text-center px-6 w-full overflow-hidden">
      <div className="bg-opacity-90 backdrop-blur-lg p-12 md:p-16 rounded-2xl shadow-2xl max-w-lg w-full">
        
        {/* Title */}
        <h2 className="text-5xl font-extrabold mb-6 text-white">Create Account</h2>

        {/* Error Message */}
        {error && (
          <p className="bg-red-500 text-white py-3 px-4 rounded mb-4 font-medium">
            {error}
          </p>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-gray-200 font-medium mb-1 text-left">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-200 font-medium mb-1 text-left">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-200 font-medium mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-200 font-medium mb-1 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-none rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} className="w-4 h-4" />
            <label className="text-sm text-gray-300">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-400 underline">Terms of Service</Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:bg-blue-600 shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "SIGN UP"}
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={signInWithGoogle}
          className="w-full mt-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 shadow-md transition-all transform hover:scale-105"
        >
          Sign in with Google
        </button>

        {/* Back to Login */}
        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
