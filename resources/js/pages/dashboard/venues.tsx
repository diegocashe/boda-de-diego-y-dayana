import { Form, Head } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import VenueController from '@/actions/App/Http/Controllers/Dashboard/VenueController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import VenueMap from '@/components/invitation/venue-map';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VENUE_ICON_LABELS, VenueIcon } from '@/lib/venue-icons';
import { dashboard } from '@/routes';
import { index as venuesIndex } from '@/routes/venues';

interface VenueData {
    id: number;
    label: string;
    name: string;
    schedule: string;
    lat: number | null;
    lng: number | null;
    icon: string;
    accent: 'wine' | 'sage';
    sortOrder: number;
}

interface VenuesAdminProps {
    venues: VenueData[];
    icons: string[];
    accents: string[];
}

export default function VenuesAdmin({ venues, icons, accents }: VenuesAdminProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selected = venues.find((venue) => venue.id === selectedId) ?? null;

    const nextOrder = venues.reduce((max, venue) => Math.max(max, venue.sortOrder), 0) + 1;

    return (
        <>
            <Head title="Ubicaciones" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Ubicaciones"
                    description="Los lugares que se muestran en la sección «Detalles» de la invitación, cada uno con su mapa en vivo para validar la ubicación."
                />

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Agregar una ubicación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...VenueController.store.form()} options={{ preserveScroll: true }} resetOnSuccess className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    <VenueFields icons={icons} accents={accents} errors={errors} idPrefix="new" defaults={{ sortOrder: nextOrder }} />
                                    <Button disabled={processing}>Agregar ubicación</Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de ubicaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Etiqueta</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Icono</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead className="text-center">Orden</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {venues.map((venue) => (
                                    <TableRow key={venue.id} className="cursor-pointer" onClick={() => setSelectedId(venue.id)}>
                                        <TableCell className="font-medium">{venue.label}</TableCell>
                                        <TableCell>{venue.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <VenueIcon name={venue.icon} className="size-4" />
                                                {VENUE_ICON_LABELS[venue.icon] ?? venue.icon}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{venue.accent === 'wine' ? 'Vino' : 'Salvia'}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center tabular-nums">{venue.sortOrder}</TableCell>
                                    </TableRow>
                                ))}
                                {venues.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                            Aún no hay ubicaciones registradas; agrega la primera arriba.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                {selected && <VenueDetail venue={selected} icons={icons} accents={accents} />}
            </Dialog>
        </>
    );
}

function VenueDetail({ venue, icons, accents }: { venue: VenueData; icons: string[]; accents: string[] }) {
    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2">
                    <VenueIcon name={venue.icon} className="size-4" />
                    {venue.name}
                    <Badge variant="outline">{venue.accent === 'wine' ? 'Vino' : 'Salvia'}</Badge>
                </DialogTitle>
                <DialogDescription>Detalles y edición de la ubicación.</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
                <Form {...VenueController.update.form(venue.id)} options={{ preserveScroll: true }} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <VenueFields icons={icons} accents={accents} errors={errors} idPrefix={`venue-${venue.id}`} defaults={venue} />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>

                <div className="flex border-t pt-4">
                    <Form {...VenueController.destroy.form(venue.id)} options={{ preserveScroll: true }} className="ml-auto">
                        {({ processing }) => (
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={processing}
                                onClick={(event) => {
                                    if (!confirm('¿Eliminar esta ubicación?')) {
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

interface VenueFieldsProps {
    icons: string[];
    accents: string[];
    errors: Record<string, string>;
    idPrefix: string;
    defaults?: Partial<VenueData>;
}

function VenueFields({ icons, accents, errors, idPrefix, defaults = {} }: VenueFieldsProps) {
    const [lat, setLat] = useState<number | null>(defaults.lat ?? null);
    const [lng, setLng] = useState<number | null>(defaults.lng ?? null);

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-label`}>Etiqueta</Label>
                    <Input id={`${idPrefix}-label`} name="label" defaultValue={defaults.label} required placeholder="Ceremonia religiosa" />
                    <InputError message={errors.label} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-name`}>Nombre del lugar</Label>
                    <Input id={`${idPrefix}-name`} name="name" defaultValue={defaults.name} required placeholder="Parroquia de San Miguel" />
                    <InputError message={errors.name} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-schedule`}>Dirección y hora</Label>
                <Input
                    id={`${idPrefix}-schedule`}
                    name="schedule"
                    defaultValue={defaults.schedule}
                    required
                    placeholder="Av. Reforma 210, Col. Centro · 5:00 PM"
                />
                <InputError message={errors.schedule} />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-icon`}>Icono</Label>
                    <Select name="icon" defaultValue={defaults.icon ?? 'map-pin'}>
                        <SelectTrigger id={`${idPrefix}-icon`} className="w-full">
                            <SelectValue placeholder="Elige un icono" />
                        </SelectTrigger>
                        <SelectContent>
                            {icons.map((icon) => (
                                <SelectItem key={icon} value={icon}>
                                    <VenueIcon className="size-4" name={icon} />
                                    {VENUE_ICON_LABELS[icon] ?? icon}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.icon} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-accent`}>Color</Label>
                    <Select name="accent" defaultValue={defaults.accent ?? 'wine'}>
                        <SelectTrigger id={`${idPrefix}-accent`} className="w-full">
                            <SelectValue placeholder="Elige un color" />
                        </SelectTrigger>
                        <SelectContent>
                            {accents.map((accent) => (
                                <SelectItem key={accent} value={accent}>
                                    {accent === 'wine' ? 'Vino' : 'Salvia'}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.accent} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-sort-order`}>Orden</Label>
                    <Input id={`${idPrefix}-sort-order`} type="number" name="sort_order" defaultValue={defaults.sortOrder ?? 0} min={0} required />
                    <InputError message={errors.sort_order} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-lat`}>Latitud</Label>
                    <Input
                        id={`${idPrefix}-lat`}
                        type="number"
                        step="any"
                        name="lat"
                        defaultValue={defaults.lat ?? ''}
                        onChange={(event) => setLat(event.target.value === '' ? null : Number(event.target.value))}
                        placeholder="19.4326"
                    />
                    <InputError message={errors.lat} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-lng`}>Longitud</Label>
                    <Input
                        id={`${idPrefix}-lng`}
                        type="number"
                        step="any"
                        name="lng"
                        defaultValue={defaults.lng ?? ''}
                        onChange={(event) => setLng(event.target.value === '' ? null : Number(event.target.value))}
                        placeholder="-99.1332"
                    />
                    <InputError message={errors.lng} />
                </div>
            </div>

            {lat !== null && lng !== null && !Number.isNaN(lat) && !Number.isNaN(lng) && (
                <div className="h-[200px] overflow-hidden rounded-lg border">
                    <VenueMap lat={lat} lng={lng} name={defaults.name ?? 'Ubicación'} />
                </div>
            )}
        </>
    );
}

VenuesAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Ubicaciones',
            href: venuesIndex(),
        },
    ],
};
