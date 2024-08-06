// app/api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import payload from 'payload';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const result = await payload.login({
            collection: 'users',
            data: {
                email,
                password,
            },
        });

        if (result.token) {
            // Set the token in an HTTP-only cookie
            cookies().set('authToken', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });

            // Return user data (excluding sensitive information)
            return NextResponse.json({
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    role: result.user.role,
                },
            });
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
    }
}
