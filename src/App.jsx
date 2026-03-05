import LoginPage from './pages/loginpage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/' || normalizedPath.toLowerCase() === '/login') {
    return <LoginPage />
  }

  if (normalizedPath.toLowerCase() === '/register') {
    return <RegisterPage />
  }

  if (normalizedPath.toLowerCase() === '/dashboard') {
    return <DashboardPage />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 text-gray-900">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
        <p className="mb-4 text-gray-600">The page you requested does not exist.</p>
        <a href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    </main>
  )
}

export default App
