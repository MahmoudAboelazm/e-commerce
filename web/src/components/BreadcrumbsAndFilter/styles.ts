import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: "flex",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    container: {
      alignItems: "center",
      justifyContent: "space-between",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      "& .Mui-focused": {
        color: theme.palette.text.primary,
      },
      "& .MuiInput-underline:after": {
        borderColor: theme.palette.text.primary,
      },
    },
  }),
);
