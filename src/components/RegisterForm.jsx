import { useState } from 'react'

export default function RegisterForm() {
  // Simple state for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!')
      setIsSuccess(false)
      return
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === formData.email)
    if (emailExists) {
      setMessage('Email already registered!')
      setIsSuccess(false)
      return
    }

    // Add new user (don't store password in plain text in real apps!)
    const newUser = { ...formData, id: Date.now() }
    existingUsers.push(newUser)

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers))

    // Show success and redirect
    setMessage('Registration successful! Redirecting to login...')
    setIsSuccess(true)

    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  }

  return (
    <section className="flex flex-grow items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Register</h1>

        {/* Show message if there's one */}
        {message && (
          <p className={`mb-4 rounded p-2 text-sm ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              name="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

