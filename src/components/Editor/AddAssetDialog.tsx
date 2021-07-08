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
import { SelectInput } from "./InputWidgets";

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
  const handleClose = () => {
    setOpen(false);
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
        <SelectInput
          itemsAndValues={ASSET_TYPES}
          inputLabel={"Asset Type"}
          selectState={assetType}
          setSelectState={setAssetType}
        />
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
