import { makeStyles, Theme, createStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolBar: {
      padding: 0,
    },
    title: {
      display: "block",
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      cursor: "pointer",
    },
    cardParent: {
      "& .MuiPaper-root": {
        overflow: "visible",
        marginTop: theme.spacing(6),
      },

      "& ul": {
        padding: 0,
        // height: "100%",
      },
      "& *": {
        // borderRadius: 0,
      },
    },
    ImageAvatar: {
      borderRadius: 0,
    },
    Icon: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
    },
    card: {
      "&::before": {
        content: '""',

        display: "block",
        // height: 60,

        top: theme.spacing(-2),
        right: theme.spacing(2),
        position: "absolute",
        border: `transparent  solid ${theme.spacing(1)}px`,
        borderBottomColor: theme.palette.background.paper,
      },
      height: "100%",
      overflow: "auto",
      maxHeight: "50vh",
      outline: "none",
    },
    deletingItemProgress: {
      height: theme.spacing(2) + "px!important",
      width: theme.spacing(2) + "px!important",
    },
    search: {
      position: "relative",
      border: '""',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.background.default, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.background.default, 0.25),
      },

      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    image: {
      maxWidth: "100%",
      width: "100%",
      display: "block",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }),
);
export default useStyles;
