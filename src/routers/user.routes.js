import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  userLogout,
} from "../controllers/user_controler.js";

const router = Router();

// User routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/token").post(refreshAccessToken);

export default router;
