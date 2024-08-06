import { NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";

export async function POST(request: Request) {
    try {
        const payload = await getPayload();
        const body = await request.json();
        const { name, email, password, type, address, contactPerson, contactPhone } = body;

        // Create the institution in Payload CMS
        const institution = await payload.create({
            collection: 'institutions',
            data: {
                name,
                email,
                type,
                address,
                contactPerson,
                contactPhone,
            },
        });

        // Create a user account for the institution
        const user = await payload.create({
            collection: 'users',
            data: {
                name,
                email,
                password,
                role: 'institution', // Explicitly set the role to 'institution'
                institution: institution.id,
            },
        });

        console.log('Created user:', user); // Log the created user for debugging

        return NextResponse.json({ message: 'Institution signed up successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        // @ts-ignore
        return NextResponse.json({ error: 'Signup failed', details: error.message }, { status: 500 });
    }
}
