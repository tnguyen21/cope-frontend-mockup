import React from "react";
import { TextField } from "@material-ui/core";

function TextInput({
  label,
  assetId,
  value,
  setValue,
}: {
  label: string;
  assetId: string;
  value: any;
  setValue: Function;
}) {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedAssetState = value.assets.items.filter(
      (item: any) => item.id === assetId
    )[0];
    updatedAssetState = { ...updatedAssetState, content: event.target.value };
    let newValue = {
      ...value,
      assets: {
        ...value.assets,
        items: value.assets.items.map((item: any) => {
          if (item.id === assetId) {
            return updatedAssetState;
          }
          return item;
        }),
      },
    };
    setValue(newValue);
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        value={
          value.assets.items.filter((item: any) => item.id === assetId)[0]
            .content
        }
        onChange={handleValueChange}
      />
    </>
  );
}

export default TextInput;
