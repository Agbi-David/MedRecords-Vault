import { NextRequest, NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const payload = await getPayload();
    try {
        const { institutionId, documentId, familyId, message } = await request.json();

        const newRequest = await payload.create({
            collection: 'requests',
            data: {
                document: documentId,
                family: familyId,
                status: 'pending',
                requestMessage: message,
                institution: institutionId
            },
        });

        // Fetch family details
        const family = await payload.findByID({
            collection: 'families',
            id: familyId,
        });

        const document = await payload.findByID({
            collection: 'documents',
            id: documentId,
        });

        // Send email using Resend
        await resend.emails.send({
            from: 'Document Request <no_reply@vazzel.com>',
            to: family.contactEmail || '',
            subject: 'New Document Access Request',
            html: `
                <h1>New Document Access Request</h1>
                <p>A new request has been made to access one of your documents.</p>
                <p><strong>Document:</strong> ${document.title}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/approve-request/${newRequest.id}">Approve Request</a>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/decline-request/${newRequest.id}">Decline Request</a>
                </p>
            `,
        });


        return NextResponse.json(newRequest);

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
