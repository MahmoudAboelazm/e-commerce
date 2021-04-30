import {
  Avatar,
  Button,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../new-redux/configure-store";
import {
  apiUpdateCartItem,
  deleteCartItem,
  updateItemQunatity,
} from "../../../redux-state/cartItems";
import SyncIcon from "@material-ui/icons/Sync";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useStyles } from "./styles";
import { Alert } from "@material-ui/lab";
interface ItemsProps {
  nextStep: Function;
}

const Items: React.FC<ItemsProps> = ({ nextStep }) => {
  const classes = useStyles();
  const cartItems = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.cart,
  );

  const [ids, setIds] = useState([]);
  const dispatch = useDispatch();

  // these states to show progress while updating the backend
  const [currentDeletedItem, setCurrentDeletedItem] = useState();
  const [currentUpdatedItem, setCurrentUpdatedItem] = useState();

  const [notUpdatedProductsWarning, setNotUpdatedProductsWarning] = useState(
    false,
  );
  return (
    <>
      <Grid container className={classes.root}>
        <Grid xs={12} item md={8}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell align="right">PRICE</TableCell>
                  <TableCell align="right">QUANTITY</TableCell>
                  <TableCell align="right">SUBTOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.list.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell component="th" scope="row">
                      <div className={classes.productHeader}>
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => {
                            dispatch(
                              deleteCartItem({ productId: item.productId }),
                            );
                            setIds(ids.filter((id) => id !== item.productId));
                            setCurrentDeletedItem(item.productId);
                            setCurrentUpdatedItem(undefined);
                          }}
                        >
                          {cartItems.loading &&
                          currentDeletedItem == item.productId ? (
                            <CircularProgress
                              color="inherit"
                              className={classes.itemProgress}
                            />
                          ) : (
                            <HighlightOffIcon />
                          )}
                        </Button>
                        <Avatar
                          className={classes.avatar}
                          alt={item.product.title}
                          src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/06/T_7_front-247x296.jpg"
                        />
                        <TableCell>{item.product.title}</TableCell>
                      </div>
                    </TableCell>
                    <TableCell align="right">{item.product.price} </TableCell>
                    <TableCell align="right">
                      <TextField
                        value={item.count}
                        id={`${item.productId}`}
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          parseInt(e.target.value) > 0 &&
                            dispatch(
                              updateItemQunatity({
                                count: parseInt(e.target.value),
                                productId: parseInt(e.target.id),
                              }),
                            );
                          ids.indexOf(item.productId) < 0 &&
                            setIds([...ids, item.productId]);
                        }}
                      />
                      {ids.indexOf(item.productId) > -1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setCurrentUpdatedItem(item.productId);
                            dispatch(
                              apiUpdateCartItem({
                                quantity: item.count,
                                productId: item.productId,
                              }),
                            );

                            setIds(ids.filter((id) => id !== item.productId));
                          }}
                        >
                          <SyncIcon />
                        </Button>
                      ) : (
                        <Button variant="contained" disabled>
                          {cartItems.loading &&
                          currentUpdatedItem == item.productId ? (
                            <CircularProgress
                              color="inherit"
                              className={classes.itemProgress}
                            />
                          ) : (
                            <SyncIcon />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {item.product.price * item.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid xs={12} item md={4}>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CART TOTALS</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">{cartItems.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping </TableCell>
                  <TableCell align="right">
                    Enter your address to view shipping options.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {notUpdatedProductsWarning && ids.length > 0 && (
        <Alert severity="info">
          Please make sure you updated all your cart items before you move to
          the next step!
        </Alert>
      )}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() =>
          ids.length == 0 ? nextStep() : setNotUpdatedProductsWarning(true)
        }
      >
        CheckOut Details
      </Button>
    </>
  );
};

export default Items;
