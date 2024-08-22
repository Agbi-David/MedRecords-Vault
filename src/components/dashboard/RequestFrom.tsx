'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Family, Document } from '@/payload-types';

interface RequestFormProps {
    document: Document;
    family: Family;
    onRequestSent: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ document, family, onRequestSent }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documentId: document.id,
                    familyCode: family.familyCode,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send request');
            }

            onRequestSent();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Request Access to Document</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <p><strong>Document:</strong> {document.title}</p>
                        <p><strong>Family:</strong> {family.familyName}</p>
                    </div>
                    <div className="mb-4">
                        <Textarea
                            placeholder="Enter your request message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Sending Request...' : 'Send Request'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default RequestForm;
