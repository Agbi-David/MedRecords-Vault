'use client'
;
import React from 'react';


import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle, FileText, Users} from "lucide-react";
import useInstitutionData from "@/app/hooks/useInstitutionData";


interface DashboardStatsProps {
    institutionId?: string
}

export default function DashboardStats({institutionId}: DashboardStatsProps) {
    const {stats, loading, error} = useInstitutionData();

    if (loading) {
        return <div>Loading stats...</div>;
    }

    if (error) {
        return <div>Error loading stats: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Requests
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalRequests}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Requests
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeRequests}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Urgent Cases</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.urgentCases}</div>
                </CardContent>
            </Card>
        </div>
    );
}
