import { useContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContex";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/DeshboardMangment";
import Register from "./pages/Register";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import AddRecipe from "./pages/AddRecipe";
import AdminDashboard from "./pages/DeshboardMangment";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route
          path="/admin/:id"
          element={user ? <AdminDashboard /> : <Login />}
        />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
