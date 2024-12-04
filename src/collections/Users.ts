import { CollectionConfig } from 'payload';

const Users: CollectionConfig = {
    slug: 'users',
    auth: true, // This enables authentication
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
            name: 'role',
            type: 'select',
            options: [
                {
                    label: 'Hospital Admin',
                    value: 'hospital-admin',
                },
                {
                    label: 'Institution User',
                    value: 'institution-user',
                },
            ],
            required: true,
        },
        {
            name: 'profilePicture',
            type: 'upload',
            relationTo: 'media', // Assuming you have a media collection
        },
        {
            name: 'phoneNumber',
            type: 'text',
        },
    ],
};

export default Users;
