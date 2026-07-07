import { router } from '@inertiajs/react';
import { useState } from 'react';
import InvitationController from '@/actions/App/Http/Controllers/InvitationController';
import type { GuestInvitation, RsvpFormData } from '@/types/invitation';

export interface RsvpForm {
    data: RsvpFormData;
    update: <K extends keyof RsvpFormData>(field: K, value: RsvpFormData[K]) => void;
    submit: () => void;
    canSubmit: boolean;
    submitting: boolean;
    submitted: boolean;
}

export function useRsvpForm(guest: GuestInvitation, onSubmitted: () => void): RsvpForm {
    const [data, setData] = useState<RsvpFormData>(guest.response ?? { attending: null, guests: 2, dietary: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(guest.response !== null);

    const update: RsvpForm['update'] = (field, value) => setData((current) => ({ ...current, [field]: value }));

    const canSubmit = data.attending !== null && !submitting && !guest.locked;

    const submit = () => {
        if (!canSubmit) {
            return;
        }

        router.post(
            InvitationController.rsvpStore.url(guest.code),
            { ...data },
            {
                preserveScroll: true,
                onStart: () => setSubmitting(true),
                onFinish: () => setSubmitting(false),
                onSuccess: () => {
                    setSubmitted(true);
                    onSubmitted();
                },
            },
        );
    };

    return { data, update, submit, canSubmit, submitting, submitted };
}
