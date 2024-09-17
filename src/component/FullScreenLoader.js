import React from "react";
import Loader from "react-js-loader";
import { makeStyles } from "@material-ui/core/styles";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  },
}));

const FullScreenLoader = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.backdrop}>
        <Loader
          type="spinner-circle"
          color={"rgb(3, 88, 172)"}
          bgColor={"#0358ac"}
          title={"Loading..."}
          size={100}
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
