import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DeviceInfo from "./DeviceInfo";
import CustomerInfo from "./CustomerInfo";
import SummaryInfo from "./SummaryInfo";
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuid } from "uuid";
import { useHistory } from 'react-router-dom'
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function FormDialog({ open, setOpen, devices, setDevices }) {

    const formInfo = React.useRef({})
    const history = useHistory()

    const [steps, setSteps] = React.useState({
        list: [
            'Laitteen tiedot',
            'Käyttäjän tiedot',
            'Yhteenveto'
        ], step: 0
    });
    const [disabled, setDisabled] = React.useState(true)
    const [error, setError] = React.useState({})
    const [TimeOfHandOut, setTimeOfHandOut] = React.useState(new Date())

    const handleClickNext = () => {
        let errors = {}
        if (steps.step === 0) {
            if (!formInfo.current.SerialNumber) {
                console.log(errors)
                errors = { ...errors, SerialNumber: "Sarjanumero on syötettävä" }
            }
            if (Object.entries(errors).length > 0) {
                setError({ ...errors })
            }
            else {
                setError({})
                setSteps({ ...steps, step: steps.step + 1 })
            }
        }
        if (steps.step === 1) {
            if (!formInfo.current.FullName) {
                errors = { ...errors, FullName: "Käyttäjän nimi on syötettävä" }
            }
            if (!formInfo.current.City) {
                errors = { ...errors, City: "Paikkakunta on syötettävä" }
            } if (!formInfo.current.FilledForm) {
                errors = { ...errors, FilledForm: "Käyttäjän on täytettävä luovutuslomake" }
            }
            if (Object.entries(errors).length > 0) {
                setError({ ...errors })
            }
            else {
                setError({})
                setSteps({ ...steps, step: steps.step + 1 })
            }
        }
        if (steps.step === 1) {
            setTimeout(() => { setDisabled(false) }, 1500)
        }
    };
    const handleClose = () => {
        setOpen({ ...open, add: false });
        setTimeout(() => {
            formInfo.current = {}
            setTimeOfHandOut(new Date())
            setSteps({ ...steps, step: 0 })
            setDisabled(true)
            history.push("/")
        }, 500)

    };
    const handleInput = (e) => {
        const toAdd = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        formInfo.current[e.target.name] = toAdd
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        formInfo.current.TimeOfHandOutInMS = TimeOfHandOut.getTime()
        formInfo.current.TimeOfHandOut = format(TimeOfHandOut.getTime(), "d.M.yyyy HH:mm")
        formInfo.current.id = uuid()
        console.log(devices)
        setDevices({ ...devices, listOfDevices: [...devices.listOfDevices, formInfo.current] })
        handleClose()
        setDisabled(true)
    }
    return (
        <Dialog open={open.add} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ width: '100%', paddingTop: "5%" }}>
                    <Stepper activeStep={steps.step} alternativeLabel>
                        {steps.list.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {steps.step === 0
                    &&
                    <DeviceInfo
                        title={steps.list[steps.step]}
                        handle={handleInput}
                        error={error}
                        setError={setError}
                        formInfo={formInfo.current} />}
                {steps.step === 1
                    &&
                    <CustomerInfo
                        title={steps.list[steps.step]}
                        handle={handleInput}
                        error={error}
                        formInfo={formInfo.current}
                        TimeOfHandOut={TimeOfHandOut}
                        setTimeOfHandOut={setTimeOfHandOut} />}
                {steps.step === 2
                    &&
                    <SummaryInfo
                        title={steps.list[steps.step]}
                        handle={handleInput}
                        currentInfo={formInfo.current}
                        TimeOfHandOut={TimeOfHandOut}
                    />}
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="outlined">
                        Peruuta
                    </Button>
                    {steps.step === 2
                        ? <>{
                            disabled
                                ? <Button
                                    disabled>
                                    < CircularProgress color="success" size={25} />
                                </Button>
                                : <Button
                                    disabled={disabled}
                                    variant="contained"
                                    color="success"
                                    type='submit'
                                >
                                    Lisää laite!
                                </Button>}
                        </>
                        : <Button
                            onClick={handleClickNext}
                            variant="contained">
                            Seuraava
                        </Button>}
                </DialogActions>
            </form>
        </Dialog >
    );
}
