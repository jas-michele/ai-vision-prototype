import axios from "axios";

const API_URL = "http://localhost:5001/api/vision";

export const analyzeImage = async (image: File): Promise<string> => {
    const formData = new FormData();

    formData.append("image", image);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.response;
    } catch (error) {
        console.error("Error analyzing image:", error)

    }
}