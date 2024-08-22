import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Media } from "./collections/Media";
import Users from "@/collections/Users";
import { Notifications } from "@/collections/Notifications";
import Documents from "@/collections/Documents";
import Families from "@/collections/Families";
import Institutions from "@/collections/Institutions";
import Members from "@/collections/Members";
import Requests from "@/collections/Requests";
import BirthCerficates from "@/collections/BirthCertificates";
import BirthCertificateRequests from "@/collections/BirthCertificateRequests";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Documents,
    Requests,
    Families,
    Members,
    Institutions,
    Notifications,
    Media,
    Users,
    BirthCerficates,
    BirthCertificateRequests,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
