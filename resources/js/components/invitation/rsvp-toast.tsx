import { Check } from 'lucide-react';

export default function RsvpToast() {
    return (
        <div className="fixed top-5 right-0 left-0 z-[80] mx-auto w-[calc(100%-32px)] max-w-[390px] animate-in duration-300 fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3 rounded-2xl bg-cocoa px-4 py-3.5 text-cream shadow-[0_20px_44px_-14px_rgba(0,0,0,0.5)]">
                <span className="grid size-[26px] flex-none place-items-center rounded-full bg-cream/15">
                    <Check className="size-[15px]" strokeWidth={2.4} />
                </span>
                <div className="leading-snug">
                    <div className="text-sm font-bold">¡Confirmación enviada!</div>
                    <div className="text-[12.5px] opacity-80">Gracias por acompañarnos en este día.</div>
                </div>
            </div>
        </div>
    );
}
