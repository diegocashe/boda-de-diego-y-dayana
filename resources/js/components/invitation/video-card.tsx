import { Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import type { WeddingDetails } from '@/types/invitation';
import placeholderVideoUrl from '../../../assets/video-placeholder.webm';
import videoPosterUrl from '../../../assets/upscalemedia-transformed-2.webp';

interface VideoCardProps {
    videoUrl: string | null;
    wedding: WeddingDetails;
}

export default function VideoCard({ videoUrl }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const resolvedVideoUrl = videoUrl ?? placeholderVideoUrl;

    const toggleVideo = () => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        if (video.paused) {
            void video.play().catch(() => setPlaying(false));
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
        }
    };

    return (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-[#1b1210] shadow-[0_26px_54px_-30px_rgba(0,0,0,0.6)]">
            <video
                ref={videoRef}
                src={resolvedVideoUrl}
                poster={videoPosterUrl}
                playsInline
                loop
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute top-0 right-0 left-0 h-[34%] bg-gradient-to-b from-[#140d0b]/70 to-transparent" />
            {/* <div className="absolute top-4 right-[18px] left-[18px] z-[2]">
                <div className="text-[10px] font-semibold tracking-[0.32em] text-cream/72 uppercase">Un mensaje para ti</div>
                <div className="mt-0.5 font-serif text-[26px] font-semibold text-cream">
                    {wedding.groomName} &amp; {wedding.brideName}
                </div>
            </div> */}
            <button
                type="button"
                onClick={toggleVideo}
                aria-label={playing ? 'Pausar video' : 'Reproducir video'}
                className="absolute right-[18px] bottom-[18px] z-[2] grid size-[54px] cursor-pointer place-items-center rounded-full bg-cream/95 text-cocoa shadow-[0_10px_26px_-8px_rgba(0,0,0,0.6)]"
            >
                {playing ? <Pause className="size-5 fill-current" strokeWidth={0} /> : <Play className="size-[22px] fill-current" strokeWidth={0} />}
            </button>
        </div>
    );
}
