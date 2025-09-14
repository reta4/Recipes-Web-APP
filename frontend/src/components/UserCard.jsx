import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const UserCard = ({ recipes, setRecipe }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`, {
        withCredentials: true,
      });
      setRecipe((prev) => prev.filter((recipe) => recipe._id !== id));
      toast.success("Recipe deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recipe");
    }
  };

  return (
    <div className="w-full flex justify-center mt-2">
      <div className="w-full max-w-6xl overflow-x-auto bg-gray-200 shadow rounded-2xl p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {recipes.length > 0 ? (
              recipes.map((recipe) => {
                const { _id, title, category, photoUrl } = recipe;
                return (
                  <tr key={_id}>
                    <td className="px-6 py-4 align-middle">
                      <div className="text-sm font-medium">{title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-24 h-16 rounded overflow-hidden bg-gray-100">
                        <img
                          src={photoUrl || "https://via.placeholder.com/120x90"}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/edit-recipe/${_id}`}>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                          Edit
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 ml-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No recipes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCard;
