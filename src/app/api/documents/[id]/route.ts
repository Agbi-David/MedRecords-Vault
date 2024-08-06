import { NextRequest, NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const payload = await getPayload();
    try {
        await payload.delete({
            collection: 'documents',
            id: params.id,
        });
        return NextResponse.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
    }
}
