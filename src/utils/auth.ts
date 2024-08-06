'use server';

import { User } from "@/payload-types";
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function login(prevState: any, formData: FormData): Promise<{ success: boolean, user?: User, error?: string }> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Attempting login for email:', email);

    try {
        console.log('Making API request to:', `${API_URL}/api/users/login`);
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        console.log('API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login failed. Server response:', errorText);
            return { success: false, error: 'Login failed. Please check your credentials and try again.' };
        }

        const data = await response.json();
        console.log('Login successful. User data:', data.user);

        cookies().set('authToken', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
}


export async function getCurrentUser(): Promise<{ user: User } | null> {
    const authToken = cookies().get('authToken')?.value
    if (!authToken) {
        console.log('No authToken found in getCurrentUser');
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Failed to get current user. Status:', response.status);
            return null;
        }

        const userData = await response.json();
        console.log('Current user data:', userData);
        return userData;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}
