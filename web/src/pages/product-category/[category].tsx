import { Container } from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { connect } from "react-redux";
import IconBreadcrumbs from "../../components/BreadcrumbsAndFilter/Component";
import NestedGrid from "../../components/Grid/Grid";
import Nav from "../../components/Nav/Nav";
import PaginationRounded from "../../components/Pagination/pagination";
import { rootReducer } from "../../new-redux/configure-store";
import { State } from "../../redux-state/configureStore";
import { loadSSRProducts } from "../../redux-state/products";
import useStyles from "../../styles/Home.module";

import { trackingRouterChange } from "../../utils/trackingRouterChange";
const Page: NextPage<any> = (state: ReturnType<typeof rootReducer>) => {
  const classes = useStyles();

  const products = state.products;
  const loading = trackingRouterChange();

  return (
    <>
      <Head>
        <title>
          {state.products.category &&
            state.products.category[0].toUpperCase() +
              state.products.category.slice(1)}
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
  //if (typeof window !== "undefined") return;
  store.dispatch(
    await loadSSRProducts({
      pageId: query.page ? parseInt(query.page as any) : 1,
      category: query.category as any,
      orderByPrice: query.p as string,
    }),
  );
  //console.log("query", query);
  return;
};

export default connect((state: State) => state)(Page);
