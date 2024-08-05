import {isAdmin, isAdminOrInstitution, isFamilyOrAdmin} from "@/access/isRole";
import {CollectionConfig} from "payload";

export const DocumentRequests: CollectionConfig = {
    slug: 'documentRequests',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        create: isAdminOrInstitution,
        read: isAdminOrInstitution,
        update: isFamilyOrAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'document',
            type: 'relationship',
            relationTo: 'documents',
            required: true,
        },
        {
            name: 'institution',
            type: 'relationship',
            relationTo: 'institutions',
            required: true,
        },
        {
            name: 'family',
            type: 'relationship',
            relationTo: 'families',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: ['pending', 'approved', 'rejected', 'expired'],
            required: true,
        },
        {
            name: 'requestDate',
            type: 'date',
            required: true,
        },
        {
            name: 'approvalDate',
            type: 'date',
        },
        {
            name: 'expiryDate',
            type: 'date',
        },
    ],
};
