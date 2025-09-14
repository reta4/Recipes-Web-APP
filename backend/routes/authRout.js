import express from "express";
import {
  login,
  logout,
  register,
  refreshToken,
} from "../controless/authControles.js";
import { verifyToken } from "../middaleware/authMidalware.js";
//...................................................................................................

const router = express.Router();

//...................................................................................................
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshToken);

//...................................................................................................
//return user data:
router.get("/me", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

//users end points:

export default router;
