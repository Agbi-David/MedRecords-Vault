import { customAlphabet } from "nanoid";
import { CollectionConfig } from "payload";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const generateCertCode = (
  stateOfBirth: string,
  LGA: string,
  dateOfBirth: string
) => {
  const statePrefix = stateOfBirth.slice(0, 2).toUpperCase();
  const lgaPrefix = LGA.slice(0, 2).toUpperCase();
  const year = new Date(dateOfBirth).getFullYear().toString();
  return `${statePrefix}${lgaPrefix}${year}${nanoid()}`;
};

const BirthCerticates: CollectionConfig = {
  slug: "birthCertificates",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.member && typeof data.member === "string") {
          const relatedMember = await req.payload.findByID({
            collection: "members",
            id: data.member,
          });

          if (relatedMember) {
            data.title = `${relatedMember.firstName} ${relatedMember.middleName} ${relatedMember.surname}`;
          }
        }

        if (!data.certCode) {
          if (data.stateOfBirth && data.LGA && data.dateOfBirth) {
            data.certCode = generateCertCode(
              data.stateOfBirth,
              data.LGA,
              data.dateOfBirth
            );
          }
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "member",
      type: "relationship",
      required: true,
      relationTo: "members",
    },
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        position: "sidebar",
        hidden: true,
      },
    },
    {
      name: "Sex",
      type: "select",
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      required: true,
    },
    {
      name: "dateOfBirth",
      type: "date",
      required: true,
    },
    {
      name: "placeOfBirth",
      type: "text",
      required: true,
    },
    {
      name: "townOrVillage",
      label: "Town/Village",
      type: "text",
      required: true,
    },
    {
      name: "LGA",
      type: "text",
      required: true,
    },
    {
      name: "stateOfBirth",
      type: "text",
      required: true,
    },
    {
      name: "fatherName",
      label: "Father's Name",
      type: "text",
      required: true,
    },
    {
      name: "motherName",
      type: "text",
      label: "Mother's Name",
      required: true,
    },
    {
      name: "certCode",
      type: "text",
      unique: true,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
};

export default BirthCerticates;
