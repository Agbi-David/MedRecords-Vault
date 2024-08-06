import {isAdmin, isAdminOrInstitution} from "@/access/isRole";
import {CollectionConfig} from "payload";

export const FamilyMembers: CollectionConfig = {
    slug: 'familyMembers',
    admin: {
        useAsTitle: 'fullName',
    },
    access: {
        create: isAdmin,
        read: isAdminOrInstitution,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        // Primary Information
        {
            name: 'fullName',
            type: 'text',
            required: true,
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            required: true,
        },
        {
            name: 'age',
            type: 'number',
        },
        {
            name: 'address',
            type: 'textarea',
        },
        {
            name: 'phoneNumber',
            type: 'text',
        },
        {
            name: 'email',
            type: 'email',
        },

        // Medical Information
        {
            name: 'bloodType',
            type: 'select',
            options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        },
        {
            name: 'allergies',
            type: 'text',
        },
        {
            name: 'chronicConditions',
            type: 'textarea',
        },

        // Emergency Contact
        {
            name: 'emergencyContact',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'relation',
                    type: 'text',
                },
                {
                    name: 'phoneNumber',
                    type: 'text',
                },
            ],
        },

        // Insurance Information
        {
            name: 'insuranceInformation',
            type: 'group',
            fields: [
                {
                    name: 'provider',
                    type: 'text',
                },
                {
                    name: 'policyNumber',
                    type: 'text',
                },
            ],
        },

        // Recent Visit
        {
            name: 'recentVisit',
            type: 'group',
            fields: [
                {
                    name: 'date',
                    type: 'date',
                },
                {
                    name: 'reason',
                    type: 'text',
                },
                {
                    name: 'notes',
                    type: 'textarea',
                },
            ],
        },

        // Profile Status
        {
            name: 'status',
            type: 'select',
            options: ['draft', 'active', 'archived'],
            defaultValue: 'draft',
        },

        // Relationships
        {
            name: 'family',
            type: 'relationship',
            relationTo: 'families',
            required: true,
        },
        {
            name: 'documents',
            type: 'relationship',
            relationTo: 'documents',
            hasMany: true,
        },
    ],
};
