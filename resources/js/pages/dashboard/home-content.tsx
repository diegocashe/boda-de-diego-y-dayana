import { Form, Head } from '@inertiajs/react';
import HomeContentController from '@/actions/App/Http/Controllers/Dashboard/HomeContentController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes';
import { edit } from '@/routes/home-content';

interface HomeContentProps {
    content: {
        heroEyebrow: string;
        heroScrollHint: string;
        countdownEyebrow: string;
        countdownHeading: string;
        ctaHeading: string;
        ctaParagraph: string;
        ctaButtonLabel: string;
    };
}

export default function HomeContentSettings({ content }: HomeContentProps) {
    return (
        <>
            <Head title="Textos de la página de inicio" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Textos de la página de inicio"
                    description="Edita los textos que ven los invitados al abrir la invitación, antes de confirmar su asistencia."
                />

                <Form {...HomeContentController.update.form()} options={{ preserveScroll: true }} className="max-w-xl space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="hero_eyebrow">Texto sobre los nombres</Label>
                                <Input id="hero_eyebrow" name="hero_eyebrow" defaultValue={content.heroEyebrow} required placeholder="Nos casamos" />
                                <InputError message={errors.hero_eyebrow} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hero_scroll_hint">Texto para deslizar</Label>
                                <Input
                                    id="hero_scroll_hint"
                                    name="hero_scroll_hint"
                                    defaultValue={content.heroScrollHint}
                                    required
                                    placeholder="Desliza"
                                />
                                <InputError message={errors.hero_scroll_hint} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="countdown_eyebrow">Título pequeño de la cuenta regresiva</Label>
                                <Input
                                    id="countdown_eyebrow"
                                    name="countdown_eyebrow"
                                    defaultValue={content.countdownEyebrow}
                                    required
                                    placeholder="Cuenta regresiva"
                                />
                                <InputError message={errors.countdown_eyebrow} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="countdown_heading">Título de la cuenta regresiva</Label>
                                <Input
                                    id="countdown_heading"
                                    name="countdown_heading"
                                    defaultValue={content.countdownHeading}
                                    required
                                    placeholder="Faltan para el gran día"
                                />
                                <InputError message={errors.countdown_heading} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cta_heading">Título del mensaje final</Label>
                                <Textarea id="cta_heading" name="cta_heading" defaultValue={content.ctaHeading} required rows={3} />
                                <InputError message={errors.cta_heading} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cta_paragraph">Párrafo del mensaje final</Label>
                                <Textarea id="cta_paragraph" name="cta_paragraph" defaultValue={content.ctaParagraph} required rows={3} />
                                <InputError message={errors.cta_paragraph} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cta_button_label">Texto del botón de confirmar asistencia</Label>
                                <Input
                                    id="cta_button_label"
                                    name="cta_button_label"
                                    defaultValue={content.ctaButtonLabel}
                                    required
                                    placeholder="Confirmar asistencia"
                                />
                                <InputError message={errors.cta_button_label} />
                            </div>

                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

HomeContentSettings.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Textos de la página de inicio',
            href: edit(),
        },
    ],
};
