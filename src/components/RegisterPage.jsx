import Navbar from './header.jsx'
import RegisterForm from './RegisterForm.jsx'
import Footer from './Footer.jsx'

// Register page container mirrors the old page body styles.
export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 text-gray-900">
      <Navbar />
      <RegisterForm />
      <Footer />
    </main>
  )
}
