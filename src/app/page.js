import EffectsList from '@/components/Effects/EffectsList';
import StripStatistics from '@/components/Statistics/StripStatistics';
import Grid from '@mui/material/Grid';

export default async function Home() {
    return <Grid container sx={{p: 4}}>
        <Grid xs={12} sx={{mb: 3}}>
            <StripStatistics/>
        </Grid>
        <Grid xs={12}>
            <EffectsList/>
        </Grid>
    </Grid>;
}
