import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import RsvpSection from '@/components/invitation/rsvp-section';
import RsvpToast from '@/components/invitation/rsvp-toast';
import ScrollView from '@/components/invitation/scroll-view';
import { useRsvpForm } from '@/hooks/use-rsvp-form';
import type { GuestInvitation, WeddingDetails } from '@/types/invitation';

const TOAST_VISIBLE_MS = 4200;

interface InvitationRsvpProps {
    guest: GuestInvitation;
    wedding: WeddingDetails;
}

export default function InvitationRsvp({ guest, wedding }: InvitationRsvpProps) {
    const [toastVisible, setToastVisible] = useState(false);
    const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const rsvpForm = useRsvpForm(() => {
        setToastVisible(true);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToastVisible(false), TOAST_VISIBLE_MS);
    });

    return (
        <>
            <Head title="Asistencia" />
            {toastVisible && <RsvpToast />}
            <ScrollView className="max-w-[1040px]">
                <RsvpSection guest={guest} wedding={wedding} form={rsvpForm} />
            </ScrollView>
        </>
    );
}
