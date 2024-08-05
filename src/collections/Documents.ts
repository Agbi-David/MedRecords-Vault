import {isAdmin, isInstitutionWithApprovedRequest} from "@/access/isRole";
import {CollectionConfig} from "payload";

export const Documents: CollectionConfig = {
    slug: 'documents',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: isAdmin,
        read: isInstitutionWithApprovedRequest || isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'type',
            type: 'text',
            required: true,
        },
        {
            name: 'document',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'familyMember',
            type: 'relationship',
            relationTo: 'familyMembers',
            required: true,
        },
        {
            name: 'uploadedBy',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
    ],
};
