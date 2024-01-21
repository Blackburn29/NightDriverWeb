'use client'

import NdsClient from '@/clients/NdsClient';
import {useNightDriverClient} from '@/contexts/NightDriverClientContext';
import {useEffect, useState} from 'react';

/**
 * @returns {NdsClient|null}
 */
export default function useStripClient() {
    const {activeClient} = useNightDriverClient();

    const [client, setClient] = useState(null);

    useEffect(() => {
        setClient(c => {
            c?.dispose();

            if (!activeClient) {
                return null;
            }

            return new NdsClient(activeClient)
        });
    }, [activeClient]);

    return client;
}
