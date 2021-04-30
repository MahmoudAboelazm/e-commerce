import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "&>div": {
        marginBottom: theme.spacing(2),
      },
      marginTop: theme.spacing(2),
    },
    table: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(2),
      },
    },
    formBlock: {
      display: "flex",
      justifyContent: "space-between",
      "&>div:first-child": {
        marginRight: theme.spacing(2),
      },
    },
  }),
);
