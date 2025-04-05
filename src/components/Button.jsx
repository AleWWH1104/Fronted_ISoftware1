export function Button({ onClick, children }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md my-2 w-full hover:bg-blue-700 transition-colors"
      >
        {children}
      </button>
    )
  }
