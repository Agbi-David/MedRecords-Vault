// app/user/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, FileText, Activity, User } from 'lucide-react';

interface AccessRequest {
    id: string;
    institutionName: string;
    documentName: string;
    requestDate: string;
}

interface RecentActivity {
    id: string;
    action: string;
    description: string;
    date: string;
}

const UserDashboard: React.FC = () => {
    const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

    useEffect(() => {
        // Fetch access requests and recent activities from API
        // This is a placeholder for demonstration
        setAccessRequests([
            { id: 'REQ1', institutionName: 'City Hospital', documentName: 'Medical History', requestDate: '2023-07-18T10:00:00Z' },
            { id: 'REQ2', institutionName: 'State University', documentName: 'Vaccination Record', requestDate: '2023-07-19T14:30:00Z' },
        ]);
        setRecentActivities([
            { id: 'ACT1', action: 'Document Updated', description: 'Updated Medical History', date: '2023-07-17T09:15:00Z' },
            { id: 'ACT2', action: 'Access Granted', description: 'Granted access to City Hospital', date: '2023-07-16T11:30:00Z' },
        ]);
    }, []);

    const handleRequestResponse = (requestId: string, response: 'approve' | 'deny') => {
        // Send response to API
        console.log(`Request ${requestId} ${response}`);
        // Update local state to reflect the response
        setAccessRequests(accessRequests.filter(req => req.id !== requestId));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{accessRequests.length}</div>
                        <p className="text-muted-foreground">Document access requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">15</div>
                        <p className="text-muted-foreground">Total documents in your record</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">85%</div>
                        <p className="text-muted-foreground">Profile information completed</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Document Access Requests</CardTitle>
                        <CardDescription>Review and respond to requests for access to your documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {accessRequests.length === 0 ? (
                            <Alert>
                                <Bell className="h-4 w-4" />
                                <AlertTitle>No Pending Requests</AlertTitle>
                                <AlertDescription>You have no pending document access requests.</AlertDescription>
                            </Alert>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Institution</TableHead>
                                        <TableHead>Document</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {accessRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.institutionName}</TableCell>
                                            <TableCell>{request.documentName}</TableCell>
                                            <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleRequestResponse(request.id, 'approve')} className="mr-2" size="sm">Approve</Button>
                                                <Button onClick={() => handleRequestResponse(request.id, 'deny')} variant="outline" size="sm">Deny</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest actions and updates on your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivities.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>{activity.action}</TableCell>
                                        <TableCell>{activity.description}</TableCell>
                                        <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserDashboard;
