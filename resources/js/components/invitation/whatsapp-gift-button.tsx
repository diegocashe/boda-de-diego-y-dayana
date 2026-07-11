import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

const GIFT_WHATSAPP_NUMBER = '584143635330';
const GIFT_WHATSAPP_MESSAGE = 'Hola, gracias por invitarme a tu boda. Aquí necesitaré que me envíes tus datos bancarios para poder darte un regalo.';

export const GIFT_WHATSAPP_URL = `https://wa.me/${GIFT_WHATSAPP_NUMBER}?text=${encodeURIComponent(GIFT_WHATSAPP_MESSAGE)}`;

interface WhatsappGiftButtonProps {
    variant?: 'inline' | 'floating';
    className?: string;
}

// Botón global tipo WhatsApp: evita publicar datos bancarios/cédula en la
// página pública, dirigiendo al invitado a pedirlos por chat directo.
export default function WhatsappGiftButton({ variant = 'inline', className }: WhatsappGiftButtonProps) {
    return (
        <a
            href={GIFT_WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className={cn(
                'flex items-center justify-center gap-2.5 rounded-full bg-sage font-bold text-white shadow-[0_16px_30px_-14px_rgba(122,143,105,0.65)] transition hover:-translate-y-0.5',
                variant === 'inline'
                    ? 'w-full p-[15px] text-[14px]'
                    : 'fixed right-4 bottom-[calc(84px+env(safe-area-inset-bottom))] z-40 px-5 py-3.5 text-[13px] desk:right-6 desk:bottom-6',
                className,
            )}
        >
            <Gift className="size-[18px]" strokeWidth={2} />
            Quiero enviar un regalo
        </a>
    );
}
