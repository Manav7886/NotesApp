import { useState, useRef, useContext } from 'react';
import styled from "@emotion/styled";
import { Box, TextField, ClickAwayListener, IconButton } from "@mui/material";
import PropTypes from 'prop-types'; // Import PropTypes
import { DataContext } from '../../context/DataProvider';
import { v4 as uuid } from 'uuid';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import icon for adding photos

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
    position: relative; // Add position relative for positioning the photo insert button
`

const Note = {
    id: '',
    heading: '',
    text: '',
    photo: null // Add a photo field to store the inserted photo
}

const Form = ({ onPhotoInserted }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...Note, id: uuid() });
    const fileInputRef = useRef(null);

    const { setNotes } = useContext(DataContext);

    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minHeight = '30px';
        setAddNote({ ...Note, id: uuid() });

        if (addNote.heading || addNote.text) {
            setNotes(prevArr => [addNote, ...prevArr])
        }
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    const handleAddPhoto = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Set the inserted photo to the note
        const updatedNote = { ...addNote, photo: URL.createObjectURL(file) };
        setAddNote(updatedNote);
        // Callback to notify parent component about photo insertion
        onPhotoInserted();
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField &&
                    <TextField
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='heading'
                        value={addNote.heading}
                    />
                }

                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={() => setShowTextField(true)}
                    onChange={(e) => onTextChange(e)}
                    name='text'
                    value={addNote.text}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <IconButton
                    style={{ position: 'absolute', bottom: 5, right: 5 }}
                    onClick={handleAddPhoto}
                >
                    <PhotoCameraIcon />
                </IconButton>
            </Container>
        </ClickAwayListener>
    )
}

// Add propTypes validation
Form.propTypes = {
    onPhotoInserted: PropTypes.func, // Validate onPhotoInserted prop as a function
};

export default Form;
