'use client'

import {useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';

export default function useHistoricalQuery(config, limit = 10) {
    const [data, setData] = useState([]);

    const {isFetching, data: fetchedData} = useQuery(config);

    const clear = useCallback(() => {
        setData([]);
    }, []);

    useEffect(() => {
        if (!fetchedData) {
            return;
        }

        setData(d => {
            let newData = [...d, fetchedData];

            if (newData.length > limit) {
                newData.splice(0, newData.length - limit);
            }

            return newData;
        });
    }, [fetchedData, limit]);

    return {data, isFetching, clear};
}
