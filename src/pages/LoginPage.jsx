import { useForm } from "react-hook-form";
import { Input, Button, Label } from "../components";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row gap-[150px] items-center max-w-6xl w-full">
        
        {/* cuadro animado*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-blue-300 rounded-xl p-8 md:p-12 w-full md:w-[400px] flex flex-col justify-center min-h-[500px]"
        >
          {loginErrors.map((error, i) => (
            <div
              className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm"
              key={i}
            >
              {error}
            </div>
          ))}

          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email
              </Label>
              <Input
                type="email"
                placeholder="youremail@gmail.com"
                name="email"
                register={register}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <Input
                type="password"
                placeholder="password"
                name="password"
                register={register}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded py-2">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don’t have an account?
            <Link to="/register" className="text-black font-medium ml-1">
              Register
            </Link>
          </p>
        </motion.div>

        {/* Logo animado */}
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

export default LoginPage;
