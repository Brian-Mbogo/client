export function Button() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2.5 text-base font-semibold text-gray-500 transition duration-200 hover:bg-blue-600 hover:text-white active:translate-y-px">
        Click me
      </button>
      <button className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2.5 text-base font-semibold text-gray-500 transition duration-200 hover:bg-blue-600 hover:text-white active:translate-y-px">
        Submit
      </button>
      <button className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2.5 text-base font-semibold text-gray-500 transition duration-200 hover:bg-blue-600 hover:text-white active:translate-y-px">
        Send message
      </button>
    </div>
  )
}
