import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Link,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import FullScreenLoader from "src/component/FullScreenLoader";
import { RxCross2 } from "react-icons/rx";
import ApiConfig from "src/config/APIConfig";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "32px",
    "& .headingBox": {
      borderRadius: "6px 6px 0px 0px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "var(--light-grey2, #FCFCFC)",
      padding: "16px 24px",
      color: "#868686",
    },
    "& .middledata": {
      padding: "20px 30px",
    },
    "& .contentHeading": {
      color: "#868686",
      marginBottom: "10px",
      wordBreak: "break-all",
    },
    "& .acmeHeading": {
      color: "#152F40",
      fontWeight: 700,
    },
    "& .viewbtn": {
      color: "var(--blue, #0358AC)",
      minWidth: "35px",
      cursor: "pointer",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    "& .viewbtnblack": {
      color: "#152F40",
      minWidth: "35px",
      cursor: "default",
      wordBreak: "break-all",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    "& .janeBtn": {
      color: "#152F40",
    },
    "& .dyanmicurlLinks": {
      color: "var(--blue, #0358AC)",
      textDecorationLine: "underline",
      cursor: "pointer",
    },
    "& .HvoVideoURL": {
      textDecorationLine: "underline",
      cursor: "pointer",
      color: "#152F40",
    },
  },

  "& .savebtnDisables": {
    borderRadius: "0px 6px 6px 0px",
    background: "#F4F4F4",
    color: "black",
    height: "42px",
    width: "100px",
  },

  groupBtn: {
    display: "flex",
    gap: "30px",
    "& .Endbtn": {
      margin: "30px 0px",
      borderRadius: "8px",
      background: "var(--blue, #0358AC)",
      width: "262px",
      height: "44px",
      marginTop: "18px",
      marginLeft: "-3px",
      display: "flex",
      justifyContent: "center",
      color: "var(--light-blue, #F2F7FF)",
      fontSize: "16px",
      border: "none",
      fontWeight: 500,
      color: "white",
    },

    "& .EndbtnDisables": {
      margin: "30px 0px",
      borderRadius: "8px",
      width: "262px",
      height: "44px",
      marginTop: "18px",
      marginLeft: "-3px",
      display: "flex",
      justifyContent: "center",
      fontSize: "16px",
      border: "none",
      background: "#F4F4F4",
      color: "black",
    },
  },
  DialogMain: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "70%",
    },
  },
  savecancelbtn: {
    justifyContent: "center",
    padding: "25px 0px 30px",
    "& .canclereprocessbtn": {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "15px",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: "var(--blue, #0358AC)",
      color: "white !important",
    },
  },
  CrossIcon: {
    display: "flex",
    justifyContent: "end",
    padding: "5px",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "-21px",
      marginRight: "-17px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  DialogTitleFirst: {
    textAlign: "center",
    "@media (max-width: 576px)": {
      fontSize: "12px",
    },
    "& span": {
      color: "#0358AC",
    },
    "& h2": {
      fontSize: "24px",
      fontWeight: 600,
    },
  },
  innerallinfoform: {
    "& .MuiFormControl-marginNormal": {
      marginTop: "1px",
      marginBottom: "16px",
    },
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px",
    },
    "& .imageuploadbox": {
      "& label": {
        marginTop: "0px",
      },
    },
  },
  error: {
    color: "red !important",
    fontSize: "12px !important",
  },
  mainDialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "721px !important",
      width: "100% !important",
      height: "567px",
      borderRadius: "12px",
    },
  },
  CrossIcon: {
    display: "flex",
    justifyContent: "end",
    // padding: "5px",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "-19px",
      marginRight: "-13px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  dialogBtnBox: {
    padding: "130px 123px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px dashed #CACACA",
    borderRadius: "10px",
    borderSpacing: "10px",
    margin: "-11px 44px",
    "& .dialogTypo": {
      color: "#858585",
      fontSize: "14px",
      width: "100%",
      maxWidth: "273px",
    },
    "& .btnUpload": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      height: "40px",
      width: "80px",
      marginTop: "17px",
    },
  },
  btnConatainer: {
    display: "flex",
    gap: "16px",
    // padding: "24px 44px 32px 44px",
    padding: "35px 44px 32px 44px",
    "& .btnCancel": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
    "& .btnSave": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
  },
  dialogHeading: {
    marginTop: "-15px",
    padding: "0px 44px 24px 44px",
    color: "#152F40",
    fontSize: "18px",
    fontWeight: 500,
    "& .btnCancel": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      borderRadius: "8px",
    },
    "& .btnSave": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      borderRadius: "8px",
    },
  },
}));

function EditProjects(props) {
  const classes = useStyles();
  const [reprocessOpen, setReprocessOpen] = useState(false);
  const [firstRowData, setFirstRowData] = useState({});
  const [editData, setEditData] = useState({});
  const [headersData, setHeadersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const sheetId = props?.location?.state?.state?.ErrorSheetId;
  const projectIndex = props?.location?.state?.state?.projectIndex;
  const handleReprocessClose = () => {
    setReprocessOpen(!reprocessOpen);
  };
  const sheetRowData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getRowData,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetId,
          row: projectIndex,
        },
      });
      if (res?.data?.status === 200) {
        setFirstRowData(res?.data?.data?.firstRowData);
        setHeadersData(res?.data?.data?.datatype);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (headersData && headersData.length > 0) {
      let newFirstRow = { ...firstRowData };

      let errorHeaderName = headersData
        .filter((item) => {
          return item.dataType == "Error (Required)";
        })
        .map((item) => item.value);
      let statusHeaderName = headersData
        .filter((item) => {
          return item.dataType == "Status (Required)";
        })
        .map((item) => item.value);
      let finalHeaderName = headersData
        .filter((item) => {
          return item.dataType == "Final video URL (Required)";
        })
        .map((item) => item.value);

      if (errorHeaderName.length > 0) {
        errorHeaderName = errorHeaderName[0];
        if (newFirstRow.hasOwnProperty(errorHeaderName)) {
          delete newFirstRow[errorHeaderName];
        }
      } else {
        errorHeaderName = "";
      }
      if (statusHeaderName.length > 0) {
        statusHeaderName = statusHeaderName[0];
        if (newFirstRow.hasOwnProperty(statusHeaderName)) {
          delete newFirstRow[statusHeaderName];
        }
      } else {
        statusHeaderName = "";
      }
      if (finalHeaderName.length > 0) {
        finalHeaderName = finalHeaderName[0];
        if (newFirstRow.hasOwnProperty(finalHeaderName)) {
          delete newFirstRow[finalHeaderName];
        }
      } else {
        finalHeaderName = "";
      }
      setEditData(newFirstRow);
    }
  }, [headersData]);
  useEffect(() => {
    sheetRowData();
  }, []);
  const handleCancel = () => {
    handleReprocessClose();
  };
  const PostProjectDetails = async (values) => {
    try {
      setLoading(true);
      const formattedData = Object.keys(values).map((key) => ({
        data: values[key],
        row: key,
      }));
      const res = await axios({
        method: "PUT",
        url: ApiConfig.reprocessVideo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          sheetId: sheetId,
          row: projectIndex,
        },
        data: formattedData,
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        handleReprocessClose();
        await sheetRowData();
      }
    } catch (error) {
      console.log(error, "rerror  we are just before this res");
    } finally {
      setLoading(false);
    }
  };
  const initialValues = editData
    ? Object.keys(editData).reduce((acc, key) => {
        acc[key] = editData[key] || "";
        return acc;
      }, {})
    : {};
  const validationSchema = Yup.object().shape(
    Object.keys(editData).reduce((acc, key) => {
      acc[key] = Yup.string().required("This is required");
      return acc;
    }, {})
  );

  return (
    <>
      {loading && <FullScreenLoader />}
      <Typography variant="body1">
        <Link style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          Project Listings
        </Link>{" "}
        / <span style={{ color: "#0358AC" }}>Project Data</span>
      </Typography>

      <Paper className={classes.tableContainer}>
        <Box className="headingBox">
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            Project Details
          </Typography>
        </Box>
        <Box className="middledata">
          <Grid container spacing={2} alignItems="baseline">
            {Object.entries(firstRowData).map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={6} sm={6} md={4} className="allmiddledata">
                  <Typography className="contentHeading">
                    {key || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={8}>
                  <Typography className="viewbtnblack">
                    {value || "N/A"}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Paper>
      <Box className={classes.groupBtn}>
        <Button
          variant="outlined"
          className="Endbtn"
          onClick={() => {
            setReprocessOpen(true);
          }}
        >
          Edit Missing Information
        </Button>
      </Box>
      <>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={reprocessOpen}
          onClose={handleReprocessClose}
          className={classes.DialogMain}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              PostProjectDetails(values, resetForm);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit,
              isValid,
              dirty,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box className={classes.CrossIcon}>
                  <RxCross2 className="closeicon" onClick={handleCancel} />
                </Box>
                <DialogTitle className={classes.DialogTitleFirst} variant="h2">
                  You are still missing information to create media.
                  <br />
                  <span>Project Details</span>
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={4}>
                    {Object.entries(editData)?.map(([key, value]) => (
                      <Grid item xs={12} md={6} lg={6} sm={12} key={key}>
                        <Box>
                          <Typography className="mainTypo" variant="body1">
                            {key}
                          </Typography>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            name={key}
                            value={values[key]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(values[key] === "" && dirty)}
                            helperText={
                              <ErrorMessage name={key} component="div" />
                            }
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </DialogContent>
                <DialogActions className={classes.savecancelbtn}>
                  <Box fullWidth className="canclereprocessbtn">
                    <Button
                      variant="contained"
                      color="default"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid || !dirty}
                    >
                      {loading === false ? (
                        " Reprocess"
                      ) : (
                        <ButtonCircularProgress />
                      )}
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </>
    </>
  );
}
export default EditProjects;
