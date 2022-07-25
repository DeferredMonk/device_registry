import { Button, Container, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Add from './Components/Add'
import ListItems from './Components/ListItems';
import Modify from './Components/Modify';
import CheckInfo from './Components/CheckInfo';
import Returned from './Components/returned';
import { Box } from '@mui/system';
import { TabPanel } from '@mui/lab';
import ListItemsReturned from './Components/ListItemsReturned';
import CheckInfoReturned from './Components/CheckInfoReturned';

function App() {

  const [open, setOpen] = useState({
    tab: 0,
    add: false,
    modify: false,
    addSuccessful: false,
    FullInfo: true,
    menu: false,
    returned: true,
    FullInfoReturned: false
  })
  const [devices, setDevices] = useState({
    listOfDevices: [],
    devicesReturned: []
  })

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("Devices"))) {
      setDevices({
        listOfDevices: [],
        devicesReturned: []
      })
    } else {
      setDevices(JSON.parse(localStorage.getItem("Devices")))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("Devices", JSON.stringify(devices))
  }, [devices])

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (

    <Container>
      <Typography variant="h4"
        sx={{
          width: "50%",
          marginLeft: "10%"
        }}>Laiterekisteri</Typography>
      <Typography
        varitant="body1"
        sx={{
          width: "50%",
          marginLeft: "10%",
          marginTop: "2%",
          marginBottom: "2%"
        }}>
        Päätin luoda laiterekisterin lopputyönä sillä työpaikassani olen aina
        kaivannut laiterekisterin kirjataakseni ylös kenellä työasemat
        ovat käytössä ja missä ne ovat.
      </Typography>
      <Box style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Tabs
          value={open.tab}
          onChange={(e, value) => {
            setOpen({ ...open, tab: value })
          }}>
          <Tab label="Lainattu"
            sx={{
              minWidth: "200px"
            }} />
          <Tab label="Palautettu"
            sx={{
              minWidth: "200px"
            }} />
        </Tabs>
      </Box>
      <TabPanel value={open.tab} index={0}>
        <ListItems
          devices={devices.listOfDevices}
          setOpen={setOpen}
          open={open}
        />
      </TabPanel>
      <TabPanel value={open.tab} index={1}>
        <ListItemsReturned
          devices={devices.devicesReturned}
          setOpen={setOpen}
          open={open}
        />
      </TabPanel>
      <Switch>
        <Route path="/add">
          <Add
            open={open}
            setOpen={setOpen}
            devices={devices}
            setDevices={setDevices} />
        </Route>
        <Route path="/modify/:id">
          <Modify
            devices={devices}
            open={open}
            setOpen={setOpen}
            setDevices={setDevices} />
        </Route>
        <Route path="/info/:id">
          <CheckInfo
            devices={devices}
            open={open}
            setOpen={setOpen} />
        </Route>
        <Route path="/InfoReturned/:id">
          <CheckInfoReturned
            devices={devices}
            open={open}
            setOpen={setOpen} />
        </Route>
        <Route path="/returned/:id">
          <Returned
            devices={devices}
            open={open}
            setOpen={setOpen}
            setDevices={setDevices} />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
