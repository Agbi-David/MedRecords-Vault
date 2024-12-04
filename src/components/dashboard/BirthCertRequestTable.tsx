"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  BirthCertificate,
  BirthCertificateRequest,
  Request,
} from "@/payload-types";
import { getDocumentRequests } from "@/lib/requests";

interface BirthCertRequestsTableProps {
  initialRequests: BirthCertificateRequest[];
}

const BirthCertRequestsTable: React.FC<BirthCertRequestsTableProps> = ({
  initialRequests,
}) => {
  // const [requests, setRequests] = useState(initialRequests ?? []);
  async function handleDownload(documentId: string) {
    const request = await fetch(`/api/documents/${documentId}`);
    const response = await request.json();
    const file = response.document;
    //     if (!response.ok) return console.log("Failed to download document");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Replace with your actual base URL
    const fileUrl = `${baseUrl}${file.url}`;
    const filename = file.filename;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const generatePDF = (certificate: BirthCertificate) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Birth Certificate", 20, 20);

    // Add certificate details
    doc.setFontSize(12);
    doc.text(
      `Full Name: ${certificate.member.firstName} ${certificate.member.surname} ${certificate.member.middleName}`,
      20,
      40
    );
    doc.text(`Sex: ${certificate.Sex}`, 20, 50);
    doc.text(
      `Date of Birth: ${new Date(
        certificate.dateOfBirth
      ).toLocaleDateString()}`,
      20,
      60
    );
    doc.text(`Place of Birth: ${certificate.placeOfBirth}`, 20, 70);
    doc.text(`Town/Village: ${certificate.townOrVillage}`, 20, 80);
    doc.text(`LGA: ${certificate.LGA}`, 20, 90);
    doc.text(`State of Birth: ${certificate.stateOfBirth}`, 20, 100);
    doc.text(`Father's Name: ${certificate.fatherName}`, 20, 110);
    doc.text(`Mother's Name: ${certificate.motherName}`, 20, 120);
    doc.text(`Certificate Code: ${certificate.certCode}`, 20, 130);

    // Add creation and update dates

    // Save the PDF
    doc.save(
      `${certificate.member.firstName}-${certificate.member.surname}-${certificate.member.middleName}-BirthCertificate.pdf`
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Birth Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full name</TableHead>
            <TableHead>Request Message</TableHead>
            <TableHead>status</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialRequests?.map((request) => {
            console.log(request.certificate);

            return (
              <TableRow key={request.id}>
                <TableCell>
                  {request.certificate?.member?.firstName.toString()}{" "}
                  {request.certificate?.member?.surname.toString()}{" "}
                  {request.certificate?.member?.middleName.toString()}
                </TableCell>
                <TableCell>{request.requestMessage?.toString()}</TableCell>
                <TableCell>{request.status.toString()}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {request.status === "approved" && (
                    <Button
                      onClick={() =>
                        generatePDF(request.certificate as BirthCertificate)
                      }
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BirthCertRequestsTable;
