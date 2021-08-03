import React from "react"
import { Grid, Card, Button, Select, InputLabel, MenuItem } from "@material-ui/core"
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API"
import { dict_node_type, toTitleCase } from "../utils"

export const DropDownNodeTypes = ({ onChange, defaultValue }) => (
    <Select value={defaultValue} onChange={onChange}>
        {Object.entries(dict_node_type).map(([ key, val ], idx) => {
            return (
                <MenuItem key={idx} value={NodeType[key]}>
                    {val}
                </MenuItem>
            )
        })}
    </Select>
)

export const DropDownNodeStatus = ({ onChange, defaultValue }) => (
    <Select value={defaultValue} onChange={onChange}>
        {Object.values(NodeStatus).map((val, idx) => {
            return (
                <MenuItem key={idx} value={NodeStatus[val]}>
                    {toTitleCase(val)}
                </MenuItem>
            )
        })}
    </Select>
)
