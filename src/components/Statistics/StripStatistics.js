'use client';

import VerticalBar from '@/components/Statistics/VerticalBar';
import useHistoricalQuery from '@/hooks/useHistoricalQuery';
import useStripClient from '@/hooks/useStripClient';
import {Box, Card, CardContent, CardHeader, Chip, ListItem, styled} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {LineChart, ResponsiveChartContainer} from '@mui/x-charts';
import {useEffect} from 'react';

const StyledLineChart = styled(LineChart)(({theme}) => ({
    '.MuiLineElement-root': {
        stroke: theme.palette.secondary.light,
        strokeWidth: 2,
    },
    '.MuiMarkElement-root': {
        stroke: theme.palette.secondary.main,
        scale: '0.6',
        fill: '#fff',
        strokeWidth: 2,
    }
}));

const ChartGrid = styled(Grid)(({theme}) => ({
    border: `1px solid ${theme.palette.secondary.main}`,
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
}));

export default function StripStatistics() {
    const stripClient = useStripClient();

    const {data, clear} = useHistoricalQuery({
        queryKey: ['query-stats'],
        queryFn: async () => await stripClient.getDeviceStatistics(),
        refetchInterval: 1000,
        stripClient: !!stripClient,
    }, 30);

    useEffect(() => {
        if (!stripClient) {
            return;
        }

        clear();
    }, [clear, stripClient]);

    const latest = data.slice(-1)[0];

    return (
        <Card>
            <CardHeader title="192.168.1.117" action={<Box display="flex" justifyContent="end">
                <ListItem>
                    <Chip label={`Model: ${latest?.CHIP_MODEL}`} />
                </ListItem>
                <ListItem>
                    <Chip label={`Cores: ${latest?.CHIP_CORES}`} />
                </ListItem>
                <ListItem>
                    <Chip label={`Speed: ${latest?.CHIP_SPEED}MHz`} />
                </ListItem>
            </Box>} sx={{borderBottom: ({palette}) => `1px solid ${palette.primary.main}`}} />
            <CardContent>
                <Grid container xs={12} justifyContent="space-between">
                    <ChartGrid container>
                        <Grid>
                            <VerticalBar min={0} max={100} value={latest?.CPU_USED ?? 0} label="CPU"/>
                        </Grid>
                        <Grid>
                            <StyledLineChart series={[
                                {
                                data: data.map(d => d.CPU_USED_CORE0),
                                area: false,
                                disableHighlight: true,
                                showMark: false,
                                label: 'CORE0',
                                },
                                {
                                    data: data.map(d => d.CPU_USED_CORE1),
                                    area: false,
                                    disableHighlight: true,
                                    showMark: false,
                                    label: 'CORE1'
                                },
                            ]} width={300} height={200} yAxis={[{max: 100}, {max: 100}]} disableAxisListener/>
                        </Grid>
                    </ChartGrid>
                    <ChartGrid container>
                        <Grid>
                            <VerticalBar min={0} max={latest?.HEAP_SIZE} value={latest?.HEAP_SIZE - latest?.HEAP_FREE ?? 0} label="HEAP"/>
                        </Grid>
                        <Grid>
                            <StyledLineChart series={[{
                                data: data.map(d => d.HEAP_SIZE - d.HEAP_FREE),
                                area: true,
                                disableHighlight: true,
                                showMark: false
                            }]} width={300} height={200} yAxis={[{max: latest?.HEAP_SIZE}]} disableAxisListener/>
                        </Grid>
                    </ChartGrid>
                    <ChartGrid container>
                        <Grid>
                            <VerticalBar min={0} max={latest?.DMA_SIZE} value={latest?.DME_SIZE - latest?.DMA_FREE} label="DMA"/>
                        </Grid>
                        <Grid>
                            <StyledLineChart series={[{
                                data: data.map(d => d.DMA_SIZE - d.DMA_FREE),
                                area: true,
                                disableHighlight: true,
                                showMark: false
                            }]} width={300} height={200} yAxis={[{max: latest?.DMA_SIZE}]} disableAxisListener/>
                        </Grid>
                    </ChartGrid>
                </Grid>
            </CardContent>
        </Card>
    );
}
