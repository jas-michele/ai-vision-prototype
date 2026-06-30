import openai from "../config/openai";

export const analyzeVision = async () => {

    const response = await openai.responses.create({

        model: "gpt-4.1-mini",
        input: "Respond with exactly: OpenAI connection successful"
    });

    return {
        success: true,
        response: response.output_text
    };
};