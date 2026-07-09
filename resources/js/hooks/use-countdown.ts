import { useEffect, useState } from 'react';

export interface CountdownParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MINUTE_MS = 60_000;

function partsUntil(target: number): CountdownParts {
    let diff = Math.max(0, target - Date.now());

    const days = Math.floor(diff / DAY_MS);
    diff -= days * DAY_MS;
    const hours = Math.floor(diff / HOUR_MS);
    diff -= hours * HOUR_MS;
    const minutes = Math.floor(diff / MINUTE_MS);
    diff -= minutes * MINUTE_MS;

    return { days, hours, minutes, seconds: Math.floor(diff / 1000) };
}

export function useCountdown(targetDate: string): CountdownParts {
    const target = new Date(targetDate).getTime();
    const [parts, setParts] = useState(() => partsUntil(target));

    useEffect(() => {
        const timer = setInterval(() => setParts(partsUntil(target)), 1000);

        return () => clearInterval(timer);
    }, [target]);

    return parts;
}
