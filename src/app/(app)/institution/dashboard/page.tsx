import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import InstitutionDashboardClient from "@/components/dashboard/InstitutionDashboard";
import { getCurrentUser } from '@/utils/auth';

export default async function Page() {
    const authToken = cookies().get('authToken')?.value

    if (!authToken) {
        console.log('No authToken found, redirecting to login');
        redirect('/login')
    }

    try {
        const userData = await getCurrentUser();

        if (!userData || !userData.user) {
            console.log('No user found despite authToken, redirecting to login');
            redirect('/login')
        }

        const user = userData.user;

        if (user.role !== 'institution') {
            console.log(`User role ${user.role} is not institution, redirecting to unauthorized`);
            redirect('/unauthorized')
        }


        return <InstitutionDashboardClient user={user}  />
    } catch (error) {
        console.error('Error in InstitutionDashboard:', error);
        redirect('/login')
    }
}
