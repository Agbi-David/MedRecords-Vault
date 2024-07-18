import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Users, Building, Search, Key } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="container mx-auto px-4 py-8">
                <nav className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">MedRecords Pro</h1>
                    <div className="space-x-4">
                        <Link href="/login">
                            <Button variant="ghost">Admin Login</Button>
                        </Link>
                        <Link href="/institution-login">
                            <Button variant="outline">Institution Login</Button>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Advanced Medical Records Management for Hospitals</h2>
                    <p className="text-xl text-gray-600 mb-8">Streamline patient data management and facilitate secure document sharing with institutions</p>
                    <Link href="/demo-request">
                        <Button size="lg">Request a Demo</Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="mr-2" />
                                Family-Centric Records
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Create and manage comprehensive family medical records with ease. Generate unique Family IDs for efficient record-keeping.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Key className="mr-2" />
                                Secure ID Generation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Automatically generate secure and unique identifiers for families and individual members, ensuring data integrity and privacy.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Building className="mr-2" />
                                Institution Collaboration
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Enable seamless and secure document requests from authorized institutions, streamlining information exchange.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="mr-2" />
                                Advanced Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Protect sensitive medical data with state-of-the-art encryption and role-based access control.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Search className="mr-2" />
                                Efficient Record Retrieval
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Quickly locate and access patient records using advanced search capabilities and intuitive interfaces.</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2" />
                                Comprehensive Documentation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Store and manage a wide range of medical documents, from birth certificates to complex medical histories.</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold mb-4">Ready to revolutionize your hospital's record management?</h3>
                    <Link href="/contact-sales">
                        <Button size="lg">Contact Our Sales Team</Button>
                    </Link>
                </div>
            </main>

            <section className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
                            <h4 className="font-semibold mb-2">Hospital Registration</h4>
                            <p>Hospitals sign up and get admin access to the system.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                            <h4 className="font-semibold mb-2">Record Creation</h4>
                            <p>Admins create family records and generate unique Family IDs.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                            <h4 className="font-semibold mb-2">Institution Requests</h4>
                            <p>Authorized institutions can securely request specific documents.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-100 mt-16 py-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>&copy; 2024 MedRecords Pro. All rights reserved.</p>
                    <div className="mt-4">
                        <Link href="/privacy" className="mx-2 hover:text-blue-600">Privacy Policy</Link>
                        <Link href="/terms" className="mx-2 hover:text-blue-600">Terms of Service</Link>
                        <Link href="/contact" className="mx-2 hover:text-blue-600">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
