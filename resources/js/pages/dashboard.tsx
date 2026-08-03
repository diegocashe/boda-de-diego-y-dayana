import { Head } from '@inertiajs/react';
import { CalendarHeart, CheckCircle2, Clock, Send, TrendingUp, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface DashboardStats {
    totalInvitations: number;
    sentInvitations: number;
    expectedGuests: number;
    confirmedInvitations: number;
    confirmedGuests: number;
    pendingInvitations: number;
    declinedInvitations: number;
    responseRate: number;
    daysUntilWedding: number;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const kpis = [
        {
            label: 'Invitaciones enviadas',
            value: stats.sentInvitations,
            hint: `de ${stats.totalInvitations} en total`,
            icon: Send,
        },
        {
            label: 'Confirmados',
            value: stats.confirmedInvitations,
            hint: `${stats.confirmedGuests} de ${stats.expectedGuests} pases`,
            icon: CheckCircle2,
        },
        {
            label: 'Pendientes de respuesta',
            value: stats.pendingInvitations,
            hint: 'invitaciones sin responder',
            icon: Clock,
        },
        {
            label: 'No asisten',
            value: stats.declinedInvitations,
            hint: 'invitaciones que rechazaron',
            icon: XCircle,
        },
        {
            label: 'Tasa de respuesta',
            value: `${stats.responseRate}%`,
            hint: 'sobre el total de invitaciones',
            icon: TrendingUp,
        },
        {
            label: 'Días para la boda',
            value: stats.daysUntilWedding,
            hint: 'cuenta regresiva',
            icon: CalendarHeart,
        },
    ];

    const distribution = [
        { label: 'Confirmados', value: stats.confirmedInvitations, className: 'bg-chart-2' },
        { label: 'Pendientes', value: stats.pendingInvitations, className: 'bg-chart-4' },
        { label: 'No asisten', value: stats.declinedInvitations, className: 'bg-destructive' },
    ];
    const distributionTotal = distribution.reduce((sum, item) => sum + item.value, 0);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {kpis.map(({ label, value, hint, icon: Icon }) => (
                        <Card key={label} className="gap-2 py-5">
                            <CardHeader className="flex-row items-center justify-between px-5">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                                <Icon className="size-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-5">
                                <div className="text-2xl font-semibold tabular-nums">{value}</div>
                                <p className="text-xs text-muted-foreground">{hint}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Estado de las respuestas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-muted">
                            {distribution.map(
                                (item) =>
                                    item.value > 0 && (
                                        <div
                                            key={item.label}
                                            className={`${item.className} h-full rounded-full`}
                                            style={{ width: `${(item.value / (distributionTotal || 1)) * 100}%` }}
                                        />
                                    ),
                            )}
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            {distribution.map((item) => (
                                <div key={item.label} className="flex items-center gap-2">
                                    <span className={`size-2.5 rounded-full ${item.className}`} />
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className="font-medium tabular-nums">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
