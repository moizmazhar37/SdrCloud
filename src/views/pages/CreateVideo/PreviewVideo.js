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
  const intervalRef = useRef(null);

  const getPreviewData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getpreviewdata,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          type: "VIDEO",
          videoTemplateId: getTemplateId(),
        },
      });
      if (res?.status === 200) {
        const data = res.data.data;
        setPreviewData(data);
        setFirstName(data.FIRST_NAME || "");
        if (data.FINAL_VIDEO_URL !== "") {
          clearInterval(intervalRef.current); // Clear interval if FINAL_VIDEO_URL is received
        }
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial call to fetch data
    // getPreviewData();

    // Set interval to call getPreviewData every 5 seconds
    intervalRef.current = setInterval(() => {
      getPreviewData();
    }, 5000);

    return () => {
      clearInterval(intervalRef.current); // Clean up: clear interval when component unmounts
    };
  }, [location]);

  const getTemplateId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return props?.location?.state || searchParams.get("templateId");
  };

  const handleClick = () => {
    window.location.href = "https://calendly.com/pratiksha-kolase";
  };

  return (
    <div>
      <Typography>
        {" "}
        <ArrowBackIcon
          style={{ color: "black", cursor: "pointer" }}
          onClick={() => {
            history.goBack();
          }}
        />
      </Typography>
      <Typography style={{ textAlign: "center" }}>
        <img
          src={previewData?.LOGO || ""}
          style={{
            display: "block",
            margin: "auto",
            width: "300px",
            height: "100px",
          }}
          alt="Logo"
        />
      </Typography>
      <Typography
        variant="h2"
        style={{ textAlign: "center", paddingTop: "30px" }}
      >
        Nice to meet you, {firstName}
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
            This will take some time. Please wait for a few moments.
          </Typography>
        </Box>
      ) : (
        previewData?.FINAL_VIDEO_URL && (
          <div style={{ paddingTop: "28px", textAlign: "center" }}>
            <video width="70%" height="100%" controls>
              <source src={previewData?.FINAL_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      )}

      <Typography
        variant="h4"
        style={{ textAlign: "center", paddingTop: "35px" }}
      >
        Schedule a 30-minute meeting to learn more.
      </Typography>

      <Typography style={{ textAlign: "center", paddingTop: "48px" }}>
        <Button
          onClick={handleClick}
          style={{
            background: "#0358AC",
            width: "415px",
            height: "48px",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Schedule a meeting
        </Button>
      </Typography>
    </div>
  );
}

export default PreviewVideo;
