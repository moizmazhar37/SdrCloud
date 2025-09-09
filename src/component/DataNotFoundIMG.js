import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function DataNotFoundIMG() {
  return (
    <Box
      style={{
        margin: "0 auto",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <img
          src="/images/dataNotFound.png"
          alt="Data Not Found"
          style={{ cursor: "pointer" }}
        />
      </div>

      <Typography
        style={{
          color: "#181C3299",
          fontSize: "16px",
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        No data found
      </Typography>
    </Box>
  );
}
