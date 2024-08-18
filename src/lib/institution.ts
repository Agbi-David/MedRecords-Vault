import { cookies } from 'next/headers';
import { Institution } from '@/payload-types';

export async function getInstitutionForUser(userId: string): Promise<Institution> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/institutions?where[users][in]=${userId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    if (!response.ok) throw new Error('Failed to fetch institution');
    const data = await response.json();
    if (data.docs.length === 0) throw new Error('No institution found for user');
    return data.docs[0];
}
