import { useState, useRef } from "react";

function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement>(null);

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
                </div>    
            </section>
        )

    }

export default CameraCapture;