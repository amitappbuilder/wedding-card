'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 flex flex-col items-center justify-center p-4">
            <div
                className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                onClick={toggleSound}
                style={{ aspectRatio: '9/16', maxHeight: '92vh' }}   // ← NEW
            >
                <video
                    ref={videoRef}
                    src="/video/my-wedding-invitation.mp4"
                    className="w-full h-full"
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        aspectRatio: '9/16',
                        objectFit: 'cover',        // This removes black bars completely
                        maxHeight: '88vh',
                    }}
                />

                {/* Floating sound indicator */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-4 rounded-full shadow-xl pointer-events-none">
                    {isMuted ? (
                        <VolumeX className="w-8 h-8 text-pink-600" />
                    ) : (
                        <Volume2 className="w-8 h-8 text-pink-600 animate-pulse" />
                    )}
                </div>

                {/* Tap hint when muted */}
                {isMuted && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-lg pointer-events-none animate-pulse">
                        Tap for music
                    </div>
                )}
            </div>

            {/* Text below – unchanged */}
            <div className="mt-10 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-2">
                    Sakshum & Akanksha
                </h1>
                <p className="text-3xl text-purple-700 font-medium mb-6">
                    are getting married!
                </p>
                <div className="space-y-3 text-lg text-gray-700">
                    <p>17th April 2025</p>
                    <p>9:00 AM onwards</p>
                    <p>Brooklake Country Club, NJ</p>
                    <p>...</p>
                    <p>Reception</p>
                    <p>18th April 2025</p>
                    <p>Cocktail hour 7:00 PM onwards</p>
                    <p>The Merion, NJ</p>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                    {Array.from({ length: 9 }, (_, i) => (
                        <Heart
                            key={i}
                            className="w-9 h-9 text-pink-500 fill-pink-500 animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}