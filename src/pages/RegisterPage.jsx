import { useForm } from "react-hook-form"
import { registerRequest } from "../services/auth";
import Input from "../components/Input";
import Button from "../components/Button";

function RegisterPage() {
    const {register, handleSubmit} = useForm();
    const onSubmit = handleSubmit( async (values)=> {
        const res = await registerRequest(values)
        console.log(res);
    });

    return (
        // Contenedor principal
        <div className="bg-blue-950"> 
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCJQJyh5dnZshnzGWYkQi3_91-MUSnAl66A&s" alt="piscina" />
            <div className="bg-blue-300 max-w-md p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <Input type="text" placeholder="Full Name" register={register} name="Fullname" required />
                    <Input type="email" placeholder="Email" register={register} name="email" required />
                    <Input type="password" placeholder="Password" register={register} name="password" required />
                    <Button type="submit">Registrarse</Button>
                </form>
            </div>
        </div>
  )
}

export default RegisterPage