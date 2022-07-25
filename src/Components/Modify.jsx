import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { format } from 'date-fns';

const Modify = ({ devices, open, setOpen, setDevices }) => {

    const { id } = useParams()
    const history = useHistory()

    const activeDevice = devices.listOfDevices.filter((device) => {
        return (device.id === id);
    })[0];

    const [TimeOfHandOut, setTimeOfHandOut] = React.useState(activeDevice.TimeOfHandOutInMS)
    const formInfo = React.useRef({ ...activeDevice })

    const handleClose = () => {
        setOpen({ ...open, modify: false });
        setTimeout(() => {
            // formInfo.current = {}
            history.push("/")
        }, 500)
    };

    const handleInput = (e) => {
        const toAdd = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        formInfo.current[e.target.name] = toAdd
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const helper = devices.listOfDevices.filter((device) => {
            return (device.id !== id)
        });
        formInfo.current.TimeOfHandOutInMS = TimeOfHandOut
        formInfo.current.TimeOfHandOut = format(TimeOfHandOut, "d.M.yyyy HH:mm")
        setDevices({ ...devices, listOfDevices: [...helper, formInfo.current] })
        handleClose()
    }
    return (
        <Dialog
            open={open.modify}
            onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Muokkaa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tässä näkymässä voit muokata vapaasti tämän kirjauksen tiedot
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
                            onChange={handleInput}
                            defaultValue={activeDevice.FullName}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="City"
                            label="Paikkakunta"
                            variant="standard"
                            onChange={handleInput}
                            defaultValue={activeDevice.City}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="Address"
                            label="Osoite"
                            variant="standard"
                            onChange={handleInput}
                            defaultValue={activeDevice.Address}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="fabricator"
                            label="Laitevalmistaja"
                            variant="standard"
                            onChange={handleInput}
                            defaultValue={activeDevice.fabricator}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <TextField

                            margin="dense"
                            name="model"
                            defaultValue={activeDevice.model}
                            label="Laitemalli"
                            variant="standard"
                            onChange={handleInput}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="SerialNumber"
                            label="Sarjanumero"
                            onChange={handleInput}
                            variant="standard"
                            defaultValue={activeDevice.SerialNumber}
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
                                value={TimeOfHandOut}

                            />
                        </LocalizationProvider>
                        <FormControlLabel
                            name="FilledForm"
                            disabled
                            control={<Checkbox
                                checked={activeDevice?.FilledForm} />}
                            label="Luovutuslomake täytetty"
                            onChange={handleInput}
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
                        type='submit'>
                        Tallenna
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default Modify