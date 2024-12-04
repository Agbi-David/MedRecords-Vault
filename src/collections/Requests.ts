import { CollectionConfig } from 'payload';

const Requests: CollectionConfig = {
    slug: 'requests',
    admin: {
        useAsTitle: 'requestMessage',
    },
    fields: [
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
            name: 'document',
            type: 'relationship',
            relationTo: 'documents',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    label: 'Pending',
                    value: 'pending',
                },
                {
                    label: 'Approved',
                    value: 'approved',
                },
                {
                    label: 'Denied',
                    value: 'denied',
                },
            ],
            defaultValue: 'pending',
            required: true,
        },
        {
            name: 'requestMessage',
            type: 'textarea',
        },
        {
            name: 'approvedBy',
            type: 'relationship',
            relationTo: 'users',
        },
        {
            name: 'approvedAt',
            type: 'date',
        },
    ],
};

export default Requests;
