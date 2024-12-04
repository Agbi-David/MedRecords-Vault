import { CollectionConfig } from "payload";

const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Generate the custom title
        if (data.firstName && data.surname && data.middleName) {
          data.title = `${data.firstName} ${data.middleName} ${data.surname}`;
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "firstName",
      type: "text",

      required: true,
    },
    {
      name: "surname",
      type: "text",
      required: true,
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
      name: "middleName",
      type: "text",
      required: true,
    },

    {
      name: "relationship",
      type: "text",
      required: true,
    },
    {
      name: "gender",
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
        {
          label: "Other",
          value: "other",
        },
      ],
      required: true,
    },
    {
      name: "family",
      type: "relationship",
      relationTo: "families",
      required: true,
    },
    {
      name: "bloodType",
      type: "text",
    },
    {
      name: "allergies",
      type: "array",
      fields: [
        {
          name: "allergy",
          type: "text",
        },
      ],
    },
    {
      name: "medicalConditions",
      type: "array",
      fields: [
        {
          name: "condition",
          type: "text",
        },
      ],
    },
  ],
};

export default Members;
