'use client'

import {BarChart} from '@mui/x-charts';

export default function VerticalBar({value, label, min, max}) {
    value = !value ? 0 : value;

    return <BarChart
        series={[{data: [value]}]}
        width={150}
        height={200}
        xAxis={[{scaleType: 'band', data:[label]}]}
        yAxis={[{min, max}]}
    />
}
