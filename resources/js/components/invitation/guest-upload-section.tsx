import { Check, RotateCcw, UploadCloud, Video } from 'lucide-react';
import SectionHeader from '@/components/invitation/section-header';
import { useGuestUploads } from '@/hooks/use-guest-uploads';
import type { UploadItem } from '@/hooks/use-guest-uploads';

interface GuestUploadSectionProps {
    guestName: string;
    invitationCode: string;
}

export default function GuestUploadSection({ guestName, invitationCode }: GuestUploadSectionProps) {
    const { items, addFiles, retry } = useGuestUploads(invitationCode);

    const total = items.length;
    const successCount = items.filter((item) => item.status === 'success').length;
    const allDone = total > 0 && successCount === total;

    return (
        <>
            <SectionHeader eyebrow={guestName} title="Comparte tus fotos y videos" className="mb-[clamp(26px,4vw,46px)]" as="h1" />
            <p className="reveal mx-auto -mt-[clamp(16px,3vw,26px)] mb-[clamp(26px,4vw,46px)] max-w-[560px] text-center text-[14.5px] leading-relaxed text-ink-soft">
                ¿Capturaste un momento especial de la boda? Súbelo aquí desde tu celular; se guarda directamente con nosotros, sin necesidad de
                compartirlo en ningún otro lado.
            </p>

            <div className="mx-auto max-w-[560px]">
                <label className="reveal flex cursor-pointer flex-col items-center gap-3 rounded-[20px] border-2 border-dashed border-ink/20 bg-white px-6 py-10 text-center transition-colors duration-200 hover:border-wine/40">
                    <UploadCloud className="size-8 text-wine" strokeWidth={1.7} />
                    <span className="font-serif text-[19px] text-ink">Toca para elegir fotos o videos</span>
                    <span className="text-[13px] text-ink-faint">Puedes seleccionar varios a la vez</span>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={(event) => {
                            if (event.target.files && event.target.files.length > 0) {
                                addFiles(event.target.files);
                            }

                            event.target.value = '';
                        }}
                    />
                </label>

                {total > 0 && (
                    <div className="mt-6 flex flex-col gap-2.5">
                        {items.map((item) => (
                            <UploadRow key={item.id} item={item} onRetry={() => retry(item.id)} />
                        ))}
                    </div>
                )}

                {allDone && (
                    <p className="reveal mt-6 text-center text-sm font-semibold text-sage">
                        ¡Gracias! Guardamos {successCount} {successCount === 1 ? 'archivo' : 'archivos'}.
                    </p>
                )}
            </div>
        </>
    );
}

function UploadRow({ item, onRetry }: { item: UploadItem; onRetry: () => void }) {
    return (
        <div className="flex items-center gap-3 rounded-[14px] border border-ink/[0.08] bg-white p-2.5">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-parchment">
                {item.previewUrl ? (
                    <img src={item.previewUrl} alt={item.file.name} className="size-full object-cover" />
                ) : (
                    <Video className="size-5 text-ink-faint" strokeWidth={1.7} />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{item.file.name}</p>

                {item.status === 'uploading' && (
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-parchment">
                        <div className="h-full rounded-full bg-wine transition-all duration-200" style={{ width: `${item.progress}%` }} />
                    </div>
                )}

                {item.status === 'queued' && <p className="mt-0.5 text-[12px] text-ink-faint">En espera…</p>}
                {item.status === 'error' && <p className="mt-0.5 text-[12px] text-red-600">No se pudo subir.</p>}
            </div>

            <StatusIcon item={item} onRetry={onRetry} />
        </div>
    );
}

function StatusIcon({ item, onRetry }: { item: UploadItem; onRetry: () => void }) {
    if (item.status === 'success') {
        return (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sage-tint text-sage">
                <Check className="size-4" strokeWidth={2.4} />
            </span>
        );
    }

    if (item.status === 'error') {
        return (
            <button
                type="button"
                onClick={onRetry}
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-600"
                aria-label="Reintentar subida"
            >
                <RotateCcw className="size-4" strokeWidth={2.2} />
            </button>
        );
    }

    return <span className="shrink-0 text-[11px] font-bold text-ink-faint">{item.progress}%</span>;
}
