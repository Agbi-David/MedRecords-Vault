import React, { Suspense } from "react";
import { Metadata } from "next";

import SearchFamily from "@/components/dashboard/SearchFamily";
import RequestsTable from "@/components/dashboard/RequestsTable";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { getInstitutionForUser } from "@/lib/institution";
import DashboardStats from "@/components/dashboard/DashboardStarts";
import { getDocumentRequests } from "@/lib/requests";

export const metadata: Metadata = {
  title: "Dashboard | Institution Portal",
  description: "View and manage document requests",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  requireAuth(user?.user || null);
  console.log(user?.user.id);
  const institution = await getInstitutionForUser(
    (user?.user.id ?? "").toString()
  );
  const getDocrequests = await getDocumentRequests();
  console.log(institution);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Institution Dashboard</h1>
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats institutionId={institution?.id ?? ""} />
      </Suspense>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchFamily institutionId={institution?.id ?? ""} />
      </Suspense>
      <Suspense fallback={<div>Loading requests...</div>}>
        <RequestsTable
          initialRequests={getDocrequests ?? []}
          //  institutionId={institution?.id ?? ""}
        />
      </Suspense>
    </div>
  );
}
