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
            <Grid item md={3}>
                <Sidebar />
            </Grid>
            <Grid item md={9}>
                <CollectionHeader collection={"A_GEM"} />
                <CollectionList collection={"A_GEM"} />
            </Grid>
        </Grid>
    )
}

export default Collections
