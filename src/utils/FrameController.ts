export class FrameController {
  private frameCache: Map<number, HTMLImageElement> = new Map();
  private loading: Set<number> = new Set();
  private totalFrames: number;
  private basePath: string;
  private extension: string;

  constructor(totalFrames: number, basePath = '/images/3d-bg/', extension = 'jpg') {
    this.totalFrames = totalFrames;
    this.basePath = basePath;
    this.extension = extension;
  }

  private getFrameUrl(index: number): string {
    // Ensure index is within bounds
    const clampedIndex = Math.max(1, Math.min(index, this.totalFrames));
    const paddedIndex = String(clampedIndex).padStart(5, '0');
    return `${this.basePath}${paddedIndex}.${this.extension}`;
  }

  public preloadFrames(startIndex: number, radius: number = 10) {
    for (let i = Math.max(1, startIndex - radius); i <= Math.min(this.totalFrames, startIndex + radius); i++) {
      this.loadFrame(i);
    }
  }

  public async loadFrame(index: number): Promise<HTMLImageElement | null> {
    if (this.frameCache.has(index)) {
      return this.frameCache.get(index)!;
    }

    if (this.loading.has(index)) {
      return null; // Already loading, avoid duplicate requests
    }

    this.loading.add(index);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.frameCache.set(index, img);
        this.loading.delete(index);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(index);
        resolve(null); // Return null on error, don't crash
      };
      img.src = this.getFrameUrl(index);
    });
  }

  public getFrame(index: number): HTMLImageElement | null {
    return this.frameCache.get(index) || null;
  }
  
  public getClosestLoadedFrame(index: number): HTMLImageElement | null {
    if (this.frameCache.has(index)) return this.frameCache.get(index)!;
    
    // Search nearby loaded frames
    for (let offset = 1; offset < 20; offset++) {
      if (this.frameCache.has(index - offset)) return this.frameCache.get(index - offset)!;
      if (this.frameCache.has(index + offset)) return this.frameCache.get(index + offset)!;
    }
    
    return null;
  }
}

// Singleton instance for global use
export const frameController = new FrameController(240);

