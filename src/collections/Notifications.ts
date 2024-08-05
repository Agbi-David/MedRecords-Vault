import {isAdmin, isAdminOrSelf} from "@/access/isRole";
import {CollectionConfig} from "payload";

export const Notifications: CollectionConfig = {
    slug: 'notifications',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        create: isAdmin,
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'recipient',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'type',
            type: 'select',
            options: ['document_request', 'request_approved', 'document_available'],
            required: true,
        },
        {
            name: 'content',
            type: 'text',
            required: true,
        },
        {
            name: 'relatedRequest',
            type: 'relationship',
            relationTo: 'documentRequests',
        },
        {
            name: 'isRead',
            type: 'checkbox',
            defaultValue: false,
        },
    ],
};
