import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`/api/recipes/category/${category}`, {
          withCredentials: true,
        });
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto p-4 my-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              cat === category
                ? "bg-white text-black border-2"
                : "bg-black text-white border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full grid gap-6 my-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map(({ _id, title, photoUrl, category, cookingTime }) => (
          <Link key={_id} to={`/recipe/${_id}`}>
            <div className="flex flex-col h-full rounded-2xl overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
              {photoUrl && (
                <img
                  src={photoUrl}
                  alt={title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="flex flex-col flex-1 justify-between p-4 text-center">
                <h2 className="font-bold text-lg mb-1">{title}</h2>
                <p className="text-sm text-gray-600">{category}</p>
                <div className="rounded-2xl border border-green-300 mt-4">
                  <FaClock className="inline mx-2" />
                  <p className="text-sm text-gray-500 mt-2 inline">
                    {cookingTime} min
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
