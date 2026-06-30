import { Request, Response } from "express";
import { analyzeVision } from "../services/visionService";


export const analyzeImage = async (
    req: Request,
    res: Response
) => {

  console.log(req.file);
  
  const result = await analyzeVision();

    res.status(200).json(result);
};