import { Router } from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  UpdateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", UpdateEvent);
router.delete("/:id", deleteEvent);

export default router;
