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
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div 
    className="min-h-screen flex items-center flex-col-reverse lg:flex-row lg:justify-around">  
      <div className="w-full md:w-3/5 flex text-white md:min-h-screen h-[70dvh]">
        <div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#046bb1] w-full md:w-3/4 flex flex-col justify-center items-center "
        >
          <div className="w-[80%] ">
            <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
            <hr className="w-full mb-8 border-2"/>
          </div>
          {loginErrors.map((error, i) => (
            <div className="w-[80%] bg-[#f7d7da] text-[#920000] p-2 rounded mb-4 text-sm" key={i}>
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit} className="space-y-8 w-[80%] ">
            <div>
              <Label htmlFor="email" className="mb-1 block">Correo</Label>
              <Input type="email" placeholder="Email@gmail.com" register={register} name="email" required />
              {errors.email && (<p className="text-red-500 text-sm mt-1">*Email es requerido</p>)}
            </div>

            <div>
              <Label htmlFor="password" className="mb-1 block">Contraseña</Label>
              <Input type="password" placeholder="Contraseña" register={register} name="password" required />
              {errors.password && (<p className="text-red-500 text-sm mt-1">*Contraseña es requerida</p>)}
            </div>

            <Button>Ingresar</Button>
          </form>
        </div>
        <img src="/g.png" alt="styled" className="min-h-screen w-1/4 hidden md:block" />
      </div>
      
      <div className="sm:w-2/5 flex flex-col items-center sm:space-y-16 sm:pr-[70px] p-[25px] w-full space-y-8">
        {/* Logo animado */}
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-full max-w-xs md:max-w-lg rounded-xl"
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ duration: 0.3 }}
        />
        <h4 className="text-[#046bb1] font-semibold sm:text-2xl text-center sm:w-[70%]">"Innovación en cada gota, confianza en cada proyecto."</h4>
      </div>
    </div>
  );
  
}

export default LoginPage;