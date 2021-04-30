import { Button, Container, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import useStyles from "../../styles/productpage";
const Product: NextPage<any> = () => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Head>
        <title>Prodcut</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Container className={classes.mainContainer}>
        <Grid id="spring-modal-description" container>
          <Grid item xs={12} md={4}>
            <img
              className={classes.image}
              src="https://flatsome3.uxthemes.com/wp-content/uploads/2013/06/T_7_front-510x510.jpg"
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} md={8} className={classes.paperDescription}>
            <Typography variant="h1">Product title</Typography>

            <Typography variant="body1">
              this some text for description this some text for description this
              some text for description this some text for description
            </Typography>
            <bdi>
              $<span>{158},00</span>
            </bdi>
            <div className={classes.productQuantiyy}>
              <Button
                variant="contained"
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon />
              </Button>

              <input
                value={quantity}
                min={1}
                type="number"
                onChange={(event) => setQuantity(event.target.value as any)}
              />
              <Button
                variant="contained"
                onClick={() => quantity - 1 > 0 && setQuantity(quantity - 1)}
              >
                <RemoveIcon />
              </Button>
            </div>
            <Button variant="contained" color="primary">
              ADD TO CARD
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Product;
