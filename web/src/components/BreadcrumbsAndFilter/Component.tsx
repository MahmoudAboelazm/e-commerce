import { Grid } from "@material-ui/core";
import React from "react";
import { NavBreadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { Filter } from "./Filter/Filter";
import { useStyles } from "./styles";

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12} md={6}>
          <NavBreadcrumbs />
        </Grid>
        <Grid item>
          <Filter />
        </Grid>
      </Grid>
    </>
  );
}
