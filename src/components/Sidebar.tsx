import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar: React.FC = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem button>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                {/* Add more list items for your sidebar links */}
            </List>
        </Drawer>
    );
};

export default Sidebar;