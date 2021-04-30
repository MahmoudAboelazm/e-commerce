import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
      margin: "auto",
      marginTop: theme.spacing(8),
      textAlign: "center",
      position: "relative",
    },
    cardElement: {
      // color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      padding: "12px",
      background: "white",
      borderRadius: "4px 4px 0 0",
    },
    button: {
      borderRadius: "0 0 4px 4px",
      "&.MuiButton-contained.Mui-disabled": {
        background: theme.palette.primary.main,
      },
    },
    spinner: {
      width: "15px!important",
      height: "15px!important",
      color: theme.palette.text.hint,
    },
    testPayment: {
      maxWidth: 160,
      margin: "auto",
      marginTop: theme.spacing(2),
      "& >div": {
        visibility: "hidden",
        opacity: "0.5",
        transition: ".2s",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        position: "absolute",
        width: "100%",
        background: theme.palette.background.paper,
        boxShadow:
          "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
        borderRadius: "5px",
        transform: "scale(.8)",
        left: 0,
        "&::before": {
          content: '""',
          display: "block",
          margin: "auto",
          border: `transparent  solid ${theme.spacing(1)}px`,
          borderBottomColor: theme.palette.background.paper,
          width: theme.spacing(2),
          background: "transparent",
          position: "relative",
          top: theme.spacing(-2),
        },
      },

      "& p": {
        display: "flex",
        justifyContent: "space-between",
        margin: `${theme.spacing(2)}px `,
      },
      "& span": {
        cursor: "pointer",
      },
      "&:hover div": {
        visibility: "visible",
        opacity: "1",
        transform: "scale(1)",
      },
    },
  }),
);

export const cardStyleOptions = {
  style: {
    base: {
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
