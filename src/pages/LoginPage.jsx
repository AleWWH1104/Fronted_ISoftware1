import { useForm } from "react-hook-form";
import {Input, Button, Label} from "../components";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const {signIn, errors: loginErrors} = useAuth();

    const onSubmit = handleSubmit((data)=> {
        signIn(data);
    });

    return (
    <div className="bg-blue-950"> 
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCJQJyh5dnZshnzGWYkQi3_91-MUSnAl66A&s" alt="piscina" />
        <div className="bg-blue-300 max-w-md p-10 rounded-md">
            {loginErrors.map((error, i) => 
                    <div className="bg-red-500 text-white my-2" key={i}>{error}</div>
            )}
            <h1 className="text-3xl font-bold">Login</h1>
            
            <form onSubmit={onSubmit}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="youremail@gmail.com" register={register} name="email" required />
                {errors.email && ( <p className="text-red-500">Email is required</p>) }
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="password" register={register} name="password" required />
                {errors.password && ( <p className="text-red-500">Password is required</p>) }
                <Button>Sign In</Button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Don't have an account? <Link to="/register" className="text-blue-600"> Register</Link>
            </p>
        </div>
    </div>
  )
}

export default LoginPage 