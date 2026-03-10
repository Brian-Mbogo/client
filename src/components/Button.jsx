// Simple Button component for reuse
export default function Button({ children, type = 'submit', className = '', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  )
}

