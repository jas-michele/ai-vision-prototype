import { Request, Response } from "express";

export const analyzeImage = (
    req: Request,
    res: Response
) => {

    console.log("Reached Vision Controller");

    res.status(200).json({
        success: true,
        message: "Controller working!"
    });
};