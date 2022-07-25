import * as React from 'react';
import { Alert, Box, Button, Container, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';
import { DataGrid } from '@mui/x-data-grid';

const ListItems = ({ devices, setOpen, open }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen({ ...open, menu: false })
    };
    const columns = [
        {
            field: "SerialNumber",
            headerName: "Sarjanumero",
            width: 200
        },
        {
            field: "FullName",
            headerName: "Kokonimi",
            width: 200
        },
        {
            field: "model",
            headerName: "Malli",
            width: 100
        },
        {
            field: "City",
            headerName: "Paikkakunta",
            width: 200
        },
        {
            field: "TimeOfHandOut",
            headerName: "Luovutettu",
            width: 200
        },
        {
            field: "modify",
            sortable: false,
            headerName:
                <Button
                    onClick={() => setOpen({ ...open, add: true })}
                    variant="contained"
                    color="success"
                    component={Link}
                    to="/add">
                    Lisää laite!
                </Button>, width: 175,
            align: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        <IconButton
                            aria-controls={open.menu ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open.menu ? "true" : undefined}
                            onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem
                                component={Link}
                                onClick={() => {
                                    setOpen({ ...open, FullInfo: true })
                                }}
                                to={`/info/${params.id}`}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                <Typography variant="button">
                                    Tietoa
                                </Typography>
                                <InfoOutlinedIcon />
                            </MenuItem>
                            <MenuItem component={Link}
                                onClick={() => {
                                    setOpen({ ...open, returned: true })
                                }}
                                to={`/returned/${params.id}`}>
                                <Typography
                                    variant="button"
                                >
                                    Palautettu
                                </Typography>
                                <KeyboardReturnSharpIcon />
                            </MenuItem>
                        </Menu>
                    </Box>
                )
            }
        }]

    return (
        <Box>
            <Box width="100%">
                <DataGrid
                    columns={columns}
                    autoHeight
                    rows={devices} />
            </Box>
        </Box>
    )
}

export default ListItems