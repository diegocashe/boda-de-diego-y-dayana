import { Head } from '@inertiajs/react';
import { Check, Copy, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClipboard } from '@/hooks/use-clipboard';
import { dashboard } from '@/routes';
import { index as guestUploadsIndex } from '@/routes/guest-uploads';

type UploadType = 'image' | 'video';

interface GuestUploadData {
    id: number;
    type: UploadType;
    url: string;
    originalFilename: string;
    createdAt: string;
    invitationId: number;
    guestName: string;
}

interface InvitationOption {
    id: number;
    guestName: string;
    code: string;
    uploadLink: string;
    uploadsCount: number;
}

interface GuestUploadsAdminProps {
    uploads: GuestUploadData[];
    invitations: InvitationOption[];
}

export default function GuestUploadsAdmin({ uploads, invitations }: GuestUploadsAdminProps) {
    const [tab, setTab] = useState<'gallery' | 'by-guest'>('gallery');

    return (
        <>
            <Head title="Fotos de invitados" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Fotos de invitados"
                    description={`${uploads.length} ${uploads.length === 1 ? 'archivo subido' : 'archivos subidos'} por tus invitados desde su link personal.`}
                />

                <Card>
                    <CardContent>
                        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
                            <TabsList className="mb-4">
                                <TabsTrigger value="gallery">Galería ({uploads.length})</TabsTrigger>
                                <TabsTrigger value="by-guest">Por invitado</TabsTrigger>
                            </TabsList>

                            <TabsContent value="gallery">
                                <UploadGrid uploads={uploads} emptyMessage="Aún no hay fotos ni videos subidos." />
                            </TabsContent>

                            <TabsContent value="by-guest">
                                <ByGuestTab uploads={uploads} invitations={invitations} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function ByGuestTab({ uploads, invitations }: { uploads: GuestUploadData[]; invitations: InvitationOption[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(invitations[0]?.id ?? null);
    const selected = invitations.find((invitation) => invitation.id === selectedId) ?? null;

    const guestUploads = useMemo(() => uploads.filter((upload) => upload.invitationId === selectedId), [uploads, selectedId]);

    return (
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
            <div className="flex flex-col gap-1 md:border-r md:pr-4">
                {invitations.map((invitation) => (
                    <button
                        key={invitation.id}
                        type="button"
                        onClick={() => setSelectedId(invitation.id)}
                        className={`flex items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                            invitation.id === selectedId ? 'bg-muted font-medium' : 'hover:bg-muted/50'
                        }`}
                    >
                        <span className="truncate">{invitation.guestName}</span>
                        <span className="ml-2 shrink-0 text-xs text-muted-foreground">{invitation.uploadsCount}</span>
                    </button>
                ))}
                {invitations.length === 0 && <p className="px-2.5 py-2 text-sm text-muted-foreground">Aún no hay invitaciones.</p>}
            </div>

            <div className="min-w-0">
                {selected && (
                    <div className="mb-4 flex items-center gap-2">
                        <Input readOnly value={selected.uploadLink} className="font-mono text-xs" onFocus={(event) => event.target.select()} />
                        <CopyLinkButton url={selected.uploadLink} />
                    </div>
                )}

                <UploadGrid uploads={guestUploads} emptyMessage="Este invitado no ha subido nada todavía." />
            </div>
        </div>
    );
}

function UploadGrid({ uploads, emptyMessage }: { uploads: GuestUploadData[]; emptyMessage: string }) {
    if (uploads.length === 0) {
        return <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {uploads.map((upload) => (
                <UploadCard key={upload.id} upload={upload} />
            ))}
        </div>
    );
}

function UploadCard({ upload }: { upload: GuestUploadData }) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            {upload.type === 'video' ? (
                <video src={upload.url} controls playsInline className="aspect-square w-full bg-black object-cover" />
            ) : (
                <img src={upload.url} alt={upload.originalFilename} loading="lazy" className="aspect-square w-full object-cover" />
            )}
            <div className="flex items-center gap-2 p-2">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{upload.guestName}</p>
                    <p className="text-[11px] text-muted-foreground">{formatDate(upload.createdAt)}</p>
                </div>
                <Button variant="outline" size="icon" className="size-7 shrink-0" asChild>
                    <a href={upload.url} download={upload.originalFilename} aria-label={`Descargar ${upload.originalFilename}`}>
                        <Download className="size-3.5" />
                    </a>
                </Button>
            </div>
        </div>
    );
}

function CopyLinkButton({ url }: { url: string }) {
    const [copiedText, copy] = useClipboard();
    const copied = copiedText === url;

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
                if (await copy(url)) {
                    toast.success('Enlace copiado al portapapeles.');
                }
            }}
        >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copiar
        </Button>
    );
}

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}

GuestUploadsAdmin.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Fotos de invitados',
            href: guestUploadsIndex(),
        },
    ],
};
