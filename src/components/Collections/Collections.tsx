import React from "react";
import Sidebar from "./Sidebar";
import CollectionHeader from "./CollectionHeader";
import CollectionList from "./CollectionList";
import { Container, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

interface RouteParams {
  collection?: string;
}

function Collections() {
  // TODO
  // collection passed in param route can
  // be used to query for node type?
  let { collection } = useParams<RouteParams>();

  return (
    <Container>
      <Grid justify="space-between" container xs={12}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <CollectionHeader collection={collection} />
          <CollectionList collection={collection} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Collections;
