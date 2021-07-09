import React from "react";
import { TextField } from "@material-ui/core";

function TextInput({
  value,
  handleChange,
  label,
}: {
  value: any;
  handleChange: any;
  label: string;
}) {
  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

export default TextInput;
