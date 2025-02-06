'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import system from './system';

interface ThemeProviderProps extends PropsWithChildren {}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children } = props;

    return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

export default ThemeProvider;
