import withAuth from '../components/withAuth';
import {signOut, useSession} from 'next-auth/react';
import { Button, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Container } from '@mui/material';
import { Dashboard as DashboardIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon } from '@mui/icons-material';


const AdminPage = () => {
    const { data: session, status } = useSession();
    // const classes = useStyles();

    return (
        // className={classes.root}
        <div >
            <CssBaseline />
            {/*className={classes.appBar}*/}
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            {/*className={classes.drawer}*/}
            <Drawer
                variant="permanent"
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
            >
                <Toolbar />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Drawer>
            {/*className={classes.content}*/}
            <main>
                <Toolbar />
                <Container maxWidth="lg">
                    <Typography variant="h4">Admin Dashboard</Typography>
                    <Typography variant="h6">Signed in as {session?.user?.name}</Typography>
                    <Button variant="contained" color="primary" onClick={() => signOut()}>
                        Sign out
                    </Button>
                </Container>
            </main>
        </div>
    );
};

export default withAuth(AdminPage);