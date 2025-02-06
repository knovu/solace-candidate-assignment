'use client';

import { AdvocatedResponse } from '@/@types';
import { toaster } from '../ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useCallback } from 'react';

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

const useGetAdvocates = (initialLimit = 10, initialOffset = 0) => {
    const [limit, setLimit] = useState<number | undefined>(initialLimit);
    const [offset, setOffset] = useState<number | undefined>(initialOffset);
    const [search, setSearch] = useState<string | undefined>('');

    const query = useQuery({
        queryKey: ['searchData', { limit, offset, search }],
        queryFn: () => {
            console.log({
                limit,
                offset,
                search,
            });

            fetchAdvocates({ limit, offset, search });
        },
        enabled: false,
    });

    const fetchData = useCallback((options?: GetAdvocatesParams) => {
        if (options) {
            const { limit, offset, search } = options;
            setLimit(limit);
            setOffset(offset);
            setSearch(search);
        }

        query.refetch();
    }, []);

    return { ...query, fetchData };
};

export default useGetAdvocates;
