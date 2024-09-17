import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },

  content: {
    flex: "1 1 auto",
    height: "100%",
    overflowY: "auto",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  const [contentHeight, setContentHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setContentHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content} style={{ height: contentHeight }}>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
