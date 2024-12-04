// src/components/withAuth.tsx

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export function withAuth(Component: React.ComponentType) {
    return async function AuthenticatedComponent(props: any) {
        const user = await getCurrentUser();

        if (!user || user.role !== 'institution-user') {
            redirect('/institution/auth/login');
        }

        return <Component {...props} user={user} />;
    }
}
