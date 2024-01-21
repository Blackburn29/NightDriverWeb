'use client';

import NightDriverClientProvider from '@/contexts/NightDriverClientContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({});

/**
 * Registers global client-side contexts or providers
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function Providers({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <NightDriverClientProvider>
                {children}
                <ReactQueryDevtools initialOpen={false}/>
            </NightDriverClientProvider>
        </QueryClientProvider>
    );
}
