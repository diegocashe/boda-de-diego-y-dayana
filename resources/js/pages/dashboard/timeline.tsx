import { Form, Head } from '@inertiajs/react';
import { ImageOff, Trash2 } from 'lucide-react';
import TimelineItemController from '@/actions/App/Http/Controllers/Dashboard/TimelineItemController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TIMELINE_ICON_LABELS, TimelineIcon } from '@/lib/timeline-icons';
import { dashboard } from '@/routes';
import { index as timelineIndex } from '@/routes/timeline';

interface TimelineItemData {
    id: number;
    period: string;
    title: string;
    description: string;
    icon: string;
    highlighted: boolean;
    sortOrder: number;
    imageUrl: string | null;
}

interface TimelineAdminProps {
    items: TimelineItemData[];
    icons: string[];
}

export default function TimelineAdmin({ items, icons }: TimelineAdminProps) {
    const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;

    return (
        <>
            <Head title="Nuestra historia" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Nuestra historia"
                    description="Los momentos del timeline que se muestran en la sección «Historia» de la invitación, con su foto."
                />

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Agregar un momento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...TimelineItemController.store.form()} options={{ preserveScroll: true }} resetOnSuccess className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    <ItemFields icons={icons} errors={errors} idPrefix="new" defaults={{ sortOrder: nextOrder }} />
                                    <Button disabled={processing}>Agregar momento</Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <div className="flex max-w-3xl flex-col gap-4">
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} icons={icons} />
                    ))}
                    {items.length === 0 && (
                        <p className="text-sm text-muted-foreground">Aún no hay momentos en la historia; agrega el primero arriba.</p>
                    )}
                </div>
            </div>
        </>
    );
}

function ItemCard({ item, icons }: { item: TimelineItemData; icons: string[] }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <TimelineIcon name={item.icon} className="size-4" />
                    {item.title}
                </CardTitle>
                <Form {...TimelineItemController.destroy.form(item.id)} options={{ preserveScroll: true }}>
                    {({ processing }) => (
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={processing}
                            onClick={(event) => {
                                if (!confirm('¿Eliminar este momento de la historia? Su imagen también se borrará.')) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <Trash2 className="size-4" />
                            Eliminar
                        </Button>
                    )}
                </Form>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 md:flex-row">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-36 w-full shrink-0 rounded-lg border object-cover md:w-48" />
                ) : (
                    <div className="flex h-36 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground md:w-48">
                        <ImageOff className="size-5" />
                        <span className="text-xs">Sin imagen</span>
                    </div>
                )}

                <Form {...TimelineItemController.update.form(item.id)} options={{ preserveScroll: true }} className="flex-1 space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <ItemFields icons={icons} errors={errors} idPrefix={`item-${item.id}`} defaults={item} />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>
            </CardContent>
        </Card>
    );
}

interface ItemFieldsProps {
    icons: string[];
    errors: Record<string, string>;
    idPrefix: string;
    defaults?: Partial<TimelineItemData>;
}

function ItemFields({ icons, errors, idPrefix, defaults = {} }: ItemFieldsProps) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-period`}>Periodo</Label>
                    <Input id={`${idPrefix}-period`} name="period" defaultValue={defaults.period} required placeholder="Verano 2021" />
                    <InputError message={errors.period} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-title`}>Título</Label>
                    <Input id={`${idPrefix}-title`} name="title" defaultValue={defaults.title} required placeholder="Nuestro primer viaje" />
                    <InputError message={errors.title} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-description`}>Descripción</Label>
                <Textarea
                    id={`${idPrefix}-description`}
                    name="description"
                    defaultValue={defaults.description}
                    required
                    placeholder="Cuenta este momento en una o dos frases."
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-icon`}>Icono</Label>
                    <Select name="icon" defaultValue={defaults.icon ?? 'heart'}>
                        <SelectTrigger id={`${idPrefix}-icon`} className="w-full">
                            <SelectValue placeholder="Elige un icono" />
                        </SelectTrigger>
                        <SelectContent>
                            {icons.map((icon) => (
                                <SelectItem key={icon} value={icon}>
                                    <TimelineIcon className="size-4" name={icon} />
                                    {TIMELINE_ICON_LABELS[icon] ?? icon}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.icon} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-sort-order`}>Orden</Label>
                    <Input id={`${idPrefix}-sort-order`} type="number" name="sort_order" defaultValue={defaults.sortOrder ?? 0} min={0} required />
                    <InputError message={errors.sort_order} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-highlighted`} className="mt-1 flex items-center gap-2">
                        <Checkbox id={`${idPrefix}-highlighted`} name="highlighted" value="1" defaultChecked={defaults.highlighted} />
                        Momento destacado
                    </Label>
                    <InputError message={errors.highlighted} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-image`}>{defaults.id ? 'Reemplazar imagen' : 'Imagen'}</Label>
                <Input id={`${idPrefix}-image`} type="file" name="image" accept="image/*" />
                <InputError message={errors.image} />
            </div>
        </>
    );
}

TimelineAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Nuestra historia',
            href: timelineIndex(),
        },
    ],
};
