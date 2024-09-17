import { Box, Typography } from "@material-ui/core";
import React from "react";

// DataNotFound component to render a message when no data is found
export default function DataNotFound() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Typography style={{ color: "#181C3299", fontSize: "16px" }}>
        No data found
      </Typography>
    </Box>
  );
}
