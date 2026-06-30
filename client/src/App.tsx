import React, { useState } from 'react';
import { analyzeImage } from './api/visionApi';
import "./App.css"

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult("");
    setError("");
  };

  const handleAnalyzeImage= async () => {
    if (!selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      const aiResponse = await analyzeImage(selectedImage);
      setResult(aiResponse);
    } catch (error) {
      console.error(error);
      setError("Something went wrong analyzing the image.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <main className="app-container">
      <section className="card">
        <h1>AI Vision Prototype</h1>
        <p className="subtitle">
          Upload an image and let AI describe what it sees.
        </p>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {previewUrl && (
          <div className="preview-section">
            <h2>Image Preview</h2>
            <img src={previewUrl} alt="Selected preview" />
          </div>
        )}

        <button onClick={handleAnalyzeImage} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result-section">
            <h2>AI Response</h2>
            <p>{result}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
