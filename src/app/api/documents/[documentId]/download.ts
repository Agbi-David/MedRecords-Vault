// pages/api/documents/[documentId]/download.js

export default async function handler(req: any, res: any) {
  const { documentId } = req.query;

  if (req.method === "GET") {
    // Logic to find and return the document based on documentId
    // This is where you'd typically fetch the document from your database or file system
    const document = await findDocumentById(documentId); // Replace with your logic

    if (document) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${document.name}"`
      );
      res.setHeader("Content-Type", document.mimeType);
      res.send(document.data);
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// Replace this with your actual logic to find the document
async function findDocumentById(id: string) {
  // Mock data - replace this with actual data retrieval logic
  const response = await fetch(`/api/documents/${id}/download`);

  if (id) {
    return {
      name: "example.pdf",
      mimeType: "application/pdf",
      data: response.blob(), // Replace with actual file data
    };
  }
  return null;
}
