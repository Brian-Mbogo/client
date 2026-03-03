import Header from '../components/Header.jsx'
import RegisterForm from '../components/RegisterForm.jsx'
import Footer from '../components/Footer.jsx'

// Register page container mirrors the old page body styles.
export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 text-gray-900">
      <Header />
      <RegisterForm />
      <Footer />
    </main>
  )
}
