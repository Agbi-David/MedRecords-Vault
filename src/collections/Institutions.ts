import { CollectionConfig } from "payload";
import { isAdmin, isAdminOrInstitution, isAdminOrOwner } from "@/access/isRole";

export const Institutions: CollectionConfig = {
    slug: 'institutions',
    admin: {
        useAsTitle: 'name',
        group: 'Admin',
    },
    access: {
        create: () => true,
        read: isAdminOrInstitution,
        update: isAdminOrOwner,
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
            type: 'select',
            options: [
                { label: 'School', value: 'school' },
                { label: 'Hospital', value: 'hospital' },
                { label: 'Government Agency', value: 'government' },
                { label: 'Other', value: 'other' },
            ],
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'address',
            type: 'textarea',
            required: true,
        },
        {
            name: 'contactPerson',
            type: 'text',
            required: true,
        },
        {
            name: 'contactPhone',
            type: 'text',
            required: true,
        },
        {
            name: 'users',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            admin: {
                description: 'Users associated with this institution',
            },
        },
    ],
};

export default Institutions;
