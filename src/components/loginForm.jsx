import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      // Save logged in user info
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      
      setMessage('Login successful! Redirecting to dashboard...')
      setIsSuccess(true)

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
    } else {
      setMessage('Invalid email or password!')
      setIsSuccess(false)
    }
  }

  return (
    <section className="flex flex-grow items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        {/* Show message if there's one */}
        {message && (
          <p className={`mb-4 rounded p-2 text-sm ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4" />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

