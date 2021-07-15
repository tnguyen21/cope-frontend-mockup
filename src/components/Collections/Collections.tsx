import React from "react"
import Sidebar from "./Sidebar"
import CollectionHeader from "./CollectionHeader"
import CollectionList from "./CollectionList"
import { Grid } from "@material-ui/core"

function Collections({ type }: { type: string }) {
    // TODO
    // collection passed in param route can
    // be used to query for node type?
    return (
        <Grid justifyContent="space-between" container>
            <Grid item md={3}>
                <Sidebar />
            </Grid>
            <Grid item md={9}>
                <CollectionHeader collection={type} />
                <CollectionList collection={type} />
            </Grid>
        </Grid>
    )
}

export default Collections
