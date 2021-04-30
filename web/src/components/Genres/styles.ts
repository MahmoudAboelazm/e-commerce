import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    accordion: {
      width: "100%",
      boxShadow: "none",
      backgroundColor: "transparent ",

      "& .MuiButtonBase-root": {
        minHeight: "auto",
      },
      "& .MuiAccordionSummary-content": {
        margin: 0,
      },
      "& .MuiAccordionDetails-root": {
        flexFlow: "column",
        alignItems: "baseline",
        paddingTop: 0,
      },
    },
    accordionLink: {
      borderLeft: `${theme.palette.text.hint} solid 1px`,
      paddingLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  }),
);
