import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Checkbox, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from 'react'
const SummaryInfo = ({ title, handle, currentInfo, TimeOfHandOut }) => {
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
                        margin="dense"
                        name="FullName"
                        label="Käyttäjän nimi"
                        variant="standard"
                        disabled
                        value={currentInfo.FullName}
                        style={{
                            flexBasis: "45%"
                        }} />
                    <TextField
                        disabled

                        margin="dense"
                        name="City"
                        label="Paikkakunta"
                        variant="standard"
                        value={currentInfo.City}
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
                        value={currentInfo.Address}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField

                        margin="dense"
                        name="fabricator"
                        label="Laitevalmistaja"
                        variant="standard"
                        value={currentInfo.fabricator}
                        disabled
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField

                        margin="dense"
                        name="model"
                        value={currentInfo.model}
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
                        value={currentInfo.SerialNumber}
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
                            value={TimeOfHandOut}
                            disabled
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        disabled
                        name="FilledForm"
                        control={<Checkbox
                            checked={currentInfo?.FilledForm} />}
                        label="Luovutuslomake täytetty"
                        style={{
                            flexBasis: "45%",
                            justifyContent: "center"
                        }}
                    />
                </Box>
            </DialogContent>
        </Box>
    )
}

export default SummaryInfo