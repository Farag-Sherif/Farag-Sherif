export interface CinematicSceneConfig {
  index: number;
  id: string;
  code: string;
  title: string;
  arabicHint?: string;
  sectionId: string;
  timeRange: string;
  startProgress: number;
  endProgress: number;
  startFrame: number;
  endFrame: number;
  /** 1 to 5 stars from the Visual Intensity Curve */
  intensityStars: 1 | 2 | 3 | 4 | 5;
  /** Normalized 0..1 visual intensity multiplier (controls brightness, motion speed & backdrop clarity) */
  intensity: number;
  primaryColor: string;
  secondaryColor: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  prompt: string;
}

export const FRAMES_PER_SCENE = 60; // 12 scenes × 60 = 720 frames total (adjustable if 24fps × 8s = 192 per scene)
export const TOTAL_FRAMES = FRAMES_PER_SCENE * 12;

export const CINEMATIC_SCENES: CinematicSceneConfig[] = [
  {
    index: 1,
    id: 'digital-awakening',
    code: '01',
    title: 'DIGITAL AWAKENING',
    sectionId: 'home',
    timeRange: '0:00 → 0:08',
    startProgress: 0,
    endProgress: 1 / 12,
    startFrame: 1,
    endFrame: 60,
    intensityStars: 4,
    intensity: 0.82,
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    cameraPosition: [0, 0.4, 14],
    cameraTarget: [0, 0, 0],
    prompt:
      "A cinematic futuristic digital environment representing the beginning of a frontend developer's journey. Start in a nearly black, elegant technological space with subtle deep blue atmospheric light. Slowly reveal a sophisticated three-dimensional digital architecture emerging from darkness: thin luminous lines, transparent glass surfaces, subtle geometric structures, tiny streams of data and abstract interface elements. The camera moves forward extremely slowly through the environment, creating a feeling of entering a digital world.",
  },
  {
    index: 2,
    id: 'code-becomes-interface',
    code: '02',
    title: 'CODE BECOMES INTERFACE',
    sectionId: 'about',
    timeRange: '0:08 → 0:16',
    startProgress: 1 / 12,
    endProgress: 2 / 12,
    startFrame: 61,
    endFrame: 120,
    intensityStars: 3,
    intensity: 0.6,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    cameraPosition: [1.8, 0.2, 4],
    cameraTarget: [0.5, 0, -8],
    prompt:
      'Continue seamlessly from the previous futuristic digital environment. The camera slowly travels through a three-dimensional structure made of elegant abstract programming patterns and organized digital lines. Fragments of code-like geometry subtly transform into clean interface structures: rectangular frames, cards, grids, buttons and responsive layout shapes, without readable text or recognizable application screens.',
  },
  {
    index: 3,
    id: 'component-system',
    code: '03',
    title: 'COMPONENT SYSTEM',
    sectionId: 'skills',
    timeRange: '0:16 → 0:24',
    startProgress: 2 / 12,
    endProgress: 3 / 12,
    startFrame: 121,
    endFrame: 180,
    intensityStars: 4,
    intensity: 0.82,
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    cameraPosition: [-1.6, 0.6, -6],
    cameraTarget: [-0.4, 0.2, -18],
    prompt:
      'Continue seamlessly from the previous scene. The camera moves through a sophisticated three-dimensional component system floating in space. Abstract UI components appear as modular glass panels, grids, cards, buttons, navigation structures and responsive layout blocks. The components intelligently connect and reorganize themselves into a larger coherent interface architecture.',
  },
  {
    index: 4,
    id: 'data-and-apis',
    code: '04',
    title: 'DATA & APIs',
    sectionId: 'skills',
    timeRange: '0:24 → 0:32',
    startProgress: 3 / 12,
    endProgress: 4 / 12,
    startFrame: 181,
    endFrame: 240,
    intensityStars: 3,
    intensity: 0.65,
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    cameraPosition: [1.4, -0.4, -16],
    cameraTarget: [0.2, -0.1, -28],
    prompt:
      'Transition naturally from the component architecture into a sophisticated digital data environment. The camera slowly travels through flowing streams of structured data moving between transparent nodes and abstract server-like structures. Thin luminous connections form an elegant network between different points.',
  },
  {
    index: 5,
    id: 'performance',
    code: '05',
    title: 'PERFORMANCE',
    sectionId: 'experience',
    timeRange: '0:32 → 0:40',
    startProgress: 4 / 12,
    endProgress: 5 / 12,
    startFrame: 241,
    endFrame: 300,
    intensityStars: 3,
    intensity: 0.65,
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    cameraPosition: [0, 0.2, -26],
    cameraTarget: [0, 0, -38],
    prompt:
      'Continue seamlessly through the digital network. The camera begins moving slightly faster through an extremely clean and optimized digital environment. Complex structures gradually simplify and become smoother, faster and more efficient. Abstract data streams accelerate while unnecessary visual elements disappear, leaving an elegant streamlined architecture.',
  },
  {
    index: 6,
    id: 'project-universe',
    code: '06',
    title: 'PROJECT UNIVERSE',
    sectionId: 'projects',
    timeRange: '0:40 → 0:48',
    startProgress: 5 / 12,
    endProgress: 6 / 12,
    startFrame: 301,
    endFrame: 360,
    intensityStars: 5,
    intensity: 0.96,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    cameraPosition: [-2.2, 0.8, -36],
    cameraTarget: [0, 0.2, -48],
    prompt:
      'Transition into a large cinematic digital universe containing several distinct floating environments. Each environment represents a different type of web project: a healthcare interface, a corporate website, an e-commerce environment, a dashboard and a modern interactive web application.',
  },
  {
    index: 7,
    id: 'creative-interaction',
    code: '07',
    title: 'CREATIVE INTERACTION',
    sectionId: 'projects',
    timeRange: '0:48 → 0:56',
    startProgress: 6 / 12,
    endProgress: 7 / 12,
    startFrame: 361,
    endFrame: 420,
    intensityStars: 5,
    intensity: 0.96,
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    cameraPosition: [2.0, -0.3, -46],
    cameraTarget: [0, 0, -58],
    prompt:
      'Continue from the project universe into a more artistic interactive digital environment. Large translucent geometric objects slowly rotate and transform while elegant interface structures respond to their movement. Create sophisticated 3D interactions between floating shapes, digital grids and responsive interface layers.',
  },
  {
    index: 8,
    id: 'experience-growth',
    code: '08',
    title: 'EXPERIENCE / GROWTH',
    sectionId: 'experience',
    timeRange: '0:56 → 1:04',
    startProgress: 7 / 12,
    endProgress: 8 / 12,
    startFrame: 421,
    endFrame: 480,
    intensityStars: 3,
    intensity: 0.6,
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    cameraPosition: [0, 2.2, -56],
    cameraTarget: [0, 3.5, -68],
    prompt:
      'Transition into a vertical ascending digital structure. The camera slowly moves upward through multiple architectural layers, each layer becoming more sophisticated than the previous one. Subtle traces of previous technologies and interface structures remain visible below while new layers appear above.',
  },
  {
    index: 9,
    id: 'developer-mindset',
    code: '09',
    title: 'DEVELOPER MINDSET',
    sectionId: 'achievements',
    timeRange: '1:04 → 1:12',
    startProgress: 8 / 12,
    endProgress: 9 / 12,
    startFrame: 481,
    endFrame: 540,
    intensityStars: 3,
    intensity: 0.6,
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    cameraPosition: [-1.2, 3.0, -66],
    cameraTarget: [0, 3.0, -78],
    prompt:
      "Create a cinematic abstract representation of a developer's problem-solving process. The camera enters a complex digital structure where multiple disconnected geometric systems initially appear. Slowly, the systems analyze, connect and reorganize themselves into one elegant coherent architecture.",
  },
  {
    index: 10,
    id: 'full-system',
    code: '10',
    title: 'FULL SYSTEM',
    sectionId: 'projects',
    timeRange: '1:12 → 1:20',
    startProgress: 9 / 12,
    endProgress: 10 / 12,
    startFrame: 541,
    endFrame: 600,
    intensityStars: 3,
    intensity: 0.58,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    cameraPosition: [0, 2.4, -76],
    cameraTarget: [0, 1.5, -88],
    prompt:
      'Seamlessly transition into a large-scale digital ecosystem. All visual elements from the previous scenes now appear connected as one sophisticated system: interface components, data networks, project structures, geometric architecture and flowing information. The camera slowly pulls backward, revealing the scale of the entire digital ecosystem.',
  },
  {
    index: 11,
    id: 'identity',
    code: '11',
    title: 'IDENTITY',
    sectionId: 'contact',
    timeRange: '1:20 → 1:28',
    startProgress: 10 / 12,
    endProgress: 11 / 12,
    startFrame: 601,
    endFrame: 660,
    intensityStars: 2,
    intensity: 0.42,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    cameraPosition: [0, 1.0, -86],
    cameraTarget: [0, 0.5, -98],
    prompt:
      "Continue from the complete digital ecosystem. The camera slowly moves toward the center of the environment where all digital structures converge into one elegant minimal focal point. The surrounding data streams become quieter and the environment becomes calmer, suggesting a developer's digital identity and personal brand.",
  },
  {
    index: 12,
    id: 'contact-ending',
    code: '12',
    title: 'CONTACT / COLLABORATION',
    sectionId: 'contact',
    timeRange: '1:28 → 1:36',
    startProgress: 11 / 12,
    endProgress: 12 / 12,
    startFrame: 661,
    endFrame: 720,
    intensityStars: 1,
    intensity: 0.28,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    cameraPosition: [0, 0.3, -96],
    cameraTarget: [0, 0.2, -108],
    prompt:
      'Create a calm cinematic ending that continues naturally from the previous scene. The camera slowly moves forward through a clean dark digital environment while subtle blue and violet light gradually becomes softer. End on a visually clean dark frame with subtle ambient motion so website content can remain clearly visible above it.',
  },
];

export const sectionFrames = [
  { id: 'home', startFrame: 1, endFrame: 60, label: 'Home', intensityStars: 4 },
  { id: 'about', startFrame: 61, endFrame: 120, label: 'About', intensityStars: 3 },
  { id: 'skills', startFrame: 121, endFrame: 240, label: 'Skills', intensityStars: 4 },
  { id: 'experience', startFrame: 241, endFrame: 360, label: 'Experience', intensityStars: 3 },
  { id: 'achievements', startFrame: 361, endFrame: 420, label: 'Architecture', intensityStars: 3 },
  { id: 'projects', startFrame: 421, endFrame: 600, label: 'Projects', intensityStars: 5 },
  { id: 'contact', startFrame: 601, endFrame: 720, label: 'Contact', intensityStars: 1 },
];

/**
 * Given normalized scroll progress (0..1), returns the active scene, local scene progress (0..1),
 * and smoothly interpolated visual intensity (0.25..1.0).
 */
export function getSceneStateAtProgress(progress: number) {
  const clamped = Math.max(0, Math.min(0.999999, progress));
  const exactIndex = clamped * CINEMATIC_SCENES.length;
  const sceneIdx = Math.floor(exactIndex);
  const localProgress = exactIndex - sceneIdx;

  const currentScene = CINEMATIC_SCENES[sceneIdx];
  const nextScene = CINEMATIC_SCENES[Math.min(sceneIdx + 1, CINEMATIC_SCENES.length - 1)];

  // Smooth step interpolation for intensity curve
  const smoothT = localProgress * localProgress * (3 - 2 * localProgress);
  const interpolatedIntensity =
    currentScene.intensity + (nextScene.intensity - currentScene.intensity) * smoothT;

  const targetFrame = Math.max(
    1,
    Math.min(TOTAL_FRAMES, Math.round(clamped * (TOTAL_FRAMES - 1)) + 1)
  );

  return {
    currentScene,
    nextScene,
    sceneIndex: sceneIdx,
    localProgress,
    smoothT,
    intensity: interpolatedIntensity,
    targetFrame,
  };
}
