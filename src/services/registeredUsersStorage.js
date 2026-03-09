const REGISTERED_USERS_STORAGE_KEY = 'charityMindsRegisteredUsers'

/*
  Read all registered users saved in the browser.
  We use localStorage so the data remains after page refresh.
*/
export function getRegisteredUsers() {
  // Safety check in case code runs outside browser.
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const savedUsers = window.localStorage.getItem(REGISTERED_USERS_STORAGE_KEY)

    if (!savedUsers) {
      return []
    }

    const parsedUsers = JSON.parse(savedUsers)

    return Array.isArray(parsedUsers) ? parsedUsers : []
  } catch {
    // If JSON is broken for any reason, return empty list instead of crashing.
    return []
  }
}

/*
  Save one new user into localStorage.
  We only save dashboard fields (no password).
*/
export function saveRegisteredUser(user) {
  if (typeof window === 'undefined') {
    return
  }

  const currentUsers = getRegisteredUsers()
  const cleanEmail = String(user.email || '').toLowerCase()
  const cleanGender = String(user.gender || '')

  // Prevent duplicate rows if same email is saved twice.
  const userAlreadyExists = currentUsers.some((existingUser) => String(existingUser.email || '').toLowerCase() === cleanEmail)

  if (userAlreadyExists) {
    return
  }

  const newUser = {
    id: Date.now(),
    firstName: String(user.firstName || ''),
    lastName: String(user.lastName || ''),
    email: String(user.email || ''),
    username: String(user.username || ''),
    phone: String(user.phone || ''),
    dob: String(user.dob || ''),
    // Example: "male" -> "Male"
    gender: cleanGender ? cleanGender.charAt(0).toUpperCase() + cleanGender.slice(1).toLowerCase() : '',
  }

  const updatedUsers = [newUser, ...currentUsers]
  window.localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
}
