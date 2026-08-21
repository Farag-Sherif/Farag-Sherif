import React, { useRef, useEffect, useState } from 'react';
import { useFrameSequence } from './useFrameSequence';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollFrameAnimationProps {
    framesPath: string;
    scrollHeight?: string;
    preloadCount?: number;
    padLength?: number;
    extension?: string;
    globalBackground?: boolean;
}

const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
};

export default function ScrollFrameAnimation({
    framesPath,
    scrollHeight = '700vh',
    preloadCount = 30,
    padLength = 5,
    extension = 'jpg',
    globalBackground = false
}: ScrollFrameAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const shouldReduceMotion = useReducedMotion();

    const { isReady, totalFrames, images, progress, demandFrame } = useFrameSequence(
        framesPath, preloadCount, padLength, extension
    );

    // Track scroll progress using framer-motion which is highly optimized
    const scrollConfig = globalBackground ? {} : {
        target: containerRef,
        offset: ["start start", "end end"] as any
    };
    const { scrollYProgress } = useScroll(scrollConfig);

    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            if (totalFrames > 0) {
                targetFrameRef.current = latest * (totalFrames - 1);
            }
        });
    }, [scrollYProgress, totalFrames]);

    useEffect(() => {
        if (!isReady || totalFrames === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const render = () => {
            if (shouldReduceMotion) {
                // When reduced motion is enabled, we just show a representative static frame
                // Let's use the first frame or middle frame. We'll just stick to frame 0 or target if we want.
                // Actually, let's just stick to the last frame of the initial sequence or frame 0.
                currentFrameRef.current = 0; 
            } else {
                // Lerp towards target frame for smooth playback
                currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.1);
            }
            
            const frameIndex = Math.round(currentFrameRef.current);
            const clampedIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
            
            const img = images[clampedIndex];

            if (img && img.complete && img.naturalWidth > 0) {
                // object-fit: cover implementation on canvas
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.naturalWidth / img.naturalHeight;
                
                let drawWidth = canvas.width;
                let drawHeight = canvas.height;
                let offsetX = 0;
                let offsetY = 0;

                if (canvasRatio > imgRatio) {
                    drawHeight = canvas.width / imgRatio;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            } else {
                // If not loaded, demand it (user scrolled too fast)
                demandFrame(clampedIndex);
            }

            if (!shouldReduceMotion) {
                animationFrameId.current = requestAnimationFrame(render);
            } else {
                // Only render once every so often or just let it be static.
                // We don't need a hot loop if motion is reduced, but we need it to render the first time.
                // Let's re-render at low fps or just once when image loads.
                // The easiest way is to continue the loop but it won't do much CPU work.
                animationFrameId.current = requestAnimationFrame(render);
            }
        };

        animationFrameId.current = requestAnimationFrame(render);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isReady, totalFrames, images, demandFrame]);

    // Handle Resize & DPI
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

        const effectiveScrollHeight = shouldReduceMotion ? '100vh' : scrollHeight;

    if (globalBackground) {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
                {!isReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-10">
                        <div className="text-sm tracking-[0.2em] font-light text-zinc-400 uppercase mb-4">
                            Loading cinematic environment...
                        </div>
                        <div className="w-48 h-[1px] bg-zinc-800">
                            <div 
                                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    </div>
                )}
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
            </div>
        );
    }

    return (
        <div ref={containerRef} style={{ height: effectiveScrollHeight }} className="relative w-full bg-black">
            <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
                {!isReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-10">
                        <div className="text-sm tracking-[0.2em] font-light text-zinc-400 uppercase mb-4">
                            Loading cinematic environment...
                        </div>
                        <div className="w-48 h-[1px] bg-zinc-800">
                            <div 
                                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    </div>
                )}
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
