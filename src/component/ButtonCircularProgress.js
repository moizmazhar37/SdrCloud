import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Box, withStyles } from "@material-ui/core";

// Define custom styles
const styles = (theme) => ({
  circularProgress: {
    color: theme.palette.text.secondary,
  },
});

// ButtonCircularProgress component to display a circular loading indicator
function ButtonCircularProgress(props) {
  const { size, classes } = props;
  return (
    <Box color="secondary.main" pl={1.5} display="flex" justifyContent="center">
      <CircularProgress
        size={size ? size : 24}
        thickness={size ? (size / 5) * 24 : 5}
        className={classes.circularProgress}
      />
    </Box>
  );
}
// PropTypes for ButtonCircularProgress component
ButtonCircularProgress.propTypes = {
  size: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ButtonCircularProgress);
