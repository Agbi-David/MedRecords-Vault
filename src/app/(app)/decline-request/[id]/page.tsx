import React from 'react';
import { Metadata } from 'next';
import payload from 'payload';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Decline Document Request',
    description: 'Decline access to your family document',
};

async function declineRequest(requestId: string) {
    try {
        await payload.update({
            collection: 'requests',
            id: requestId,
            data: {
                status: 'denied',
            },
        });
        return true;
    } catch (error) {
        console.error('Error declining request:', error);
        return false;
    }
}

export default async function DeclineRequestPage({ params }: { params: { id: string } }) {
    const success = await declineRequest(params.id);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {success ? 'Request Declined' : 'Decline Failed'}
                </h1>
                <p className="mb-4">
                    {success
                        ? 'The document access request has been declined successfully.'
                        : 'There was an error declining the request. Please try again or contact support.'}
                </p>
                <Button >Return to Home</Button>
            </div>
        </div>
    );
}
