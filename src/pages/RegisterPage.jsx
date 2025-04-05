import { useForm } from "react-hook-form"
import {Input, Button, Label} from "../components";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {signUp,  isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard");
      }, [isAuthenticated]);

    const onSubmit = handleSubmit( async (values)=> {
       await signUp(values);
    });
 
    return (
        // Contenedor principal
        <div className="bg-blue-950"> 
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCJQJyh5dnZshnzGWYkQi3_91-MUSnAl66A&s" alt="piscina" />
            <div className="bg-blue-300 max-w-md p-10 rounded-md">
                <h1 className="text-3xl font-bold">Register</h1>
                {registerErrors.map((error, i) => 
                    <div className="bg-red-500 text-white" key={i}>{error}</div>
                )}
                <form onSubmit={onSubmit}>
                    <Label htmlFor="username">Full Name</Label>
                    <Input type="text" placeholder="write your name" register={register} name="Fullname" required />
                    {errors.Fullname && ( <p className="text-red-500">Name is required</p>) }
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" placeholder="youremail@gmail.com" register={register} name="email" required />
                    {errors.email && ( <p className="text-red-500">Email is required</p>) }
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="password" register={register} name="password" required />
                    {errors.password && ( <p className="text-red-500">Password is required</p>) }
                    <Button>Register</Button>
                </form>
                <p>
                    <h3>Already have an account?</h3>
                    <a className="text-white" href="">Login</a>
                </p>
            </div>
        </div>
  )
}

export default Register