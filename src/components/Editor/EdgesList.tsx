import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { node, edge } from "cope-client-utils"
import { Card, Button } from "@material-ui/core"
import { Link } from ".."

const EdgesListCard = styled(Card)`
    margin: 8px 8px;
`

const EdgesListCardHeading = styled(Card)`
    padding: 8px 8px;
    font-size: 1.2em;
    font-weight: 400;
`

const EdgesListCardContent = styled.div`
    padding: 8px;
`

const EdgesListCardText = styled(Link)`
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
`

const EdgesListCardType = styled.div`
    display: inline;
    float: right;
    color: gray;
`

function EdgesList({ edges, nodeId }: { edges: Array<any>; nodeId: string }) {
    const [linkedNodesList, setLinkedNodesList] = useState<any>([])

    useEffect(() => {
        edges.forEach(e => {
            edge.read({ id: e.edge_id }).then(res => {
                setLinkedNodesList([...linkedNodesList, res])
            })
        })
    }, [])

    const deleteEdge = (edgeId: string) => {
        edge.delete({ id: edgeId }).catch((err: any) => console.error(err))
    }

    return (
        <div>
            <EdgesListCardHeading>Edges</EdgesListCardHeading>
            {linkedNodesList.map((edge, i) => {
                const toNode = edge.nodes.items.filter(n => n.id !== nodeId)[0]
                return (
                    <div key={i}>
                        <EdgesListCard>
                            <EdgesListCardContent>
                                <EdgesListCardText
                                    to={`admin/collections/edit?nodeId=${toNode.node_id}`}
                                >
                                    {toNode.node_id}
                                </EdgesListCardText>
                                <EdgesListCardType>{edge.type}</EdgesListCardType>
                                <Button onClick={() => deleteEdge(edge.id)}>Delete Edge</Button>
                            </EdgesListCardContent>
                        </EdgesListCard>
                    </div>
                )
            })}
        </div>
    )
}

export default EdgesList
