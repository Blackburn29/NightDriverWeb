'use client'
import useStripClient from '@/hooks/useStripClient';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Chip,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {useCallback} from 'react';
import {MdOutlinePlayCircle, MdRadioButtonChecked, MdRadioButtonUnchecked} from 'react-icons/md';

export default function EffectsList() {
    const stripClient = useStripClient('192.168.1.117');

    const {data, isFetched} = useQuery({
        queryKey: ['effects', stripClient?.toString()],
        queryFn: async () => await stripClient.getEffects(),
        refetchInterval: 500,
        initialData: {Effects: []},
        gcTime: 5000,
    });

    const toggleEffect = useCallback(async (effect, effectIndex) => {
        const effectFunc = effect.enabled ? () => stripClient.disableEffect(effectIndex) : () => stripClient.enableEffect(effectIndex);

        return await effectFunc();
    }, [stripClient]);

    const startEffect = useCallback(async (effectIndex) => {
        return await stripClient.setCurrentEffect(effectIndex);
    }, [stripClient]);

    if (!isFetched) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size={32}/>
            </Box>
        )
    }

    return (
        <Card>
            <CardHeader title="Effects" sx={{borderBottom: ({palette}) => `1px solid ${palette.primary.main}`}}/>
                <List dense>
                    {data.Effects.map((e, i) => (
                        <ListItem key={i} secondaryAction={
                            <Box display="flex" alignItems="center">
                                {i === data.currentEffect && <Chip size="small" color="success" label={`${data.millisecondsRemaining}ms`}/>}
                                <IconButton disabled={i === data.currentEffect} onClick={() => startEffect(i)}>
                                <MdOutlinePlayCircle/>
                                </IconButton>
                                <IconButton color={e.enabled ? 'success' : 'inherit'} onClick={() => toggleEffect(e, i)}>
                                    {e.enabled ? <MdRadioButtonChecked/> : <MdRadioButtonUnchecked/>}
                                </IconButton>
                            </Box>
                        }>
                            <ListItemText primary={e.name} />
                        </ListItem>
                    ))}
                </List>
        </Card>
    )
}
