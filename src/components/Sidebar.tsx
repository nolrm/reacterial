import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';


const Sidebar: React.FC = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                {/* Add more list items for your sidebar links */}
            </List>
        </Drawer>
    );
};

export default Sidebar;