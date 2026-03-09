import { useState } from 'react'
import { registerUser } from '../services/authService.js'
import { saveRegisteredUser } from '../services/registeredUsersStorage.js'

// Simple email pattern check before we call the API.
// This is only a basic frontend check (backend should still validate too).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterForm() {
  // UI state values:
  // - isSubmitting: disables button while request is in progress
  // - errorMessage: error text shown to user
  // - successMessage: success text shown to user
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event) => {
    // Step 1: stop browser default submit (page reload).
    event.preventDefault()

    // Step 2: clear old messages so user sees fresh result.
    setErrorMessage('')
    setSuccessMessage('')

    // Step 3: read all form inputs.
    const form = event.currentTarget
    const formData = new FormData(form)

    const firstName = String(formData.get('firstName') || '').trim()
    const lastName = String(formData.get('lastName') || '').trim()
    const username = String(formData.get('username') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const dob = String(formData.get('dob') || '').trim()
    const gender = String(formData.get('gender') || '').trim()
    const password = String(formData.get('password') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    // Step 4: frontend validation (faster feedback for user).
    // These checks prevent avoidable API calls.
    if (!firstName || !lastName || !username || !email || !phone || !dob || !gender || !password || !confirmPassword) {
      setErrorMessage('All fields are required.')
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    // Step 5: build payload using exact keys expected by backend.
    const payload = {
      'firstName': firstName,
      'lastName': lastName,
      'username': username,
      'email': email,
      'phone': phone,
      'dob': dob,
      'gender': gender,
      'password': password,
      'confirmPassword': confirmPassword,
    }

    try {
      // Step 6: lock submit button to avoid duplicate requests.
      setIsSubmitting(true)

      // Step 7: send registration request.
      const response = await registerUser(payload)

      /*
        Step 8: also save this person locally so Dashboard can display them.
        We do this only after API registration succeeds.
      */
      saveRegisteredUser({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'email': email,
        'phone': phone,
        'dob': dob,
        'gender': gender,
      })

      // Step 9: pick message from API response if present.
      const message =
        typeof response === 'object' && response !== null && response.message
          ? response.message
          : 'Account created successfully.'

      setSuccessMessage(message)

      // Optional UX: clear form then redirect to login page.
      form.reset()
      window.setTimeout(() => {
        window.location.assign('/login')
      }, 1200)
    } catch (error) {
      // Step 10: handle API/server errors.
      const serverMessage = error.message || 'Unable to register right now.'

      // This specific text comes from backend 500 responses in your current API.
      if (serverMessage === 'Something went wrong') {
        setErrorMessage('The API server is failing right now. Your form code is correct. Please try again later.')
      } else {
        setErrorMessage(serverMessage)
      }
    } finally {
      // Step 11: always unlock button at the end.
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex flex-grow items-center justify-center px-6 py-8" aria-label="Register form section">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Account</h1>

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

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit} autoComplete="on">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Brian"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Mbogo"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Mbogo123"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+254 700 000 000"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              defaultValue=""
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm password"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center space-x-2 sm:col-span-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
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
