export function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#8dcdf4] text-white p-2.5 rounded-md my-2 w-full hover:bg-blue-900 transition-colors font-semibold"
    >
      {children}
    </button>
  )
}