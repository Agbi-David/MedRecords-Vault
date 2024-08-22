import { CollectionConfig } from "payload";

const BirthCertificateRequests: CollectionConfig = {
  slug: "birthCertificateRequests",
  admin: {
    useAsTitle: "requestMessage",
  },
  fields: [
    {
      name: "certificate",
      type: "relationship",
      relationTo: "birthCertificates",
      required: true,
    },

    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "requestMessage",
      type: "textarea",
    },
    {
      name: "approvedBy",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "approvedAt",
      type: "date",
    },
  ],
};

export default BirthCertificateRequests;
