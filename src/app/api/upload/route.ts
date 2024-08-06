import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from '@/lib/payload';

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload();
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replace(/\s/g, '-');

        const uploadedFile = await payload.create({
            collection: 'media',
            data: {
                alt: filename,
            },
            file: {
                size: file.size,
                data: buffer,
                mimetype: file.type,
                name: filename,
            },
        });

        const document = await payload.create({
            collection: 'documents',
            data: {
                name: filename,
                type: file.type.split('/')[1],
                document: uploadedFile.id,
                uploadedBy: req.headers.get('x-payload-user-id'),
            },
        });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
