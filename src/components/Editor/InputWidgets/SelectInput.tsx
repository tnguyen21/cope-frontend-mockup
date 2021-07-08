import React, { useEffect } from "react";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

function SelectInput({
  itemsAndValues,
  inputLabel,
  selectState,
  setSelectState,
}: {
  itemsAndValues: any;
  inputLabel: string;
  selectState: any;
  setSelectState: Function;
}) {
  const onSelectChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectState(event.target.value);
  };

  return (
    <>
      <InputLabel>{inputLabel}</InputLabel>
      <Select value={selectState} onChange={onSelectChange}>
        {Object.keys(itemsAndValues).map((key) => (
          <MenuItem value={itemsAndValues[key]}>{key}</MenuItem>
        ))}
      </Select>
    </>
  );
}

export default SelectInput;
