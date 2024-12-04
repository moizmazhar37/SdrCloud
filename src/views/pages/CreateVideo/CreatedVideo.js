import React, { useRef, useState, useEffect } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "react-js-loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useParams } from "react-router-dom";

const CreatedVideo = () => {
  const [loading, setLoading] = useState(false);
  const { customerId, templateId } = useParams();
  const [previewData, setPreviewData] = useState({});
  const [videoData, setVideoData] = useState({});
  console.log("videoData: ", videoData);
  const history = useHistory();
  // const location = useLocation();
  // const firstname = location?.state?.Data?.firstName;
  // const bookDemoUrl = location?.state?.Data?.bookdemo;
  const firstname = videoData?.firstName;
  const bookDemoUrl = videoData?.meetingLink;

  console.log("bookDemoUrl: ", bookDemoUrl);

  const createdVideo = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.createdVideo,

        params: {
          videoUrlId: customerId,
        },
      });

      if (res?.data?.status === 200 || res?.data?.status === 201) {
        setLoading(false);
        console.log(res?.data);
        const elementsList = res?.data?.data;
        setVideoData(elementsList);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    createdVideo();
  }, []);
  return (
    <div>
      {/* <Typography>
        <ArrowBackIcon
          fontSize="small"
          style={{ color: "black", cursor: "pointer", margin: "40px" }}
          onClick={() => {
            history.goBack();
          }}
        />
      </Typography> */}
      <Typography style={{ textAlign: "center", paddingTop: "40px" }}>
        <Box
          style={{
            margin: "auto",
            width: "200px",
            height: "50px",
          }}
        >
          <img
            src="/images/SDR.png"
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Logo"
          />
        </Box>
      </Typography>

      <Typography
        variant="h2"
        style={{ textAlign: "center", padding: "30px 0px" }}
      >
        {videoData?.TemplateTitle ? videoData?.TemplateTitle : `Nice to meet you ${firstname}`}

      </Typography>

      <Box
        style={{
          margin: "0 auto",
          width: "900px",
          height: "auto",
          '@media (max-width: 900px)': {
            width: "400px",
          }
        }}
      >
        <video
          src={videoData?.videourl}
          style={{ height: "100%", width: "100%" }}
          autoPlay
          controls
        />
      </Box>



      {/* {loading ? (
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
        previewData?.FINAL_VIDEO_URL && (
          <div style={{ paddingTop: "28px", textAlign: "center" }}>
            <video width="70%" height="100%" controls>
              <source src={previewData?.FINAL_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      )} */}

      <Typography
        variant="h4"
        style={{ textAlign: "center", paddingTop: "30px", fontFamily: "inter", fontSize: "16px", fontWeight: "500", color: "#858585" }}
      >
        {videoData?.meetingDescription ? videoData?.meetingDescription : `Schedule a 30-minute meeting with ${firstname}`}
      </Typography>

      <Typography style={{ textAlign: "center", paddingTop: "30px" }}>
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
          {videoData?.meetingButtonText ? videoData?.meetingButtonText : `Schedule a meeting`}
        </Button>
      </Typography>
    </div>
  );
};

export default CreatedVideo;
