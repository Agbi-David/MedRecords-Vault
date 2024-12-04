import { useState, useEffect } from 'react';
import { Request } from '@/payload-types';

interface Stats {
    totalRequests: number;
    activeRequests: number;
    urgentCases: number;
}

interface ChartData {
    name: string;
    requests: number;
}

interface PaginatedResponse {
    docs: Request[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

const useInstitutionData = () => {
    const [stats, setStats] = useState<Stats>({ totalRequests: 0, activeRequests: 0, urgentCases: 0 });
    const [requests, setRequests] = useState<Request[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch requests for the institution
                const requestsResponse = await fetch('/api/requests');
                const requestsData: PaginatedResponse = await requestsResponse.json();

                // Ensure requestsData.docs is an array
                const validRequestsData: Request[] = Array.isArray(requestsData.docs) ? requestsData.docs : [];
                setRequests(validRequestsData);

                // Calculate stats
                const totalRequests = requestsData.totalDocs;
                const activeRequests = validRequestsData.filter(req => req.status === 'pending').length;
                const urgentCases = validRequestsData.filter(req => req.status === 'urgent').length; // Assuming you have an 'urgent' status

                setStats({ totalRequests, activeRequests, urgentCases });

                // Generate chart data
                const lastSixMonths = Array.from({length: 6}, (_, i) => {
                    const d = new Date();
                    d.setMonth(d.getMonth() - i);
                    return d.toLocaleString('default', { month: 'short' });
                }).reverse();

                const chartData = lastSixMonths.map(month => ({
                    name: month,
                    requests: validRequestsData.filter(req =>
                        new Date(req.createdAt).toLocaleString('default', { month: 'short' }) === month
                    ).length
                }));

                setChartData(chartData);

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { stats, requests, chartData, loading, error };
};

export default useInstitutionData;
