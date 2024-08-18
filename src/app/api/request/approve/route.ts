import { NextRequest, NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";

export async function POST(request: NextRequest) {
    const payload = await getPayload();
    try {
        const { requestId } = await request.json();

        await payload.update({
            collection: 'requests',
            id: requestId,
            data: {
                status: 'approved',
                approvedAt: new Date().toISOString(),
            },
        });

        return NextResponse.json({ message: 'Request approved successfully' });
    } catch (error) {
        console.error('Error approving request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
