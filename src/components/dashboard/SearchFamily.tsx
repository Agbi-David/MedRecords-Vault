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
import { Family, Document } from "@/payload-types";
import RequestDocument from "@/components/dashboard/RequestDocuement";

interface SearchFamilyProps {
  institutionId: string; // Add this prop
}

const SearchFamily: React.FC<SearchFamilyProps> = ({ institutionId }) => {
  const [familyCode, setFamilyCode] = useState("");
  const [family, setFamily] = useState<Family | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [requests, setRequests] = useState<Record<string, Request>>({});

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // First, fetch the family
      const familyResponse = await fetch(
        `/api/families?where[familyCode][equals]=${familyCode}`
      );
      if (!familyResponse.ok) {
        throw new Error("Family not found");
      }
      const familyData = await familyResponse.json();

      if (familyData.docs.length === 0) {
        throw new Error("Family not found");
      }

      const fetchedFamily = familyData.docs[0];
      setFamily(fetchedFamily);

      // Then, fetch the documents for this family
      const documentsResponse = await fetch(
        `/api/documents?where[family][equals]=${fetchedFamily.id}`
      );
      if (!documentsResponse.ok) {
        throw new Error("Failed to fetch documents");
      }
      const documentsData = await documentsResponse.json();
      setDocuments(documentsData.docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setFamily(null);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleRequestSubmit = async (message: string) => {
    if (!family || !selectedDocument) return;

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institution: institutionId,
          family: family.id,
          document: selectedDocument.id,
          message: message,
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
          <CardTitle>Search for Family</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter family code"
              value={familyCode}
              onChange={(e) => setFamilyCode(e.target.value)}
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
            <CardTitle>Family Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.description}</TableCell>
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
        <RequestDocument
          document={selectedDocument}
          onSubmit={handleRequestSubmit}
          onCancel={() => setSelectedDocument(null)}
        />
      )}
    </>
  );
};

export default SearchFamily;
