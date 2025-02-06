'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import system from './system';
import { Toaster } from '@/app/components';

interface ThemeProviderProps extends PropsWithChildren {}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children } = props;

    return (
        <ChakraProvider value={system}>
            {/* Register global components */}
            <Toaster />

            {children}
        </ChakraProvider>
    );
};

export default ThemeProvider;
