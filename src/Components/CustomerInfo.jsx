import { Checkbox, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material'
import { Box } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import React from 'react'

const CustomerInfo = ({ title, handle, error, TimeOfHandOut, setTimeOfHandOut }) => {
    return (
        <Box>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Lisätäksesi laite laiterekisteriin, täytä alla oleva lomake.
                </DialogContentText>
                <Box
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly"
                    }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="FullName"
                        error={Boolean(error?.FullName)}
                        helperText={error.FullName}
                        label="Käyttäjän nimi"
                        variant="standard"
                        onChange={handle}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        onChange={handle}
                        error={Boolean(error?.City)}
                        helperText={error.City}
                        margin="dense"
                        name="City"
                        label="Paikkakunta"
                        variant="standard"
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        onChange={handle}
                        margin="dense"
                        name="Address"
                        label="Osoite"
                        variant="standard"
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
                            onChange={(newValue) => {
                                setTimeOfHandOut(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <FormControl
                        error={Boolean(error?.FilledForm)}
                        style={{
                            flexBasis: "45%",
                            justifyContent: "center"
                        }}>
                        <FormControlLabel
                            onChange={handle}
                            name="FilledForm"
                            control={<Checkbox />}
                            label="Luovutuslomake täytetty"
                            style={{
                                justifyContent: "center"
                            }}
                        />
                        <FormHelperText>{error.FilledForm}</FormHelperText>
                    </FormControl>
                    <div style={{
                        flexBasis: "45%"
                    }}>
                    </div>
                </Box>
            </DialogContent >
        </Box >
    )
}

export default CustomerInfo