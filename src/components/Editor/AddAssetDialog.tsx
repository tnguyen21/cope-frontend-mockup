import React, { useState } from "react";
import { asset } from "cope-client-utils";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { ASSET_TYPES } from "./utils";
import { SelectInput, TextInput } from "../InputWidgets";

const Wrapper = styled.div`
  margin: 24px 8px;
`;

function AddAssetDialog({
  open,
  setOpen,
  nodeId,
}: {
  open: boolean;
  setOpen: Function;
  nodeId?: string;
}) {
  const [assetType, setAssetType] = useState(ASSET_TYPES.A_IMAGE); // random default -- think of better way to set this
  const [assetName, setAssetName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleAssetNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssetName(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Add Asset</DialogTitle>
      <DialogContent dividers={true}>
        <Wrapper>
          <SelectInput
            itemsAndValues={ASSET_TYPES}
            inputLabel={"Asset Type"}
            selectState={assetType}
            setSelectState={setAssetType}
          />
        </Wrapper>
        <Wrapper>
          <TextInput
            value={assetName}
            handleChange={handleAssetNameChange}
            label="Asset Name"
          />
        </Wrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save Asset
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAssetDialog;
