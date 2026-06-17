import { Router } from "express";
import {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getCategory);
router.post("/",authenticate, createCategory);
router.get("/:id", getCategoryById);
router.put("/:id",authenticate, updateCategory);
router.delete("/:id",authenticate, deleteCategory);

export default router;
