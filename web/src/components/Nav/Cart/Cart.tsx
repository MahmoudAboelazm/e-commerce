import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  loadCartItems,
} from "../../../redux-state/reducers/cartItems";
import { rootReducer } from "../../../redux-state/configure-store";
import useStyles from "../styles";

export const Cart = () => {
  const classes = useStyles();
  const [anchorCart, setAnchorCart] = React.useState<null | HTMLElement>(null);
  const [currentDeletedItem, setCurrentDeletedItem] = useState(0);
  const isCartOpen = Boolean(anchorCart);
  const handleCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCart(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorCart(null);
  };

  const CartId = "primary-s";
  const cartItems = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.cart,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCartItems());
  }, []);
  const renderCart = (
    <Menu
      className={classes.cardParent}
      anchorEl={anchorCart}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={CartId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCartOpen}
      onClose={handleMenuClose}
    >
      <div className={classes.card}>
        {cartItems.list.map((item) =>
          !item ? null : (
            <List key={item.productId}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.ImageAvatar}>
                    <img
                      className={classes.image}
                      alt={item.product.title}
                      src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/06/T_7_front-247x296.jpg"
                      loading="lazy"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.product.title}
                  secondary={`${item.count} x $${item.product.price}`}
                />

                {cartItems.loading && currentDeletedItem == item.productId ? (
                  <CircularProgress
                    color="inherit"
                    className={classes.deletingItemProgress}
                  />
                ) : (
                  <HighlightOffIcon
                    className={classes.Icon}
                    onClick={() => {
                      dispatch(deleteCartItem({ productId: item.productId }));
                      setCurrentDeletedItem(item.productId);
                    }}
                  />
                )}
              </ListItem>
            </List>
          ),
        )}
      </div>
      {cartItems.list.length > 0 ? (
        <div>
          <NextLink href="/cart">
            <MenuItem>VIEW CART</MenuItem>
          </NextLink>

          <MenuItem>Subtotal: ${cartItems.total} </MenuItem>
        </div>
      ) : (
        <MenuItem style={{ cursor: "auto" }}>No products in the cart.</MenuItem>
      )}
    </Menu>
  );
  return (
    <>
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-label="cart"
          color="inherit"
          id={CartId}
          onClick={handleCartMenuOpen}
        >
          <Badge badgeContent={cartItems.list.length} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </div>

      {renderCart}
    </>
  );
};
