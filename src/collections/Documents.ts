import { CollectionConfig } from 'payload';

const Documents: CollectionConfig = {
    slug: 'documents',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'type',
            type: 'select',
            options: [
                {
                    label: 'Birth Certificate',
                    value: 'birth-certificate',
                },
                {
                    label: 'Medical Record',
                    value: 'medical-record',
                },
                {
                    label: 'Passport',
                    value: 'passport',
                },
                {
                    label: 'Insurance',
                    value: 'insurance',
                },
                {
                    label: 'Other',
                    value: 'other',
                },
            ],
            required: true,
        },
        {
            name: 'document',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'family',
            type: 'relationship',
            relationTo: 'families',
            required: true,
        },
        {
            name: 'member',
            type: 'relationship',
            relationTo: 'members',
        },
        {
            name: 'uploadedBy',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'expiryDate',
            type: 'date',
        },
    ],
};

export default Documents;
