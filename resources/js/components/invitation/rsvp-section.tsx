import { Check, ChevronDown, CircleCheckBig, LoaderCircle, Lock, Users, Video, X } from 'lucide-react';
import RsvpReactionVideo from '@/components/invitation/rsvp-reaction-video';
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
            <SectionHeader eyebrow="" title="Confirma tu asistencia" className="mb-[clamp(26px,4vw,46px)]" />

            <div className="grid grid-cols-1 gap-[22px] desk:grid-cols-2 desk:items-start desk:gap-[38px]">
                <div>
                    <div className="mb-[18px] rounded-[18px] bg-gradient-to-br from-wine to-wine-deep px-5 py-[18px] text-cream">
                        <div className="text-xs tracking-[0.04em] opacity-80">Invitación reservada para</div>
                        <div className="mt-0.5 mb-2 font-serif text-[27px] font-semibold">{guest.name}</div>
                        <div className="flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-[7px] rounded-[20px] bg-cream/15 px-[11px] py-[5px] text-[12.5px]">
                                <Users className="size-3.5" strokeWidth={2} />
                                {guest.maxPasses} lugares disponibles
                            </div>
                            {guest.mode === 'online' && (
                                <div className="inline-flex items-center gap-[7px] rounded-[20px] bg-cream/15 px-[11px] py-[5px] text-[12.5px]">
                                    <Video className="size-3.5" strokeWidth={2} />
                                    Invitación virtual
                                </div>
                            )}
                        </div>
                    </div>
                    <VideoCard videoUrl={guest.videoUrl} wedding={wedding} />
                </div>

                <RsvpFormFields guest={guest} form={form} />
            </div>
        </>
    );
}

function RsvpFormFields({ guest, form }: Pick<RsvpSectionProps, 'guest' | 'form'>) {
    const { data, update, submit, canSubmit, submitting, submitted, errors } = form;
    const guestOptions = Array.from({ length: guest.maxPasses }, (_, index) => index + 1);
    const locked = guest.locked;
    const errorMessages = Object.values(errors);

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
                <label className={labelClass}>{guest.mode === 'online' ? '¿Te unirás de manera virtual?' : '¿Nos acompañarás?'}</label>
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
                        ¡Sí, ahí estaré!
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

            <RsvpReactionVideo attending={data.attending} />

            {data.attending === 'yes' && guest.mode === 'online' && (
                <div className="mb-[18px] flex items-start gap-2.5 rounded-[14px] border border-ink/[0.12] bg-[#f7f4ee] px-[15px] py-[13px]">
                    <Video className="mt-px size-[18px] flex-none text-wine" strokeWidth={2.2} />
                    <div className="text-[13px] leading-normal text-ink">
                        {guest.meetingUrl ? (
                            <>
                                Te esperamos en la videollamada.{' '}
                                <a href={guest.meetingUrl} target="_blank" rel="noreferrer" className="font-bold text-wine underline">
                                    Unirme a la transmisión
                                </a>
                                <p className="mt-1 text-ink-faint">El enlace estará activo el día del evento.</p>
                            </>
                        ) : (
                            'Te compartiremos el enlace de la videollamada antes del evento.'
                        )}
                    </div>
                </div>
            )}

            {data.attending === 'yes' && guest.mode === 'in_person' && (
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

            {errorMessages.length > 0 && (
                <div className="mb-[18px] rounded-[14px] border border-[#e0b4b4] bg-[#fdf3f3] px-[15px] py-[13px] text-[13px] leading-normal text-[#8a2c2c]">
                    {errorMessages.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>
            )}

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
