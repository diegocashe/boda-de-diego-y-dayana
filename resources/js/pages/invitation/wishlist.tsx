import { Head } from '@inertiajs/react';
import ScrollView from '@/components/invitation/scroll-view';
import WishlistSection from '@/components/invitation/wishlist-section';
import type { WishlistItem } from '@/types/invitation';

interface InvitationWishlistProps {
    items: WishlistItem[];
}

export default function InvitationWishlist({ items }: InvitationWishlistProps) {
    return (
        <>
            <Head title="Lista de deseos" />
            <ScrollView>
                <WishlistSection items={items} />
            </ScrollView>
        </>
    );
}
