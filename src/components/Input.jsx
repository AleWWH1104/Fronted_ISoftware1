function Input({type, placeholder, register, name, required = false}) {
    return (
      <input
        type={type}
        {...register(name, {required})}
        className="w-full text-black bg-white px-4 py-2 rounded-md my-2"
        placeholder={placeholder}
      />
    )
  }
  
  export default Input;
  