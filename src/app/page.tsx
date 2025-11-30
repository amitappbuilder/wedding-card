'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function WeddingVideoCard() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
        }
    }, []);

    const toggleSound = () => {
        if (!videoRef.current) return;
        const video = videoRef.current;

        if (video.muted) {
            video.muted = false;
            setIsMuted(false);
            video.currentTime = 0;
            video.play();
        } else {
            video.muted = true;
            setIsMuted(true);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center"
            onClick={toggleSound}
        >
            {/* FULL-SCREEN VIDEO – NO CROPPING EVER */}
            <video
                ref={videoRef}
                src="/video/my-wedding-invitation.mp4"
                className="w-full h-full object-cover"
                loop
                playsInline
                preload="auto"
            />

            {/* Sound icon – top right */}
            <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-lg p-4 rounded-full pointer-events-none z-10">
                {isMuted ? (
                    <VolumeX className="w-10 h-10 text-white" />
                ) : (
                    <Volume2 className="w-10 h-10 text-white animate-pulse" />
                )}
            </div>

            {/* Tap hint – only when muted */}
            {isMuted && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/60 text-white px-8 py-4 rounded-full text-xl font-medium pointer-events-none animate-pulse">
                    Tap anywhere for music
                </div>
            )}

            
        </div>
    );
}