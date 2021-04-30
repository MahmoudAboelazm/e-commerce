import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      alignContent: "flex-start",
    },
    media: {
      height: 140,
    },
    genre: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      boxShadow: theme.shadows[5],
      maxWidth: 850,
      outline: "none",
    },
    paperDescription: {
      padding: theme.spacing(4),
      "& h1": {
        fontSize: "1.8em",
        marginBottom: theme.spacing(2),
      },
      "& bdi": {
        fontSize: "1.2em",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: "block",
      },
      "& input": {
        maxWidth: 50,
        textAlign: "center",
        background: "none",
        border: "none",
        outline: "none",
        color: theme.palette.text.primary,
        fontSize: "1.1em",
      },
      "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
        appearance: "none",
      },
    },
    productQuantiyy: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    productBox: {
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    imageBox: {
      cursor: "pointer",
      boxShadow:
        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      position: "relative",
      overflow: "hidden",
      "& h6": {
        position: "absolute",
        bottom: 0,
        fontSize: "1.1em",
        width: "100%",
        textAlign: "center",
        background: theme.palette.background.paper,
        margin: 0,
        transform: "translateY(100%) translateZ(0)",
        transition: ".2s",
        padding: theme.spacing(1),
      },
      "&:hover h6": {
        bottom: 0,
        transform: "translateY(0%) translateZ(0)",
      },
    },
    image: {
      maxWidth: "100%",
      width: "100%",
      display: "block",
    },
    infoBox: {
      "& *": {
        margin: 0,
        marginBottom: "-3%",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "auto",
      padding: theme.spacing(3),
    },
  }),
);

export default useStyles;
