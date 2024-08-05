// app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";

import { getUsers, getDocuments, getAnalytics } from "@/utils/adminUtils";
import AdminDashboardClient from "@/components/dashboard/AdminDashboard";

export default async function AdminDashboardPage() {
    const authToken = cookies().get('authToken')?.value;

    if (!authToken) {
        console.log('No authToken found, redirecting to login');
        redirect('/login');
    }

    try {
        const userData = await getCurrentUser();
        if (!userData || !userData.user) {
            console.log('No user found despite authToken, redirecting to login');
            redirect('/login');
        }

        const user = userData.user;

        if (user.role !== 'admin') {
            console.log(`User role ${user.role} is not admin, redirecting to unauthorized`);
            redirect('/unauthorized');
        }

        // Fetch initial data
        const [users, documents, analytics] = await Promise.all([
            getUsers(),
            getDocuments(),
            getAnalytics()
        ]);

        return <AdminDashboardClient user={user} initialUsers={users} initialDocuments={documents} initialAnalytics={analytics} />;
    } catch (error) {
        console.error('Error in AdminDashboard:', error);
        redirect('/login');
    }
}
