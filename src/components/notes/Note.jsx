import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateOutlined as Create, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider'; 

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
    background-color: #f0f0f0;
`;

const Note = ({ note }) => {
    const { notes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(note);

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

    const handleEditNote = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        // Update the notes array with the edited note
        const updatedNotes = notes.map((item) => (item.id === editedNote.id ? editedNote : item));
        setNotes(updatedNotes);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Reset the edited note to the original note
        setEditedNote(note);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        // Update the edited note with the new value
        setEditedNote({
            ...editedNote,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Update the edited note with the new photo file
        setEditedNote({
            ...editedNote,
            photo: URL.createObjectURL(file)
        });
    };

    return (
        <StyledCard>
            <CardContent>
                {isEditing ? (
                    <>
                        <Typography>
                            <input
                                type="text"
                                name="heading"
                                value={editedNote.heading}
                                onChange={handleChange}
                            />
                        </Typography>
                        <Typography>
                            <input
                                type="text"
                                name="text"
                                value={editedNote.text}
                                onChange={handleChange}
                            />
                        </Typography>
                        <Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography>{note.heading}</Typography>
                        <Typography>{note.text}</Typography>
                    </>
                )}
                {editedNote.photo && <img src={editedNote.photo} alt="Note Photo" style={{ width: '100%', marginTop: 8 }} />}
            </CardContent>
            <CardActions>
                {isEditing ? (
                    <>
                        <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
                        <Button variant="contained" onClick={handleCancelEdit}>Cancel</Button>
                    </>
                ) : (
                    <Create
                        fontSize="small"
                        style={{ marginLeft: 'auto' }}
                        onClick={handleEditNote}
                    />
                )}
                <Archive
                    fontSize="small"
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
        photo: PropTypes.string, // Add photo propType
        // Add more specific PropTypes as needed
    }).isRequired,
};

export default Note;
