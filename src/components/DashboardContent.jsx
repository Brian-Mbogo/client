const users = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Wangeci',
    email: 'jane.wangeci@gmail.com',
    username: 'janed',
    phone: '+254700123456',
    dob: '1998-04-12',
    gender: 'Female',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Kamau',
    email: 'john.kamau@gmail.com',
    username: 'johnny',
    phone: '+254701987654',
    dob: '1995-07-23',
    gender: 'Male',
  },
  {
    id: 3,
    firstName: 'Mary',
    lastName: 'Wirimu',
    email: 'mary.wirimu@gmail.com',
    username: 'mwirimu',
    phone: '+254702345678',
    dob: '2000-01-30',
    gender: 'Female',
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Otieno',
    email: 'david.otieno@gmail.com',
    username: 'davo',
    phone: '+254703456789',
    dob: '1993-11-05',
    gender: 'Male',
  },
  {
    id: 5,
    firstName: 'Faith',
    lastName: 'Mutiso',
    email: 'faith.mutiso@gmail.com',
    username: 'faithy',
    phone: '+254704567890',
    dob: '1999-09-15',
    gender: 'Female',
  },
  {
    id: 6,
    firstName: 'Peter',
    lastName: 'Ndungu',
    email: 'peter.ndungu@gmail.com',
    username: 'pndungu',
    phone: '+254705123789',
    dob: '1997-05-09',
    gender: 'Male',
  },
  {
    id: 7,
    firstName: 'Angela',
    lastName: 'Mutua',
    email: 'angela.mutua@gmail.com',
    username: 'angiem',
    phone: '+254706987321',
    dob: '2002-10-20',
    gender: 'Female',
  },
]

export default function DashboardContent() {
  const stats = [
    { value: 10, label: 'Registered Users' },
    { value: 7, label: 'Children Forms Recorded' },
    { value: 56, label: 'Visitors' },
    { value: 3, label: 'Donations' },
  ]

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 pb-24 sm:px-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Brian N.G</h1>
        <p className="mt-1 text-gray-600">Here is your platform overview and user directory.</p>
      </section>

      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-700">{stat.value}</h2>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="users-title" className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="users-title" className="text-lg font-semibold text-gray-900">
            Registered Users
          </h2>
          <span className="text-sm text-gray-500">{users.length} users</span>
        </div>

        <div className="overflow-x-auto">
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
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 odd:bg-white even:bg-gray-50/50">
                  <td className="px-3 py-2">{user.id}</td>
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
        </div>
      </section>
    </main>
  )
}
