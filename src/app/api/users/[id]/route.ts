import { NextRequest, NextResponse } from 'next/server';
import {getPayload} from "@/lib/payload";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const payload = await getPayload();
    try {
        await payload.delete({
            collection: 'users',
            id: params.id,
        });
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
