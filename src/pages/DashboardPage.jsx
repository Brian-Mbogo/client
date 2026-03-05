import DashboardHeader from '../components/DashboardHeader.jsx'
import DashboardContent from '../components/DashboardContent.jsx'
import DashboardFooter from '../components/DashboardFooter.jsx'

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 text-gray-900">
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </main>
  )
}
