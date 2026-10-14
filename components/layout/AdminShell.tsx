import React from 'react';
import AdminSidebar from './AdminSidebar';

export interface AdminShellProps {
    children: React.ReactNode;
    activePath?: string;
}

export function AdminShell({
    children,
    activePath,
}: AdminShellProps) {

    return (
        <div className="min-h-screen bg-[#f6f3ee] flex flex-col lg:flex-row font-sans">
            {/* Sidebar */}
            <AdminSidebar activePath={activePath}></AdminSidebar>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
                {children}
            </main>
        </div>
    );
}
