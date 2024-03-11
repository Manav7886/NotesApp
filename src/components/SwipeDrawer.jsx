import * as React from 'react';
import logo from '../assets/20569970.jpg';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar as MuiAppBar, Drawer as MuiDrawer } from '@mui/material';
import { Toolbar, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { CreateOutlined as Create, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Signout from './Signout';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#e6edec',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    backgroundColor: '#e6edec',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)`
  z-index: 1201;
  background: #235789;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0; 
`;
const Heading = styled(Typography)`
  color: ##fff;
  font-size: 25px;
  margin-left: 2px;
`

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




const SwipeDrawer = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const navlist = [
    { id: 1, name: 'Notes', icon: <Create />, route:'/note' },
    { id: 2, name: 'Archives', icon: <Archive />, route:'/archive' },
    { id: 3, name: 'Trash', icon: <Delete />, route:'/delete' },
  ];
  //const logo = '/home/manav/Desktop/6TH/React/Notes Project/NotesApp/src/assets/20569970.jpg';
  
  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: '20px',
            }}
          >
            <Menu />
          </IconButton>
          
          <img src={logo} alt="logo" style={{ width: 50 }} />

          <Heading>Notes App</Heading>

          <Signout /> {/* Add the signout button */}
    
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <List>
          {navlist.map((list) => (
            <ListItem key={list.id}>
              <Link to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                <ListItemIcon style={{ alignItems: 'center'}}>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default SwipeDrawer;
