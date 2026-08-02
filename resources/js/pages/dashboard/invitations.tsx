import { Form, Head } from '@inertiajs/react';
import { Check, Copy, Download, Lock, LockOpen, RefreshCw, Send, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import InvitationController from '@/actions/App/Http/Controllers/Dashboard/InvitationController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboard } from '@/routes';
import { index as invitationsIndex } from '@/routes/invitations';

type AttendanceMode = 'in_person' | 'online';

interface InvitationData {
    id: number;
    guestName: string;
    email: string | null;
    code: string;
    maxPasses: number;
    attendanceMode: AttendanceMode;
    attending: boolean | null;
    confirmedPasses: number | null;
    message: string | null;
    respondedAt: string | null;
    sentAt: string | null;
    isLocked: boolean;
    rsvpUrl: string;
    ogImageUrl: string;
}

interface InvitationsAdminProps {
    invitations: InvitationData[];
}

export default function InvitationsAdmin({ invitations }: InvitationsAdminProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [modeFilter, setModeFilter] = useState<AttendanceMode>('in_person');
    const selected = invitations.find((invitation) => invitation.id === selectedId) ?? null;

    const confirmedGuests = invitations.reduce((total, invitation) => total + (invitation.confirmedPasses ?? 0), 0);
    const pending = invitations.filter((invitation) => invitation.attending === null).length;
    const onlineCount = invitations.filter((invitation) => invitation.attendanceMode === 'online').length;
    const inPersonCount = invitations.length - onlineCount;

    const inPersonInvitations = useMemo(() => invitations.filter((invitation) => invitation.attendanceMode === 'in_person'), [invitations]);
    const onlineInvitations = useMemo(() => invitations.filter((invitation) => invitation.attendanceMode === 'online'), [invitations]);

    return (
        <>
            <Head title="Invitaciones" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Invitaciones"
                    description={`Cada invitación tiene un enlace personal para confirmar asistencia. ${confirmedGuests} personas confirmadas · ${pending} sin responder.`}
                />

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Agregar invitación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...InvitationController.store.form()} options={{ preserveScroll: true }} resetOnSuccess className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    <InvitationFields errors={errors} idPrefix="new" />
                                    <Button disabled={processing}>Agregar invitación</Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Lista de invitaciones</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <a href={InvitationController.export().url} download>
                                <Download />
                                Exportar CSV
                            </a>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={modeFilter} onValueChange={(value) => setModeFilter(value as AttendanceMode)}>
                            <TabsList className="mb-4">
                                <TabsTrigger value="in_person">Presenciales ({inPersonCount})</TabsTrigger>
                                <TabsTrigger value="online">Online ({onlineCount})</TabsTrigger>
                            </TabsList>

                            <TabsContent value="in_person">
                                <InvitationsTable
                                    invitations={inPersonInvitations}
                                    hasAnyInvitations={invitations.length > 0}
                                    onSelect={setSelectedId}
                                />
                            </TabsContent>
                            <TabsContent value="online">
                                <InvitationsTable
                                    invitations={onlineInvitations}
                                    hasAnyInvitations={invitations.length > 0}
                                    onSelect={setSelectedId}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                {selected && <InvitationDetail invitation={selected} />}
            </Dialog>
        </>
    );
}

interface InvitationsTableProps {
    invitations: InvitationData[];
    hasAnyInvitations: boolean;
    onSelect: (id: number) => void;
}

function InvitationsTable({ invitations, hasAnyInvitations, onSelect }: InvitationsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invitado</TableHead>
                    <TableHead>Modalidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-center">Pases</TableHead>
                    <TableHead>Invitación</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Copiar enlace</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invitations.map((invitation) => (
                    <TableRow key={invitation.id} className="cursor-pointer" onClick={() => onSelect(invitation.id)}>
                        <TableCell>
                            <div className="flex items-center gap-2 font-medium">
                                {invitation.isLocked && <Lock className="size-3.5 shrink-0 text-muted-foreground" />}
                                {invitation.guestName}
                            </div>
                            {invitation.email && <p className="text-xs text-muted-foreground">{invitation.email}</p>}
                        </TableCell>
                        <TableCell>
                            <ModeBadge mode={invitation.attendanceMode} />
                        </TableCell>
                        <TableCell>
                            <StatusBadge invitation={invitation} />
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                            {invitation.attending ? `${invitation.confirmedPasses} / ${invitation.maxPasses}` : invitation.maxPasses}
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{invitation.sentAt ? `Enviada ${formatDate(invitation.sentAt)}` : 'Sin enviar'}</Badge>
                        </TableCell>
                        <TableCell onClick={(event) => event.stopPropagation()}>
                            <CopyLinkButton url={invitation.rsvpUrl} iconOnly />
                        </TableCell>
                    </TableRow>
                ))}
                {invitations.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                            {hasAnyInvitations ? 'No hay invitaciones en esta modalidad.' : 'Aún no hay invitaciones; agrega la primera arriba.'}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

function ModeBadge({ mode }: { mode: AttendanceMode }) {
    return mode === 'online' ? <Badge variant="secondary">Online</Badge> : <Badge variant="outline">Presencial</Badge>;
}

function StatusBadge({ invitation }: { invitation: InvitationData }) {
    if (invitation.attending === null) {
        return <Badge variant="outline">Pendiente</Badge>;
    }

    if (invitation.attending) {
        return (
            <Badge>
                Confirmó {invitation.confirmedPasses} {invitation.confirmedPasses === 1 ? 'pase' : 'pases'}
            </Badge>
        );
    }

    return <Badge variant="secondary">No asiste</Badge>;
}

function CopyLinkButton({ url, iconOnly = false }: { url: string; iconOnly?: boolean }) {
    const [copied, setCopied] = useState(false);

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast.success('Enlace copiado al portapapeles.');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button type="button" variant="outline" size="sm" onClick={copyLink} aria-label="Copiar enlace">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {!iconOnly && 'Copiar'}
        </Button>
    );
}

function InvitationDetail({ invitation }: { invitation: InvitationData }) {
    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2">
                    {invitation.isLocked && <Lock className="size-4 text-muted-foreground" />}
                    {invitation.guestName}
                    <ModeBadge mode={invitation.attendanceMode} />
                    <StatusBadge invitation={invitation} />
                    <Badge variant="outline">{invitation.sentAt ? `Enviada ${formatDate(invitation.sentAt)}` : 'Sin enviar'}</Badge>
                </DialogTitle>
                <DialogDescription>Detalles y acciones de la invitación.</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
                {invitation.respondedAt && (
                    <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                        <p className="text-muted-foreground">Respondió el {formatDate(invitation.respondedAt)}.</p>
                        {invitation.message && (
                            <p className="mt-1">
                                <span className="font-medium">Mensaje:</span> «{invitation.message}»
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Input readOnly value={invitation.rsvpUrl} className="font-mono text-xs" onFocus={(event) => event.target.select()} />
                    <CopyLinkButton url={invitation.rsvpUrl} />
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium">Imagen para compartir (WhatsApp / redes)</p>
                    <img
                        src={invitation.ogImageUrl}
                        alt={`Vista previa para compartir de ${invitation.guestName}`}
                        className="w-full max-w-md rounded-lg border object-cover"
                        style={{ aspectRatio: '1200 / 630' }}
                    />
                    <Form {...InvitationController.regenerateOgImage.form(invitation.id)} options={{ preserveScroll: true }}>
                        {({ processing }) => (
                            <Button type="submit" variant="outline" size="sm" disabled={processing}>
                                <RefreshCw className="size-4" />
                                Regenerar imagen
                            </Button>
                        )}
                    </Form>
                </div>

                <Form {...InvitationController.update.form(invitation.id)} options={{ preserveScroll: true }} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <InvitationFields errors={errors} idPrefix={`invitation-${invitation.id}`} defaults={invitation} />
                            <Button disabled={processing}>Guardar cambios</Button>
                        </>
                    )}
                </Form>

                <div className="flex flex-wrap gap-2 border-t pt-4">
                    <Form {...InvitationController.send.form(invitation.id)} options={{ preserveScroll: true }}>
                        {({ processing }) => (
                            <Button type="submit" variant="outline" size="sm" disabled={processing}>
                                <Send className="size-4" />
                                {invitation.sentAt ? 'Reenviar invitación' : 'Enviar invitación'}
                            </Button>
                        )}
                    </Form>
                    <Form {...InvitationController.toggleLock.form(invitation.id)} options={{ preserveScroll: true }}>
                        {({ processing }) => (
                            <Button type="submit" variant="outline" size="sm" disabled={processing}>
                                {invitation.isLocked ? <LockOpen className="size-4" /> : <Lock className="size-4" />}
                                {invitation.isLocked ? 'Desbloquear respuesta' : 'Bloquear respuesta'}
                            </Button>
                        )}
                    </Form>
                    <Form {...InvitationController.destroy.form(invitation.id)} options={{ preserveScroll: true }} className="ml-auto">
                        {({ processing }) => (
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={processing}
                                onClick={(event) => {
                                    if (!confirm('¿Eliminar esta invitación? El enlace del invitado dejará de funcionar.')) {
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
                {!invitation.email && (
                    <p className="text-xs text-muted-foreground">Sin correo, se marcará como enviada pero no se enviará ningún email.</p>
                )}
            </div>
        </DialogContent>
    );
}

interface InvitationFieldsProps {
    errors: Record<string, string>;
    idPrefix: string;
    defaults?: Partial<InvitationData>;
}

function InvitationFields({ errors, idPrefix, defaults = {} }: InvitationFieldsProps) {
    const [attendanceMode, setAttendanceMode] = useState<AttendanceMode>(defaults.attendanceMode ?? 'in_person');
    const isOnline = attendanceMode === 'online';

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-guest-name`}>Invitado</Label>
                <Input id={`${idPrefix}-guest-name`} name="guest_name" defaultValue={defaults.guestName} required placeholder="Familia Mendoza" />
                <InputError message={errors.guest_name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-email`}>Correo</Label>
                <Input id={`${idPrefix}-email`} type="email" name="email" defaultValue={defaults.email ?? ''} placeholder="invitado@correo.com" />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-max-passes`}>Pases</Label>
                <Input
                    key={attendanceMode}
                    id={`${idPrefix}-max-passes`}
                    type="number"
                    name="max_passes"
                    defaultValue={isOnline ? 1 : (defaults.maxPasses ?? 2)}
                    min={1}
                    max={20}
                    required
                    disabled={isOnline}
                />
                {isOnline && <p className="text-xs text-muted-foreground">Las invitaciones online no requieren pases; siempre es 1.</p>}
                <InputError message={errors.max_passes} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}-attendance-mode`}>Modalidad</Label>
                <select
                    id={`${idPrefix}-attendance-mode`}
                    name="attendance_mode"
                    value={attendanceMode}
                    onChange={(event) => setAttendanceMode(event.target.value as AttendanceMode)}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none dark:bg-input/30"
                >
                    <option value="in_person">Presencial</option>
                    <option value="online">Online</option>
                </select>
                <InputError message={errors.attendance_mode} />
            </div>
        </div>
    );
}

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

InvitationsAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Invitaciones',
            href: invitationsIndex(),
        },
    ],
};
