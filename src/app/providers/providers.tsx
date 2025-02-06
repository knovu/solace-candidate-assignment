import React from 'react';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme';

interface ProvidersProps extends PropsWithChildren {}

const Providers = (props: ProvidersProps) => {
    const { children } = props;

    return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
