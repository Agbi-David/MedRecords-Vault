import { NextRequest, NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";

export async function POST(request: NextRequest) {
    const payload = await getPayload();
    try {
        const { requestId } = await request.json();

        // Update request status in Payload CMS
        await payload.update({
            collection: 'requests',
            id: requestId,
            data: {
                status: 'denied',
            },
        });

        return NextResponse.json({ message: 'Request declined successfully' });
    } catch (error) {
        console.error('Error declining request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
