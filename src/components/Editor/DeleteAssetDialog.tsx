import React, { useEffect } from "react"
import { Storage } from "@aws-amplify/storage"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core"
import { asset } from "cope-client-utils"
import { AssetType } from "cope-client-utils/lib/graphql/API"

function DeleteAssetDialog({
    open,
    setOpen,
    assetId,
    assetType,
}: {
    open: string
    setOpen: any
    assetId?: string
    assetType: AssetType
}) {
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const list = async () => {
            const stored = await Storage.list("jpg", {
                level: "protected",
            })
            console.log({ stored })
            const deleted = await Storage.remove(
                "jpg/c36a0c06-143d-4737-98ae-4f1b576625ab--sad robot.jpg",
            )
        }
        list()
    }, [])
    // "https://cope-storage-bucket180042-dev.s3.us-east-1.amazonaws.com/protected/us-east-1:92a4c58a-36ff-44ca-8f04-ae3cf469c3ec/jpg/99b318a9-9902-4fcb-87a3-fce9c05b6f51--jimi.jpg"
    const deleteAsset = async (assetId?: string) => {
        const data = {
            id: assetId,
        }

        const deleted = await asset.delete(data).catch((error: any) => {
            console.error(error)
        })
        console.log({ deleted })
        handleClose()
    }

    return (
        <div>
            <Dialog
                open={assetId === open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete this {assetId}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this asset will remove this asset from the database. As a result
                        will be unable to edit this asset in the future.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteAsset(assetId)} color="primary" autoFocus>
                        Delete Asset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteAssetDialog
