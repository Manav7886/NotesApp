

import { DeleteOutlineOutlined as Delete} from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';

const Light = styled(Delete)`
    font-size: 120px;
    color: #636363;
`

const Text = styled(Typography)`
    color: #80868b;
    font-size: 22px
`

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh
`

const EmptyArchives = () => {
    return (
        <Container>
            <Light />
            <Text>Trash is Empty</Text>
        </Container>
    )
}

export default EmptyArchives;