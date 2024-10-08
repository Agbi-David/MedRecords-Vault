import {mongooseAdapter} from '@payloadcms/db-mongodb'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'
import {Media} from './collections/Media'
import Users from "@/collections/Users";
import {Documents} from "@/collections/Documents";
import {DocumentRequests} from "@/collections/DocumentRequests";
import {Families} from "@/collections/Families";
import {FamilyMembers} from "@/collections/FamilyMembers";
import {Institutions} from "@/collections/Institutions";
import {Notifications} from "@/collections/Notifications";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [
        Documents,
        DocumentRequests,
        Families,
        FamilyMembers,
        Institutions,
        Notifications,
        Media,
        Users,
    ],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    plugins: [
        // storage-adapter-placeholder
    ],
})
