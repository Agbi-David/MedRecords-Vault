"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Family, Document, Request, BirthCertificate } from "@/payload-types";
import RequestDocument from "@/components/dashboard/RequestDocuement";
import RequestBirthCert from "./RequestBirthCert";

interface SearchBirthCertificatesProps {
  institutionId: string; // Add this prop
}

const SearchBirthCertificates: React.FC<SearchBirthCertificatesProps> = ({
  institutionId,
}) => {
  const [certCode, setCertCode] = useState("");
  const [family, setFamily] = useState<Family | null>(null);
  const [documents, setDocuments] = useState<BirthCertificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] =
    useState<BirthCertificate | null>(null);
  const [requests, setRequests] = useState<Record<string, Request>>({});

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // First, fetch the family
      const certResponse = await fetch(
        `/api/birthCertificates?where[certCode][equals]=${certCode}`
      );
      if (!certResponse.ok) {
        throw new Error("cert not found");
      }
      const certData = await certResponse.json();

      if (certData.docs.length === 0) {
        throw new Error("cert not found");
      }

      setDocuments(certData.docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestDocument = (document: BirthCertificate) => {
    setSelectedDocument(document);
  };

  const handleRequestSubmit = async (message: string) => {
    if (!selectedDocument) return;

    try {
      const response = await fetch("/api/birthCertificateRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificate: selectedDocument.id,
          requestMessage: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const newRequest: Request = await response.json();
      setRequests((prev) => ({ ...prev, [selectedDocument.id]: newRequest }));
      setSelectedDocument(null);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError("Failed to submit request. Please try again.");
    }
  };

  const handleDownload = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`);
      if (!response.ok) throw new Error("Failed to download document");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "document.pdf"; // You might want to get the actual filename from the backend
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      setError("Failed to download document. Please try again.");
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Birth Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter Birth Cert code"
              value={certCode}
              onChange={(e) => setCertCode(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {family && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Family Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> {family.familyName}
            </p>
            <p>
              <strong>Contact Email:</strong> {family.contactEmail}
            </p>
            <p>
              <strong>Family Code:</strong> {family.familyCode}
            </p>
          </CardContent>
        </Card>
      )}

      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Birth Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full name</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Mother Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      {doc?.member?.firstName} {doc?.member?.surname}{" "}
                      {doc?.member?.middleName}
                    </TableCell>
                    <TableCell>{doc.fatherName}</TableCell>
                    <TableCell>{doc.motherName}</TableCell>
                    <TableCell>
                      {requests[doc.id]?.status === "approved" ? (
                        <Button onClick={() => handleDownload(doc.id)}>
                          Download
                        </Button>
                      ) : requests[doc.id]?.status === "pending" ? (
                        <span>Request Pending</span>
                      ) : (
                        <Button onClick={() => handleRequestDocument(doc)}>
                          Request
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedDocument && (
        <RequestBirthCert
          document={selectedDocument}
          onSubmit={handleRequestSubmit}
          onCancel={() => setSelectedDocument(null)}
        />
      )}
    </>
  );
};

export default SearchBirthCertificates;
