import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
    background-color: #f0f0f0;
`

const Note = ({ note }) => {
    const { notes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setArchiveNotes(prevArr => [note, ...prevArr]);
    };

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.heading}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Archive
                    fontSize="small"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => archiveNote(note)}
                />
                <Delete
                    fontSize="small"
                    onClick={() => deleteNote(note)}
                />
            </CardActions>
        </StyledCard>
    );
};

Note.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        // Add more specific PropTypes as needed
    }).isRequired,
};

export default Note;