import React from 'react';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme';
import { QueryClientProvider } from './query';

interface ProvidersProps extends PropsWithChildren {}

const Providers = (props: ProvidersProps) => {
    const { children } = props;

    return (
        <QueryClientProvider>
            <ThemeProvider>{children}</ThemeProvider>;
        </QueryClientProvider>
    );
};

export default Providers;
