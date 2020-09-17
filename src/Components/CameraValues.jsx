import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchPhotos } from '../redux/actions/marsActions'
import { connect } from "react-redux";
import { userAPI } from '../Api/api'

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

function Component({ fetchPhotos, setVisible }) {
  const classes = useStyles();

  const [rover, setRover] = React.useState('');
  const [camera, setCamera] = React.useState('');
  const [sol, setSol] = React.useState('');
  const [solValues, setSolValues] = React.useState([])
  const [cameraValues, setCameraValues] = React.useState([])
  const [manifest, setManifest] = React.useState(null);

  const handleChangeRover = async (e) => {
    setRover(e.target.value);
    setSolValues([]);
    setCameraValues([]);
    setSol("");
    setCamera("");
    const manifest = await userAPI.getManifest(e.target.value);
    setManifest(manifest);
    const solValues = Object.keys(Object.fromEntries(manifest.data.photo_manifest.photos.map(photo => [photo.sol])))
    setSolValues(solValues.filter((v, i) => i % 100 === 0));
    setVisible(1);
  };

  const handleChangeCamera = (e) => {
    setCamera(e.target.value);
    fetchPhotos(rover, e.target.value, sol);
    setVisible(1);
  };
  const handleChangeSol = (e) => {
    setSol(e.target.value);
    if (manifest) {
      const cameraValues = manifest.data.photo_manifest.photos.find((photo) => photo.sol === Number(e.target.value)).cameras
      setCameraValues(cameraValues);
    }
    setVisible(1);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select Rover</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={rover}
          onChange={handleChangeRover}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Curiosity'}>Curiosity</MenuItem>
          <MenuItem value={'Opportunity'}>Opportunity</MenuItem>
          <MenuItem value={'Spirit'}>Spirit</MenuItem>
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
          {solValues.map(sol => {
            return (
              <MenuItem key={sol} value={sol}>{sol}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select Camera</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={camera}
          onChange={handleChangeCamera}
        >
          {cameraValues.map((camera) => {
            return <MenuItem key={camera} value={camera}>{camera}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = { fetchPhotos };

export const CameraValues = connect(mapStateToProps, mapDispatchToProps)(Component);
