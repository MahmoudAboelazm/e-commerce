import {
  Container,
  CssBaseline,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import NextLink from "next/link";
import React from "react";
import { Cart } from "./Cart/Cart";
import TemporaryDrawer from "./Drawer/Drawer";
import useStyles from "./styles";
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function NavBar() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.grow}>
        <HideOnScroll>
          <AppBar position="fixed">
            <Container>
              <Toolbar className={classes.toolBar}>
                <TemporaryDrawer />

                <NextLink href="/">
                  <Typography className={classes.title} variant="h6" noWrap>
                    E-Commerce
                  </Typography>
                </NextLink>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <div className={classes.grow} />
                <Cart />
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </div>
    </>
  );
}
