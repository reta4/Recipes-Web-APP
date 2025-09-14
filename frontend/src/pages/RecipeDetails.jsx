import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import toast from "react-hot-toast";
import { FaRegEdit, FaTrash } from "react-icons/fa";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`, {
          withCredentials: true,
        });
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/recipes/${id}`, {
        withCredentials: true,
      });
      toast.success("Recipe deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recipe");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-xl font-semibold text-gray-600">
          Recipe not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 my-10">
      {recipe.photoUrl && (
        <img
          src={recipe.photoUrl}
          alt={recipe.title}
          className="w-full h-[60vh] object-cover rounded-lg shadow-md mb-6"
        />
      )}

      <div className="bg-white rounded-lg border p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>
        <div className="text-gray-600 mb-4 space-y-1">
          <p>
            <span className="font-semibold">Category: </span>
            {recipe.category}
          </p>
          <p>
            <span className="font-semibold">Cooking Time: </span>
            {recipe.cookingTime} min
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
        <ol className="list-decimal list-inside space-y-1 mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ol>

        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 mb-6">
          {!readMore
            ? recipe.instructions.substring(0, 120) + "..."
            : recipe.instructions}
          {recipe.instructions.length > 120 && (
            <button
              type="button"
              onClick={() => setReadMore(!readMore)}
              className="ml-2 text-teal-500 font-medium hover:underline"
            >
              {readMore ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {user?._id === recipe.createdBy && (
          <div className="flex justify-end gap-3">
            <Link to={`/edit-recipe/${id}`}>
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition">
                <FaRegEdit />
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
