import { Form, Head } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import GiftRegistryEntryController from '@/actions/App/Http/Controllers/Dashboard/GiftRegistryEntryController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboard } from '@/routes';
import { index as giftRegistryIndex } from '@/routes/gift-registry';

interface GiftRegistryEntryData {
    id: number;
    label: string;
    value: string;
    sortOrder: number;
}

interface GiftRegistryAdminProps {
    entries: GiftRegistryEntryData[];
}

export default function GiftRegistryAdmin({ entries }: GiftRegistryAdminProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selected = entries.find((entry) => entry.id === selectedId) ?? null;

    const nextOrder = entries.reduce((max, entry) => Math.max(max, entry.sortOrder), 0) + 1;

    return (
        <>
            <Head title="Mesa de regalos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Mesa de regalos"
                    description="Los datos que se muestran en la sección «Detalles» de la invitación para que los invitados hagan un regalo."
                />

                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Agregar un dato</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...GiftRegistryEntryController.store.form()} options={{ preserveScroll: true }} resetOnSuccess className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    <GiftRegistryFields errors={errors} idPrefix="new" defaults={{ sortOrder: nextOrder }} />
                                    <Button disabled={processing}>Agregar dato</Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de datos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Etiqueta</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead className="text-center">Orden</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entries.map((entry) => (
                                    <TableRow key={entry.id} className="cursor-pointer" onClick={() => setSelectedId(entry.id)}>
                                        <TableCell className="font-medium">{entry.label}</TableCell>
                                        <TableCell className="font-mono">{entry.value}</TableCell>
                                        <TableCell className="text-center tabular-nums">{entry.sortOrder}</TableCell>
                                    </TableRow>
                                ))}
                                {entries.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                                            Aún no hay datos registrados; agrega el primero arriba.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                {selected && <GiftRegistryDetail entry={selected} />}
            </Dialog>
        </>
    );
}

function GiftRegistryDetail({ entry }: { entry: GiftRegistryEntryData }) {
    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{entry.label}</DialogTitle>
                <DialogDescription>Detalles y edición del dato de mesa de regalos.</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
                <Form {...GiftRegistryEntryController.update.form(entry.id)} options={{ preserveScroll: true }} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <GiftRegistryFields errors={errors} idPrefix={`entry-${entry.id}`} defaults={entry} />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>

                <div className="flex border-t pt-4">
                    <Form {...GiftRegistryEntryController.destroy.form(entry.id)} options={{ preserveScroll: true }} className="ml-auto">
                        {({ processing }) => (
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={processing}
                                onClick={(event) => {
                                    if (!confirm('¿Eliminar este dato?')) {
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

interface GiftRegistryFieldsProps {
    errors: Record<string, string>;
    idPrefix: string;
    defaults?: Partial<GiftRegistryEntryData>;
}

function GiftRegistryFields({ errors, idPrefix, defaults = {} }: GiftRegistryFieldsProps) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-label`}>Etiqueta</Label>
                <Input id={`${idPrefix}-label`} name="label" defaultValue={defaults.label} required placeholder="Liverpool · Código" />
                <InputError message={errors.label} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-value`}>Valor</Label>
                <Input id={`${idPrefix}-value`} name="value" defaultValue={defaults.value} required placeholder="51820394" />
                <InputError message={errors.value} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-sort-order`}>Orden</Label>
                <Input id={`${idPrefix}-sort-order`} type="number" name="sort_order" defaultValue={defaults.sortOrder ?? 0} min={0} required />
                <InputError message={errors.sort_order} />
            </div>
        </>
    );
}

GiftRegistryAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Mesa de regalos',
            href: giftRegistryIndex(),
        },
    ],
};
