// Login button extracted from charity-minds-2 Login page and converted to JSX.
export default function LoginButton({ isSubmitting = false }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  )
}
