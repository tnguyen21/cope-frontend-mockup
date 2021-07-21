import React, { useState } from "react"
import { Snackbar, IconButton } from "@material-ui/core"

function EditorSnackbar({
    open,
    setSnackbarState,
    message,
}: {
    open: boolean
    setSnackbarState: any
    message: string
}) {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setSnackbarState({ open: false, message: "" })
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={message}
        />
    )
}

export default EditorSnackbar
