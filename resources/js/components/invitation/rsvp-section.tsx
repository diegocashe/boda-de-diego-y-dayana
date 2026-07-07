import { Check, ChevronDown, CircleCheckBig, LoaderCircle, Lock, Users, X } from 'lucide-react';
import SectionHeader from '@/components/invitation/section-header';
import VideoCard from '@/components/invitation/video-card';
import WineButton from '@/components/invitation/wine-button';
import type { RsvpForm } from '@/hooks/use-rsvp-form';
import { cn } from '@/lib/utils';
import type { GuestInvitation, WeddingDetails } from '@/types/invitation';

interface RsvpSectionProps {
    guest: GuestInvitation;
    wedding: WeddingDetails;
    form: RsvpForm;
}

const fieldClass = 'w-full rounded-[13px] border border-ink/[0.18] bg-white px-[15px] py-[13px] text-sm leading-normal text-ink outline-none';
const labelClass = 'mb-[9px] block text-[13px] font-bold text-ink';
const segmentClass =
    'flex cursor-pointer items-center justify-center gap-[7px] rounded-[13px] border px-2 py-3.5 text-sm font-bold transition-all duration-200';

export default function RsvpSection({ guest, wedding, form }: RsvpSectionProps) {
    return (
        <>
            <SectionHeader eyebrow="Confirma tu asistencia" title="R.S.V.P." className="mb-[clamp(26px,4vw,46px)]" />

            <div className="grid grid-cols-1 gap-[22px] desk:grid-cols-2 desk:items-start desk:gap-[38px]">
                <div>
                    <VideoCard videoUrl={guest.videoUrl} wedding={wedding} />
                    <p className="mx-1 mt-3.5 text-center font-serif text-[17px] leading-[1.55] text-ink-soft italic">{guest.videoMessage}</p>

                    <div className="mt-[18px] rounded-[18px] bg-gradient-to-br from-wine to-wine-deep px-5 py-[18px] text-cream">
                        <div className="text-xs tracking-[0.04em] opacity-80">Invitación reservada para</div>
                        <div className="mt-0.5 mb-2 font-serif text-[27px] font-semibold">{guest.name}</div>
                        <div className="inline-flex items-center gap-[7px] rounded-[20px] bg-cream/15 px-[11px] py-[5px] text-[12.5px]">
                            <Users className="size-3.5" strokeWidth={2} />
                            {guest.maxPasses} lugares disponibles
                        </div>
                    </div>
                </div>

                <RsvpFormFields guest={guest} form={form} />
            </div>
        </>
    );
}

function RsvpFormFields({ guest, form }: Pick<RsvpSectionProps, 'guest' | 'form'>) {
    const { data, update, submit, canSubmit, submitting, submitted } = form;
    const guestOptions = Array.from({ length: guest.maxPasses }, (_, index) => index + 1);
    const locked = guest.locked;

    return (
        <div>
            {locked ? (
                <div className="mb-5 flex items-start gap-2.5 rounded-[14px] border border-[#e3c4c9] bg-[#f7eced] px-[15px] py-[13px]">
                    <Lock className="mt-px size-[18px] flex-none text-wine" strokeWidth={2.2} />
                    <div className="text-[13px] leading-normal text-[#6e1c27]">
                        Tu respuesta quedó confirmada y ya no puede modificarse. Si necesitas cambiarla, contáctanos directamente.
                    </div>
                </div>
            ) : (
                submitted && (
                    <div className="mb-5 flex items-start gap-2.5 rounded-[14px] border border-[#e3c4c9] bg-[#f7eced] px-[15px] py-[13px]">
                        <CircleCheckBig className="mt-px size-[18px] flex-none text-wine" strokeWidth={2.2} />
                        <div className="text-[13px] leading-normal text-[#6e1c27]">
                            Tu respuesta quedó registrada. Puedes actualizarla cuando quieras antes del evento.
                        </div>
                    </div>
                )
            )}

            <div className="mb-[18px]">
                <label className={labelClass}>¿Nos acompañarás?</label>
                <div className="grid grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        onClick={() => update('attending', 'yes')}
                        disabled={locked}
                        className={cn(
                            segmentClass,
                            data.attending === 'yes'
                                ? 'border-wine-deep bg-wine-deep text-cream shadow-[0_12px_24px_-14px_var(--color-wine-deep)]'
                                : 'border-ink/[0.18] bg-white text-ink',
                        )}
                    >
                        <Check className="size-4" strokeWidth={2.2} />
                        ¡Sí, asistiré!
                    </button>
                    <button
                        type="button"
                        onClick={() => update('attending', 'no')}
                        disabled={locked}
                        className={cn(
                            segmentClass,
                            data.attending === 'no' ? 'border-[#8a8272] bg-[#8a8272] text-cream' : 'border-ink/[0.18] bg-white text-ink',
                        )}
                    >
                        <X className="size-4" strokeWidth={2.2} />
                        No podré
                    </button>
                </div>
            </div>

            {data.attending === 'yes' && (
                <>
                    <div className="mb-[18px]">
                        <label className={labelClass}>
                            ¿Cuántos asistirán? <span className="font-normal text-ink-faint">(incluyéndote)</span>
                        </label>
                        <div className="relative">
                            <select
                                value={data.guests}
                                onChange={(event) => update('guests', Number(event.target.value))}
                                disabled={locked}
                                className={cn(fieldClass, 'cursor-pointer appearance-none pr-11 text-[14.5px]')}
                            >
                                {guestOptions.map((count) => (
                                    <option key={count} value={count}>
                                        {count} {count === 1 ? 'persona' : 'personas'}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-[15px] size-[18px] -translate-y-1/2 text-ink-faint" />
                        </div>
                    </div>

                    <div className="mb-[18px]">
                        <label className={labelClass}>Restricciones alimentarias o alergias</label>
                        <textarea
                            value={data.dietary}
                            onChange={(event) => update('dietary', event.target.value)}
                            rows={2}
                            maxLength={500}
                            disabled={locked}
                            placeholder="Ej. vegetariano, sin gluten, alergia a nueces…"
                            className={cn(fieldClass, 'resize-none')}
                        />
                    </div>
                </>
            )}

            <div className="mb-[22px]">
                <label className={labelClass}>
                    Un mensaje para los novios <span className="font-normal text-ink-faint">(opcional)</span>
                </label>
                <textarea
                    value={data.message}
                    onChange={(event) => update('message', event.target.value)}
                    rows={3}
                    maxLength={1000}
                    disabled={locked}
                    placeholder="Escríbeles unas palabras…"
                    className={cn(fieldClass, 'resize-none')}
                />
            </div>

            <WineButton onClick={submit} disabled={!canSubmit} className="hover:translate-y-0">
                {submitting ? (
                    <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Enviando…
                    </>
                ) : submitted ? (
                    'Actualizar respuesta'
                ) : (
                    'Enviar confirmación'
                )}
            </WineButton>
        </div>
    );
}
