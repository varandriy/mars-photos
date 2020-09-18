import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchPhotos } from '../redux/actions/photosActions';
import { connect } from 'react-redux';
import { userAPI } from '../api/api';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
}));

function Component({ fetchPhotos }) {
  const [rover, setRover] = React.useState('');
  const [camera, setCamera] = React.useState('');
  const [sol, setSol] = React.useState('');
  const [solValues, setSolValues] = React.useState([]);
  const [cameraValues, setCameraValues] = React.useState([]);
  const [manifest, setManifest] = React.useState(null);
  const classes = useStyles();
  const roverValues = ['Curiosity', 'Opportunity', 'Spirit'];

  const handleRoverChange = async (e) => {
    const rover = e.target.value;
    setRover(rover);
    setSolValues([]);
    setCameraValues([]);
    setSol('');
    setCamera('');

    const manifest = await userAPI.getManifest(rover);
    setManifest(manifest);

    const { photos } = manifest.data.photo_manifest;
    const solValues = photos.map(photo => photo.sol).filter((v, i) => i % 100 === 0);
    setSolValues(solValues);
  };

  const handleCameraChange = (e) => {
    const camera = e.target.value;
    setCamera(camera);
    fetchPhotos(rover, camera, sol);
  };

  const handleChangeSol = (e) => {
    const sol = e.target.value;
    setSol(sol);

    if (manifest) {
      const { photos } = manifest.data.photo_manifest;
      const cameraValues = photos.find((photo) => photo.sol === Number(e.target.value)).cameras;
      setCameraValues(cameraValues);
    }
  };

  return (
    <div style={{ margin: 'auto' }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select Rover</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={rover}
          onChange={handleRoverChange}
        >
          {
            roverValues.map((rover) => {
              return (
                <MenuItem key={rover} value={rover}>{rover}</MenuItem>
              );
            })
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select sol</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={sol}
          onChange={handleChangeSol}
        >
          {
            solValues.map(sol => {
              return (
                <MenuItem key={sol} value={sol}>{sol}</MenuItem>
              );
            })
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select Camera</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={camera}
          onChange={handleCameraChange}
        >
          {
            cameraValues.map((camera) => {
              return <MenuItem key={camera} value={camera}>{camera}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

const mapDispatchToProps = { fetchPhotos };

export const Filter = connect(null, mapDispatchToProps)(Component);
