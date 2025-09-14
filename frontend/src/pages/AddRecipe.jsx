import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    category: "",
    photoUrl: "",
    cookingTime: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/recipes/`,
        {
          title: formData.title,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          category: formData.category,
          photoUrl: formData.photoUrl,
          cookingTime: Number(formData.cookingTime),
        },
        { withCredentials: true }
      );
      if (user.idAdmin) {
        navigate("/");
      } else {
        navigate(`/admin/${user._id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">add Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
        <div>
          <label>Title</label>
          <input
            type="text"
            required
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("title", e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients</label>
          <input
            type="text"
            required
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) =>
              handelChange(
                "ingredients",
                e.target.value.split(",").map((i) => i.trim())
              )
            }
          />
        </div>

        <div>
          <label>Instructions</label>
          <input
            type="text"
            required
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("instructions", e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <select
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("category", e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        <div>
          <label>Cooking Time (minutes)</label>
          <input
            type="number"
            min={0}
            required
            // value={formData.cookingTime || ""}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("cookingTime", e.target.value)}
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            required
            // value={formData.photoUrl}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("photoUrl", e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-[9rem] bg-green-500 border border-green-100 rounded-2xl text-white font-bold text-lg mx-auto"
        >
          {loading ? "Loading..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
