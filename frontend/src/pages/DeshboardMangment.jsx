import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import axios from "axios";
import UserCard from "../components/UserCard";
import AdminCard from "../components/AdminCard";

const DeshboardMangment = () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`/api/recipes/user/${user._id}`, {
          withCredentials: true,
        });
        setRecipe(res.data.recipes);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className=" min-w-full flex flex-col items-center  mt-10 h-screen">
      <div
        className="w-[60%]  flex flex-col gap-2.5 mt-6 bg-gray-100 p-20 rounded-2xl items-center
      
      text-center shadow-xl"
      >
        <h1 className="text-5xl font-medium text-shadow-pink-800 ">Profile</h1>
        <div className="w- bg-amber-500"></div>

        <p>
          <span className="font-bold">username: </span>
          {user.username}
        </p>
        <p>
          <span className="font-bold">email: </span>
          {user.username}
        </p>
      </div>
      <div className="mt-14">
        <h1 className="text-3xl font-bold font-serif">
          {" "}
          Y<span className="text-green-400">ou</span>r Re
          <span className="text-green-400">cip</span>es
        </h1>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : user.idAdmin ? (
        <AdminCard />
      ) : (
        <UserCard recipes={recipes} setRecipe={setRecipe} />
      )}
    </div>
  );
};

export default DeshboardMangment;
