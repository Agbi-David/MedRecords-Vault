'use client';
import React from 'react';
import { Metadata } from 'next';
import SearchFamily from "@/components/dashboard/SearchFamily";
import RequestForm from "@/components/dashboard/RequestFrom";

// import SearchFamily from '@/components/SearchFamily';

// export const metadata: Metadata = {
//     title: 'Document Request | Institution Dashboard',
//     description: 'Request access to family documents',
// };

export default async function RequestPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Document Request</h1>
            <SearchFamily institutionId={'66c132986151efa178a3ea68'}/>
            <RequestForm  document={{}} family={{}} onRequestSent={() => {}} />
        </div>
    );
}
