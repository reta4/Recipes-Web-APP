import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md shadow-gray-300 p-2 mx-1 rounded  ">
      <div className="max-w-7x max-auto flex justify-between items-center">
        <Link to="/">
          <button className="text-3xl text-green-400 font-bold">
            Fenti
            <span className="font-extrabold text-2xl text-green-800">
              Recipe
            </span>
          </button>
        </Link>

        <div className="flex gap-x-4 px-20  ">
          {!user && (
            <Link to="/register">
              <button className="font-extrabold text-2xl text-gray-500">
                register
              </button>
            </Link>
          )}
          {user ? (
            <div className="flex-row  flex items-center gap-5">
              <Link
                to="/add-recipe"
                className="font-extrabold text-2xl text-green-400"
              >
                Add
                <span className=" font-bold text-gray-500">Recipe</span>
              </Link>
              <button
                onClick={logout}
                className="font-extrabold text-2xl text-gray-500"
              >
                Logout
              </button>
              <Link
                to={`/admin/:${user._id}`}
                className="border p-2 rounded-2xl"
              >
                <FaUser />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="font-extrabold text-2xl text-gray-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
