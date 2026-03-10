# CharityMinds React Client

This README provides a comprehensive documentation of the entire user registration, login, and dashboard process in the CharityMinds application.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Flow Diagram](#architecture--flow-diagram)
3. [User Registration Process](#user-registration-process)
4. [User Login Process](#user-login-process)
5. [Dashboard Display Process](#dashboard-display-process)
6. [Data Storage Structure](#data-storage-structure)
7. [Key Files & Their Responsibilities](#key-files--their-responsibilities)
8. [Step-by-Step Data Flow](#step-by-step-data-flow)
9. [How to Run the Project](#how-to-run-the-project)
10. [How to Test the Features](#how-to-test-the-features)
11. [How to Clear Test Data](#how-to-clear-test-data)
12. [Technical Notes](#technical-notes)

---

## Project Overview

CharityMinds is a React-based web application that allows users to register, login, and view a dashboard displaying registered users. The application uses client-side storage (localStorage) to persist user data.

### Core Features
- User Registration with form validation
- User Login with authentication
- Dashboard displaying registered users
- Real-time user count statistics

---

## Architecture & Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHARITYMINDS APPLICATION FLOW                      │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐     ┌──────────────┐     ┌───────────┐     ┌─────────────┐
    │  User    │────▶│  /register   │────▶│ Register  │────▶│ localStorage│
    │  Visits  │     │    Page      │     │   Form    │     │   ('users') │
    └──────────┘     └──────────────┘     └───────────┘     └─────────────┘
         │                                                    │
         │                                                    ▼
         │                                            ┌─────────────┐
         │                                            │  Success    │
         │                                            │  Message    │
         │                                            └─────────────┘
         │                                                    │
         ▼                                                    ▼
    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌───────────┐
    │  /login  │◀────│ Redirect │◀────│  Login   │◀────│  Validate │
    │   Page   │     │   2sec   │     │   Form   │     │  Password │
    └──────────┘     └──────────┘     └──────────┘     └───────────┘
         │                                                    │
         │                                                    ▼
         │                                            ┌─────────────┐
         │                                            │ localStorage│
         │                                            │('loggedIn') │
         │                                            └─────────────┘
         │                                                    │
         ▼                                                    ▼
    ┌──────────┐     ┌─────────────┐     ┌────────────────┐
    │ /dashboard│◀────│  Redirect  │◀────│   Dashboard    │
    │   Page   │     │   1sec     │     │    Content     │
    └──────────┘     └─────────────┘     └────────────────┘
                                                    │
                                                    ▼
                                            ┌─────────────┐
                                            │ localStorage│
                                            │   ('users') │
                                            └─────────────┘
                                                    │
                                                    ▼
                                            ┌─────────────┐
                                            │ Display Table│
                                            │ & Statistics │
                                            └─────────────┘
```

---

## User Registration Process

### Step 1: User navigates to Registration Page
- URL: `/register`
- Renders: `RegisterPage.jsx` → `RegisterForm.jsx`

### Step 2: User fills the registration form
The form collects the following fields:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| firstName | text | Yes | Non-empty |
| lastName | text | Yes | Non-empty |
| username | text | Yes | Non-empty |
| email | email | Yes | Valid email format |
| phone | tel | Yes | Non-empty |
| dob | date | Yes | Valid date |
| gender | select | Yes | Male/Female/Other |
| password | password | Yes | Non-empty |
| confirmPassword | password | Yes | Must match password |

### Step 3: Form Submission Handling
When user clicks "Register":

```
handleSubmit(e) is triggered
           │
           ▼
┌──────────────────────────────┐
│ 1. Prevent default form     │
│    submission                │
│ 2. Clear any existing       │
│    messages                 │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 3. Validate password match   │
│    - If not match: show      │
│      error, stop process     │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 4. Check for existing email │
│    - Read 'users' from       │
│      localStorage            │
│    - Check if email exists   │
│    - If exists: show error,  │
│      stop process            │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 5. Create new user object   │
│    - Copy all form fields   │
│    - Add unique id:         │
│      Date.now()             │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 6. Save to localStorage     │
│    - Get existing users     │
│    - Push new user to array │
│    - Save array to          │
│      'users' key            │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 7. Show success message     │
│    "Registration successful!│
│     Redirecting to login..."│
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 8. Redirect to /login        │
│    after 2 seconds          │
└──────────────────────────────┘
```

### Code Reference (RegisterForm.jsx)

```javascript
function handleSubmit(e) {
  e.preventDefault()
  setMessage('')

  // Step 1: Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    setMessage('Passwords do not match!')
    setIsSuccess(false)
    return
  }

  // Step 2: Get existing users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

  // Step 3: Check if email already exists
  const emailExists = existingUsers.some(user => user.email === formData.email)
  if (emailExists) {
    setMessage('Email already registered!')
    setIsSuccess(false)
    return
  }

  // Step 4: Add new user
  const newUser = { ...formData, id: Date.now() }
  existingUsers.push(newUser)

  // Step 5: Save to localStorage
  localStorage.setItem('users', JSON.stringify(existingUsers))

  // Step 6: Show success and redirect
  setMessage('Registration successful! Redirecting to login...')
  setIsSuccess(true)

  setTimeout(() => {
    window.location.href = '/login'
  }, 2000)
}
```

---

## User Login Process

### Step 1: User navigates to Login Page
- URL: `/login`
- Renders: `LoginPage.jsx` → `LoginForm.jsx`

### Step 2: User enters credentials
The login form collects:
| Field | Type | Required |
|-------|------|----------|
| email | email | Yes |
| password | password | Yes |

### Step 3: Form Submission Handling
When user clicks "Login":

```
handleSubmit(e) is triggered
           │
           ▼
┌──────────────────────────────┐
│ 1. Prevent default form     │
│    submission                │
│ 2. Clear any existing       │
│    messages                 │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 3. Read users from          │
│    localStorage             │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 4. Find matching user       │
│    - Compare email AND       │
│      password                │
└──────────────────────────────┘
           │
       ┌───┴───┐
       │ Match │
       │Found? │
       └───┬───┘
      Yes  │  No
       │   │  │
       ▼   │  ▼
┌─────────────┐  ┌──────────────────────┐
│ Save logged │  │ Show error message  │
│ InUser to   │  │ "Invalid email or   │
│ localStorage│  │ password!"          │
│ (key:       │  └──────────────────────┘
│ 'loggedIn') │
└─────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Show success message        │
│ "Login successful!          │
│  Redirecting to dashboard..."│
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Redirect to /dashboard       │
│ after 1 second              │
└──────────────────────────────┘
```

### Code Reference (LoginForm.jsx)

```javascript
function handleSubmit(e) {
  e.preventDefault()
  setMessage('')

  // Step 1: Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  // Step 2: Find user with matching email and password
  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    // Step 3: Save logged in user info
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    
    setMessage('Login successful! Redirecting to dashboard...')
    setIsSuccess(true)

    // Step 4: Redirect to dashboard after 1 second
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1000)
  } else {
    // Step 5: Show error
    setMessage('Invalid email or password!')
    setIsSuccess(false)
  }
}
```

---

## Dashboard Display Process

### Step 1: User navigates to Dashboard
- URL: `/dashboard`
- Renders: `DashboardPage.jsx` → `DashboardContent.jsx`

### Step 2: Component Initialization
When DashboardContent loads:

```
useEffect runs on component mount
           │
           ▼
┌──────────────────────────────┐
│ 1. Read 'users' from         │
│    localStorage              │
│ 2. Set users state           │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 3. Read 'loggedInUser' from  │
│    localStorage              │
│ 4. Set currentUser state     │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ 5. Determine display name   │
│    - If loggedInUser exists: │
│      use their firstName     │
│    - Else if users exist:    │
│      use first user's name  │
│    - Else: "Guest"           │
└──────────────────────────────┘
```

### Step 3: Dashboard Rendering
The dashboard displays:

1. **Welcome Section**
   - Shows personalized greeting with user's first name

2. **Statistics Cards** (4 cards)
   | Card | Value Source | Display |
   |------|--------------|---------|
   | Registered Users | users.length | Dynamic count |
   | Children Forms Recorded | Hardcoded "7" | Static |
   | Visitors | Hardcoded "56" | Static |
   | Donations | Hardcoded "3" | Static |

3. **Registered Users Table**
   - Shows all users from localStorage
   - Columns: #, First Name, Last Name, Email, Username, Phone, DOB, Gender
   - Shows "No registered users yet" if empty

### Code Reference (DashboardContent.jsx)

```javascript
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
const displayName = currentUser 
  ? currentUser.firstName 
  : (users.length > 0 ? users[0].firstName : 'Guest')
```

---

## Data Storage Structure

### localStorage Keys Used

#### 1. `users` - Array of all registered users
```javascript
// Structure:
[
  {
    id: 1699999999999,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "1234567890",
    dob: "1990-01-15",
    gender: "Male",
    password: "password123",
    confirmPassword: "password123"
  },
  // ... more users
]
```

#### 2. `loggedInUser` - Currently logged in user
```javascript
// Structure:
{
  id: 1699999999999,
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "1234567890",
  dob: "1990-01-15",
  gender: "Male",
  password: "password123",
  confirmPassword: "password123"
}
```

---

## Key Files & Their Responsibilities

| File | Responsibility |
|------|----------------|
| `App.jsx` | Routes URLs to appropriate pages (/, /login, /register, /dashboard) |
| `src/pages/RegisterPage.jsx` | Wraps RegisterForm with Header/Footer |
| `src/pages/loginpage.jsx` | Wraps LoginForm with Header/Footer |
| `src/pages/DashboardPage.jsx` | Wraps DashboardContent with Header/Footer |
| `src/components/RegisterForm.jsx` | Handles user registration form and localStorage save |
| `src/components/loginForm.jsx` | Handles user login authentication |
| `src/components/DashboardContent.jsx` | Displays dashboard with user table and statistics |
| `src/components/Header.jsx` | Navigation header with links |
| `src/components/Footer.jsx` | Page footer |
| `src/services/registeredUsersStorage.js` | Utility functions for reading/writing registered users (alternative storage key) |

---

## Step-by-Step Data Flow

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            COMPLETE USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────────────────┘

START
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: User visits /register                                              │
│ - App.jsx checks URL path                                                  │
│ - Routes to RegisterPage → RegisterForm                                   │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: User fills form fields                                             │
│ - React state (formData) updates on each input change                     │
│ - Fields: firstName, lastName, username, email, phone, dob, gender,       │
│           password, confirmPassword                                       │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: User clicks "Register" button                                      │
│ - handleSubmit() is triggered                                              │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: Client-side validation                                             │
│ - Passwords match check                                                    │
│ - Email duplicate check                                                    │
│ - If validation fails: show error message, stop                          │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: Save to localStorage                                               │
│ - Read existing users: localStorage.getItem('users')                     │
│ - Create new user object with unique ID                                    │
│ - Push to users array                                                      │
│ - Save: localStorage.setItem('users', JSON.stringify(users))              │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 6: Show success message                                               │
│ - "Registration successful! Redirecting to login..."                     │
│ - Wait 2 seconds                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 7: Redirect to /login                                                 │
│ - window.location.href = '/login'                                         │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 8: User enters login credentials                                      │
│ - Enters email and password                                               │
│ - Clicks "Login" button                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 9: Authenticate user                                                  │
│ - Read users from localStorage                                            │
│ - Find matching email + password                                          │
│ - If not found: show error                                                │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 10: Save logged in session                                            │
│ - localStorage.setItem('loggedInUser', JSON.stringify(user))             │
│ - Show success message                                                    │
│ - Wait 1 second                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 11: Redirect to /dashboard                                            │
│ - window.location.href = '/dashboard'                                     │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 12: Dashboard loads                                                   │
│ - useEffect runs on mount                                                  │
│ - Reads users from localStorage                                           │
│ - Sets state                                                               │
│ - Renders table with all users                                            │
└─────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
END - User sees dashboard with all registered users

```

---

## How to Run the Project

### Prerequisites
- Node.js installed (v14 or higher recommended)
- npm or yarn package manager

### Installation & Running

1. **Navigate to the client directory:**
```bash
cd "c:\Users\( F r E a K )\gomycode\charityMinds-React\client"
```

2. **Install dependencies (first time only):**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open the application:**
- The terminal will show a URL (usually `http://localhost:5173`)
- Open that URL in your browser

### Alternative: Using the application

- **Registration:** Visit `http://localhost:5173/register`
- **Login:** Visit `http://localhost:5173/login`
- **Dashboard:** Visit `http://localhost:5173/dashboard`

---

## How to Test the Features

### Testing Registration

1. Open `http://localhost:5173/register`
2. Fill in all form fields:
   - First Name: John
   - Last Name: Doe
   - Username: johndoe
   - Email: john@example.com
   - Phone: 1234567890
   - Date of Birth: 1990-01-15
   - Gender: Male
   - Password: password123
   - Confirm Password: password123
3. Click "Register" button
4. Verify success message appears
5. Wait 2 seconds for redirect to login

### Testing Login

1. On the login page, enter:
   - Email: john@example.com
   - Password: password123
2. Click "Login" button
3. Verify success message appears
4. Wait 1 second for redirect to dashboard

### Testing Dashboard

1. After login, verify:
   - Welcome message shows your name
   - "Registered Users" count shows correct number
   - Your name appears in the table
   - All your details are displayed correctly

### Testing with Multiple Users

1. Register a second user with different email
2. Login with the second user
3. Verify dashboard shows both users in the table
4. Verify the count increased

---

## How to Clear Test Data

### Method 1: Using Browser DevTools

1. Open your browser's Developer Tools (F12 or right-click → Inspect)
2. Go to the **Application** tab
3. Expand **Local Storage** in the sidebar
4. Click on your app's URL
5. Right-click and delete the following keys:
   - `users` (all registered users)
   - `loggedInUser` (current session)
6. Refresh the page

### Method 2: Using Console

1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Run these commands:
```javascript
localStorage.removeItem('users');
localStorage.removeItem('loggedInUser');
console.log('Storage cleared!');
```
4. Refresh the page

---

## Technical Notes

### Storage Limitations

1. **Client-side only:** Data is stored in the browser's localStorage
   - Data does NOT persist across different browsers
   - Data does NOT persist across different devices
   - Clearing browser cache/data will delete all users

2. **Security concerns (for production):**
   - Passwords are stored in plain text (NOT secure)
   - No server-side validation
   - Anyone with browser access can view/edit data
   - No authentication tokens or sessions

### Future Improvements (Recommended)

1. **Backend Integration**
   - Create API endpoints for user registration and login
   - Store data in a proper database
   - Implement JWT or session-based authentication

2. **Security Enhancements**
   - Hash passwords before storing
   - Implement proper authentication tokens
   - Add server-side validation

3. **Features to Add**
   - User logout functionality
   - Password reset
   - User profile editing
   - Delete account functionality
   - Pagination for user table
   - Search/filter users

---

## Troubleshooting

### Issue: Users not appearing in dashboard

**Solution:**
1. Check localStorage has data: Open DevTools → Application → Local Storage
2. Verify 'users' key exists and has data
3. Try clearing and re-registering

### Issue: Can't login after registration

**Solution:**
1. Verify you used the same email and password
2. Check localStorage to confirm user was saved
3. Clear storage and try again

### Issue: Redirect not working

**Solution:**
1. Check browser console for errors
2. Verify JavaScript is enabled
3. Check browser pop-up blocker (unlikely but possible)

---

*Document Version: 1.0*  
*Last Updated: Project Documentation*  
*CharityMinds React Client*
