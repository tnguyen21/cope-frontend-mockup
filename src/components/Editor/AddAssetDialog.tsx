import React, { useState } from "react"
import { asset, API } from "cope-client-utils"
import styled from "styled-components"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@material-ui/core"
import { ASSET_TYPES } from "./utils"
import { SelectInput } from "../AssetWidgets"

const Wrapper = styled.div`margin: 24px 8px;`

function AddAssetDialog({ open, setOpen, nodeId, assets }) {
    const [ assetType, setAssetType ] = useState(ASSET_TYPES.A_IMAGE) // random default -- think of better way to set this
    const [ assetName, setAssetName ] = useState("")

    const handleClose = () => {
        setOpen(false)
    }

    const handleAssetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssetName(event.target.value)
    }

    const addAsset = () => {
        const assetData = {
            name: assetName,
            type: assetType,
            node_id: nodeId,
            content: "",
            index: assets?.items?.length,
        }
        asset.create(assetData).then(() => {
            handleClose()
        })
    }

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
                        itemsAndValues={API.AssetType}
                        inputLabel={"Asset Type"}
                        selectState={assetType}
                        setSelectState={setAssetType}
                    />
                </Wrapper>
                <Wrapper>
                    <TextField
                        id="standard-basic"
                        label="Asset Name"
                        value={assetName}
                        onChange={handleAssetNameChange}
                    />
                </Wrapper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addAsset} color="primary">
                    Add Asset
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddAssetDialog
