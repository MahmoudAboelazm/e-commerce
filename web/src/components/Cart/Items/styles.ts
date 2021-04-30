import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    table: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(2),
      },
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      borderRadius: "0px",
    },
    itemProgress: {
      height: theme.spacing(2) + "px!important",
      width: theme.spacing(2) + "px!important",
      margin: theme.spacing(0.5),
    },
    productHeader: {
      "& td": {
        border: "0px",
      },
      display: "flex",
    },
    button: {
      marginTop: theme.spacing(4),
    },
  }),
);
