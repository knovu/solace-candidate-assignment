import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Solace Candidate Assignment',
    description: 'Show us what you got',
};

interface RootLayoutProps extends Readonly<PropsWithChildren> {}

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en" suppressHydrationWarning className={inter.className}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
