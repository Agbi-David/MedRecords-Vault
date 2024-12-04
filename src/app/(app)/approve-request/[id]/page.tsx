import React from 'react';
import { Metadata } from 'next';
import payload from 'payload';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Approve Document Request',
    description: 'Approve access to your family document',
};

async function approveRequest(requestId: string) {
    try {
        await payload.update({
            collection: 'requests',
            id: requestId,
            data: {
                status: 'approved',
                approvedAt: new Date().toISOString(),
            },
        });
        return true;
    } catch (error) {
        console.error('Error approving request:', error);
        return false;
    }
}

export default async function ApproveRequestPage({ params }: { params: { id: string } }) {
    const success = await approveRequest(params.id);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {success ? 'Request Approved' : 'Approval Failed'}
                </h1>
                <p className="mb-4">
                    {success
                        ? 'The document access request has been approved successfully.'
                        : 'There was an error approving the request. Please try again or contact support.'}
                </p>
                <Link href="/">
                    <Button>Return to Home</Button>
                </Link>
            </div>
        </div>
    );
}
