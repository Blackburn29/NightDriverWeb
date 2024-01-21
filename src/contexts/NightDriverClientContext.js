'use client'
import NdsClient from '@/clients/NdsClient';
import {createContext, useCallback, useContext, useMemo, useState} from 'react';

const NightDriverClientContext = createContext({});

export default function NightDriverClientProvider({defaultClients =  [], children}) {
    const [clients, setClients] = useState(defaultClients);
    const [currentClientIndex, setCurrentClientIndex] = useState(0);

    const setActiveClient = useCallback((host) => {
        setCurrentClientIndex(clients.indexOf(host));
    }, [clients]);

    const removeClient = useCallback((idx) => {
        setClients(c => {
            c.splice(idx, 1);

            if (idx === currentClientIndex) {
                setCurrentClientIndex(0);
            }

            return c;
        });
    }, [currentClientIndex])

    const addClient = useCallback((host) => {
        if (!clients.includes(host)) {
            setClients(c => [...c, host]);
        }

        const hostIdx = clients.indexOf(host);

        if (hostIdx >= 0) {
            setCurrentClientIndex(hostIdx);
        }
    }, [clients])

    return (
        <NightDriverClientContext.Provider value={{
            activeClient: clients[currentClientIndex],
            availableClients: clients,
            setActiveClient,
            addClient,
            removeClient,
        }}>
            {children}
        </NightDriverClientContext.Provider>
    );
}

export const useNightDriverClient = () => useContext(NightDriverClientContext);
