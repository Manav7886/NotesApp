import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import icon for adding photos

const Edit = ({ note, onSave, onCancel }) => {
    const [editedNote, setEditedNote] = useState(note);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNote({ ...editedNote, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedPhoto(reader.result);
            setEditedNote({ ...editedNote, photo: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(editedNote);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Box>
            <TextField
                name="heading"
                label="Title"
                variant="outlined"
                value={editedNote.heading}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="text"
                label="Description"
                variant="outlined"
                value={editedNote.text}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Photo:</Typography>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                />
                <label htmlFor="contained-button-file">
                    <IconButton component="span">
                        <PhotoCameraIcon />
                    </IconButton>
                </label>
                {selectedPhoto && (
                    <Box sx={{ width: '100%', marginTop: 2 }}>
                        <img src={selectedPhoto} alt="Note Photo" style={{ width: '100%', maxHeight: 200 }} />
                    </Box>
                )}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
        </Box>
    );
};

Edit.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        photo: PropTypes.string, // Add photo propType
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default Edit;
