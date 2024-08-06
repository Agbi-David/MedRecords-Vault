import { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from "@/access/isRole";

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
        group: 'Admin',
    },
    access: {
        create: () => true,
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdmin,
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
            unique: true,
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Institution', value: 'institution' },
                { label: 'Family', value: 'family' },
            ],
            defaultValue: 'institution', // Set a default value
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'institution',
            type: 'relationship',
            relationTo: 'institutions',
            required: false,
            admin: {
                condition: (data) => data.role === 'institution',
            },
        },
        {
            name: 'lastLogin',
            type: 'date',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    if (!data.role) {
                        data.status = 'pending';
                        data.role = 'family'; // Default role for general signups
                    }
                }
                if (operation === 'update' && !isAdmin({ req })) {
                    delete data.role;
                    delete data.status;
                }
                return data;
            },
        ],
        afterLogin: [
            ({ doc }: any) => {
                return {
                    ...doc,
                    lastLogin: new Date(),
                };
            },
        ],
    },
};

export default Users;
