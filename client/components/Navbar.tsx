import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useRouter} from "next/router";

const menuItems = [
    {text: 'Main', href: '/', icon: <HomeIcon color='primary'/>},
    {text: 'Tracks List', href: '/tracks', icon: <FormatListNumberedIcon color='primary'/>},
    {text: 'About Us', href: '/about', icon: <InfoIcon color='primary'/>},
];

const rightToolbar = {
    marginLeft: "auto",
    marginRight: -12
}

const menuButton = {
    marginRight: 16,
    marginLeft: -12
  }

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        style={menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap component="div">
                        Music Portal
                    </Typography>
                    <section style={rightToolbar}>
                        <IconButton 
                            color="inherit" 
                            aria-label="Home"
                            onClick={() => router.push('/')}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton 
                            color="inherit" 
                            aria-label="Track list"
                            onClick={() => router.push('/tracks')}
                        >
                            <FormatListNumberedIcon />
                        </IconButton>
                        <IconButton 
                            color="inherit" 
                            aria-label="About us"
                            onClick={() => router.push('/about')}
                        >
                            <InfoIcon />
                        </IconButton>
                    </section>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    {menuItems.map(({text, href, icon}, index) => (
                        <ListItem button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}