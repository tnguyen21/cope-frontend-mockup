import React, { useState, useEffect } from "react"
import { node, edge } from "cope-client-utils"
import styled from "@emotion/styled"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@material-ui/core"
import { EDGE_TYPES } from "./utils"
import { SelectInput } from "../AssetWidgets"

const Wrapper = styled.div`
    margin: 24px 8px;
`

function AddEdgeDialog({
    open,
    setOpen,
    nodeId,
}: {
    open: boolean
    setOpen: any
    nodeId?: string
}) {
    const [nodesList, setNodesList] = useState<any>({})
    const [edgeType, setEdgeType] = useState(EDGE_TYPES.AUTHORED) // random default
    const [toNodeId, setToNodeId] = useState("")

    useEffect(() => {
        const fetchNodes = async () => {
            node
                //@ts-ignore
                .list({})
                .then((result: any) => {
                    const nodes = {}
                    result.forEach((node: any) => {
                        nodes[node.id] = node.id
                    })
                    setNodesList(nodes)
                })
                .catch((error: any) => console.error(error))
        }
        fetchNodes()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const createEdge = () => {
        const data = {
            type: edgeType,
            from_node_id: nodeId,
            to_node_id: toNodeId,
        }
        edge.create(data).catch((err: any) => console.error(err))
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Add Edge</DialogTitle>
            <DialogContent dividers={true}>
                <Wrapper>
                    <SelectInput
                        itemsAndValues={EDGE_TYPES}
                        inputLabel={"Edge Type"}
                        selectState={edgeType}
                        setSelectState={setEdgeType}
                    />
                </Wrapper>
                {nodesList && (
                    <Wrapper>
                        <SelectInput
                            itemsAndValues={nodesList}
                            inputLabel={"To Node ID"}
                            selectState={toNodeId}
                            setSelectState={setToNodeId}
                        />
                    </Wrapper>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createEdge} color="primary">
                    Add Edge
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEdgeDialog
