import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { AiTwotoneDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import { Close } from "@material-ui/icons";
const SOCKET_SERVER_URL = "wss://socket-videogenerator.mobiloitte.io";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  main: {
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 21px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    height: "100%",
    minHeight: "450px",
    "& .elementBox": {
      border: "1px solid #ECECEC",
      borderRadius: "6px",
      padding: "20px",
      "& .MuiIconButton-root": {
        padding: "5px",
      },
    },
    "& .sheetbtn": {
      borderRadius: "6px ",
      background: " #0358AC",
      color: "white",
      marginTop: "5px",
      height: "42px",
      width: "100px",
    },
    "& .sheetbtnDisables": {
      borderRadius: " 6px",
      background: "#F4F4F4",
      marginTop: "5px",
      color: "black",
      height: "42px",
      width: "100px",
    },
    "& .MuiButton-outlined": {
      border: "1px solid #0358AC",
      borderRadius: "8px",
      color: "#152F40",
    },
  },
  img: {
    height: "100px",
    width: "100%",
    objectFit: "cover",
  },

  dialog: {
    "& .MuiPaper-rounded": {
      borderRadius: "16px",
    },
    "& h5": {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: 700,
      color: "#152F40",
    },
    "& h4": {
      textAlign: "center",
      padding: "10px 30px",
      color: "#152F40",
    },
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      gap: "20px",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: "red",
    },
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "14px",
    },
    "& .MuiDialog-paper": {
      overflowY: "visible",
    },
    "& .MuiDialogTitle-root": {
      position: "relative",
    },
    "& .MuiSvgIcon-root": {
      color: "#152F40",
      position: "absolute",
      top: "-15px",
      padding: "5px",
      background: "white",
      border: "thin solid #ECECEC",
      borderRadius: "50px",
      right: "-5px",
      cursor: "pointer",
    },
  },
}));

function Summary({
  linkObject,
  templateParams,
  reloadData,
  viewParams,
  setIsSectionCompleted,
  getTemplateByID,
  videoUrl,
}) {
  const classes = useStyles();
  const history = useHistory();
  console.log(linkObject, "linkObject");
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [videoTemplateId, setVideoTemplateId] = useState("");
  const [creationProcess, setCreationProcess] = useState("");
  console.log("creationProcess: ", creationProcess);

  const [previewData, setPreviewData] = useState("");
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleNext = () => {
    setIsSectionCompleted(true);
    if (templateParams?.sheetId === null) {
      toast.error("Please connect google sheet.");
    }
  };

  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");
  const handleSheetData = async () => {
    if (templateParams?.sheetId !== null) {
      setLoading(true);
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.createVideoWithSheet,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            videoTemplateId: templateId,
          },
        });
        if (res?.data?.status === 200 || res?.data?.status === 201) {
          setLoading(false);
          const Data = res?.data?.data;

          history.push({
            pathname: "/preview-video",
            state: { templateId, Data },
          });
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
        console.log(error, "errorss");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please connect the sheet to template!");
    }
  };
  const deleteVideoElement = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteElement,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          videoTempalteRefferalId: deleteId,
          videoTemplateId: videoTemplateId,
        },
      });
      if (res?.data?.status === 200) {
        setIsSectionCompleted(true);
        setLoading(false);
        setDeleteOpen(false);
        reloadData();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const getTemplate = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getTemplatebyID}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // params: {
        //   hvo_template_id: templateId,
        // },
      });

      if (res?.status === 200) {
        console.log(res?.data?.data, "creationstatus");

        setCreationProcess(res?.data?.getVideo?.creationStatus);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideo = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.createVideo}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        console.log(res?.data, "creationstatus");
        toast.success("Video Creation Started")

        setCreationProcess(res?.data?.getVideo?.creationStatus);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTemplateByID(templateId);
    getTemplate();
  }, []);

  return (
    <>
      {linkObject?.length === 0 ? (
        <></>
      ) : (
        <div className={classes.main}>
          <Grid container spacing={2}>
            {loading === true && <FullScreenLoader />}

            {linkObject?.map((item, i) => (
              <Grid item md={6} xs={12} key={i}>
                <Box className="elementBox">
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Section {i + 1}</Typography>
                      <Typography
                        style={{ color: "#0358AC", marginTop: "10px" }}
                      >
                        {item?.section_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <IconButton
                        onClick={() => {
                          setDeleteId(item?._id);
                          setVideoTemplateId(item?.hvo_template_id);
                          setDeleteOpen(true);
                        }}
                      >
                        <AiTwotoneDelete color="red" size={35} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Box mt={2}>
                    {item?.section_name === "STATIC URL" ? (
                      <>
                        <Box
                          style={{
                            border: "1px solid #ECECEC",
                            maxHeight: "280px",
                            padding: "15px",
                            borderRadius: "10px",
                          }}
                        >
                          <iframe
                            src={item?.firstRowValue}
                            alt=""
                            height="126px"
                            width="100%"
                            style={{
                              border: "1px solid transparent",
                              maxHeight: "280px",
                            }}
                          ></iframe>
                        </Box>
                        <Typography
                          style={{ color: "#0358AC", marginTop: "10px" }}
                        >
                          <CiClock2 />
                          {item?.duration}sec&nbsp;&nbsp;|&nbsp;&nbsp;Scroll -{" "}
                          {item?.scrollEnabled === true ? "Yes" : "No"}
                        </Typography>
                      </>
                    ) : item?.section_name === "DYNAMIC URL" ? (
                      <>
                        <Box
                          style={{
                            border: "1px solid #ECECEC",
                            maxHeight: "280px",
                            padding: "15px",
                            borderRadius: "10px",
                          }}
                        >
                          <iframe
                            src={item?.firstRowValue}
                            alt=""
                            height="126px"
                            width="100%"
                            style={{
                              border: "1px solid transparent",
                              maxHeight: "280px",
                            }}
                          ></iframe>
                        </Box>
                        <Typography
                          style={{ color: "#0358AC", marginTop: "10px" }}
                        >
                          <CiClock2 />
                          {item?.duration}sec&nbsp;&nbsp;|&nbsp;&nbsp;Scroll -{" "}
                          {item?.scrollEnabled === true ? "Yes" : "No"}
                        </Typography>
                      </>
                    ) : item?.section_name === "UPLOAD IMAGE" ? (
                      <>
                        <Box
                          style={{
                            border: "1px solid #ECECEC",
                            maxHeight: "280px",
                            height: "100px",
                            padding: "15px",
                            borderRadius: "10px",
                          }}
                        >
                          <img
                            src={item?.firstRowValue || item?.url}
                            alt="img"
                            className={classes.img}
                            style={{
                              aspectRatio: "1.9",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Typography
                          style={{ color: "#0358AC", marginTop: "10px" }}
                        >
                          <CiClock2 />
                          {item?.duration}sec
                          {/* &nbsp;&nbsp;|&nbsp;&nbsp;Audio -
                          Yes */}
                        </Typography>
                      </>
                    ) : item?.section_name === "VIDEO CLIPS" ? (
                      <>
                        <Box
                          style={{
                            border: "1px solid #ECECEC",
                            maxHeight: "280px",
                            // height: "100px",
                            padding: "15px",
                            borderRadius: "10px",
                          }}
                        >
                          <video
                            height={"126px"}
                            width={"100%"}
                            alt="video"
                            controls
                          >
                            <source
                              src={item?.url || item?.firstRowValue}
                              type="video/mp4"
                            />
                          </video>
                        </Box>
                        <Typography
                          style={{ color: "#0358AC", marginTop: "10px" }}
                        >
                          {/* &nbsp;&nbsp;Audio - Yes */}
                        </Typography>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              style={{
                marginTop: "13px",
                height: "48px",
                display: previewData == "" ? "none" : "block",
              }}
              variant="outlined"
              onClick={() => {
                history.push({ pathname: "/preview-video", state: templateId });
              }}
            >
              Preview
            </Button>
            <div onClick={handleNext}>
              <Button
                style={{
                  marginTop: "13px",
                  height: "48px",
                  padding: "13px 24px",
                  width: "100%",
                }}
                variant="contained"
                className={`${
                  templateParams?.sheetId === null
                    ? "sheetbtnDisables"
                    : "sheetbtn"
                }`}
                onClick={() => {
                  // handleSheetData();
                  // getTemplate();
                  handleCreateVideo();
                }}
              >
                {/* {creationProcess === "Pending"
                  ? "Create Video"
                  : creationProcess === "Active"
                  ? "Active"
                  : creationProcess === "Published"
                  ? "Published" */}
                  {/* : " */}
                  Create Video
                  {/* "} */}
              </Button>
            </div>
          </Box>

          <Dialog
            open={deleteOpen}
            className={classes.dialog}
            onClose={handleDeleteClose}
          >
            <DialogTitle>
              <Typography variant="h5">Warning: Permanent Deletion</Typography>
              <Close onClick={handleDeleteClose} />
            </DialogTitle>
            <DialogContent>
              <Typography variant="h4">
                Please be aware that this action is irreversible. By clicking
                the 'Delete' button below, you will permanently remove this
                element from the template. This means you will not be able to
                retrieve or restore it in the future.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => handleDeleteClose()}>
                {" "}
                Cancel
              </Button>
              <Button
                variant="containedPrimary"
                onClick={() => deleteVideoElement()}
              >
                {" "}
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Summary;
