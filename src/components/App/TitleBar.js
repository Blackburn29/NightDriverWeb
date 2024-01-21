'use client';

import {useNightDriverClient} from '@/contexts/NightDriverClientContext';
import {
    AppBar, Autocomplete,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel, ListItem, ListItemText,
    Menu,
    MenuItem,
    Select,
    TextField,
    Toolbar, createFilterOptions, ListItemButton
} from '@mui/material';
import Link from 'next/link';
import {MdDeleteForever, MdMenu, MdOutlineWifi} from 'react-icons/md';
import { useState } from 'react';

const filter = createFilterOptions({
    ignoreCase: true,
});

const TitleBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = !!anchorEl;

    const {activeClient, availableClients, addClient, removeClient, setActiveClient} = useNightDriverClient();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <IconButton color="inherit" aria-label="Help" size="large" data-cy="title-bar-menu-button" onClick={handleClick}>
                    <MdMenu size="24" />
                </IconButton>
                <Link href="/">
                    <Button data-cy="title-bar-logo-button">
                        <MdOutlineWifi size={48}/>
                    </Button>
                </Link>
                <Box display="flex" flexGrow={1} />
                <Autocomplete
                    value={activeClient}
                    onChange={(event, newValue) => {
                        if (newValue.id < 0) {
                            addClient(newValue.value);
                            return;
                        }

                        setActiveClient(newValue.value);
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="client-selector"
                    options={availableClients.map((c, i) =>({value: c, label: c, id: i}))}
                    renderOption={(props, option) => <ListItemButton {...props} disabled={option.value === activeClient}>
                        <ListItemText>{option.label}</ListItemText>
                        {option.id >= 0 && <IconButton onClick={(e) => {
                            e.preventDefault();
                            removeClient(option.id);
                        }}><MdDeleteForever/></IconButton>}
                    </ListItemButton>}
                    sx={{ width: 300 }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                id: -1,
                                label: `Add "${params.inputValue}"`,
                                value: params.inputValue
                            });
                        }

                        return filtered;
                    }}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.id < 0) {
                            return option.value;
                        }
                        // Regular option
                        return option.label;
                    }}
                    isOptionEqualToValue={(o, v) => o.value === v.value}
                    renderInput={(params) => (
                        <TextField {...params} label="Device" />
                    )}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default TitleBar;
