import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const axios = require("axios");

export default function CustomizedRadios({ device, status }) {
  console.log(device);
  const [a, setValue] = React.useState(status);

  const handleChange = (event) => {
    const status = event.target.value;
    axios.put(`http://localhost:4000/control/${device}`, {
      status: `${status}`,
      level: "150",
    });
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="intensity"
        name="intensity"
        defaultValue={a}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label="Off" />
        <FormControlLabel value="1" control={<Radio />} label="On" />
        {/* <FormControlLabel value="2" control={<Radio />} label="On - 2" />
        <FormControlLabel value="3" control={<Radio />} label="On - 3" /> */}
      </RadioGroup>
    </FormControl>
  );
}
