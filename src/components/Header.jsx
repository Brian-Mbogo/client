// Header extracted from charity-minds-2 Register page and converted to JSX.
export default function Header() {
  return (
    <header className="bg-blue-400">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          {/* In React, static public files are referenced from /public via absolute web path. */}
          <img className="mr-2 h-9 w-auto" src="/assets/images/logo.png" alt="Charity Minds logo" />
          <span className="font-bold">CHARITY MINDS</span>
        </div>

        {/* Keep plain links for now; switch to React Router links when routes exist. */}
        <ul className="ml-auto flex gap-4">
          <li>
            <a href="#" className="text-red-700">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-red-700">
              Login
            </a>
          </li>
          <li>
            <a href="#" className="text-red-700">
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
