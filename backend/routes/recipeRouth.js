import express from "express";
import {
  createRecipe,
  getRecipe,
  getByCategory,
  updateRecipe,
  deleteRecipe,
  getRecipeBycreator,
} from "../controless/recipeControles.js";
import { verifyToken } from "../middaleware/authMidalware.js";

//...................................................................................................
const router = express.Router();
router.get("/category/:category", getByCategory);
router.get("/:id", getRecipe);
router.get("/user/:id", verifyToken, getRecipeBycreator);
router.post("/", verifyToken, createRecipe);
router.delete("/:id", verifyToken, deleteRecipe);
router.patch("/:id", verifyToken, updateRecipe);

export default router;
