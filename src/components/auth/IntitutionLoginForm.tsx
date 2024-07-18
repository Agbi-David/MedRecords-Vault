'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InstitutionLoginForm = () => {
    const [institutionId, setInstitutionId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!institutionId || !password) {
            setError('Please enter both institution ID and password.');
            return;
        }

        try {
            // Here you would typically make an API call to authenticate
            // For demonstration, we'll just simulate a successful login
            console.log('Logging in with:', institutionId, password);
            // Redirect to institution dashboard on successful login
            router.push('/institution/dashboard');
        } catch (err) {
            setError('Invalid institution ID or password. Please try again.');
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Institution Login</CardTitle>
                <CardDescription className="text-center">
                    Access the medical records request system
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="institutionId">Institution ID</Label>
                        <Input
                            id="institutionId"
                            type="text"
                            placeholder="INST-12345"
                            value={institutionId}
                            onChange={(e) => setInstitutionId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full">
                        <Building className="mr-2 h-4 w-4" /> Login
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Link href="/institution-forgot-password" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                </Link>
                <p className="text-xs text-gray-500 text-center">
                    This login is for authorized institutions only. If you&apos;re a hospital administrator, please use the{' '}
                    <Link href="/admin-login" className="text-green-600 hover:underline">
                        admin login
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    );
};

export default InstitutionLoginForm;
