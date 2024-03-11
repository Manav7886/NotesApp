import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';
import SwipeDrawer from '../SwipeDrawer';
import EmptyArchives from '../archives/EmptyArchives';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {

    const { archiveNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer />
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />

                {archiveNotes.length > 0 ?

                    <Grid container spacing={2}> {/* Add spacing prop */}
                        {
                            archiveNotes.map(archive => (
                                <Grid item key={archive.id}> {/* Add key prop */}
                                    <Archive archive={archive} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    : <EmptyArchives />}
            </Box>
        </Box>
    )
}

export default Archives;
