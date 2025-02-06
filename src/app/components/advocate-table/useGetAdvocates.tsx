'use client';

import { AdvocatedResponse } from '@/@types';
import { toaster } from '../ui';
import { useQuery } from '@tanstack/react-query';

interface GetAdvocatesParams {
    limit?: number;
    offset?: number;
    search?: string;
}

const fetchAdvocates = async (options: GetAdvocatesParams = {}): Promise<AdvocatedResponse> => {
    const { limit = 10, offset = 0, search } = options;
    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());
    if (search) params.append('search', search);

    const response = await fetch(`/api/advocates?${params.toString()}`);

    if (!response.ok) {
        toaster.error({
            title: 'Error',
            description: 'Oops! Failed to fetch advocates.',
            placement: 'bottom-end',
            duration: 2000,
        });
    }

    return response.json();
};

const useGetAdvocates = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['advocates'],
        queryFn: (context) => fetchAdvocates(context.queryKey[1] as GetAdvocatesParams),
        enabled: false, // Prevent automatic fetching
    });

    console.log('Data: ', data);

    return { advocateData: data, isLoading, error, refetch };
};

export default useGetAdvocates;
