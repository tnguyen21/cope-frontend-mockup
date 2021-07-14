import React from "react"
import Sidebar from "./Sidebar"
import CollectionHeader from "./CollectionHeader"
import CollectionList from "./CollectionList"
import { Grid } from "@material-ui/core"

function Collections() {
    // TODO
    // collection passed in param route can
    // be used to query for node type?
    return (
        <Grid justifyContent="space-between" container>
            <Grid item xs={4}>
                <Sidebar />
            </Grid>
            <Grid item xs={8}>
                <CollectionHeader collection={"A_GEM"} />
                <CollectionList collection={"A_GEM"} />
            </Grid>
        </Grid>
    )
}

export default Collections
