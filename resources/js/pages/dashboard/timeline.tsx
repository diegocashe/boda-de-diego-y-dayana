import { Form, Head } from '@inertiajs/react';
import { ImageOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import TimelineItemController from '@/actions/App/Http/Controllers/Dashboard/TimelineItemController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selected = items.find((item) => item.id === selectedId) ?? null;

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

                <Card>
                    <CardHeader>
                        <CardTitle>Momentos de la historia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-0">
                                        <span className="sr-only">Imagen</span>
                                    </TableHead>
                                    <TableHead>Periodo</TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Icono</TableHead>
                                    <TableHead className="text-center">Orden</TableHead>
                                    <TableHead>Destacado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id} className="cursor-pointer" onClick={() => setSelectedId(item.id)}>
                                        <TableCell>
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.title} className="size-10 rounded-md border object-cover" />
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                                                    <ImageOff className="size-4" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.period}</TableCell>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <TimelineIcon name={item.icon} className="size-4" />
                                                {TIMELINE_ICON_LABELS[item.icon] ?? item.icon}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center tabular-nums">{item.sortOrder}</TableCell>
                                        <TableCell>{item.highlighted ? <Badge>Destacado</Badge> : <Badge variant="outline">Normal</Badge>}</TableCell>
                                    </TableRow>
                                ))}
                                {items.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                            Aún no hay momentos en la historia; agrega el primero arriba.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                {selected && <ItemDetail item={selected} icons={icons} />}
            </Dialog>
        </>
    );
}

function ItemDetail({ item, icons }: { item: TimelineItemData; icons: string[] }) {
    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2">
                    <TimelineIcon name={item.icon} className="size-4" />
                    {item.title}
                    {item.highlighted && <Badge>Destacado</Badge>}
                </DialogTitle>
                <DialogDescription>Detalles y edición del momento de la historia.</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-48 w-full rounded-lg border object-cover" />
                ) : (
                    <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground">
                        <ImageOff className="size-5" />
                        <span className="text-xs">Sin imagen</span>
                    </div>
                )}

                <Form {...TimelineItemController.update.form(item.id)} options={{ preserveScroll: true }} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <ItemFields icons={icons} errors={errors} idPrefix={`item-${item.id}`} defaults={item} />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>

                <div className="flex border-t pt-4">
                    <Form {...TimelineItemController.destroy.form(item.id)} options={{ preserveScroll: true }} className="ml-auto">
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
                </div>
            </div>
        </DialogContent>
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
