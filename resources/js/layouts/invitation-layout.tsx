import BottomNav from '@/components/invitation/bottom-nav';
import TopNav from '@/components/invitation/top-nav';
import WhatsappGiftButton from '@/components/invitation/whatsapp-gift-button';

// Layout persistente de la invitación pública: las barras de navegación no se
// desmontan al cambiar de sección.
export default function InvitationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-dvh overflow-hidden bg-parchment font-body text-ink">
            {children}
            <WhatsappGiftButton variant="floating" />
            <BottomNav />
            <TopNav />
        </div>
    );
}
