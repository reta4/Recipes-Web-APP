import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("please enter all fields");
      return;
    }
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-full mask-auto p-4  flex flex-col items-center">
      <h1 className="text-4xl font-bold md-4  text-center my-5">
        Reis<span className="text-green-400">ter</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-lg shadow-md shadow-green-300 px-10 text-center flex flex-col gap-10"
      >
        <div>
          <label className="block text-gray-700 font-bold">username</label>
          <input
            type="text"
            placeholder="username"
            className="w-full p-1 border border-gray-200 rounded "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">email</label>
          <input
            type="email"
            placeholder="email address"
            className="w-full p-1 border rounded  border-gray-200 "
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">password</label>
          <input
            type="password"
            placeholder="password"
            className="w-full p-1 border rounded  border-gray-200 "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-300 rounded-full  w-[9rem] py-1 m-7
          font-medium
          text-white
          "
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
