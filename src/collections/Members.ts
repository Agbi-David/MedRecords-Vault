import { CollectionConfig } from 'payload';

const Members: CollectionConfig = {
    slug: 'members',
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
            name: 'birthDate',
            type: 'date',
            required: true,
        },
        {
            name: 'relationship',
            type: 'text',
            required: true,
        },
        {
            name: 'gender',
            type: 'select',
            options: [
                {
                    label: 'Male',
                    value: 'male',
                },
                {
                    label: 'Female',
                    value: 'female',
                },
                {
                    label: 'Other',
                    value: 'other',
                },
            ],
            required: true,
        },
        {
            name: 'family',
            type: 'relationship',
            relationTo: 'families',
            required: true,
        },
        {
            name: 'bloodType',
            type: 'text',
        },
        {
            name: 'allergies',
            type: 'array',
            fields: [
                {
                    name: 'allergy',
                    type: 'text',
                },
            ],
        },
        {
            name: 'medicalConditions',
            type: 'array',
            fields: [
                {
                    name: 'condition',
                    type: 'text',
                },
            ],
        },
    ],
};

export default Members;
