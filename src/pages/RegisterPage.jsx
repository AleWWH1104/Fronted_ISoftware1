import { useForm } from "react-hook-form";
import { Input, Button, Label } from "../components";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; 

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row gap-[150px] items-center max-w-6xl w-full">
        {/* 💫 Animated Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-blue-300 rounded-xl p-8 md:p-12 w-full md:w-[400px] flex flex-col justify-center min-h-[500px]"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

          {registerErrors.map((error, i) => (
            <div className="bg-red-500 text-white my-2 p-2 rounded" key={i}>
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="Fullname" className="mb-1 block">
                Full Name
              </Label>
              <Input
                type="text"
                placeholder="Write your name"
                register={register}
                name="Fullname"
                required
              />
              {errors.Fullname && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email
              </Label>
              <Input
                type="email"
                placeholder="youremail@gmail.com"
                register={register}
                name="email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                register={register}
                name="password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}
            </div>

            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded py-2">
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-black font-medium ml-1">
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* Logo Image with hover animation */}
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-full max-w-lg hidden md:block rounded-xl"
          whileHover={{ scale: 1.1, rotate: 15 }} // Animación de hover
          transition={{ duration: 0.3 }} // Duración de la animación
        />
      </div>
    </div>
  );
}

export default Register;
