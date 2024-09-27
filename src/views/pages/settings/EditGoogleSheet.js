import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  makeStyles,
  Grid,
  Button,
  TextField,
  ButtonGroup,
  MenuItem,
} from "@material-ui/core";
import { CircularProgress, Select } from "@mui/material";

import Link from "@material-ui/core/Link";
import { Formik, Form } from "formik";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import FullScreenLoader from "src/component/FullScreenLoader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
  breads: {
    display: "flex",
    alignItems: "center",
    "& nav li": {
      margin: "0px",
    },
    "& .breadCrumbText": {
      color: "#0358AC",
      margin: "0px 5px",
    },
    "& .breadCrumbText1": {
      cursor: "pointer",
      margin: "0px 5px",
    },
  },
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "10px 20px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "#858585",
      fontWeight: 500,
    },
    "& .MuiTypography-h6": {
      color: "#152F40",
      fontWeight: 500,
      fontSize: "14px",
    },
    "& .increment": {
      background: "#F4F4F4",
      border: "2px solid var(--light-stroke, #ECECEC)",
      borderRadius: "0px 5px 5px 0px ",
      color: "black",
    },
    "& .decrement": {
      background: "#F4F4F4",
      border: "2px solid var(--light-stroke, #ECECEC)",
      borderRadius: "5px 0px 0px 5px ",
      color: "black",
    },
  },
  headingBox: {
    background: "#F4F4F4",
    padding: "10px 10px 10px 20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#152F40",
    "& .EditButton": {
      color: "color: var(--blue, #0358AC)",
    },
  },
  textfiledallbefore: {
    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontWeight: "500",
    },
  },
  textfiledall: {
    "& .MuiInputBase-root": {
      border: "0.5px solid gray",
    },
    "& .MuiInputBase-input": {
      marginLeft: "5px",
    },
  },
  loaderLeft: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusminusdiv: {
    width: "95px",
    display: "flex",
    border: "1px solid #ECECEC",
    alignItems: "center",
    justifyContent: "space-between",
    height: "28px",
    borderRadius: "10px",
    "& .iconsrecords": {
      backgroundColor: "#F4F4F4",
      padding: "6px",
    },
  },
  BoxButton: {
    display: "flex",
    justifyContent: "center",
  },
  commonBorder: {
    borderRadius: "8px",
    border: "0px solid #ECECEC",
    "& .commonHeadingBox": {
      padding: "12px 24px",
      backgroundColor: "#ECECEC",
      color: "#152F40",
      borderRadius: "8px 8px 0px 0px",
      "& .crossIcon": {
        color: "#152F40",
      },
    },
  },
  commomInnerBox: {
    borderRight: "1px solid var(--light-stroke, #ECECEC)",
    borderLeft: "1px solid var(--light-stroke, #ECECEC)",
  },
}));

function EditGoogleSheet(props) {
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: "none",
        padding: "8px",
        borderRadius: "8px",
      },
    },
  };
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState();
  const location = useLocation();
  const [viewdata, setViewData] = useState({
    title: "",
    fieldsCount: "",
    createdOn: "",
    totalRecords: "",
    recent: "",
    fetchUrl: "",
    records: "",
    sheetType: null,
  });
  console.log(viewdata.sheetType, "ojopjo");
  const [sheetType, setSheetType] = useState(viewdata?.sheetType);
  console.log(viewdata?.sheetType, "sheetType");
  useEffect(() => {
    setSheetType(viewdata?.sheetType);
  }, [viewdata]);
  const [recordCount, setRecordCount] = useState(0);
  const [tempRecordCount, setTempRecordCount] = useState(0);
  const [isEditing, setEditing] = useState(false);
  const [isEditingSheet, setEditingSheet] = useState(false);
  const [fieldValue, setFieldValue] = useState({ value: "", dataType: "" }); // Initialize with null or appropriate initial value
  const [diabledFields, setDisabledFields] = useState(true);

  const sheetid = props.location.state.id || location?.state?.state?.id;
  const nextRoute = props.location.state?.nextRoute;
  const [loadingSheetType, setLoadingSheetType] = useState(true);
  const [loadingFirstRowData, setLoadingFirstRowData] = useState(true);
  // Common loading state derived from both API calls
  const isLoading = loadingSheetType || loadingFirstRowData;
  const handleViewData = async () => {
    try {
      // setLoading(true);
      setLoadingSheetType(true);
      const response = await axios({
        url: ApiConfig.viewgooglesheet,
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetid,
        },
      });
      if (response?.data?.status === 200) {
        // setLoading(false);
        setViewData(response?.data?.data);
        setRecordCount(response?.data?.data?.fetchDays);
        setTempRecordCount(response?.data?.data?.fetchDays);
        // getAllSheet(
        //   response?.data?.data?.title,
        //   response?.data?.data?.fetchUrl
        // );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingSheetType(false);
    }
  };
  let values;

  if (viewdata && viewdata.sheetType === "HVO") {
    values = [
      {
        value: "Image URL",
      },
      {
        value: "Logo",
      },
      {
        value: "Screenshot from URL",
      },
      {
        value: "Text Field",
      },
      {
        value: "URL",
      },
      {
        value: "Email (Required)",
      },
      {
        value: "Error (Required)",
      },
      {
        value: "HVO URL (Required)",
      },
      {
        value: "Status (Required)",
      },
    ];
  } else {
    values = [
      {
        value: "Customer id (Required)",
      },
      {
        value: "Customer organization (Required)",
      },
      {
        value: "Dynamic URL",
      },
      {
        value: "First name (Required)",
      },
      {
        value: "Image URL",
      },
      {
        value: "Static URL",
      },
      {
        value: "Text Field",
      },
      {
        value: "Video URL",
      },
      {
        value: "Email (Required)",
      },
      {
        value: "Error (Required)",
      },
      {
        value: "Final video URL (Required)",
      },
      {
        value: "Status (Required)",
      },
    ];
  }
  const getAllSheet = async () => {
    try {
      // setLoading(true);
      setLoadingFirstRowData(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllSheet,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetid,
        },
      });
      if (res?.status === 200) {
        // setLoading(false);
        setSheetData(res?.data?.data);
        setFieldValue(res?.data?.data);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error, "error");
    } finally {
      setLoadingFirstRowData(false);
    }
  };
  useEffect(() => {
    handleViewData();
    getAllSheet();
  }, []);

  const fieldsToDisplay = [
    "title",
    "fieldsCount",
    "createdOn",
    "totalRecords",
    "recent",
    "fetchUrl",
    "fetchDays",
  ];

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };

  const handleEditClick = () => {
    setEditing(!isEditing);
  };
  const handleEditSheetClick = () => {
    setEditingSheet(!isEditingSheet);
  };

  const handleSave = async (viewdata) => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.updateFetchDays,
        method: "PUT",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetid,
          fetchDays: tempRecordCount,
        },
      });
      if (response?.data?.status === 200) {
        setEditing(false);
        setLoading(false);
        setRecordCount(tempRecordCount);
        await handleViewData();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred while saving."
      );
    }
  };

  const handleSheetSave = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.setSheetDataType,
        method: "PUT",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetid,
          type: sheetType,
        },
      });
      if (response?.data?.status === 200) {
        setEditingSheet(false);
        getAllSheet();
        handleViewData();
        setLoading(false);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred while saving."
      );
    }
  };

  const saveFieldDataType = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.setHeadersDataType,
        method: "PUT",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          sheetId: sheetid,
          headersWithDataType: fieldValue,
        },
      });
      if (response?.data?.status === 200) {
        console.log(response);
        setLoading(false);
        toast.success(response?.data?.message);
        setDisabledFields(true);
      } else {
        console.log(response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const saveFieldDataTypeVideo = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.setHeadersDataTypeVideo,
        method: "PUT",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          sheetId: sheetid,
          headersWithDataType: fieldValue,
        },
      });
      if (response?.data?.status === 200) {
        console.log(response);
        setLoading(false);
        toast.success(response?.data?.message);
        setDisabledFields(true);
      } else {
        console.log(response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleIncrement = () => {
    setTempRecordCount(tempRecordCount + 1);
  };

  const handleDecrement = () => {
    if (tempRecordCount > 1) {
      setTempRecordCount(tempRecordCount - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setViewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeField = (e, idx, item) => {
    const { value } = e.target;

    // Create a copy of the current state
    const updatedFieldValues = [...fieldValue];

    // Update the specific index's value and dataType
    updatedFieldValues[idx] = {
      ...updatedFieldValues[idx], // Maintain other properties if needed
      dataType: value,
      value: item?.value,
    };
    console.log(updatedFieldValues);
    // Set the updated state
    setFieldValue(updatedFieldValues);
  };

  const displayNames = {
    title: "Title",
    fieldsCount: "Field Count",
    createdOn: "Connected",
    totalRecords: "Total Records",
    recent: "Recent",
    fetchUrl: "Fetch URL",
    fetchDays: "Fetch New Records Every",
  };

  const truncateUrl = (url) => {
    const maxLength = 25;
    if (url.length <= maxLength * 2) {
      return url;
    }
    return `${url.substring(0, maxLength)}.....${url.substring(
      url.length - maxLength
    )}`;
  };
  return (
    <>
      {/* {loading && <FullScreenLoader / >} */}
      {isLoading && <FullScreenLoader />}

      <Box className={classes.breads}>
        <ArrowBackIcon
          style={{ cursor: "pointer", marginRight: "8px" }}
          onClick={() => {
            history.push({
              pathname: "/settings",
              state: { id: "Integrations", type: "Google sheet" },
            });
          }}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/settings">
            Settings
          </Link>

          <Typography
            className="breadCrumbText1"
            onClick={() => {
              history.push({
                pathname: "/settings",
                state: { id: "Integrations" },
              });
            }}
          >
            Integrations
          </Typography>
          <Typography
            className="breadCrumbText1"
            onClick={() => {
              history.push({
                pathname: "/settings",
                state: { id: "Integrations", type: "Google sheet" },
              });
            }}
          >
            Google Sheets
          </Typography>
          <Typography className="breadCrumbText">Sheet Details</Typography>
        </Breadcrumbs>
      </Box>

      <Formik
        initialValues={viewdata}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        <Form>
          <Grid container spacing={1} style={{ paddingTop: "30px" }}>
            <Grid item md={8} sm={8} xs={12} lg={6}>
              <Box className={classes.headingBox}>
                <Box className="d-flex" style={{ justifyContent: "start" }}>
                  <Typography variant="h5">Sheet Details</Typography>
                  {isEditing ? (
                    <Button
                      color="primary"
                      onClick={() => handleSave(viewdata)}
                      style={{ color: "var(--blue, #0358AC)" }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onClick={handleEditClick}
                      style={{ color: "var(--blue, #0358AC)" }}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>

              <Box className={classes.innerbox}>
                {fieldsToDisplay.map((key) => (
                  <Box
                    key={key}
                    pt={1}
                    className="d-flex"
                    style={{ marginTop: "10px" }}
                  >
                    <Grid container>
                      <Grid
                        item
                        lg={4}
                        md={6}
                        sm={6}
                        xs={12}
                        className="profileBox d-flex"
                      >
                        <Typography variant="body1">
                          {capitalizeFirstLetter(displayNames[key])}
                        </Typography>
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        {isEditing && key === "fetchDays" ? (
                          <Box
                            className="d-flex"
                            style={{ justifyContent: "start", gap: "5px" }}
                          >
                            <ButtonGroup>
                              <Button
                                onClick={handleDecrement}
                                className="decrement"
                              >
                                -
                              </Button>
                              <Button disabled style={{ color: "black" }}>
                                {tempRecordCount}
                              </Button>
                              <Button
                                onClick={handleIncrement}
                                className="increment"
                              >
                                +
                              </Button>

                              <Typography
                                variant="h6"
                                style={{ marginLeft: "1rem" }}
                                className="d-flex"
                              >
                                {tempRecordCount > 1 ? "Days" : "Day"}
                              </Typography>
                            </ButtonGroup>
                          </Box>
                        ) : (
                          <Typography style={{ color: "#152F40" }}>
                            {key === "createdOn" ? (
                              viewdata[key] === "Connected" ? (
                                "Connected"
                              ) : viewdata[key] ? (
                                moment(viewdata[key]).format("MM/DD/YYYY")
                              ) : (
                                ""
                              )
                            ) : key === "fetchUrl" ? (
                              <Box
                                className="d-flex"
                                style={{ justifyContent: "start" }}
                              >
                                <Typography
                                  style={{
                                    color: "#0358AC",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  <a
                                    style={{ color: "rgb(3, 88, 172)" }}
                                    href={viewdata[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {/* {viewdata[key]?.length > 25
                                      ? viewdata[key].substring(0, 25) + "..."
                                      : viewdata[key]} */}
                                    {truncateUrl(viewdata[key])}
                                  </a>
                                </Typography>
                              </Box>
                            ) : key === "fetchDays" ? (
                              <Typography style={{ color: "#152F40" }}>
                                {viewdata?.title &&
                                  (recordCount > 1
                                    ? `${recordCount} Days`
                                    : `${recordCount} Day`)}
                              </Typography>
                            ) : (
                              <Typography style={{ color: "#152F40" }}>
                                {viewdata[key]}
                              </Typography>
                            )}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
              <Box className={classes.headingBox} style={{ marginTop: "25px" }}>
                <Box className="d-flex" style={{ justifyContent: "start" }}>
                  <Typography variant="h5">Sheet Type</Typography>
                  {isEditingSheet ? (
                    <Button
                      color="primary"
                      onClick={() => handleSheetSave()}
                      style={{ color: "var(--blue, #0358AC)" }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onClick={handleEditSheetClick}
                      style={{ color: "var(--blue, #0358AC)" }}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>
              {sheetType && (
                <Box className={classes.innerbox}>
                  <Typography>Select Sheet Type</Typography>
                  <>
                    <Select
                      value={sheetType}
                      fullWidth
                      style={{ marginTop: "5px" }}
                      variant="outlined"
                      displayEmpty
                      disabled={!isEditingSheet}
                      onChange={(e) => {
                        setSheetType(e.target.value);
                        // console.log(e.target.value)
                      }}
                      IconComponent={ExpandMoreIcon}
                      MenuProps={menuProps}
                      marginTop="5px"
                    >
                      <MenuItem value="" disabled>
                        Select Type
                      </MenuItem>
                      <MenuItem value="HVO">HVO</MenuItem>
                      <MenuItem value="VIDEO">VIDEO</MenuItem>
                    </Select>
                  </>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={12} lg={5} className="gridItem">
              <Box className={classes.commonBorder}>
                <Box
                  className="commonHeadingBox"
                  style={{
                    padding: "8px 8px 8px 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    Column Headers: Fields
                  </Typography>
                  <Button
                    color="primary"
                    onClick={() => {
                      if (diabledFields) {
                        setDisabledFields(!diabledFields);
                      } else {
                        // Conditionally call the appropriate function based on viewdata.sheetType
                        if (viewdata.sheetType === "HVO") {
                          saveFieldDataType();
                        } else {
                          saveFieldDataTypeVideo();
                        }
                      }
                    }}
                    style={{ color: "var(--blue, #0358AC)" }}
                  >
                    {diabledFields ? "Edit" : "Save"}
                  </Button>
                </Box>
              </Box>

              {sheetData?.map((item, idx) => (
                <Box key={idx} className={classes.commomInnerBox}>
                  {" "}
                  <Box pt={2} pl={3} pr={2}>
                    <Typography variant="body1">
                      {item?.value?.length > 40
                        ? `${item.value.substring(0, 45)}...`
                        : item?.value}
                    </Typography>
                    <Select
                      style={{ marginTop: "5px" }}
                      variant="outlined"
                      className="selectitem"
                      id="choose-template"
                      fullWidth
                      // MenuProps={menuProps}
                      MenuProps={menuProps}
                      value={fieldValue[idx]?.dataType || ""}
                      onChange={(e) => handleChangeField(e, idx, item)} // P
                      IconComponent={ExpandMoreIcon}
                      disabled={diabledFields == true}
                    // error={!!errors.image}
                    // helperText={errors.image}
                    >
                      <MenuItem value="none" disabled>
                        Select Field value
                      </MenuItem>
                      {values.map((option, optionIdx) => (
                        <MenuItem key={optionIdx} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default EditGoogleSheet;
