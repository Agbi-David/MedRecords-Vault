
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApproveDocumentPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [documentDetails, setDocumentDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            fetchDocumentDetails(token);
        }
    }, [token]);

    const fetchDocumentDetails = async (token: string) => {
        try {
            const response = await fetch(`/api/document-requests?token=${token}`);
            if (!response.ok) throw new Error('Failed to fetch document details');
            const data = await response.json();
            setDocumentDetails(data);
        } catch (err) {
            setError('Invalid or expired token');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApproval = async (approved: boolean) => {
        try {
            const response = await fetch('/api/approve-document', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, approved }),
            });
            if (!response.ok) throw new Error('Failed to process approval');
            // Handle successful approval/denial
        } catch (err) {
            setError('Failed to process your request');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Document Request</CardTitle>
                    <CardDescription>Review and approve the document request</CardDescription>
                </CardHeader>
                <CardContent>

                    {documentDetails && (
                        <>
                            <p>Institution: {documentDetails.institutionName}</p>
                            <p>Document: {documentDetails.documentName}</p>
                            <p>Requested on: {new Date(documentDetails.requestDate).toLocaleDateString()}</p>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => handleApproval(false)} variant="outline">Deny</Button>
                    <Button onClick={() => handleApproval(true)}>Approve</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
