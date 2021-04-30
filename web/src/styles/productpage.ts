import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(18),
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

    image: {
      maxWidth: "100%",
      width: "100%",
      display: "block",
    },
  }),
);

export default useStyles;
