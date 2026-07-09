import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TimelineVideoProps {
    src: string;
    poster: string | null;
    className?: string;
}

export default function TimelineVideo({ src, poster, className }: TimelineVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    void video.play();
                } else {
                    video.pause();
                }
            },
            { threshold: 0.4 },
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            poster={poster ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className={cn('block h-auto max-h-[50vh] w-auto max-w-[50vw] border border-ink/[0.08]', className)}
        />
    );
}
