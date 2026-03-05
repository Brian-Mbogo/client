export default function DashboardHeader() {
  return (
    <header className="bg-blue-400">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <img className="mr-2 h-9 w-auto" src="/assets/images/logo.png" alt="Charity Minds logo" />
          <span className="font-bold">CHARITY MINDS</span>
        </div>

        <ul className="ml-auto flex gap-4">
          <li>
            <a href="/login" className="text-red-700">
              Home
            </a>
          </li>
          <li>
            <a href="/login" className="text-red-700">
              Login
            </a>
          </li>
          <li>
            <a href="/register" className="text-red-700">
              Register
            </a>
          </li>
          <li>
            <a href="/dashboard" className="font-semibold text-white underline underline-offset-4">
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
