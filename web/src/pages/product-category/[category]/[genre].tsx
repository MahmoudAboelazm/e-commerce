import { Container } from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { connect } from "react-redux";
import IconBreadcrumbs from "../../../components/BreadcrumbsAndFilter/Component";
import NestedGrid from "../../../components/Grid/Grid";
import Nav from "../../../components/Nav/Nav";
import PaginationRounded from "../../../components/Pagination/pagination";
import { rootReducer } from "../../../redux-state/configure-store";
import { State } from "../../../redux-state/configureStore";
import { loadSSRProducts } from "../../../redux-state/products";
import useStyles from "../../../styles/Home.module";
import Router from "next/router";
import { trackingRouterChange } from "../../../utils/trackingRouterChange";
const Page: NextPage<any> = (state: ReturnType<typeof rootReducer>) => {
  const classes = useStyles();

  const products = state.products;

  const loading = trackingRouterChange();

  return (
    <>
      <Head>
        <title>
          {state.products.genre &&
            state.products.genre[0].toUpperCase() +
              state.products.genre.slice(1)}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Container className={classes.mainContainer}>
        <IconBreadcrumbs />
        <NestedGrid products={products.list} loading={loading} />
        <PaginationRounded
          productsQuantity={products.productsQuantity}
          count={products.pagesCount}
          currentPage={products.currentPage}
        />
      </Container>
    </>
  );
};

Page.getInitialProps = async ({ store, query }) => {
  // if (typeof window === "undefined")
  store.dispatch(
    await loadSSRProducts({
      pageId: query.page ? parseInt(query.page as any) : 1,
      genre: query.genre as any,
      orderByPrice: query.p as string,
    }),
  );

  //console.log(query);
  return;
};

export default connect((state: State) => state)(Page);
