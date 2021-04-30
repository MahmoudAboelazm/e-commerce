import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useStyles } from "./styles";

export const Genre = () => {
  const classes = useStyles();
  const router = useRouter();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const { category } = router.query;
    if (category) setExpanded(category as string);
  }, []);
  return (
    <>
      {[
        { name: "clothing", types: ["hoodie"] },
        { name: "shoes", types: ["men", "women", "hoodie"] },
      ].map((category, index) => (
        <Accordion
          key={index}
          className={classes.accordion}
          expanded={expanded === category.name}
          onChange={handleChange(category.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={category.name}
            id={category.name}
          >
            <NextLink
              href="/product-category/[category]"
              as={`/product-category/${category.name}`}
            >
              <Link component="button" variant="body1" color="textPrimary">
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </Link>
            </NextLink>
          </AccordionSummary>
          <AccordionDetails>
            {category.types.map((type) => (
              <NextLink
                key={type}
                href="/product-category/[category]/[genre]"
                as={`/product-category/${category.name}/${type}`}
              >
                <Link
                  className={classes.accordionLink}
                  component="button"
                  variant="body1"
                  color="textPrimary"
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </Link>
              </NextLink>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
