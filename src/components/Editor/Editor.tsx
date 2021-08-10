import React, { useState, useEffect } from "react"
import { Auth } from "@aws-amplify/auth"
import { API, GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { EquivMap } from "@thi.ng/associative"
import styled from "styled-components"
import { Grid, Card, Button, Select, InputLabel, MenuItem } from "@material-ui/core"
import { node, asset, API as api } from "cope-client-utils"
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API"
import AddAssetDialog from "./AddAssetDialog"
import DeleteNodeDialog from "./DeleteNodeDialog"
import DeleteAssetDialog from "./DeleteAssetDialog"
import EditorSnackbar from "./EditorSnackbar"
import RenderContentPreview from "../ContentPreview/RenderContentPreview"
import EdgesList from "./EdgesList"
import AddEdgeDialog from "./AddEdgeDialog"
import { RenderAssetWidget } from "../AssetWidgets"
import { DropDownNodeTypes, DropDownNodeStatus } from "../DropDown"
import { updateAsset, updateNode } from "../../graphql/mutations"
import { TEMPLATES } from "../Collections/templates"
import { DOMnavigated$ } from "@-0/browser"
import { URL2obj, obj2URL } from "@-0/utils"
const Wrapper = styled.div`
    margin: 24px 8px;
`

const StyledButton = styled(Button)`
    margin: 0px 8px;
`

const PreviewContent = styled.div`
    list-style-position: inside;
    list-style-type: circle;
    padding: 16px 8px;
`

const PreviewHeading = styled.h2`
    margin: 0;
    font-size: 1.125rem;
`

function Editor({ nodeId }: { nodeId?: string }) {
    const [userData, setUserData] = useState<any>()
    const [nodeData, setNodeData] = useState<any>()
    const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false)
    const [addEdgeDialogOpen, setAddEdgeDialogOpen] = useState(false)
    const [deleteAssetDialogOpen, setDeleteAssetDialogOpen] = useState("")
    const [deleteNodeDialogOpen, setDeleteNodeDialogOpen] = useState(false)
    const [snackbarState, setSnackbarState] = useState({ open: false, message: "" })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                Auth.currentSession().then(res => setUserData(res.getIdToken().payload))
            } catch (error) {
                console.error(error)
            }
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        const fetchNodeData = async () => {
            try {
                nodeId &&
                    node.read({ id: nodeId }).then((res: any) => {
                        // index field on assets determine "view order"
                        const sortedItems = res.assets.items.sort((a, b) => a.index - b.index)
                        setNodeData({
                            ...res,
                            assets: { ...res.assets, items: sortedItems },
                        })
                    })
            } catch (error) {
                console.error(error)
            }
        }
        fetchNodeData()
        //console.log("Editor rerendered")
        // conditionally call this hook every time add asset dialog is opened
        // or closed (i.e. a user has added an asset) to force re-render
        // this is hacky!!
        // if a user changes node type or status, then adds asset,
        // then it will change back the draft and status back to what they are
        // remotely. need to change functions that add asset/delete assets to
        // change local nodeData object, then update remote accordingly
    }, [nodeId, addAssetDialogOpen, deleteAssetDialogOpen, addAssetDialogOpen])
    //console.log({ nodeData })

    const onStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeData({ ...nodeData, status: event.target.value })
    }

    const onNodeTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeData({ ...nodeData, type: event.target.value })
    }

    const sendNodeUpdate = async e => {
        console.time("node update")
        const updated_node = await node
            .update(nodeData)
            .then((r): api.Node => {
                console.timeEnd("node update")
                return r
            })
            .catch((error: any) => {
                console.error(error)
            })

        const todo = nodeData.assets || nodeData.assetsPr

        const updated_assets = await Promise.all(
            todo.items.map(async (_asset, idx) => {
                console.time(`asset ${idx} update`)
                const updated_asset = await asset
                    //@ts-ignore
                    .update({ ..._asset, node_id: updated_node.id })
                    .then(r => {
                        console.timeEnd(`asset ${idx} update`)
                        return r
                    })
                    .catch((error: any) => console.error(error))
                return updated_asset
            })
        )
        console.log({ updated_assets })
        //@ts-ignore
        if (nodeId !== updated_node.id) {
            const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = URL2obj(
                window.location.href
            )
            const href = obj2URL({
                URL_DOMN,
                URL_FULL,
                URL_HASH,
                URL_PATH,
                //@ts-ignore
                URL_QERY: { nodeId: updated_node.id },
                URL_SUBD,
            })

            DOMnavigated$.next({
                target: { location: { href } },
                currentTarget: document,
            })
            setSnackbarState({ open: true, message: "Node has been updated successfully" })
        }
        setSnackbarState({ open: true, message: "Node has been updated successfully" })
    }

    return (
        <Grid container>
            <EditorSnackbar
                open={snackbarState.open}
                message={snackbarState.message}
                setSnackbarState={setSnackbarState}
            />
            <Grid item md={6}>
                <Wrapper>
                    <Wrapper>
                        <Wrapper>
                            <InputLabel>Node Type</InputLabel>
                            <DropDownNodeTypes
                                onChange={onNodeTypeChange}
                                defaultValue={nodeData ? nodeData.type : "H_AUTHOR"}
                            />
                        </Wrapper>
                        <Wrapper>
                            <InputLabel>Status</InputLabel>
                            <DropDownNodeStatus
                                onChange={onStatusChange}
                                defaultValue={nodeData ? nodeData.status : "DRAFT"}
                            />
                        </Wrapper>
                        {nodeData &&
                            nodeData.assets.items.map((asset: any) => (
                                <Wrapper key={asset.id}>
                                    {RenderAssetWidget(asset, nodeData, setNodeData)}
                                    <Button
                                        variant="contained"
                                        onClick={() => setDeleteAssetDialogOpen(asset.id)}
                                    >
                                        Delete Asset
                                    </Button>
                                    <DeleteAssetDialog
                                        open={deleteAssetDialogOpen}
                                        setOpen={setDeleteAssetDialogOpen}
                                        assetId={asset.id}
                                    />
                                </Wrapper>
                            ))}
                        <Wrapper>
                            {nodeId && (
                                <StyledButton
                                    variant="contained"
                                    onClick={() => setAddAssetDialogOpen(true)}
                                >
                                    Add Asset
                                </StyledButton>
                            )}
                        </Wrapper>
                        <Wrapper>
                            {nodeData && <EdgesList nodeId={nodeData.id} />}
                            <StyledButton
                                variant="contained"
                                onClick={() => setAddEdgeDialogOpen(true)}
                            >
                                Add Edge
                            </StyledButton>
                        </Wrapper>
                        <Wrapper>
                            {nodeId && (
                                <StyledButton variant="contained" onClick={sendNodeUpdate}>
                                    Update Node
                                </StyledButton>
                            )}
                            {nodeId && (
                                <StyledButton
                                    variant="contained"
                                    onClick={() => setDeleteNodeDialogOpen(true)}
                                >
                                    Delete Node
                                </StyledButton>
                            )}
                        </Wrapper>
                        <AddEdgeDialog
                            open={addEdgeDialogOpen}
                            setOpen={setAddEdgeDialogOpen}
                            nodeId={nodeData ? nodeData.id : ""}
                        />
                        <AddAssetDialog
                            open={addAssetDialogOpen}
                            setOpen={setAddAssetDialogOpen}
                            nodeId={nodeId}
                            assets={nodeData?.assets}
                        />
                        <DeleteNodeDialog
                            open={deleteNodeDialogOpen}
                            setOpen={setDeleteNodeDialogOpen}
                            nodeId={nodeId}
                        />
                    </Wrapper>
                </Wrapper>
            </Grid>
            <Grid item md={6}>
                <Wrapper>
                    <Card>
                        <PreviewContent>
                            <PreviewHeading>Content Preview</PreviewHeading>
                            {nodeData &&
                                nodeData.assets.items
                                    .filter((asset: any) => asset.content !== "")
                                    .map((asset: any) => (
                                        <Wrapper key={asset.id}>
                                            {RenderContentPreview(asset, {
                                                content: asset.content,
                                                name: asset.name,
                                            })}
                                        </Wrapper>
                                    ))}
                        </PreviewContent>
                    </Card>
                </Wrapper>
            </Grid>
        </Grid>
    )
}

export default Editor
