import { Router } from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getEvents);
router.post("/", authenticate, createEvent); //authenticate untuk menghandle apakah sudah login atau belum sebelum bisa melanjutkan aksi
router.get("/:id", getEventById);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
