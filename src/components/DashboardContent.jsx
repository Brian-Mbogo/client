import { useState, useEffect } from 'react'

export default function DashboardContent() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  // Load users from localStorage when component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)

    // Get logged in user info
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser))
    }
  }, [])

  // Get first user as "current user" for display
  const displayName = currentUser ? currentUser.firstName : (users.length > 0 ? users[0].firstName : 'Guest')

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 pb-24 sm:px-6">
      {/* Welcome Section */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {displayName}!</h1>
        <p className="mt-1 text-gray-600">Here is your platform overview and user directory.</p>
      </section>

      {/* Statistics Cards */}
      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-700">{users.length}</h2>
          <p className="mt-1 text-sm text-gray-600">Registered Users</p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-700">7</h2>
          <p className="mt-1 text-sm text-gray-600">Children Forms Recorded</p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-700">56</h2>
          <p className="mt-1 text-sm text-gray-600">Visitors</p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-700">3</h2>
          <p className="mt-1 text-sm text-gray-600">Donations</p>
        </article>
      </section>

      {/* Registered Users Table */}
      <section aria-labelledby="users-title" className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="users-title" className="text-lg font-semibold text-gray-900">
            Registered Users
          </h2>
          <span className="text-sm text-gray-500">{users.length} users</span>
        </div>

        <div className="overflow-x-auto">
          {users.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No registered users yet. Register a user first.
            </p>
          ) : (
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2 font-semibold text-gray-700">#</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">First Name</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Last Name</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Email</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Username</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Phone</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Date of Birth</th>
                  <th className="px-3 py-2 font-semibold text-gray-700">Gender</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index} className="border-b border-gray-100 odd:bg-white even:bg-gray-50/50">
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{user.firstName}</td>
                    <td className="px-3 py-2">{user.lastName}</td>
                    <td className="px-3 py-2">{user.email}</td>
                    <td className="px-3 py-2">{user.username}</td>
                    <td className="px-3 py-2">{user.phone}</td>
                    <td className="px-3 py-2">{user.dob}</td>
                    <td className="px-3 py-2">{user.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  )
}

