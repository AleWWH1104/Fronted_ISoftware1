export function Input({type, placeholder, register, name, required = false}) {
  return (
    <input
      type={type}
      {...register(name, {required})}
      className="w-full text-black bg-white px-4 py-2 rounded-md my-2 border-1 border-[#046bb1]"
      placeholder={placeholder}
    />
  )
}

export function InputForm({type, placeholder, required = false, label, className, value, onChange, readOnly= false}) {
  return (
    <div className={className}>
      <h4 className="parrafo font-semibold mb-1">{label}</h4>
      <input
        type={type}
        value={value} 
        onChange={onChange}
        className="w-full parrafo bg-white px-4 py-2 rounded-lg  border border-gray-400"
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
      />
    </div>
  )
}
