import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Collapse, ListItem, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: "18px",
    justifyContent: "center",
  },
  button: {
    color: "#858585",
    padding: "10px 24px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    "&:hover": {
      background: "transparent",
      color: "#032E61",
    },
  },
  buttonLeaf: {
    color: "#858585",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    borderLeft: "solid 8px transparent",
    borderRadius: 0,
    fontSize: "16px",
    marginLeft: "20px",
    "& .MuiButton-label": {
      padding: "10px",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#0358AC !important",
        // background: "#F2F7FF",
        padding: "10px",
        fontWeight: 400,
        "& $title": {
          fontWeight: 400,
        },
        "& $icon": {
          color: "#0358AC !important",
        },
      },
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: 400,
      },
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    marginLeft: theme.spacing(0),
    color: `#0C576C !important`,
    "&:hover": {
      color: "#0358AC !important",
    },
  },
  title: {
    marginRight: "auto",
  },
  active: {
    "& .MuiButton-label": {
      color: "#032E61 !important",
      padding: "10px",
      background: "transparent",
      fontWeight: "400",
      borderRadius: "9px",
      "& $title": {
        fontWeight: 400,
      },
      "& $icon": {
        color: "#fff !important",
      },
    },
  },
}));

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 5;

  if (depth > 0) {
    paddingLeft = 32 + 5 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button className={classes.button} onClick={handleToggle}>
          <img className={classes.icon} src={Icon} size="20" alt="" />
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        <img className={classes.icon} src={Icon} size="20" alt="" />
        <span className={classes.title}>{title}</span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
