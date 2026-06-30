import { Request, Response } from "express";
import { analyzeVision } from "../services/visionService";


export const analyzeImage = async (
    req: Request,
    res: Response
) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image uploaded."
        })
    }

  const result = await analyzeVision(req.file.buffer);

    res.status(200).json(result);
};