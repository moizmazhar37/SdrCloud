import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  DialogContent,
  DialogActions,
  Typography,
  DialogTitle,
  Button,
  Dialog,
  makeStyles,
} from "@material-ui/core";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  main: {
    "& .elementBox": {
      border: "1px solid #ECECEC",
      borderRadius: "6px",
      padding: "20px",
      height: "calc(100% - 44px)",
      "& .MuiIconButton-root": {
        padding: "5px",
      },
    },
    "& .MuiButton-outlined": {
      border: "1px solid #0358AC",
      borderRadius: "8px",
      color: "#152F40",
    },
  },
  img: {
    height: "100px",
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

function HVOSummary({ linkObject, sectionId1, reload, viewParams }) {
  const classes = useStyles();
  const [sections, setSections] = useState(linkObject);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState();
  console.log(viewParams, "sads");

  const searchParams = new URLSearchParams(window.location.search);
  const [templateId, setTempalteId] = useState(searchParams.get("templateId"));
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const history = useHistory();
  const [creationProcess, setCreationProcess] = useState("");
  useEffect(() => {
    console.log("tester si checiking linkObject", linkObject);
    setSections(linkObject);
  }, [linkObject]);

  const deleteSection = async (sectionId) => {
    setLoading(true);
    try {
      const res = await axios({
        url: ApiConfig.deleteSectionById,
        method: "DELETE",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          templateId: templateId,
          sectionId: sectionId,
        },
      });
      if (res?.data?.status === 200) {
        setSections((prevSections) =>
          prevSections.filter((section) => section._id !== sectionId)
        );
        setLoading(false);
        setDeleteOpen(false);
        //  window.location.reload();
        reload();
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const createHVO = async () => {
    try {
      // setConnectionStatus("CONNECT");
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: `${ApiConfig.createHVO}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const status = res?.status;

      if (status === 200 || status === 201) {
        setLoading(false);
        setPreviewData(res?.data?.data_list);
        toast.success("HVO Created Successfully");
        console.log(res?.data);
      } else if (status === 205) {
        toast.error(res?.data?.message);
      } else if (status === 400) {
        console.log(res?.data?.message, "uihnjk");
        toast.error(res?.data?.message || "Bad Request");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const getHVOTemplate = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getHVO,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: { hvoTemplateId: templateId },
      });
      if (res?.status === 200) {
        setCreationProcess(res?.data?.data?.templateData?.creationStatus);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHVOTemplate();
  }, []);
  return (
    <div className={classes.main}>
      {loading && <FullScreenLoader />}

      <Grid container spacing={2}>
        {sections?.map((item, i) => (
          <Grid item md={6} sm={6} lg={6} xs={12} key={i}>
            <Box className="elementBox">
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Section {i + 1}</Typography>
                  {item?.sectionType?.sectionName ===
                  "LEFT_TEXT_RIGHT_IMAGE" ? (
                    <Typography style={{ color: "#0358AC" }}>
                      Left Text | Right Image
                    </Typography>
                  ) : item?.sectionType?.sectionName ===
                    "RIGHT_TEXT_LEFT_IMAGE" ? (
                    <Typography style={{ color: "#0358AC" }}>
                      Right Text | Left Image
                    </Typography>
                  ) : item?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" ? (
                    <Typography style={{ color: "#0358AC" }}>
                      HIGHLIGHT BANNER 2
                    </Typography>
                  ) : (
                    <Typography style={{ color: "#0358AC" }}>
                      {item?.sectionType?.sectionName}
                    </Typography>
                  )}

                  <Typography style={{ color: "#0358AC" }}>
                    {item?.link}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <IconButton
                    onClick={() => {
                      setSectionId(item?._id);
                      setDeleteOpen(true);
                    }}
                  >
                    {" "}
                    <AiTwotoneDelete color="red" size={35} />
                  </IconButton>
                </Grid>
              </Grid>
              <Box mt={2}>
                {item?.sectionType?.sectionName === "HEADER" ? (
                  <>
                    <p>
                      {item?.headerLogo === "none"
                        ? "Company Logo"
                        : item?.headerLogo}
                    </p>

                    {item?.prospectLogo && (
                      <img
                        src={item?.prospectLogo}
                        height="150px"
                        alt="img"
                        className={classes.img}
                      />
                    )}
                  </>
                ) : item?.sectionType?.sectionName === "HERO" ? (
                  <>
                    <Typography style={{ color: "#0358AC" }}>
                      H1 | H2 | H3 | CTA
                    </Typography>
                  </>
                ) : item?.sectionType?.sectionName === "HIGHLIGHT_BANNER" ? (
                  <>
                    <Typography style={{ color: "#0358AC" }}>
                      Scroll - {item?.scroll ? "Yes" : "No"}
                    </Typography>
                  </>
                ) : item?.sectionType?.sectionName ===
                  "RIGHT_TEXT_LEFT_IMAGE" ? (
                  <>
                    <Typography style={{ color: "#0358AC" }}>
                      H1 | H2 | H3 | CTA
                    </Typography>
                  </>
                ) : item?.sectionType?.sectionName ===
                  "LEFT_TEXT_RIGHT_IMAGE" ? (
                  <>
                    <Typography style={{ color: "#0358AC" }}>
                      H1 | H2 | H3 | CTA
                    </Typography>
                  </>
                ) : item?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" ? (
                  <>
                    <Typography style={{ color: "#0358AC" }}>
                      Banner | CTA
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
      <Grid container alignItems="center">
        <Grid
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
          item
          xs={12}
        >
          {linkObject.length > 0 && (
            <Box mt={2} mb={2}>
              <Button
                onClick={() => {
                  createHVO();
                  getHVOTemplate();
                }}
                style={{ height: "48px" }}
                variant="outlined"
              >
                {creationProcess === "Pending"
                  ? "Create HVO"
                  : creationProcess === "Active"
                  ? "Active"
                  : creationProcess === "Published"
                  ? "Published"
                  : "Create HVO"}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
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
            Please be aware that this action is irreversible. By clicking the
            'Delete' button below, you will permanently remove this element from
            the template. This means you will not be able to retrieve or restore
            it in the future.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button
            variant="containedPrimary"
            onClick={() => deleteSection(sectionId)}
          >
            {" "}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HVOSummary;
