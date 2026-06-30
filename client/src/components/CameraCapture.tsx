import { useState, useRef } from "react";

function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stream, setStream] = useState<MediaStream | null>(null);

        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                setStream(mediaStream);

                if(videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error("Camera error:", error);
            }
        };

        const stopCamera = () => {
            stream?.getTracks().forEach((track) => track.stop());

            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }

            setStream(null);
        };

        const captureImage = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            if (!video || !canvas) return;

            const context = canvas.getContext("2d");

            if (!context) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            )

        };

        return (
            <section className="card">
                <h1>Live Camera</h1>

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    width="100%"
                />

                <canvas
                    ref={canvasRef}
                    style={{ display: "none" }}
                />    

                <div className="button-group">
                    <button
                        onClick={startCamera}
                        disabled={!!stream}
                    >
                        Start Camera
                    </button>    

                    <button
                        onClick={stopCamera}
                        disabled={!stream}
                    >
                        Stop Camera
                    </button>   

                    <button onClick={captureImage}>
                        Capture Image
                    </button> 
                </div>    
            </section>
        )

    }

export default CameraCapture;