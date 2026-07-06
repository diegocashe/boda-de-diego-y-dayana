import { useEffect, useRef, useState } from 'react';
import type { RsvpFormData } from '@/types/invitation';

const SIMULATED_SUBMIT_MS = 1300;

export interface RsvpForm {
    data: RsvpFormData;
    update: <K extends keyof RsvpFormData>(field: K, value: RsvpFormData[K]) => void;
    submit: () => void;
    canSubmit: boolean;
    submitting: boolean;
    submitted: boolean;
}

export function useRsvpForm(onSubmitted: () => void): RsvpForm {
    const [data, setData] = useState<RsvpFormData>({ attending: null, guests: 2, dietary: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const update: RsvpForm['update'] = (field, value) => setData((current) => ({ ...current, [field]: value }));

    const canSubmit = data.attending !== null && !submitting;

    const submit = () => {
        if (!canSubmit) {
            return;
        }

        // TODO: reemplazar la simulación por un POST de Inertia a route('rsvp.store') cuando exista el backend.
        setSubmitting(true);
        timer.current = setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            onSubmitted();
        }, SIMULATED_SUBMIT_MS);
    };

    return { data, update, submit, canSubmit, submitting, submitted };
}
