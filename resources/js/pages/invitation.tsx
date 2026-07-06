import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import BottomNav from '@/components/invitation/bottom-nav';
import DetailsSection from '@/components/invitation/details-section';
import HomeSection from '@/components/invitation/home-section';
import RsvpSection from '@/components/invitation/rsvp-section';
import RsvpToast from '@/components/invitation/rsvp-toast';
import ScrollView from '@/components/invitation/scroll-view';
import StorySection from '@/components/invitation/story-section';
import TopNav from '@/components/invitation/top-nav';
import { useRsvpForm } from '@/hooks/use-rsvp-form';
import type { GuestInvitation, InvitationTab, WeddingDetails } from '@/types/invitation';

const TOAST_VISIBLE_MS = 4200;

interface InvitationProps {
    guest: GuestInvitation;
    wedding: WeddingDetails;
}

export default function Invitation({ guest, wedding }: InvitationProps) {
    const [tab, setTab] = useState<InvitationTab>('home');
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
            <Head title="Invitación" />
            <div className="relative h-dvh overflow-hidden bg-parchment font-body text-ink">
                {toastVisible && <RsvpToast />}

                {tab === 'home' && <HomeSection wedding={wedding} onConfirm={() => setTab('rsvp')} />}
                {tab === 'story' && (
                    <ScrollView>
                        <StorySection />
                    </ScrollView>
                )}
                {tab === 'rsvp' && (
                    <ScrollView className="max-w-[1040px]">
                        <RsvpSection guest={guest} wedding={wedding} form={rsvpForm} />
                    </ScrollView>
                )}
                {tab === 'details' && (
                    <ScrollView>
                        <DetailsSection />
                    </ScrollView>
                )}

                <BottomNav activeTab={tab} onNavigate={setTab} />
                <TopNav activeTab={tab} onNavigate={setTab} />
            </div>
        </>
    );
}
