'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import LoginForm from "@/components/auth/InstitutionSignupForm";


export default function LoginPage() {

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">MedRecords Login</CardTitle>
                    <CardDescription className="text-center">
                        Choose your login type to access the system
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <LoginForm/>

                </CardContent>
            </Card>
        </div>
    );
}
