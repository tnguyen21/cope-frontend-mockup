import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core"
import { asset } from "cope-client-utils"

function DeleteNodeDialog({
    open,
    setOpen,
    assetId,
    assetsList,
}: {
    open: string
    setOpen: any
    assetId?: string
    assetsList: Array<any>
}) {
    const handleClose = () => {
        setOpen(false)
    }

    const deleteAsset = (assetId?: string) => {
        const data = { id: assetId }
        let deletedYet = false
        assetsList.forEach(a => {
            if (a.id === assetId) {
                deletedYet = true
                asset.delete(data).catch((err: any) => console.error(err))
            }
            if (deletedYet) {
                asset.update({ ...a, index: a.index - 1 }).catch((err: any) => console.error(err))
            }
        })

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

export default DeleteNodeDialog
