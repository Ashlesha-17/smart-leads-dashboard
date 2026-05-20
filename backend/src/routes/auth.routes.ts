import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
  });
});

export default router;
