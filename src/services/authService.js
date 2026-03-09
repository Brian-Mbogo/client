const REGISTER_ENDPOINT = 'https://charity-minds.onrender.com/api/v1/auth/register'
const LOGIN_ENDPOINT = 'https://charity-minds.onrender.com/api/v1/auth/login'

/*
  Helper: read response body in a safe way.
  Why this exists:
  - Some APIs return JSON: { "message": "..." }
  - Some APIs return plain text
  - If we always call response.json() and server returned text, code will crash.
*/
async function readServerResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export async function registerUser(payload) {
  /*
    Step 1: Build request body exactly as API expects.
    We convert everything to strings so data type is always predictable.
  */
  const requestBody = {
    'firstName': String(payload.firstName || ''),
    'lastName': String(payload.lastName || ''),
    'username': String(payload.username || ''),
    'email': String(payload.email || ''),
    'phone': String(payload.phone || ''),
    'dob': String(payload.dob || ''),
    'gender': String(payload.gender || ''),
    'password': String(payload.password || ''),
    'confirmPassword': String(payload.confirmPassword || ''),
  }
  console.log('Request body for registration:', requestBody) // Debug log to verify request body structure

  let response

  try {
    /*
      Step 2: Send POST request to register endpoint.
      JSON.stringify(...) converts our JavaScript object into JSON text.
    */
    response = await fetch(REGISTER_ENDPOINT, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(requestBody),
    })
  } catch {
    /*
      This catch only handles NETWORK failures.
      Example: no internet, DNS problem, server unreachable.
      Note: A server 400/500 will NOT enter this catch.
    */
    throw new Error('Could not connect to the API. Check your internet and try again.')
  }

  // Step 3: Read response body (JSON or text).
  const responseData = await readServerResponse(response)

  if (!response.ok) {
    /*
      Step 4: Handle server errors (4xx / 5xx).
      response.ok is false for status codes outside 200-299.
      Prefer server message because it is usually more specific.
    */
    const message =
      typeof responseData === 'object' && responseData !== null && responseData.message
        ? responseData.message
        : `Registration failed with status ${response.status}.`

    throw new Error(message)
  }

  return responseData
}

export async function loginUser(payload) {
  // Same structure as register, but with login fields only.
  const requestBody = {
    'email': String(payload.email || ''),
    'password': String(payload.password || ''),
  }
  console.log('Request body for login:', requestBody) // Debug log to verify request body structure

  let response

  try {
    /*
      credentials: 'include' is needed because this API uses auth cookies.
      Without it, browser may ignore the login cookie.
    */
    response = await fetch(LOGIN_ENDPOINT, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
      'body': JSON.stringify(requestBody),
    })
  } catch {
    throw new Error('Could not connect to the API. Check your internet and try again.')
  }

  const responseData = await readServerResponse(response)

  if (!response.ok) {
    // Same error strategy: prefer server message, else use fallback.
    const message =
      typeof responseData === 'object' && responseData !== null && responseData.message
        ? responseData.message
        : `Login failed with status ${response.status}.`

    throw new Error(message)
  }

  return responseData
}
