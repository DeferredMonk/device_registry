import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { format } from 'date-fns';

const Returned = ({ devices, setDevices, open, setOpen }) => {

    const { id } = useParams()
    const history = useHistory()

    const activeDevice = devices.listOfDevices.filter((device) => {
        return (device.id === id);
    })[0];

    const [TimeOfReturn, setTimeOfReturn] = React.useState(new Date())
    const formInfo = React.useRef({ ...activeDevice })

    const handleClose = () => {
        setOpen({ ...open, returned: false });
        history.push("/")
    };

    const handleInput = (e) => {
        const toAdd = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        formInfo.current[e.target.name] = toAdd
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        formInfo.current.TimeOfReturnInMS = TimeOfReturn
        formInfo.current.TimeOfReturn = format(TimeOfReturn, "d.M.yyyy HH:mm")
        const helper = devices.listOfDevices.filter((device) => {
            return (device.id !== id)
        });
        console.log(formInfo.current)
        setDevices({ ...devices, devicesReturned: [...devices.devicesReturned, formInfo.current], listOfDevices: [...helper] })
        handleClose()
    }
    return (
        <Dialog
            open={open.returned}
            onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Palautuksen tiedot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tässä näkymässä voit kuitata työaseman palautusta!
                    </DialogContentText>
                    <Box
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly"
                        }}>
                        <TextField
                            margin="dense"
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
                            onChange={handleInput}
                            variant="standard"
                            defaultValue={activeDevice.SerialNumber}
                            style={{
                                flexBasis: "45%"
                            }}
                        />
                        <Typography
                            component="div"
                            style={{
                                marginTop: "30px",
                                display: "flex",
                                flexBasis: "45%",
                                justifyContent: "flex-end"
                            }}>Palautettu:</Typography>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField
                                    style={{
                                        flexBasis: "45%",
                                        marginTop: "24px"
                                    }} variant="standard"
                                    {...props} />}
                                value={TimeOfReturn}
                                onChange={setTimeOfReturn}
                            />
                        </LocalizationProvider>
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
                        type='submit'
                        color="success">
                        Vahvista
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default Returned