import { useForm } from "react-hook-form";
import { Input} from "../components";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import RoleCard from "../components/RoleCard";
import useRoles from "../hooks/useRoles";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, errors: registerErrors } = useAuth();
  const {roles} = useRoles();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
  });

  return (
    <div className="min-h-screen md:px-[50px] py-[25px] px-[25px]  ">
      {registerErrors.map((error, i) => (
        <div className="bg-red-700 text-white p-2 rounded mb-4 text-sm" key={i}>
          {error}
        </div>
      ))}
      <div className="flex justify-center h-[10dvh] mb-4">
        <img src="/logo.png" alt="logo"/>
      </div>
      <form onSubmit={onSubmit} className="mb-8">
        <h1 className="font-bold md:text-2xl text-[#046bb1]  text-xl">01. Registrar Nuevo Usuario</h1>
        <hr className="w-full mb-2 border-1 border-[#046bb1] "/>
        <p className="mb-4">Complete los datos personales del usuario.</p>
        <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          <div className="md:col-span-2">
            <label htmlFor="Fullname" className="mb-1 block text-[#046bb1] font-semibold">Nombre Completo</label>
            <Input type="text" placeholder="Tu nombre" register={register} name="Fullname" required />
            {errors.Fullname && (<p className="text-red-500 text-sm mt-1">Name is required</p>)}
          </div>

          <div className="md:col-start-3" >
            <label htmlFor="phone1" className="mb-1 block text-[#046bb1] font-semibold">Telefonos</label>
            <Input type="text" placeholder="+(502) 1111-1111" register={register} name="phone1"/>
          </div>

          <div className="md:col-start-4">
            <label htmlFor="phone2" className="mb-1 block text-[#046bb1] font-semibold">(Opcional)</label>
            <Input type="text" placeholder="+(502) 1111-1111"  register={register} name="phone2" />
          </div>

          <div className="md:col-span-2 md:row-start-2" >
            <label htmlFor="email" className="mb-1 block text-[#046bb1] font-semibold">Correo</label>
            <Input type="email" placeholder="Email@gmail.com" register={register} name="email" required />
            {errors.password && (<p className="text-red-500 text-sm mt-1">Correo es requerido</p>)}
          </div>

          <div className="md:col-span-2 md:col-start-3 md:row-start-2">
            <label htmlFor="password" className="mb-1 block text-[#046bb1] font-semibold">Contraseña</label>
            <Input type="password" placeholder="Contraseña" register={register} name="password" required />
            {errors.password && (<p className="text-red-500 text-sm mt-1">Contraseña es requerida</p>)}
          </div>
        </div>
        

        <h1 className="font-bold md:text-2xl text-[#046bb1]  text-xl">02. Asignar Roles</h1>
        <hr className="w-full mb-2 border-1 border-[#046bb1]"/>
        <p className="mb-4">Seleccione los roles principal que desempeñará el usuario en el sistema.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {/* {roles.map((role, index)=>(
            <RoleCard
             key={index}
             name={role.name}
            />
          ))} */}
          <RoleCard/>
          <RoleCard/>
          <RoleCard/>
          <RoleCard/>     
        </div>
        <hr className="w-full mb-2 border-1-white"/>
        <div className="flex justify-between flex-wrap">
          <button className="bg-[#cfdde9] py-3 px-5 rounded-md">Cancelar y Salir</button>
          <button className="bg-[#046bb1] py-3 px-5 rounded-md text-white">Guardar Usuario</button>
        </div>
      </form> 
    </div>
  );
}

export default Register;
