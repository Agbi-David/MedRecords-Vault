import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Document } from "@/payload-types";

interface RequestDocumentProps {
  document: Document;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}

const RequestDocument: React.FC<RequestDocumentProps> = ({
  document,
  onSubmit,
  onCancel,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Request Document: {document.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Enter your request message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestDocument;
