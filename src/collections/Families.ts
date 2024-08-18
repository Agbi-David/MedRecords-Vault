import { CollectionConfig } from 'payload';
import { customAlphabet } from 'nanoid';
import { isAdmin, isAdminOrInstitution } from '@/access/isRole';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

const generateFamilyCode = () => {
    return `GSOW${nanoid()}`;
};


const Families: CollectionConfig = {
    slug: 'families',
    admin: {
        useAsTitle: 'familyName',
    },
    hooks: {
        beforeChange: [
            ({ data }) => {
                if (!data.familyCode) {
                    data.familyCode = generateFamilyCode();
                }
                return data;
            },
        ],
    },
    fields: [
        {
            name: 'familyName',
            type: 'text',
            required: true,
        },
        {
            name: 'address',
            type: 'text',
        },
        {
            name: 'contactEmail',
            type: 'email',
        },
        {
            name: 'contactPhone',
            type: 'text',
        },
        {
            name: 'familyCode',
            type: 'text',
            unique: true,
            admin: {
                readOnly: true,
                position: "sidebar"
            },
        },
        {
            name: 'members',
            type: 'relationship',
            relationTo: 'members',
            hasMany: true,
        },
        {
            name: 'documents',
            type: 'relationship',
            relationTo: 'documents',
            hasMany: true,
        },
    ],
};

export default Families;

