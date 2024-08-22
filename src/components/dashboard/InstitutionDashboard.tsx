'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Search, Loader2 } from 'lucide-react';
import { User, Document, Request, Family } from "@/payload-types";
import {useToast} from "@/components/ui/use-toast";

interface Props {
    user: User;
}

const InstitutionDashboardClient: React.FC<Props> = ({ user }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);
    const [requestsError, setRequestsError] = useState<string | null>(null);

    const [searchId, setSearchId] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Family[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
    const [documentsError, setDocumentsError] = useState<string | null>(null);
    const { toast } = useToast()
    useEffect(() => {
        fetchDocumentRequests();
    }, []);

    const fetchDocumentRequests = async () => {
        setIsLoadingRequests(true);
        try {
            const response = await fetch(`/api/documentRequests?where[institution][equals]=${localStorage.getItem('institutionId')}`);
            if (!response.ok) throw new Error('Failed to fetch document requests');
            const data = await response.json();
            setRequests(data.docs);
        } catch (error) {
            setRequestsError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoadingRequests(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchId) return;

        setIsSearching(true);
        setSearchError(null);
        try {
            const response = await fetch(`/api/families?where[familyId][equals]=${searchId}`);
            if (!response.ok) throw new Error('Failed to search families');
            const data = await response.json();
            setSearchResults(data.docs);
            if (data.docs.length > 0) {
                fetchDocuments(data.docs[0].id);
            }
        } catch (error) {
            setSearchError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSearching(false);
        }
    };

    const fetchDocuments = async (familyId: string) => {
        setIsLoadingDocuments(true);
        setDocumentsError(null);
        try {
            const response = await fetch(`/api/documents?where[familyMember.family][equals]=${familyId}`);
            if (!response.ok) throw new Error('Failed to fetch documents');
            const data = await response.json();
            setDocuments(data.docs);
        } catch (error) {
            setDocumentsError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoadingDocuments(false);
        }
    };

    const handleRequestAccess = async (documentId: string) => {
        if (!searchResults[0]?.id) return;

        try {
            const response = await fetch('/api/documentRequests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    document: documentId,
                    institution: localStorage.getItem('institutionId'),
                    family: searchResults[0].id,
                    status: 'pending',
                    requestDate: new Date().toISOString()
                }),
            });
            if (!response.ok) throw new Error('Failed to request access');
            const newRequest = await response.json();
            setRequests(prevRequests => [...prevRequests, newRequest]);
            toast({
                title: "Success",
                variant: "default",
                description: "Access request sent successfully.",
            });
            // Send approval email
            await sendApprovalEmail(searchResults[0].contactEmail, `${window.location.origin}/approve-document?token=${newRequest.id}`);
            toast({
                title: "Success",
                variant: "default",
                description: "Approval email sent to the family.",
            });
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                variant: "destructive",
                description: "Failed to send access request. Please try again.",
            });
        }
    };

    const sendApprovalEmail = async (to: string | null, approvalLink: string) => {
        const response = await fetch('/api/send-approval-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, approvalLink }),
        });
        if (!response.ok) throw new Error('Failed to send approval email');
        return response.json();
    };

    if (isLoadingRequests) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (requestsError) {
        return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{requestsError}</AlertDescription></Alert>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

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
                            {requests.filter(r => r.status === 'approved').length}
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
                            {requests.filter(r => r.status === 'pending').length}
                        </div>
                        <p className="text-muted-foreground">Awaiting approval</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Search for Family Records</CardTitle>
                    <CardDescription>Enter a Family ID to search for records</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <Input
                            placeholder="Enter Family ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button type="submit" disabled={isSearching}>
                            {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {searchError && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Search Error</AlertTitle>
                    <AlertDescription>{searchError}</AlertDescription>
                </Alert>
            )}

            {searchResults.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                        <CardDescription>
                            Showing documents for Family ID: {searchResults[0].id}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingDocuments ? (
                            <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
                        ) : documentsError ? (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{documentsError}</AlertDescription>
                            </Alert>
                        ) : documents.length > 0 ? (
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
                                                <Button
                                                    onClick={() => handleRequestAccess(doc.id)}
                                                    size="sm"
                                                >
                                                    Request Access
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Alert>
                                <AlertTitle>No Documents</AlertTitle>
                                <AlertDescription>No documents found for this family.</AlertDescription>
                            </Alert>
                        )}
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
                            <Clock className="h-4 w-4"/>
                            <AlertTitle>No Requests</AlertTitle>
                            <AlertDescription>You haven&apos;t made any access requests yet.</AlertDescription>
                        </Alert>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Document</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Request Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.id}</TableCell>
                                        <TableCell>{(request.document as Document).name}</TableCell>
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

export default InstitutionDashboardClient;
