import openai from "../config/openai";

export const analyzeVision = async (
    imageBuffer: Buffer
) => {
    // Convert the upload image into Base64
    const base64Image = imageBuffer.toString("base64");

    // Send the image to OpenAI Vision
    const response = await openai.responses.create({

        model: "gpt-4.1-mini",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: "Describe everything you see in this image"
                    },
                    {
                        type: "input_image",
                        image_url: `data:image/jpeg;base64,${base64Image}`,
                        detail: "auto"
                    }
                ]
            }
        ]
    });

    return {
        success: true,
        response: response.output_text
    };
};