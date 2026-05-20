import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, createLead);

router.get("/", protect, getLeads);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

export default router;