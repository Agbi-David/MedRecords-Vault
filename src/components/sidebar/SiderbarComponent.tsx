'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, Users, Settings, ChevronLeft, ChevronRight, Building, ClipboardList } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface SidebarProps {
    expanded: boolean;
    onToggle: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ expanded, onToggle }) => {

    const sidebarWidth = expanded ? 'w-64' : 'w-16';

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background transition-all duration-300 ${sidebarWidth}`}>
            <nav className="flex flex-col items-center gap-4 px-2 py-5">
                <Link
                    href="/"
                    className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                >
                    <FileText className="h-6 w-6 transition-all group-hover:scale-110"/>
                    <span className="sr-only">MedRecords</span>
                </Link>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/dashboard"
                                className="flex h-10 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Home className="h-5 w-5"/>
                                {expanded && <span className="ml-2">Dashboard</span>}
                            </Link>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">Dashboard</TooltipContent>}
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/records"
                                className="flex h-10 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <ClipboardList className="h-5 w-5"/>
                                {expanded && <span className="ml-2">Medical Records</span>}
                            </Link>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">Medical Records</TooltipContent>}
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/family"
                                className="flex h-10 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Users className="h-5 w-5"/>
                                {expanded && <span className="ml-2">Family Members</span>}
                            </Link>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">Family Members</TooltipContent>}
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/institutions"
                                className="flex h-10 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Building className="h-5 w-5"/>
                                {expanded && <span className="ml-2">Institutions</span>}
                            </Link>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">Institutions</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/settings"
                                className="flex h-10 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Settings className="h-5 w-5"/>
                                {expanded && <span className="ml-2">Settings</span>}
                            </Link>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">Settings</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <button
                onClick={onToggle}
                className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md"
            >
                {expanded ? <ChevronLeft className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
            </button>
        </aside>
    );
};

export default Sidebar;
