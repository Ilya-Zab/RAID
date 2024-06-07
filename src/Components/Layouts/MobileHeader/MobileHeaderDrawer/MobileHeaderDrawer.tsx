import * as React from 'react';
import Link from 'next/link';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';


const data = [
    {
        title: 'Prizes',
        url: '/prizes',
    }, {
        title: 'Rules',
        url: '/rules',
    }, {
        title: 'Privacy Notice',
        url: '/privacy-notice',
    }, {
        title: 'Find ID',
        url: '/find-id',
    }, {
        title: 'Email us',
        url: '/email-ul',
    }
];

const MobileHeaderDrawer = ({ toggleDrawer, open }) => {
    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {data.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component={Link} href={item.url}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

export default MobileHeaderDrawer;
