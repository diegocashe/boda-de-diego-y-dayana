import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, Gem, Gift, Heart, LayoutGrid, Mail, MapPin, NotebookText, Star } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as giftRegistryIndex } from '@/routes/gift-registry';
import { edit as homeContentEdit } from '@/routes/home-content';
import { index as invitationsIndex } from '@/routes/invitations';
import { index as timelineIndex } from '@/routes/timeline';
import { index as venuesIndex } from '@/routes/venues';
import { edit as weddingEdit } from '@/routes/wedding';
import { index as wishlistIndex } from '@/routes/wishlist';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Datos de la boda',
        href: weddingEdit(),
        icon: Gem,
    },
    {
        title: 'Textos de inicio',
        href: homeContentEdit(),
        icon: NotebookText,
    },
    {
        title: 'Nuestra historia',
        href: timelineIndex(),
        icon: Heart,
    },
    {
        title: 'Invitaciones',
        href: invitationsIndex(),
        icon: Mail,
    },
    {
        title: 'Ubicaciones',
        href: venuesIndex(),
        icon: MapPin,
    },
    {
        title: 'Mesa de regalos',
        href: giftRegistryIndex(),
        icon: Gift,
    },
    {
        title: 'Lista de deseos',
        href: wishlistIndex(),
        icon: Star,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
