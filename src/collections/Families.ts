import { CollectionConfig } from 'payload';
import { customAlphabet } from 'nanoid';
import { isAdmin, isAdminOrInstitution } from '@/access/isRole';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

const generateFamilyId = () => {
    return `GSOW${nanoid()}`;
};

export const Families: CollectionConfig = {
    slug: 'families',
    admin: {
        useAsTitle: `familyId`,
    },
    access: {
        create: isAdmin,
        read: isAdminOrInstitution,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        beforeChange: [
            ({ data }) => {
                if (!data.familyId) {
                    data.familyId = generateFamilyId();
                }
                return data;
            },
        ],
    },
    fields: [
        {
            name: 'familyId',
            type: 'text',
            admin: {
                readOnly: true,
            },
            unique: true,
        },
        {
            name: 'primaryContact',
            type: 'group',
            fields: [
                {
                    name: 'fullName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'phoneNumber',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'members',
            type: 'relationship',
            relationTo: 'familyMembers',
            hasMany: true,
        },
    ],
};
