import { TOTAL_FRAMES, FRAMES_PER_SCENE } from '../config/sections';

export type FrameNamingScheme =
  | 'global-5digit' // /frames/00001.jpg
  | 'scene-folder'  // /frames/scene-01/001.png
  | 'legacy-3d-bg'; // /images/3d-bg/00001.jpg

export class FrameController {
  private frameCache: Map<number, HTMLImageElement> = new Map();
  private loading: Set<number> = new Set();
  private totalFrames: number;
  private basePath: string;
  private extension: string;
  private scheme: FrameNamingScheme;
  private isAvailable: boolean | null = null;
  private probePromise: Promise<boolean> | null = null;

  constructor(
    totalFrames: number = TOTAL_FRAMES,
    basePath = '/frames/',
    extension = 'webp',
    scheme: FrameNamingScheme = 'scene-folder'
  ) {
    this.totalFrames = totalFrames;
    this.basePath = basePath;
    this.extension = extension;
    this.scheme = scheme;
  }

  public getFrameUrl(index: number): string {
    const clampedIndex = Math.max(1, Math.min(index, this.totalFrames));

    if (this.scheme === 'scene-folder') {
      const sceneNumber = Math.min(12, Math.floor((clampedIndex - 1) / FRAMES_PER_SCENE) + 1);
      const frameInScene = ((clampedIndex - 1) % FRAMES_PER_SCENE) + 1;
      const paddedScene = String(sceneNumber).padStart(2, '0');
      const paddedFrame = String(frameInScene).padStart(3, '0');
      return `${this.basePath}scene-${paddedScene}/${paddedFrame}.${this.extension}`;
    }

    const paddedIndex = String(clampedIndex).padStart(5, '0');
    return `${this.basePath}${paddedIndex}.${this.extension}`;
  }

  /**
   * Automatically probes whether frame sequence assets have been placed in `/public/frames/`
   * or `/public/images/3d-bg/`. If found, switches the canvas to render the image sequence.
   */
  public async probeAvailability(): Promise<boolean> {
    if (this.isAvailable !== null) return this.isAvailable;
    if (this.probePromise) return this.probePromise;

    const candidates: Array<{
      basePath: string;
      extension: string;
      scheme: FrameNamingScheme;
    }> = [
      { basePath: '/frames/', extension: 'webp', scheme: 'scene-folder' },
      { basePath: '/frames/', extension: 'png', scheme: 'scene-folder' },
      { basePath: '/frames/', extension: 'jpg', scheme: 'scene-folder' },
      { basePath: '/frames/', extension: 'webp', scheme: 'global-5digit' },
      { basePath: '/frames/', extension: 'jpg', scheme: 'global-5digit' },
      { basePath: '/frames/', extension: 'png', scheme: 'global-5digit' },
      { basePath: '/images/3d-bg/', extension: 'jpg', scheme: 'legacy-3d-bg' },
    ];

    this.probePromise = (async () => {
      for (const candidate of candidates) {
        this.basePath = candidate.basePath;
        this.extension = candidate.extension;
        this.scheme = candidate.scheme;
        const firstUrl = this.getFrameUrl(1);

        try {
          const response = await fetch(firstUrl, { method: 'HEAD' });
          const contentType = response.headers.get('content-type') || '';
          if (response.ok && contentType.startsWith('image/')) {
            this.isAvailable = true;
            this.preloadFrames(1, 16);
            return true;
          }
        } catch {
          // Ignore and try next candidate
        }
      }

      this.isAvailable = false;
      return false;
    })();

    return this.probePromise;
  }

  public hasFrames(): boolean {
    return this.isAvailable === true;
  }

  public preloadFrames(startIndex: number, radius: number = 12) {
    if (this.isAvailable === false) return;
    for (
      let i = Math.max(1, startIndex - radius);
      i <= Math.min(this.totalFrames, startIndex + radius);
      i++
    ) {
      void this.loadFrame(i);
    }
  }

  public async loadFrame(index: number): Promise<HTMLImageElement | null> {
    if (this.isAvailable === false) return null;

    if (this.frameCache.has(index)) {
      return this.frameCache.get(index)!;
    }

    if (this.loading.has(index)) {
      return null;
    }

    this.loading.add(index);

    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        this.frameCache.set(index, img);
        this.loading.delete(index);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(index);
        resolve(null);
      };
      img.src = this.getFrameUrl(index);
    });
  }

  public getFrame(index: number): HTMLImageElement | null {
    return this.frameCache.get(index) || null;
  }

  public getClosestLoadedFrame(index: number): HTMLImageElement | null {
    if (this.frameCache.has(index)) return this.frameCache.get(index)!;

    for (let offset = 1; offset < 25; offset++) {
      if (this.frameCache.has(index - offset)) return this.frameCache.get(index - offset)!;
      if (this.frameCache.has(index + offset)) return this.frameCache.get(index + offset)!;
    }

    return null;
  }
}

export const frameController = new FrameController(TOTAL_FRAMES);
