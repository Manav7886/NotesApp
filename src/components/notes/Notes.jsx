import { useContext, useState } from 'react';
import { Box, Grid, Modal, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

// components
import SwipeDrawer from '../SwipeDrawer';
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    const { notes, setNotes } = useContext(DataContext);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState('');

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(notes, result.source.index, result.destination.index);
        setNotes(items);
    };

    const handleShowPhotoModal = (photo) => {
        setSelectedPhoto(photo);
        setShowPhotoModal(true);
    };

    const handleClosePhotoModal = () => {
        setSelectedPhoto('');
        setShowPhotoModal(false);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer />
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                {notes.length > 0 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Grid
                                    container
                                    style={{ marginTop: 16 }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {notes.map((note, index) => (
                                        <Draggable key={note.id} draggableId={note.id} index={index}>
                                            {(provided, snapshot) => (
                                                <Grid
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    item
                                                >
                                                    <Note note={note} onShowPhotoModal={handleShowPhotoModal} />
                                                </Grid>
                                            )}
                                        </Draggable>
                                    ))}
                                </Grid>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <EmptyNotes />
                )}
            </Box>
            {/* Modal to display the selected photo */}
            <Modal
                open={showPhotoModal}
                onClose={handleClosePhotoModal}
                aria-labelledby="photo-modal"
                aria-describedby="modal displaying selected photo"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Paper elevation={3}>
                        <img src={selectedPhoto} alt="Selected Photo" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                    </Paper>
                </Box>
            </Modal>
        </Box>
    );
};

export default Notes;
