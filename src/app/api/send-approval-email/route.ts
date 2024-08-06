import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const { to, approvalLink } = await request.json();

    if (!to || !approvalLink) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'MedRecords <noreply@tantainnovatives.com>',
            to: [to],
            subject: 'Document Access Request Approval',
            html: `<p>You have a new document access request. Please <a href="${approvalLink}">click here</a> to approve or deny the request.</p>`
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
