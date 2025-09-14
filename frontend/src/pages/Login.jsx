import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContex";

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const { login } = useContext(AuthContext);
  const handleLogin = async () => {
    if (!password || !email) return toast.error("enter email and password");
    try {
      const res = await login(email, password);
    } catch (err) {
      console.log(err);
      toast.error("email or password wrong");
    }
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="flex flex-col gap-y-10 w-[60vw]  my-20 items-center text-center shadow-green-400 shadow-sm py-7  h-auto">
        <h1 className="text-4xl font-bold">
          Log<span className="text-green-400">in</span>
        </h1>
        <div>
          <h3 className="font-extrabold">email address</h3>
          <input
            className="border border-gray-200 px-10 rounded-md"
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <h3 className="font-bold">password</h3>
          <input
            className="border border-gray-200 px-10 rounded-md"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white font-bold w-[9rem] py-2 
        
        rounded-full"
          onClick={handleLogin}
        >
          click
        </button>
      </div>
    </div>
  );
};

export default Login;
