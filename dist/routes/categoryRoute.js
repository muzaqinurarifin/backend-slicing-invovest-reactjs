import { Router } from "express";
import { getCategory, createCategory, getCategoryById, updateCategory, deleteCategory, } from "../controllers/categoryController.js";
const router = Router();
router.get("/", getCategory);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
//# sourceMappingURL=categoryRoute.js.map