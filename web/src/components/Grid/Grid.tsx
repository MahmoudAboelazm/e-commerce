import { Box, Button, Fade, Modal, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import NextLink from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rootReducer } from "../../redux-state/configure-store";
import { handleAddToCart } from "../../redux-state/cartItems";
import { Genre } from "../Genres/Genre";
import useStyles from "./styles";
interface NestedGridProps {
  products: ReturnType<typeof rootReducer>["products"]["list"];
  loading: boolean;
}

const NestedGrid: React.FC<NestedGridProps> = ({ products, loading }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleOpen = (product) => {
    setOpenModal(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setOpenModal(false);
    setQuantity(1);
  };
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid
          className={`${classes.container} ${classes.genre}`}
          container
          item
          xs={3}
        >
          <Genre />
        </Grid>
        <Grid container className={classes.container} spacing={1} item md={9}>
          {loading
            ? "loading..."
            : products.map((product) => (
                <Grid
                  key={product.id}
                  item
                  lg={3}
                  md={4}
                  xs={6}
                  sm={4}
                  className={classes.productBox}
                >
                  <Box>
                    <Box className={classes.imageBox}>
                      <NextLink
                        href="/product/[title]/"
                        as={"/product/" + product.title}
                      >
                        <img
                          className={classes.image}
                          alt={product.title}
                          src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/06/T_7_front-247x296.jpg"
                          loading="lazy"
                        />
                      </NextLink>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        onClick={() => handleOpen(product)}
                      >
                        QUICK VIEW
                      </Typography>
                    </Box>
                    <Box className={classes.infoBox}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {product.categories}
                      </Typography>
                      <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                      >
                        {product.title}
                      </Typography>
                      <Typography variant="button" display="block" gutterBottom>
                        price ${product.price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Grid>
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
          closeAfterTransition={true}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              {currentProduct && (
                <>
                  <Grid id="spring-modal-description" container>
                    <Grid item xs={12} md={6}>
                      <img
                        className={classes.image}
                        src="https://flatsome3.uxthemes.com/wp-content/uploads/2013/06/T_7_front-510x510.jpg"
                        loading="lazy"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className={classes.paperDescription}
                    >
                      <Typography variant="h1">
                        {currentProduct.title}
                      </Typography>

                      <Typography variant="body1">
                        this some text for description this some text for
                        description this some text for description this some
                        text for description
                      </Typography>
                      <bdi>
                        $<span>{currentProduct.price},00</span>
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
                          onChange={(event) =>
                            setQuantity(parseInt(event.target.value as any))
                          }
                        />
                        <Button
                          variant="contained"
                          onClick={() =>
                            quantity - 1 > 0 && setQuantity(quantity - 1)
                          }
                        >
                          <RemoveIcon />
                        </Button>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          quantity > 0 &&
                            dispatch(
                              handleAddToCart({
                                productId: currentProduct.id,
                                quantity,
                              }),
                            );
                          quantity > 0 && handleClose();
                        }}
                      >
                        ADD TO CARD
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default NestedGrid;
