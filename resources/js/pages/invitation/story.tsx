import { Head } from '@inertiajs/react';
import ScrollView from '@/components/invitation/scroll-view';
import StorySection from '@/components/invitation/story-section';
import type { TimelineMilestone } from '@/types/invitation';

interface InvitationStoryProps {
    milestones: TimelineMilestone[];
}

export default function InvitationStory({ milestones }: InvitationStoryProps) {
    return (
        <>
            <Head title="Nuestra historia" />
            <ScrollView>
                <StorySection milestones={milestones} />
            </ScrollView>
        </>
    );
}
