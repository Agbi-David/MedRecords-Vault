'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, X, Eye, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    url: string;
}

const DocumentSection: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            // Simulating upload process
            setTimeout(() => {
                const newDoc: Document = {
                    id: Date.now().toString(),
                    name: file.name,
                    type: file.type,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toLocaleDateString(),
                    url: URL.createObjectURL(file),
                };
                setDocuments([...documents, newDoc]);
                setIsUploading(false);
            }, 1500);
        }
    };

    const removeDocument = (id: string) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Documents</span>
                    <Label htmlFor="document-upload" className="cursor-pointer">
                        <Input
                            id="document-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                        />
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                        </Button>
                    </Label>
                </CardTitle>
                <CardDescription>
                    Manage family documents
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {documents.map((doc) => (
                        <Card key={doc.id} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="aspect-square bg-secondary rounded-md flex items-center justify-center mb-2">
                                    <FileText className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="font-medium text-sm truncate" title={doc.name}>{doc.name}</h3>
                                <p className="text-xs text-muted-foreground">{doc.type}</p>
                                <p className="text-xs text-muted-foreground">{doc.size}</p>
                                <p className="text-xs text-muted-foreground mb-2">{doc.uploadDate}</p>
                                <div className="flex justify-between">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-3 w-3 mr-1" /> View
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl">
                                            <DialogHeader>
                                                <DialogTitle>{doc.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <iframe src={doc.url} className="w-full h-[70vh]" />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="outline" size="sm" onClick={() => removeDocument(doc.id)}>
                                        <X className="h-3 w-3 mr-1" /> Remove
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {isUploading && (
                    <div className="mt-4 text-center text-muted-foreground">
                        Uploading document...
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DocumentSection;
