import * as React from 'react';
import { Alert, Box, Button, Container, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const ListItemsReturned = ({ devices, setOpen, open }) => {

    const columns = [
        {
            field: "SerialNumber",
            headerName: "Sarjanumero",
            width: 150
        },
        {
            field: "FullName",
            headerName: "Kokonimi",
            width: 200
        },
        {
            field: "model",
            headerName: "Malli",
            width: 150
        },
        {
            field: "City",
            headerName: "Paikkakunta",
            width: 150
        },
        {
            field: "TimeOfHandOut",
            headerName: "Luovutettu",
            width: 150
        },
        {
            field: "TimeOfReturn",
            headerName: "Palautettu",
            width: 150
        },
        {
            field: "",
            align: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={() => {
                            setOpen({ ...open, FullInfoReturned: true })
                        }}
                        to={`/InfoReturned/${params.id}`}
                        component={Link}>
                        <InfoOutlinedIcon />
                    </IconButton>
                )
            }
        }]

    return (
        <Box width="100%">
            <DataGrid
                columns={columns}
                autoHeight
                rows={devices} />
        </Box >
    )
}

export default ListItemsReturned