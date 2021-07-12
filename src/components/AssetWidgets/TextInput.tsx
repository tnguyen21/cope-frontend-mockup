import React, { useState } from "react";
import { TextField } from "@material-ui/core";

function TextInput({ label, assetId }: { label: string; assetId: string }) {
  const [value, setValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        value={value}
        onChange={handleValueChange}
      />
    </>
  );
}

export default TextInput;
