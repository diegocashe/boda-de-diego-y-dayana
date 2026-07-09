import { Head, router } from '@inertiajs/react';
import { MailOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import RsvpSection from '@/components/invitation/rsvp-section';
import RsvpToast from '@/components/invitation/rsvp-toast';
import ScrollView from '@/components/invitation/scroll-view';
import SectionHeader from '@/components/invitation/section-header';
import { useRsvpForm } from '@/hooks/use-rsvp-form';
import { home } from '@/routes';
import type { GuestInvitation, WeddingDetails } from '@/types/invitation';

// Tiempo que el invitado ve la confirmación antes de volver al inicio.
const REDIRECT_AFTER_MS = 2800;

interface InvitationRsvpProps {
    guest: GuestInvitation | null;
    wedding: WeddingDetails;
}

export default function InvitationRsvp({ guest, wedding }: InvitationRsvpProps) {
    return (
        <>
            <Head title={guest ? `Invitación para ${guest.name}` : 'Asistencia'} />
            <ScrollView className="max-w-[1040px]">{guest ? <GuestRsvp guest={guest} wedding={wedding} /> : <MissingCodeNotice />}</ScrollView>
        </>
    );
}

function GuestRsvp({ guest, wedding }: { guest: GuestInvitation; wedding: WeddingDetails }) {
    const [toastVisible, setToastVisible] = useState(false);
    const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const rsvpForm = useRsvpForm(guest, () => {
        setToastVisible(true);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => router.visit(home()), REDIRECT_AFTER_MS);
    });

    return (
        <>
            {toastVisible && <RsvpToast />}
            <RsvpSection guest={guest} wedding={wedding} form={rsvpForm} />
        </>
    );
}

function MissingCodeNotice() {
    return (
        <>
            <SectionHeader eyebrow="Confirma tu asistencia" title="Enlace personal requerido" className="mb-[clamp(26px,4vw,46px)]" />
            <div className="mx-auto max-w-[460px] rounded-[18px] border border-ink/[0.12] bg-white px-6 py-9 text-center">
                <MailOpen className="mx-auto mb-4 size-9 text-wine" strokeWidth={1.6} />
                <p className="font-serif text-[21px] leading-snug text-ink">Esta sección es personal</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    Para confirmar tu asistencia, abre el enlace que te enviamos por correo: contiene tu código de invitado y tus pases reservados.
                </p>
            </div>
        </>
    );
}
