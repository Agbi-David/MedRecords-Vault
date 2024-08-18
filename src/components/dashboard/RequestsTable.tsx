'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Request } from '@/payload-types';

interface RequestsTableProps {
    initialRequests: Request[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ initialRequests }) => {
    const [requests, setRequests] = useState(initialRequests);

    const handleDownload = async (documentId: string) => {
        try {
            const response = await fetch(`/api/documents/${documentId}/download`);
            if (!response.ok) throw new Error('Failed to download document');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'document.pdf'; // You might want to get the actual filename from the backend
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading document:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Document Requests</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Family</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requested At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{typeof request.family === 'object' ? request.family.familyName : 'Unknown'}</TableCell>
                            <TableCell>{typeof request.document === 'object' ? request.document.title : 'Unknown'}</TableCell>
                            <TableCell>{request.status}</TableCell>
                            <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
                            <TableCell>
                                {request.status === 'approved' && (
                                    <Button onClick={() => handleDownload(typeof request.document === 'object' ? request.document.id : '')}>
                                        Download
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RequestsTable;
