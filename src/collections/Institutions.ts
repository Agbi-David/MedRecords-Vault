import { CollectionConfig } from 'payload';

const Institutions: CollectionConfig = {
    slug: 'institutions',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'contactPerson',
            type: 'text',
        },
        {
            name: 'contactPhone',
            type: 'text',
        },
        {
            name: 'address',
            type: 'text',
        },
        {
            name: 'websiteUrl',
            type: 'text',
        },
        {
            name: 'institutionCode',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'users',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
        },
        {
            name: 'requests',
            type: 'relationship',
            relationTo: 'requests',
            hasMany: true,
        },
    ],
};

export default Institutions;
