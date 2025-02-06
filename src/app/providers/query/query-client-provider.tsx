'use client';

import React from 'react';
import { PropsWithChildren } from 'react';
import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { client } from './client';

interface QueryClientProviderProps extends PropsWithChildren {}

const QueryClientProvider = (props: QueryClientProviderProps) => {
    const { children } = props;

    return <ReactQueryClientProvider client={client}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
