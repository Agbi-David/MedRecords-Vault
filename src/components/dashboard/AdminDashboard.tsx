// 'use client';
//
// import Link from "next/link"
// import {File, ListFilter,} from "lucide-react"
//
// import {Badge} from "@/components/ui/badge"
//
// import {Button} from "@/components/ui/button"
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
// import {
//     DropdownMenu,
//     DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {Progress} from "@/components/ui/progress"
// import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
// import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
// import RightSidebar from "@/components/sidebar/RightSidebar";
// import {User} from "@/payload-types";
// import {useEffect, useState} from "react";
// import {useToast} from "@/components/ui/use-toast";
//
// interface Props {
//     user: User;
// }
//
//
// const AdminDashboard: React.FC<Props> = ({ user }) => {
//     const [records, setRecords] = useState<Document[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { toast } = useToast()
//
//     useEffect(() => {
//         fetchRecords();
//     }, []);
//
//     const fetchRecords = async () => {
//         setIsLoading(true);
//         try {
//             const response = await fetch('/api/documents');
//             if (!response.ok) throw new Error('Failed to fetch records');
//             const data = await response.json();
//             setRecords(data.docs);
//         } catch (error) {
//             setError(error instanceof Error ? error.message : 'An error occurred');
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;
//
//         const formData = new FormData();
//         formData.append('file', file);
//
//         try {
//             const response = await fetch('/api/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//
//             if (!response.ok) throw new Error('Upload failed');
//
//             const result = await response.json();
//             toast({
//                 title: "Success",
//                 variant: "default",
//                 description: "File uploaded successfully.",
//             });
//             // Refresh the records list
//             fetchRecords();
//         } catch (error) {
//             toast({
//                 title: "Error",
//                 variant: "destructive",
//                 description: "File upload failed.",
//             });
//         }
//     };
//     return (
//
//         <main className="grid items-start gap-4 p-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full">
//             <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//                 <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
//                     <Card
//                         className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
//                     >
//                         <CardHeader className="pb-3">
//                             <CardTitle>Add New Record</CardTitle>
//                             <CardDescription className="max-w-lg text-balance leading-relaxed">
//                                 Add new patient record to the system.
//                             </CardDescription>
//                         </CardHeader>
//                         <CardFooter>
//                             <Link href={'/dashboard/add_record'}>
//                                 <Button>Create Record</Button>
//                             </Link>
//                         </CardFooter>
//                     </Card>
//                     <Card x-chunk="dashboard-05-chunk-1">
//                         <CardHeader className="pb-2">
//                             <CardDescription>New Records</CardDescription>
//                             <CardTitle className="text-4xl">29</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="text-xs text-muted-foreground">
//                                 +25% from last week
//                             </div>
//                         </CardContent>
//                         <CardFooter>
//                             <Progress value={25} aria-label="25% increase"/>
//                         </CardFooter>
//                     </Card>
//                     <Card x-chunk="dashboard-05-chunk-2">
//                         <CardHeader className="pb-2">
//                             <CardDescription>Total Records</CardDescription>
//                             <CardTitle className="text-4xl">5329</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="text-xs text-muted-foreground">
//                                 +10% from last month
//                             </div>
//                         </CardContent>
//                         <CardFooter>
//                             <Progress value={12} aria-label="12% increase"/>
//                         </CardFooter>
//                     </Card>
//                 </div>
//                 <Tabs defaultValue="week">
//                     <div className="flex items-center">
//                         <TabsList>
//                             <TabsTrigger value="week">Week</TabsTrigger>
//                             <TabsTrigger value="month">Month</TabsTrigger>
//                             <TabsTrigger value="year">Year</TabsTrigger>
//                         </TabsList>
//                         <div className="ml-auto flex items-center gap-2">
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         className="h-7 gap-1 text-sm"
//                                     >
//                                         <ListFilter className="h-3.5 w-3.5"/>
//                                         <span className="sr-only sm:not-sr-only">Filter</span>
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                                     <DropdownMenuSeparator/>
//                                     <DropdownMenuCheckboxItem checked>
//                                         Fulfilled
//                                     </DropdownMenuCheckboxItem>
//                                     <DropdownMenuCheckboxItem>
//                                         Declined
//                                     </DropdownMenuCheckboxItem>
//                                     <DropdownMenuCheckboxItem>
//                                         Refunded
//                                     </DropdownMenuCheckboxItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                             <Button
//                                 size="sm"
//                                 variant="outline"
//                                 className="h-7 gap-1 text-sm"
//                             >
//                                 <File className="h-3.5 w-3.5"/>
//                                 <span className="sr-only sm:not-sr-only">Export</span>
//                             </Button>
//                         </div>
//                     </div>
//                     <TabsContent value="week">
//                         <Card x-chunk="dashboard-05-chunk-3">
//                             <CardHeader className="px-7">
//                                 <CardTitle>Patient Records</CardTitle>
//                                 <CardDescription>
//                                     Showing patient records for the week
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <Table>
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead>Customer</TableHead>
//                                             <TableHead className="hidden sm:table-cell">
//                                                 Family ID
//                                             </TableHead>
//                                             <TableHead className="hidden sm:table-cell">
//                                                 Status
//                                             </TableHead>
//                                             <TableHead className="hidden md:table-cell">
//                                                 Date
//                                             </TableHead>
//                                             <TableHead className="text-right">Documents</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         <TableRow className="bg-accent">
//                                             <TableCell>
//                                                 <div className="font-medium">Liam Johnson</div>
//                                                 <div className="hidden text-sm text-muted-foreground md:inline">
//                                                     liam@example.com
//                                                 </div>
//                                             </TableCell>
//                                             <TableCell className="hidden sm:table-cell">
//                                                 GEIWPLSYJ
//                                             </TableCell>
//                                             <TableCell className="hidden sm:table-cell">
//                                                 <Badge className="text-xs" variant="secondary">
//                                                     Active
//                                                 </Badge>
//                                             </TableCell>
//                                             <TableCell className="hidden md:table-cell">
//                                                 2023-06-23
//                                             </TableCell>
//                                             <TableCell className="text-right">7</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </CardContent>
//                         </Card>
//                     </TabsContent>
//                 </Tabs>
//             </div>
//             <RightSidebar/>
//         </main>
//
//
//     )
// }

// components/dashboard/AdminDashboardClient.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { User, Document } from "@/payload-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';

interface Props {
    user: User;
    initialUsers: User[];
    initialDocuments: Document[];
    initialAnalytics: {
        totalUsers: number;
        totalDocuments: number;
        recentActivity: number;
    };
}

const AdminDashboardClient: React.FC<Props> = ({ user, initialUsers, initialDocuments, initialAnalytics }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const newDocument = await response.json();
            setDocuments(prev => [...prev, newDocument]);
            setFile(null);
            alert('Document uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload document');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteUser = useCallback(async (userId: string) => {
        try {
            const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(users.filter(user => user.id !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Delete user error:', error);
            alert('Failed to delete user');
        }
    }, [users]);

    const deleteDocument = useCallback(async (documentId: string) => {
        try {
            const response = await fetch(`/api/documents/${documentId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete document');
            setDocuments(documents.filter(doc => doc.id !== documentId));
            alert('Document deleted successfully');
        } catch (error) {
            console.error('Delete document error:', error);
            alert('Failed to delete document');
        }
    }, [documents]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{initialAnalytics.totalUsers}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{initialAnalytics.totalDocuments}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{initialAnalytics.recentActivity}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="file" onChange={handleFileChange} className="mb-2" />
                    <Button onClick={handleUpload} disabled={!file || isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Manage system users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Button variant="destructive" size="sm" onClick={() => deleteUser(user.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="documents">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                            <CardDescription>Manage uploaded documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Uploaded By</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documents.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell>{doc.name}</TableCell>
                                            <TableCell>{doc.type}</TableCell>
                                            <TableCell>{(doc.uploadedBy as User).name}</TableCell>
                                            <TableCell>
                                                <Button variant="destructive" size="sm" onClick={() => deleteDocument(doc.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboardClient;
