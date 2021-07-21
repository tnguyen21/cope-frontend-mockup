import React, { useState } from "react"
import { asset } from "cope-client-utils"
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

const Wrapper = styled.div`
    margin: 24px 8px;
`

function AddAssetDialog({
    open,
    setOpen,
    nodeId,
    assetsList, // list of assets associated with nodeId, passed in from editor so we don't have to re-do query
}: {
    open: boolean
    setOpen: any
    nodeId?: string
    assetsList: Array<any>
}) {
    const [assetType, setAssetType] = useState(ASSET_TYPES.A_IMAGE) // random default -- think of better way to set this
    const [assetName, setAssetName] = useState("")

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
            index: assetsList.length + 1,
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
                        itemsAndValues={ASSET_TYPES}
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
