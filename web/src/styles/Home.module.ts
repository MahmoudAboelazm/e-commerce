import { makeStyles, Theme, createStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(12),
    },
  }),
);
export default useStyles;
