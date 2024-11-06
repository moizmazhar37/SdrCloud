import ApiConfig from "src/config/APIConfig";
import React, { useRef, useState, useEffect } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "react-js-loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function PreviewVideo(props) {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [firstName, setFirstName] = useState("");
  const history = useHistory();
  const location = useLocation();
  const firstname = location?.state?.Data?.firstName;
  const bookDemoUrl = location?.state?.Data?.bookdemo;
  const buttonText = location?.state?.Data?.meetingButtonText;
  const title = location?.state?.Data?.TemplateTitle;
  const description = location?.state?.Data?.meetingDescription;
  console.log(location?.state?.Data?.contract?.image, "logo");
  const logo = location?.state?.Data?.contract?.image;
  const intervalRef = useRef(null);

  const getTemplateId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return props?.location?.state || searchParams.get("templateId");
  };

  return (
    <div>
      <Typography>
        {" "}
        <ArrowBackIcon
          fontSize="small"
          style={{ color: "black", cursor: "pointer" }}
          onClick={() => {
            history.goBack();
          }}
        />
      </Typography>
      <Typography style={{ textAlign: "center" }}>
        <Box
          style={{
            margin: "auto",
            width: "100px",
            height: "100px",
          }}
        >
          <img
            src={logo ? logo : "images/personaprosvglogo.svg"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              aspectRatio: 1.9,
            }}
            alt="Logo"
          />
        </Box>
      </Typography>

      <Typography
        variant="h2"
        style={{ textAlign: "center", paddingTop: "30px" }}
      >
        {title ? title : `Nice to meet you ${firstname}`}
      </Typography>

      {loading ? (
        <Box style={{ textAlign: "center", paddingTop: "30px" }}>
          <Loader
            type="spinner-circle"
            color={"rgb(3, 88, 172)"}
            bgColor={"#0358ac"}
            size={100}
          />
          <Typography>
            Video generation has started and will take several minutes. We will
            update the video URL in the sheet and send an email. You may leave
            the screen.
          </Typography>
        </Box>
      ) : (
        // <div style={{ paddingTop: "28px", textAlign: "center" }}>
        //   <video width="70%" height="100%" controls>
        //     <source src={previewData?.FINAL_VIDEO_URL} type="video/mp4" />
        //     Your browser does not support the video tag.
        //   </video>
        // </div>
        <Box style={{ textAlign: "center", paddingTop: "30px" }}>
          {/* <Loader
            type="spinner-circle"
            color={"rgb(3, 88, 172)"}
            bgColor={"#0358ac"}
            size={100}
          /> */}
          <Typography variant="h4" style={{ width: "80%", margin: "auto" }}>
            Video generation has started and will take several minutes. We will
            update the video URL in the sheet and send an email. You may leave
            the screen.
          </Typography>
        </Box>
      )}

      <Typography
        variant="h4"
        style={{ textAlign: "center", paddingTop: "35px" }}
      >
        {description
          ? description
          : `Schedule a 30-minute meeting with ${firstname}`}
      </Typography>

      <Typography style={{ textAlign: "center", paddingTop: "48px" }}>
        <Button
          onClick={() => (window.location.href = bookDemoUrl)}
          style={{
            background: "#0358AC",
            maxWidth: "415px",
            width: "100%",
            height: "48px",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          {buttonText ? buttonText : "Schedule a meeting"}
        </Button>
      </Typography>
    </div>
  );
}

export default PreviewVideo;
