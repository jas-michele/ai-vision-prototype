import { Router } from "express";
import { analyzeImage } from "../controllers/visionController";

const router = Router();

router.post("/", analyzeImage);

export default router;