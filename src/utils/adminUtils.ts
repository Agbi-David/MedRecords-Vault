import {getPayload} from "@/lib/payload";

export async function getUsers() {
    const payload = await getPayload();
    const users = await payload.find({
        collection: 'users',
    });
    return users.docs;
}

export async function getDocuments() {
    const payload = await getPayload();
    const documents = await payload.find({
        collection: 'documents',
    });
    return documents.docs;
}

export async function getAnalytics() {
    const payload = await getPayload();
    const [users, documents] = await Promise.all([
        payload.find({ collection: 'users' }),
        payload.find({ collection: 'documents' }),
    ]);

    const recentActivity = await payload.find({
        collection: 'documents',
        where: {
            createdAt: {
                greater_than: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
        },
    });

    return {
        totalUsers: users.totalDocs,
        totalDocuments: documents.totalDocs,
        recentActivity: recentActivity.totalDocs,
    };
}
