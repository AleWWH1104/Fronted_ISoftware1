import { useForm } from "react-hook-form";
import {Input, Button, Label} from "../components";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Register() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {signUp,  isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (values)=> {
       await signUp(values);
    });

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/home");
        }
    }, [isAuthenticated]);
 
    return (
        <div className="flex justify-between items-center px-[150px] h-screen bg-white">
          <div className="bg-blue-300 max-w-md w-full p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
    
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 text-white my-2 p-2 rounded" key={i}>
                {error}
              </div>
            ))}
    
            <form onSubmit={onSubmit}>
              <Label htmlFor="Fullname">Full Name</Label>
              <Input
                type="text"
                placeholder="Write your name"
                register={register}
                name="Fullname"
                required
              />
              {errors.Fullname && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
    
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="youremail@gmail.com"
                register={register}
                name="email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
    
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                register={register}
                name="password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
    
              <Button className="mt-4 w-full bg-blue-800 hover:bg-blue-600 text-white py-2 rounded">
                Register
              </Button>
            </form>
    
            <p className="flex justify-center gap-2 mt-4 text-center">
              Already have an account?
              <Link to="/login" className="text-blue-600">
                Sign In
              </Link>
            </p>
          </div>
    
          {/* Image */}
          <div className="hidden md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCJQJyh5dnZshnzGWYkQi3_91-MUSnAl66A&s"
              alt="piscina"
              className="rounded-lg w-[600px]"
            />
          </div>
        </div>
      );
    }
    

export default Register