import { useState, useEffect, useRef, useCallback } from 'react';
import { discoverFrameCount } from './frameLoader';
import type { FrameConfig } from './frameLoader';

export interface FrameState {
    images: HTMLImageElement[];
    loadedFrames: Set<number>;
    totalFrames: number;
    isReady: boolean;
    progress: number; // 0 to 1 representing total loading progress
}

export const useFrameSequence = (
    framesPath: string,
    preloadCount: number = 10,
    padLength: number = 5,
    extension: string = 'jpg'
) => {
    const [config, setConfig] = useState<FrameConfig | null>(null);
    const [state, setState] = useState<FrameState>({
        images: [],
        loadedFrames: new Set(),
        totalFrames: 0,
        isReady: false,
        progress: 0
    });

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedSetRef = useRef<Set<number>>(new Set());
    const loadingSetRef = useRef<Set<number>>(new Set());

    // 1. Discover the number of frames
    useEffect(() => {
        let isMounted = true;
        discoverFrameCount(framesPath, padLength, extension).then((cfg) => {
            if (!isMounted) return;
            setConfig(cfg);
        });
        return () => {
            isMounted = false;
        };
    }, [framesPath, padLength, extension]);

    // 2. Load images intelligently
    const loadFrame = useCallback((index: number, cfg: FrameConfig): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            if (loadedSetRef.current.has(index)) {
                resolve(imagesRef.current[index]);
                return;
            }
            if (loadingSetRef.current.has(index)) {
                // Already loading, wait for it
                let elapsed = 0;
                const checkInterval = setInterval(() => {
                    elapsed += 50;
                    if (loadedSetRef.current.has(index)) {
                        clearInterval(checkInterval);
                        resolve(imagesRef.current[index]);
                    } else if (elapsed > 10000) { // 10s timeout
                        clearInterval(checkInterval);
                        reject(new Error(`Timeout loading frame ${index}`));
                    }
                }, 50);
                return;
            }

            loadingSetRef.current.add(index);
            const img = new Image();
            img.src = cfg.urlPattern(index + 1); // 1-indexed files

            img.onload = () => {
                imagesRef.current[index] = img;
                loadedSetRef.current.add(index);
                loadingSetRef.current.delete(index);
                
                setState(prev => ({
                    ...prev,
                    images: [...imagesRef.current],
                    loadedFrames: new Set(loadedSetRef.current),
                    progress: loadedSetRef.current.size / cfg.totalFrames
                }));
                
                resolve(img);
            };

            img.onerror = reject;
        });
    }, []);

    useEffect(() => {
        if (!config) return;

        let isCancelled = false;
        
        setState(prev => ({
            ...prev,
            totalFrames: config.totalFrames,
            images: new Array(config.totalFrames).fill(undefined)
        }));
        
        imagesRef.current = new Array(config.totalFrames);
        loadedSetRef.current = new Set();
        loadingSetRef.current = new Set();

        const loadSequence = async () => {
            // Phase 1: Load first frame immediately to show something
            await loadFrame(0, config);
            if (isCancelled) return;
            
            setState(prev => ({ ...prev, isReady: true }));

            // Phase 2: Preload initial batch
            const initialBatchSize = Math.min(preloadCount, config.totalFrames);
            const batchPromises = [];
            for (let i = 1; i < initialBatchSize; i++) {
                batchPromises.push(loadFrame(i, config));
            }
            await Promise.all(batchPromises);

            // Phase 3: Progressive background loading
            for (let i = initialBatchSize; i < config.totalFrames; i++) {
                if (isCancelled) return;
                await loadFrame(i, config);
            }
        };

        loadSequence();

        return () => {
            isCancelled = true;
        };
    }, [config, preloadCount, loadFrame]);

    // Expose a method to load a specific frame on demand (if user scrolls fast)
    const demandFrame = useCallback((index: number) => {
        if (!config || loadedSetRef.current.has(index) || loadingSetRef.current.has(index)) return;
        loadFrame(index, config);
    }, [config, loadFrame]);

    return {
        ...state,
        demandFrame,
        config
    };
};
