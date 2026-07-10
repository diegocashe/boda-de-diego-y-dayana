const YES_VIDEO_COUNT = 18;
const NO_VIDEO_COUNT = 9;

const YES_VIDEOS = Array.from({ length: YES_VIDEO_COUNT }, (_, index) => `/cr7/yes/cr7-yes-${String(index + 1).padStart(2, '0')}.webm`);
const NO_VIDEOS = Array.from({ length: NO_VIDEO_COUNT }, (_, index) => `/cr7/no/cr7-no-${String(index + 1).padStart(2, '0')}.webm`);

export function pickRandomCr7Video(attending: 'yes' | 'no'): string {
    const videos = attending === 'yes' ? YES_VIDEOS : NO_VIDEOS;

    return videos[Math.floor(Math.random() * videos.length)];
}
