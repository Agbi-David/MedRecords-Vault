'use client';

import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FamilyMember {
    id: string;
    name: string;
    dob: string;
    age: string;
    relation: string;
    address: string;
    phoneNumber: string;
    email: string;
    bloodType: string;
    allergies: string;
    chronicConditions: string;
}

const FamilyMembersCard: React.FC = () => {
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newMember, setNewMember] = useState<Omit<FamilyMember, 'id'>>({
        name: '',
        dob: '',
        age: '',
        relation: '',
        address: '',
        phoneNumber: '',
        email: '',
        bloodType: '',
        allergies: '',
        chronicConditions: '',
    });

    const addFamilyMember = () => {
        if (newMember.name && newMember.dob) {
            setFamilyMembers([...familyMembers, { ...newMember, id: Date.now().toString() }]);
            setNewMember({
                name: '',
                dob: '',
                age: '',
                relation: '',
                address: '',
                phoneNumber: '',
                email: '',
                bloodType: '',
                allergies: '',
                chronicConditions: '',
            });
            setShowForm(false);
        }
    };

    const removeFamilyMember = (id: string) => {
        setFamilyMembers(familyMembers.filter(member => member.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Family Members</CardTitle>
                <CardDescription>
                    Manage family members details
                </CardDescription>
            </CardHeader>
            <CardContent>
                {familyMembers.length > 0 && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Relation</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {familyMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.relation}</TableCell>
                                    <TableCell>{member.age}</TableCell>
                                    <TableCell>{member.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(member.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {showForm && (
                    <div className="mt-4 grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="relation">Relation</Label>
                                <Input
                                    id="relation"
                                    value={newMember.relation}
                                    onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={newMember.dob}
                                    onChange={(e) => setNewMember({ ...newMember, dob: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={newMember.age}
                                    onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={newMember.address}
                                onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={newMember.phoneNumber}
                                    onChange={(e) => setNewMember({ ...newMember, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="bloodType">Blood Type</Label>
                            <Select
                                value={newMember.bloodType}
                                onValueChange={(value) => setNewMember({ ...newMember, bloodType: value })}
                            >
                                <SelectTrigger id="bloodType">
                                    <SelectValue placeholder="Select blood type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="allergies">Allergies</Label>
                            <Input
                                id="allergies"
                                value={newMember.allergies}
                                onChange={(e) => setNewMember({ ...newMember, allergies: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                            <Textarea
                                id="chronicConditions"
                                value={newMember.chronicConditions}
                                onChange={(e) => setNewMember({ ...newMember, chronicConditions: e.target.value })}
                            />
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Visit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div>
                                        <Label htmlFor="recentVisitDate">Date</Label>
                                        <Input
                                            id="recentVisitDate"
                                            name="recentVisitDate"
                                            type="date"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="recentVisitReason">Reason</Label>
                                        <Input
                                            id="recentVisitReason"
                                            name="recentVisitReason"

                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="recentVisitNotes">Notes</Label>
                                        <Textarea
                                            id="recentVisitNotes"
                                            name="recentVisitNotes"

                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Button onClick={addFamilyMember}>Add Family Member</Button>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
                <Button
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                    onClick={() => setShowForm(!showForm)}
                >
                    <PlusCircle className="h-3.5 w-3.5"/>
                    {showForm ? 'Cancel' : 'Add Family Member'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FamilyMembersCard;
