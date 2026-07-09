import { Head, Link } from '@inertiajs/react';

interface ErrorPageProps {
    status: number;
}

const messages: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Acceso no autorizado',
        description: 'No tienes permiso para ver esta página.',
    },
    404: {
        title: 'Página no encontrada',
        description: 'El enlace que seguiste no existe o ya no está disponible.',
    },
    419: {
        title: 'Página expirada',
        description: 'Tu sesión expiró. Por favor, inténtalo de nuevo.',
    },
    500: {
        title: 'Algo salió mal',
        description: 'Ocurrió un error inesperado en el servidor. Estamos trabajando para solucionarlo.',
    },
    503: {
        title: 'En mantenimiento',
        description: 'Estamos realizando algunos ajustes. Vuelve a intentarlo en unos minutos.',
    },
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const { title, description } = messages[status] ?? {
        title: 'Ha ocurrido un error',
        description: 'Algo no salió como esperábamos.',
    };

    return (
        <>
            <Head title={title} />
            <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-parchment px-6 text-center font-body text-ink">
                <p className="font-serif text-7xl text-wine">{status}</p>
                <div className="space-y-2">
                    <h1 className="font-serif text-2xl text-ink">{title}</h1>
                    <p className="text-ink-soft">{description}</p>
                </div>
                <Link href="/" className="rounded-md bg-wine px-6 py-2 text-sm font-medium text-parchment-light transition-colors hover:bg-wine-deep">
                    Volver al inicio
                </Link>
            </div>
        </>
    );
}
