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
        const v = videoRef.current;
        if (v.muted) {
            v.muted = false;
            setIsMuted(false);
            v.currentTime = 0;
            v.play();
        } else {
            v.muted = true;
            setIsMuted(true);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black overflow-hidden"
            onClick={toggleSound}
        >
            {/* MAGIC FIX: min() makes it letterbox instead of cropping */}
            <video
                ref={videoRef}
                src="/video/my-wedding-invitation.mp4"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
                loop
                playsInline
                preload="auto"
                style={{ objectFit: 'contain' }}
            />

            {/* Sound icon */}
            <div className="absolute top-safe-8 right-8 bg-white/20 backdrop-blur-lg p-4 rounded-full pointer-events-none z-10">
                {isMuted ? (
                    <VolumeX className="w-10 h-10 text-white" />
                ) : (
                    <Volume2 className="w-10 h-10 text-white animate-pulse" />
                )}
            </div>

            {/* Tap hint */}
            {isMuted && (
                <div className="absolute bottom-safe-16 left-1/2 -translate-x-1/2 bg-black/60 text-white px-8 py-4 rounded-full text-xl font-medium pointer-events-none animate-pulse">
                    Tap for music
                </div>
            )}

           
        </div>
    );
}