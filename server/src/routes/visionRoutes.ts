import { Router } from "express";
import { analyzeImage } from "../controllers/visionController";
import upload from "../middleware/upload";

const router = Router();

router.post("/", 
    upload.single("image"),
    analyzeImage
);

export default router;