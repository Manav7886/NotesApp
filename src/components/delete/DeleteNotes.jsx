// DeleteNotes.jsx
import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';
//components
import DeleteNote from './DeleteNote';
import SwipeDrawer from '../SwipeDrawer';
import EmptyDeletedNotes from './EmptyDeleteNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {
    const { deleteNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer />
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                {deleteNotes.length > 0 ?
                    <Grid container spacing={2}> {/* Add spacing prop */}
                        {deleteNotes.map(deleteNote => (
                            <Grid item key={deleteNote.id}>
                                <DeleteNote deleteNote={deleteNote} />
                            </Grid>
                        ))}
                    </Grid>
                    : <EmptyDeletedNotes />}
            </Box>
        </Box>
    );
};

export default DeleteNotes;
