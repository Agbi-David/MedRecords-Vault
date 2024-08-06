import { Access, FieldAccess } from 'payload';

export const isAdmin: Access = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin');
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
    if (user?.role === 'admin') return true;
    if (user) {
        return {
            id: {
                equals: user.id,
            },
        };
    }
    return false;
};

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin');
};

export const isAdminOrInstitution: Access = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin' || user?.role === 'institution');
};

export const isAdminOrInstitutionFieldLevel: FieldAccess = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin' || user?.role === 'institution');
};

export const isFamily: Access = ({ req: { user } }) => {
    return Boolean(user?.role === 'family');
};

export const isFamilyOrAdmin: Access = ({ req: { user } }) => {
    return Boolean(user?.role === 'family' || user?.role === 'admin');
};

export const isAdminOrOwner: Access = ({ req: { user } }) => ({
    or: [
        {
            role: {
                equals: 'admin',
            },
        },

    ],
});

export const isInstitutionWithApprovedRequest: Access = async ({ req: { user, payload }, id }) => {
    if (user?.role !== 'institution') return false;

    try {
        const document = await payload.findByID({
            collection: 'documents',
            id: id as string,
        });

        if (!document) return false;

        const approvedRequest = await payload.find({
            collection: 'documentRequests',
            where: {
                and: [
                    {
                        document: {
                            equals: id,
                        },
                    },
                    {
                        institution: {
                            equals: user.id,
                        },
                    },
                    {
                        status: {
                            equals: 'approved',
                        },
                    },
                    {
                        expiryDate: {
                            greater_than: new Date().toISOString(),
                        },
                    },
                ],
            },
            limit: 1,
        });

        return approvedRequest.totalDocs > 0;
    } catch (error) {
        console.error('Error checking document access:', error);
        return false;
    }
};
