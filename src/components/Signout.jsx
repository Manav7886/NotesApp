import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Button, Stack } from '@mui/material';


const Signout = () => {

    const navigateTo = useNavigate(); // Initialize the navigateTo function

    const handleSignout = () => {
        navigateTo('/signin');
    };


    return (
        <Box sx={{ position: 'absolute', top: 0, right: 0, marginRight: 2, marginTop: 2 }}>
            <Stack direction="row" spacing={2}>
               
                <Button variant="contained" color="error" onClick={handleSignout}>
                    Signout
                </Button>
            </Stack>
        </Box>
    );
};

export default Signout;
