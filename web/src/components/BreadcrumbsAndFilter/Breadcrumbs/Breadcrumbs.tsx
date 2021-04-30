import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GrainIcon from "@material-ui/icons/Grain";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStyles } from "../styles";

export const NavBreadcrumbs = () => {
  const classes = useStyles();
  const router = useRouter();
  const { category, genre } = router.query;
  const breadCrumb = [];
  if (category) breadCrumb.push(category);
  if (genre) breadCrumb.push(genre);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumb.length > 0 ? (
          <Link
            color="inherit"
            variant="body1"
            component="button"
            className={classes.link}
          >
            <NextLink href={`/`}>
              <div>
                <HomeIcon className={classes.icon} />
                Home
              </div>
            </NextLink>
          </Link>
        ) : (
          <Typography
            color="textPrimary"
            variant="body1"
            className={classes.link}
          >
            <HomeIcon className={classes.icon} />
            Home
          </Typography>
        )}
        {breadCrumb.map((b, index) =>
          breadCrumb.length - 1 !== index ? (
            <Link
              color="inherit"
              variant="body1"
              component="button"
              className={classes.link}
            >
              <NextLink href={`/product-category/${b}`}>
                <div>
                  <WhatshotIcon className={classes.icon} />
                  {b.toString().toUpperCase()}
                </div>
              </NextLink>
            </Link>
          ) : (
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.link}
            >
              <GrainIcon className={classes.icon} />
              {(b as string).toUpperCase()}
            </Typography>
          ),
        )}
      </Breadcrumbs>
    </>
  );
};
