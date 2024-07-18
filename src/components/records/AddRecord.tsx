'use client';

import React, { useState } from 'react';
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FamilyMembersCard from "@/components/family/FamilyMemberCard";
import DocumentSection from "@/components/document/DocumentSection";

export default function AddRecord() {
    const [formData, setFormData] = useState({
        // Primary Information
        familyId: '',
        fullName: '',
        dateOfBirth: '',
        age: '',
        address: '',
        phoneNumber: '',
        email: '',

        // Medical Information
        bloodType: '',
        allergies: '',
        chronicConditions: '',

        // Emergency Contact
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactPhone: '',

        // Insurance Information
        insuranceProvider: '',
        policyNumber: '',

        // Recent Visit
        recentVisitDate: '',
        recentVisitReason: '',
        recentVisitNotes: '',

        // Profile Status
        status: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="w-full p-4">
            <div className="mx-auto grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={
                        () => window.history.back()
                    }>
                        <ChevronLeft className="h-4 w-4"/>
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Add New Record
                    </h1>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                        New Record
                    </Badge>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm">Save Record</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Family Details</CardTitle>
                                <CardDescription>
                                    Enter the details of the family
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Enter full name"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Email</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Email Address"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Phone Number</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Phone Number"
                                        />
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                        <FamilyMembersCard/>
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle className={'flex items-center justify-between'}>
                                    <div>
                                        Document Requests

                                    </div>
                                    <div>
                                        <PlusCircle size={30}/>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={'flex flex-col gap-2'}>
                                    <p>Birth Certificate</p>
                                    <p>Medical records for December</p>
                                    <p>Genotype Report Document</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Profile Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select onValueChange={handleSelectChange('status')} value={formData.status}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <DocumentSection/>
                        <Card x-chunk="dashboard-07-chunk-5">
                            <CardHeader>
                                <CardTitle>Archive Profile</CardTitle>
                                <CardDescription>
                                    Archive this profile
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div></div>
                                <Button size="sm" variant="secondary">
                                    Archive Product
                                </Button>
                            </CardContent>
                        </Card>
                        {/*insurance */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Insurance Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div>
                                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                                        <Input
                                            id="insuranceProvider"
                                            name="insuranceProvider"
                                            value={formData.insuranceProvider}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="policyNumber">Policy Number</Label>
                                        <Input
                                            id="policyNumber"
                                            name="policyNumber"
                                            value={formData.policyNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
            {/*<RightSidebar/>*/}
        </main>

    );
}
