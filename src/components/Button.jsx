export function Button({ onClick, children }) {
    return (
      <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 text-white px-6 py-2 rounded-md w-full hover:bg-blue-700 transition-all font-semibold shadow-md"
      >
        {children}
      </button>
    )
  }
