import { Router } from "express";
import {
  getSpeakers,
  createSpeaker,
  getSpeakerById,
  UpdateSpeaker,
  DeleteSpeaker,
} from "../controllers/speakerController";

const router = Router();

router.get("/", getSpeakers);
router.post("/", createSpeaker);
router.get("/:id", getSpeakerById);
router.put("/:id", UpdateSpeaker);
router.delete("/:id", DeleteSpeaker);

export default router;
