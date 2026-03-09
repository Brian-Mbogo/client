# CharityMinds React Client

This README explains one feature in simple terms:

When a person registers, that person is shown in the Dashboard table.

## What was added

1. Registration now saves the new person in browser storage (`localStorage`).
2. Dashboard now reads that saved data and displays it.
3. The `Registered Users` number now shows real count from saved users.

## Files changed

1. `src/services/registeredUsersStorage.js`
- New helper file.
- Handles reading and writing registered users from `localStorage`.

2. `src/components/RegisterForm.jsx`
- After API registration succeeds, it now also saves the user locally.
- Added comments so you can follow each step.

3. `src/components/DashboardContent.jsx`
- Removed hard-coded users.
- Loads users from local storage when dashboard opens.
- Shows "No registered users yet" if empty.

## Step-by-step flow (very important)

1. User opens `/register` page.
2. User fills the form and clicks `Register`.
3. Frontend validates fields (required fields, email format, password match).
4. Frontend sends data to your backend register API.
5. If backend responds with success:
- frontend saves user details (without password) to `localStorage`
- frontend shows success message
- frontend redirects to `/login`
6. User logs in.
7. User is redirected to `/dashboard`.
8. Dashboard reads saved users from `localStorage` and renders them in the table.

## Why localStorage?

`localStorage` is the simplest beginner-friendly way to keep data in browser for now.

- Data survives page refresh.
- No extra backend endpoint needed for list view.
- Easy to debug from browser dev tools.

## How to run the project

1. Open terminal in `client` folder:
```bash
cd "c:\Users\( F r E a K )\gomycode\charityMinds-React\client"
```

2. Install dependencies (first time only):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open the URL shown in terminal (usually `http://localhost:5173`).

## How to test this feature

1. Open `http://localhost:5173/register`.
2. Fill all form fields and submit.
3. After success, login from `/login`.
4. Go to `/dashboard`.
5. Confirm new person appears in `Registered Users` table.
6. Confirm top card `Registered Users` count increased.

## How to clear test users

If you want to reset dashboard users:

1. Open browser DevTools.
2. Go to `Application` tab.
3. Open `Local Storage` for your app URL.
4. Delete key: `charityMindsRegisteredUsers`.
5. Refresh dashboard.

## Notes for beginners

1. This is frontend storage, not a full database.
2. If you open app in another browser/device, users will not appear there.
3. Next upgrade later: create a backend endpoint like `GET /users` and load users from server instead of local storage.
