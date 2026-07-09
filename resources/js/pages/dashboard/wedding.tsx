import { Form, Head } from '@inertiajs/react';
import { ImageOff } from 'lucide-react';
import WeddingSettingController from '@/actions/App/Http/Controllers/Dashboard/WeddingSettingController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes';
import { edit } from '@/routes/wedding';

interface WeddingSettingsProps {
    wedding: {
        groomName: string;
        brideName: string;
        weddingAtLocal: string;
        city: string;
        ogBackgroundUrl: string | null;
        notificationEmails: string;
        godparentsWhatsapp: string | null;
        godparentsPhone: string | null;
    };
}

function firstNotificationEmailError(errors: Record<string, string>): string | undefined {
    return Object.entries(errors).find(([key]) => key.startsWith('notification_emails'))?.[1];
}

export default function WeddingSettings({ wedding }: WeddingSettingsProps) {
    return (
        <>
            <Head title="Datos de la boda" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Datos de la boda"
                    description="La invitación pública se construye con esta información: nombres, fecha, hora y ciudad."
                />

                <Form {...WeddingSettingController.update.form()} options={{ preserveScroll: true }} className="max-w-xl space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="groom_name">Nombre del novio</Label>
                                    <Input id="groom_name" name="groom_name" defaultValue={wedding.groomName} required placeholder="Novio" />
                                    <InputError message={errors.groom_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="bride_name">Nombre de la novia</Label>
                                    <Input id="bride_name" name="bride_name" defaultValue={wedding.brideName} required placeholder="Novia" />
                                    <InputError message={errors.bride_name} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="wedding_at">Fecha y hora de la boda</Label>
                                <Input id="wedding_at" type="datetime-local" name="wedding_at" defaultValue={wedding.weddingAtLocal} required />
                                <InputError message={errors.wedding_at} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="city">Ciudad</Label>
                                <Input id="city" name="city" defaultValue={wedding.city} required placeholder="Ciudad de México" />
                                <InputError message={errors.city} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="og_background">Foto de fondo para compartir (WhatsApp / redes)</Label>
                                {wedding.ogBackgroundUrl ? (
                                    <img
                                        src={wedding.ogBackgroundUrl}
                                        alt="Fondo para compartir"
                                        className="h-40 w-full max-w-md rounded-lg border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground">
                                        <ImageOff className="size-5" />
                                        <span className="text-xs">Sin foto de fondo (se usa una por defecto)</span>
                                    </div>
                                )}
                                <Input id="og_background" type="file" name="og_background" accept="image/*" />
                                <InputError message={errors.og_background} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notification_emails">Correos para notificaciones de confirmación de asistencia</Label>
                                <Textarea
                                    id="notification_emails"
                                    name="notification_emails"
                                    defaultValue={wedding.notificationEmails}
                                    rows={3}
                                    placeholder={'uno@correo.com\notro@correo.com'}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Un correo por línea (o separados por comas). Les llegará un aviso cada vez que un invitado responda su
                                    confirmación de asistencia.
                                </p>
                                <InputError message={firstNotificationEmailError(errors)} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="godparents_whatsapp">WhatsApp de los padrinos</Label>
                                    <Input
                                        id="godparents_whatsapp"
                                        name="godparents_whatsapp"
                                        defaultValue={wedding.godparentsWhatsapp ?? ''}
                                        placeholder="525512345678"
                                    />
                                    <p className="text-xs text-muted-foreground">Número con código de país, sin espacios ni signos (ej. 5255...).</p>
                                    <InputError message={errors.godparents_whatsapp} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="godparents_phone">Teléfono de los padrinos</Label>
                                    <Input
                                        id="godparents_phone"
                                        name="godparents_phone"
                                        defaultValue={wedding.godparentsPhone ?? ''}
                                        placeholder="+525512345678"
                                    />
                                    <InputError message={errors.godparents_phone} />
                                </div>
                            </div>

                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

WeddingSettings.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Datos de la boda',
            href: edit(),
        },
    ],
};
