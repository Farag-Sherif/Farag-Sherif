export type FrameConfig = {
    totalFrames: number;
    urlPattern: (index: number) => string;
};

/**
 * Checks if a URL resolves to a valid image.
 */
const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

/**
 * Automatically discovers the total number of frames using exponential search followed by binary search.
 */
export const discoverFrameCount = async (
    basePath: string,
    padLength = 5,
    extension = 'jpg'
): Promise<FrameConfig> => {
    const getUrl = (index: number) => {
        const padded = index.toString().padStart(padLength, '0');
        // Clean up double slashes just in case
        return `${basePath}/${padded}.${extension}`.replace(/([^:])\/\//g, '$1/');
    };

    let min = 1;
    let max = 1;
    
    // 1. Exponential search to find the upper bound
    while (true) {
        const exists = await checkImageExists(getUrl(max));
        if (exists) {
            min = max;
            max *= 2;
        } else {
            break;
        }
        
        // Safety cap
        if (max > 10000) break;
    }

    // 2. Binary search between min and max to find exact total frames
    let totalFrames = min;
    let left = min;
    let right = max - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const exists = await checkImageExists(getUrl(mid));
        
        if (exists) {
            totalFrames = mid; // This is a valid frame, maybe there are more
            left = mid + 1;
        } else {
            right = mid - 1; // Overshot, frame doesn't exist
        }
    }

    return {
        totalFrames,
        urlPattern: getUrl
    };
};
