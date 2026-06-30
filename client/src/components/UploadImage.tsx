import { useState } from 'react';
import { analyzeImage } from '../api/visionApi';
import AnalysisCard from './AnalysisCard';

function UploadImage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = ( 
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResult("");
        setError("");
    };

    const handleAnalyzeImage = async () => {
        if (!selectedImage) {
            setError("Please upload an image first.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const aiResponse = await analyzeImage(selectedImage);

            setResult(aiResponse);
        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='card'>
            <h1>AI Vision Prototype</h1>

            <p className='subtitle'>
                Upload an image and let AI describe what it sees.
            </p>

            <input 
                type='file'
                accept='image/*'
                onChange={handleImageChange}
            />

            {previewUrl && (
                <div className='preview-section'>
                    <img
                        src={previewUrl}
                        alt='Preview'
                    />    
                </div>
            )}  

            <button
                onClick={handleAnalyzeImage}  
                disabled={loading}
            >
                {loading ? "Analyzing..." : "Analyze Image"}
            </button>    

            {error && <p className='error'>{error}</p>}

            <AnalysisCard result={result} />
        </section>
    );
}

export default UploadImage;