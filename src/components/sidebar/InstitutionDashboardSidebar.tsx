'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Users, Settings, ChevronLeft, ChevronRight, Building, ClipboardList, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    expanded: boolean;
}

interface SidebarProps {
    expanded: boolean;
    onToggle: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, expanded }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={`flex h-10 w-full items-center justify-${expanded ? 'start' : 'center'} rounded-lg transition-colors ${
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        } ${expanded ? 'px-3' : ''}`}
                    >
                        <Icon className={`h-5 w-5 ${expanded ? 'mr-3' : ''}`}/>
                        {expanded && <span>{label}</span>}
                    </Link>
                </TooltipTrigger>
                {!expanded && <TooltipContent side="right">{label}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
};

const InstitutionSidebar: React.FC<SidebarProps> = ({ expanded, onToggle }) => {
    const sidebarWidth = expanded ? 'w-64' : 'w-16';

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Dashboard" },
        { href: "#", icon: ClipboardList, label: "Medical Records" },
        { href: "#", icon: Bell, label: "Notifications" },
    ];

    const bottomNavItems = [
        { href: "#", icon: Settings, label: "Settings" },
        { href: "#", icon: HelpCircle, label: "Help & Support" },
        { href: "/logout", icon: LogOut, label: "Logout" },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card shadow-md transition-all duration-300 ${sidebarWidth}`}>
            <div className="flex h-16 items-center justify-center border-b">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-2"
                >
                    <FileText className={`h-6 w-6 text-primary transition-all ${expanded ? '' : 'scale-110'}`}/>
                    {expanded && <span className="text-lg font-semibold">MedRecords</span>}
                </Link>
            </div>
            <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} expanded={expanded} />
                ))}
            </nav>
            <div className="border-t p-2">
                {bottomNavItems.map((item) => (
                    <NavItem key={item.href} {...item} expanded={expanded} />
                ))}
            </div>
            <button
                onClick={onToggle}
                className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent transition-colors"
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
                {expanded ? <ChevronLeft className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
            </button>
        </aside>
    );
};

export default InstitutionSidebar;
