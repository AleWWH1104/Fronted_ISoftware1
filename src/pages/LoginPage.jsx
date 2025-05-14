import { useForm } from "react-hook-form";
import { Input, Button, Label } from "../components";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

function LoginPage() {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const { signIn, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center gap-20 m-[25px] flex-col-reverse lg:flex-row lg:justify-around">  
      {/* cuadro animado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#8dcdf4] p-8 mx-[15px] w-full rounded-md lg:w-[400px] flex flex-col justify-center min-h-[500px]"
      >
        {loginErrors.map((error, i) => (
          <div className="bg-red-700 text-white p-2 rounded mb-4 text-sm" key={i}>
            {error}
          </div>
        ))}

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1 block">Email</Label>
            <Input type="email" placeholder="youremail@gmail.com" register={register} name="email" required />
            {errors.email && (<p className="text-red-500 text-sm mt-1">Email is required</p>)}
          </div>

          <div>
            <Label htmlFor="password" className="mb-1 block">Password</Label>
            <Input type="password" placeholder="password" register={register} name="password" required />
            {errors.password && (<p className="text-red-500 text-sm mt-1">Password is required</p>)}
          </div>

          <Button className="w-full bg-[#046bb1] hover:bg-blue-800 text-white rounded py-2">
            Sign In
          </Button>
        </form>
      </motion.div>
      <div>
        {/* Logo animado */}
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-full max-w-xs md:max-w-lg rounded-xl"
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
  
}

export default LoginPage;

