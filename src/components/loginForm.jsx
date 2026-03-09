import { useState } from 'react'
import LoginButton from './loginButton.jsx'
import { loginUser } from '../services/authService.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Login form extracted from charity-minds-2 Login page and converted to JSX.
export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    if (!email || !password) {
      setErrorMessage('Email and password are required.')
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await loginUser({ 'email': email, 'password': password })
      const message =
        typeof response === 'object' && response !== null && response.message ? response.message : 'Login successful.'

      setSuccessMessage(message)
      window.setTimeout(() => {
        window.location.assign('/dashboard')
      }, 900)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to login right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex flex-grow items-center justify-center px-6 py-8" aria-label="Login form section">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        {errorMessage ? (
          <p className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="mb-4 rounded border border-green-200 bg-green-50 p-2 text-sm text-green-700" role="status">
            {successMessage}
          </p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="mbogo456@gmail.com"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter password"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="rememberMe" className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-400"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <LoginButton isSubmitting={isSubmitting} />
        </form>

        <div className="mt-4 text-center text-gray-600">
          <p>
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
