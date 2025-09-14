import express from "express";
import {
  updateUser,
  getUsers,
  deleteUser,
} from "../controless/userControles.js";
import { verifyToken, verifyAdmin } from "../middaleware/authMidalware.js";
//...................................................................................................

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getUsers);
router.delete("/delete-user/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/update-user/:id", updateUser);

export default router;
