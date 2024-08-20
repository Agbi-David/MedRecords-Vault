"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Request } from "@/payload-types";
import { getDocumentRequests } from "@/lib/requests";

interface RequestsTableProps {
  initialRequests: Request[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ initialRequests }) => {
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Document Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Family</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialRequests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {typeof request.family === "object"
                  ? request.family.familyName
                  : "Unknown"}
              </TableCell>
              <TableCell>
                {typeof request.document === "object"
                  ? request.document.title
                  : "Unknown"}
              </TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {request.status === "approved" && (
                  <Button
                    onClick={() =>
                      handleDownload(
                        typeof request.document === "object"
                          ? request.document.id
                          : ""
                      )
                    }
                  >
                    Download
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsTable;
