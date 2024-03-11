import { useContext } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
    background-color: #f0f0f0;
`;

const DeleteNote = ({ deleteNote }) => {

    const { deleteNotes, setNotes, setDeleteNotes } = useContext(DataContext);

    const restoreNote = (deleteNote) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        setDeleteNotes(updatedNotes);
        setNotes(prevArr => [deleteNote, ...prevArr]);
    };

    const removeNote = (deleteNote) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        setDeleteNotes(updatedNotes);
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography>{deleteNote.heading}</Typography>
                <Typography>{deleteNote.text}</Typography>
            </CardContent>
            <CardActions>
                <Delete 
                    fontSize="small" 
                    style={{ marginLeft: 'auto' }} 
                    onClick={() => removeNote(deleteNote)}
                />
                <Restore 
                    fontSize="small"
                    onClick={() => restoreNote(deleteNote)}
                />
            </CardActions>
        </StyledCard>
    );
};

DeleteNote.propTypes = {
    deleteNote: PropTypes.shape({
        id: PropTypes.number.isRequired,
        heading: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};

export default DeleteNote;
