import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CheckInfo = ({ devices, open, setOpen }) => {

    const { id } = useParams()
    const history = useHistory()

    const chosenDevice = devices.listOfDevices.filter((device) => {
        return (device.id === id);
    })[0];

    const handleClose = () => {
        setOpen({ ...open, modify: false, FullInfo: false });
        setTimeout(() => {
            // formInfo.current = {}
            history.push("/")
        }, 500)
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open.FullInfo}>
            <DialogTitle>Kirjauksen tiedot</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Alla löydät kirjauksen tiedot.
                </DialogContentText>
                <Box
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly"
                    }}>
                    <TextField
                        margin="dense"
                        name="FullName"
                        label="Käyttäjän nimi"
                        variant="standard"
                        disabled
                        value={chosenDevice.FullName}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        disabled

                        margin="dense"
                        name="City"
                        label="Paikkakunta"
                        variant="standard"
                        value={chosenDevice.City}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField

                        disabled
                        margin="dense"
                        name="Address"
                        label="Osoite"
                        variant="standard"
                        value={chosenDevice.Address}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField

                        margin="dense"
                        name="fabricator"
                        label="Laitevalmistaja"
                        variant="standard"
                        value={chosenDevice.fabricator}
                        disabled
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField

                        margin="dense"
                        name="model"
                        value={chosenDevice.model}
                        disabled
                        label="Laitemalli"
                        variant="standard"
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="SerialNumber"
                        label="Sarjanumero"
                        variant="standard"
                        value={chosenDevice.SerialNumber}
                        disabled
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField
                                style={{
                                    flexBasis: "45%",
                                    marginTop: "24px"
                                }} variant="standard"
                                {...props} />}
                            value={chosenDevice.TimeOfHandOutInMS}
                            disabled
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        disabled
                        name="FilledForm"
                        control={<Checkbox
                            checked={chosenDevice?.FilledForm} />}
                        label="Luovutuslomake täytetty"
                        style={{
                            flexBasis: "45%",
                            justifyContent: "center"
                        }} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button

                    variant="outlined"
                    onClick={handleClose}>
                    Peruuta
                </Button>
                <Button
                    variant="contained"
                    component={Link}
                    style={{
                        marginLeft: "8px"
                    }}
                    to={`/modify/${chosenDevice.id}`}
                    onClick={() => setOpen({ ...open, modify: true })}>
                    Muokkaa
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CheckInfo