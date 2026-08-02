import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Form, Head, router } from '@inertiajs/react';
import { GripVertical, ImageOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import WishlistItemController from '@/actions/App/Http/Controllers/Dashboard/WishlistItemController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes';
import { index as wishlistIndex, reorder } from '@/routes/wishlist';

const STATUS_LABELS: Record<string, string> = {
    available: 'Disponible',
    reserved: 'Reservado',
};

interface WishlistItemData {
    id: number;
    title: string;
    description: string;
    status: 'available' | 'reserved';
    sortOrder: number;
    imageUrl: string | null;
}

interface WishlistAdminProps {
    items: WishlistItemData[];
}

export default function WishlistAdmin({ items }: WishlistAdminProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [prevItems, setPrevItems] = useState(items);
    const [orderedItems, setOrderedItems] = useState(items);

    if (items !== prevItems) {
        setPrevItems(items);
        setOrderedItems(items);
    }

    const selected = orderedItems.find((item) => item.id === selectedId) ?? null;

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = orderedItems.findIndex((item) => item.id === active.id);
        const newIndex = orderedItems.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(orderedItems, oldIndex, newIndex);

        setOrderedItems(newOrder);

        router.patch(
            reorder.url(),
            { ids: newOrder.map((item) => item.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => setOrderedItems(items),
            },
        );
    };

    return (
        <>
            <Head title="Lista de deseos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Lista de deseos"
                    description="Los artículos que los invitados pueden reservar en la sección «Regalos» de la invitación."
                />

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Agregar un artículo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...WishlistItemController.store.form()} options={{ preserveScroll: true }} resetOnSuccess className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    <ItemFields errors={errors} idPrefix="new" />
                                    <Button disabled={processing}>Agregar artículo</Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Artículos de la lista</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-0">
                                        <span className="sr-only">Arrastrar</span>
                                    </TableHead>
                                    <TableHead className="w-0">
                                        <span className="sr-only">Imagen</span>
                                    </TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={orderedItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                    <TableBody>
                                        {orderedItems.map((item) => (
                                            <SortableRow key={item.id} item={item} onSelect={() => setSelectedId(item.id)} />
                                        ))}
                                        {orderedItems.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                                                    Aún no hay artículos en la lista; agrega el primero arriba.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </SortableContext>
                            </DndContext>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                {selected && <ItemDetail item={selected} />}
            </Dialog>
        </>
    );
}

function SortableRow({ item, onSelect }: { item: WishlistItemData; onSelect: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

    return (
        <TableRow
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={isDragging ? 'relative z-10 cursor-grabbing bg-muted' : 'cursor-pointer'}
            onClick={onSelect}
        >
            <TableCell onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="flex cursor-grab touch-none items-center justify-center text-muted-foreground active:cursor-grabbing"
                    aria-label="Arrastrar para reordenar"
                >
                    <GripVertical className="size-4" />
                </button>
            </TableCell>
            <TableCell>
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="size-10 rounded-md border object-cover" />
                ) : (
                    <div className="flex size-10 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                        <ImageOff className="size-4" />
                    </div>
                )}
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.status === 'reserved' ? <Badge variant="secondary">Reservado</Badge> : <Badge>Disponible</Badge>}</TableCell>
        </TableRow>
    );
}

function ItemDetail({ item }: { item: WishlistItemData }) {
    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2">
                    {item.title}
                    {item.status === 'reserved' && <Badge variant="secondary">Reservado</Badge>}
                </DialogTitle>
                <DialogDescription>Detalles y edición del artículo de la lista de deseos.</DialogDescription>
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

                <Form {...WishlistItemController.update.form(item.id)} options={{ preserveScroll: true }} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <ItemFields errors={errors} idPrefix={`item-${item.id}`} defaults={item} showStatus />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>

                <div className="flex border-t pt-4">
                    <Form {...WishlistItemController.destroy.form(item.id)} options={{ preserveScroll: true }} className="ml-auto">
                        {({ processing }) => (
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={processing}
                                onClick={(event) => {
                                    if (!confirm('¿Eliminar este artículo de la lista de deseos?')) {
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
    errors: Record<string, string>;
    idPrefix: string;
    defaults?: Partial<WishlistItemData>;
    showStatus?: boolean;
}

function ItemFields({ errors, idPrefix, defaults = {}, showStatus = false }: ItemFieldsProps) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-title`}>Título</Label>
                <Input id={`${idPrefix}-title`} name="title" defaultValue={defaults.title} required placeholder="Vajilla de porcelana" />
                <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-description`}>Descripción</Label>
                <Textarea
                    id={`${idPrefix}-description`}
                    name="description"
                    defaultValue={defaults.description}
                    required
                    placeholder="4 piezas para el día a día, en tono crudo con borde dorado."
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-image`}>{defaults.id ? 'Reemplazar imagen' : 'Imagen'}</Label>
                <Input id={`${idPrefix}-image`} type="file" name="image" accept="image/*" required={!defaults.id} />
                <p className="text-xs text-muted-foreground">{defaults.id ? 'Opcional, hasta 10 MB.' : 'Requerida, hasta 10 MB.'}</p>
                <InputError message={errors.image} />
            </div>

            {showStatus && (
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}-status`}>Estado</Label>
                    <Select name="status" defaultValue={defaults.status ?? 'available'}>
                        <SelectTrigger id={`${idPrefix}-status`} className="w-full">
                            <SelectValue placeholder="Elige un estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Cambia a «Disponible» para deshacer una reserva hecha por error.</p>
                    <InputError message={errors.status} />
                </div>
            )}
        </>
    );
}

WishlistAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Lista de deseos',
            href: wishlistIndex(),
        },
    ],
};
