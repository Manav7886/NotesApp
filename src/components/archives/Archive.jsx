import { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
    background-color: #f0f0f0;
`

const Archive = ({ archive }) => {
    const { archiveNotes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    const unArchiveNote = (archiveNote) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archiveNote.id);
        setArchiveNotes(updatedNotes);
        setNotes(prevArr => [archiveNote, ...prevArr]);
    };

    const deleteNote = (archiveNote) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archiveNote.id);
        setArchiveNotes(updatedNotes);
        setDeleteNotes(prevArr => [archiveNote, ...prevArr]);
    };



    return (
        <StyledCard>
                <CardContent>
                    <Typography>{archive.heading}</Typography>
                    <Typography>{archive.text}</Typography>
                </CardContent>
                <CardActions>
                    <Unarchive 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => unArchiveNote(archive)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(archive)}
                    />
                </CardActions>
        </StyledCard>
    )
}

// Add prop validation
Archive.propTypes = {
    archive: PropTypes.shape({
        id: PropTypes.number.isRequired,
        heading: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};

export default Archive;
