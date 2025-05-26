export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-m block my-1 text-white font-bold">
      {children}
    </label>
  );
}