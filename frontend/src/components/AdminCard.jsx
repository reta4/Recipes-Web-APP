import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContex";

const AdminCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`/api/users/`, {
          withCredentials: true,
        });
        setUsers(
          res.data.filter((currentUser) => user._id !== currentUser._id)
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete-user/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("Recipe deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recipe");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="w-full flex justify-center mt-2">
      <div className="w-full max-w-6xl overflow-x-auto bg-white shadow rounded-2xl p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                created date
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => {
                const { _id, username, email, createdAt } = user;
                const id = _id;
                return (
                  <tr key={id}>
                    <td className="px-6 py-4 align-middle">
                      <div className="text-sm font-medium">{username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {createdAt.split("T")[0]}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 ml-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                        onClick={() => handleDelete(id)}
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
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCard;
