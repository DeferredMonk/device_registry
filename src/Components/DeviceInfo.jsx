import { Checkbox, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DeviceInfo = ({ title, handle, error, setError, formInfo }) => {

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
                    }}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        name="fabricator"
                        label="Laitevalmistaja"
                        variant="standard"
                        onChange={handle}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        onChange={handle}
                        label="Laitemalli"
                        variant="standard"
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <TextField
                        error={Boolean(error?.SerialNumber)}
                        helperText={error.SerialNumber}
                        margin="dense"
                        name="SerialNumber"
                        label="Sarjanumero"
                        variant="standard"
                        onChange={handle}
                        style={{
                            flexBasis: "45%"
                        }}
                    />
                    <div style={{
                        flexBasis: "45%"
                    }}>
                    </div>
                </Box>
            </DialogContent>
        </Box>
    )
}

export default DeviceInfo