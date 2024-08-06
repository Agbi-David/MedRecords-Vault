'use client';

import React, {useState} from 'react';
import Sidebar from '@/components/sidebar/SiderbarComponent';
import Header from "@/components/header/HeaderComponent";
import Footer from "@/components/footer/FooterComponent";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    return (
        <div className="flex h-screen bg-background">
            <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar}/>
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header/>
                <main
                    className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-16'}`}>

                    {children}

                </main>
                <Footer/>
            </div>
        </div>
    );
};

export default Layout;
