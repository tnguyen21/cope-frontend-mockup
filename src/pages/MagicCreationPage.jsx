import React from "react"
import { Button } from "@material-ui/core"
import { node, edge } from "cope-client-utils"
import { NodeType, NodeStatus, EdgeType } from "cope-client-utils/lib/graphql/API"

export const MagicCreationPage = () => {
    const magic = () => {
        // const nodeData = {
        //     id: "MockCourseNodeId",
        //     status: NodeStatus.DRAFT,
        //     type: NodeType.C_SERIES,
        //     owner: "tommynguyen0512@gmail.com",
        // }

        // const nodeData = {
        //     id: "MockCourseModule02",
        //     status: NodeStatus.DRAFT,
        //     type: NodeType.A_PAGE,
        //     owner: "tommynguyen0512@gmail.com",
        // }

        // node.create(nodeData)
        //     .then(res => console.log("success", res))
        //     .catch(err => console.error("ERROR", err))

        const mockEdge = {
            type: EdgeType.HAS_PART,
            from_node_id: "MockCourseNodeId",
            to_node_id: "MockCourseModule02",
        }

        edge.create(mockEdge)
            .then(res => console.log("success", res))
            .catch(err => console.error("ERROR", err))
    }

    return (
        <div>
            <h1>Magic Creation Page</h1>
            <Button
                onClick={() => {
                    magic()
                }}
            >
                Click Me
            </Button>
        </div>
    )
}
