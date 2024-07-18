'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, FileText, Clock, Building } from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'Family' | 'User';
}

interface Document {
    id: string;
    name: string;
    type: string;
}

interface AccessRequest {
    id: string;
    documentId: string;
    status: 'Pending' | 'Approved' | 'Denied';
    requestDate: string;
}

const InstitutionDashboard: React.FC = () => {
    const [searchId, setSearchId] = useState<string>('');
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [requests, setRequests] = useState<AccessRequest[]>([]);

    useEffect(() => {
        // Fetch initial data (e.g., recent requests)
        // This is a placeholder for demonstration
        setRequests([
            { id: 'REQ1', documentId: 'DOC1', status: 'Pending', requestDate: '2023-07-18T10:00:00Z' },
            { id: 'REQ2', documentId: 'DOC2', status: 'Approved', requestDate: '2023-07-17T14:30:00Z' },
        ]);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulated API call
        if (searchId) {
            setSearchResult({ id: searchId, type: searchId.startsWith('FAM') ? 'Family' : 'User' });
            setDocuments([
                { id: 'DOC1', name: 'Medical History', type: 'PDF' },
                { id: 'DOC2', name: 'Vaccination Record', type: 'PDF' },
                { id: 'DOC3', name: 'Recent Lab Results', type: 'PDF' },
            ]);
        }
    };

    const requestAccess = (documentId: string) => {
        // Simulated request process
        const newRequest: AccessRequest = {
            id: `REQ${Math.random().toString(36).substr(2, 9)}`,
            documentId,
            status: 'Pending',
            requestDate: new Date().toISOString(),
        };
        setRequests([...requests, newRequest]);
        alert('Access request sent. The user will be notified.');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Institution Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{requests.length}</div>
                        <p className="text-muted-foreground">Document access requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Approved Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {requests.filter(r => r.status === 'Approved').length}
                        </div>
                        <p className="text-muted-foreground">Approved document requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {requests.filter(r => r.status === 'Pending').length}
                        </div>
                        <p className="text-muted-foreground">Awaiting approval</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Search for Records</CardTitle>
                    <CardDescription>Enter a Family ID or User ID to search for records</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <Input
                            placeholder="Enter Family ID or User ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {searchResult && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                        <CardDescription>
                            Showing documents for {searchResult.type} ID: {searchResult.id}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell>{doc.name}</TableCell>
                                        <TableCell>{doc.type}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => requestAccess(doc.id)} size="sm">Request Access</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Access Requests</CardTitle>
                    <CardDescription>Track your document access requests</CardDescription>
                </CardHeader>
                <CardContent>
                    {requests.length === 0 ? (
                        <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertTitle>No Requests</AlertTitle>
                            <AlertDescription>You haven&apos;t made any access requests yet.</AlertDescription>
                        </Alert>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Document ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Request Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.id}</TableCell>
                                        <TableCell>{request.documentId}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell>{new Date(request.requestDate).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default InstitutionDashboard;
