import { useForm } from "react-hook-form"
import {Input, Button, Label} from "../components";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del login:", data);
    //Falta lógica de autenticación (iris creo o idk xd)
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex w-[80%] max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Sección de login */}
        <div className="w-1/2 bg-[#89CFF0] p-8 rounded-l-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-sm text-white font-semibold">Email</label>
            <Input
              type="email"
              placeholder="username@gmail.com"
              register={register}
              name="email"
              required
            />

            <label className="text-sm text-white font-semibold">Password</label>
            <Input
              type="password"
              placeholder="Password"
              register={register}
              name="password"
              required
            />

            <Button type="submit">Sign In</Button>
          </form>
          <p className="text-center text-sm text-white mt-4">
            ¿No tienes cuenta? <span className="text-black font-medium cursor-pointer">Regístrate</span>
          </p>
        </div>

        {/* Sección del logo */}
        <div className="w-1/2 flex items-center justify-center bg-white rounded-r-lg">
          <img src="/logo.png" alt="Logo PoolCenter" className="w-64" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
