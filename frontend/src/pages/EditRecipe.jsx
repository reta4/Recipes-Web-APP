import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    category: "",
    photoUrl: "",
    cookingTime: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);

  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`, {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `/api/recipes/${id}`,
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
      <h1 className="text-2xl font-bold text-center">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
        <div>
          <label>Title</label>
          <input
            type="text"
            required
            value={formData.title}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("title", e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients</label>
          <input
            type="text"
            required
            value={formData.ingredients.join(", ")}
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
            value={formData.instructions}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("instructions", e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={formData.category}
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
            value={formData.cookingTime || ""}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("cookingTime", e.target.value)}
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            required
            value={formData.photoUrl}
            className="w-full p-1 border rounded border-gray-300 text-sm"
            onChange={(e) => handelChange("photoUrl", e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-[9rem] bg-green-500 border border-green-100 rounded-2xl text-white font-bold text-lg mx-auto"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
