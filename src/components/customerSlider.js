import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const axios = require("axios");

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  input: {
    width: 41,
  },
});

const CustomizedSlider = ({ device, level }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(level);

  const handleSliderChange = (event, newValue) => {
    const level = newValue;
    axios.put(`http://localhost:4000/control/${device}`, {
      level: `${level}`,
    });
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ margin: "auto" }}>
      <Slider
        defaultValue={value}
        step={1}
        min={0}
        valueLabelDisplay="auto"
        max={255}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default CustomizedSlider;
