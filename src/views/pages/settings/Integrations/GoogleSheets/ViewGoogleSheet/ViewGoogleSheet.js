/* eslint-disable no-unused-vars */
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
import Link from "@material-ui/core/Link";
import { Formik, Form } from "formik";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
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
function ViewGoogleSheet(props) {
  console.log("props: ", props);
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState([]);
  const [fieldValue, setFieldValue] = useState("Text Field");
  const [viewdata, setViewData] = useState({
    title: "",
    field_count: "",
    created_at: "",
    total_records: "",
    recent: "",
    fetch_url: "",
    records: "",
    sheet_type: "",
  });
  const [sheet_type, setSheetType] = useState(viewdata?.sheet_type);
  useEffect(() => {
    setSheetType(viewdata?.sheet_type);
  }, [viewdata]);

  const [recordCount, setRecordCount] = useState(1);
  // Function to handle incrementing record count
  const handleIncrement = () => {
    setRecordCount(recordCount + 1);
  };
  // Function to handle decrementing record count
  const handleDecrement = () => {
    if (recordCount > 0) {
      setRecordCount(recordCount - 1);
    }
  };
  console.log(viewdata, " viewData");
  const [isEditing, setEditing] = useState(false);

  const sheetid = props.location.state.id;
  const nextRoute = props.location.state?.nextRoute;
  console.log("nextRoute: ", nextRoute);
  const handleViewData = async () => {
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/${sheetid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response?.status === 200) {
        setViewData(response?.data);
        setLoading(false);
        // setRecordCount(response?.data?.data?.fetchDays);
        // getAllSheet(
        //   response?.data?.data?.title,
        //   response?.data?.data?.fetchUrl
        // );
        getAllSheet()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSheet = async (name, url) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.googleSheetDataTypes}/${sheetid}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (res?.status === 200) {
        setLoading(false);
        // const dataMap = {
        //   company_url: res?.data?.data[11],
        //   linkedin: res?.data?.data[4],
        //   customer_id: res?.data?.data[0],
        //   logo: res?.data?.data[5],
        //   customer_organization: res?.data?.data[1],
        //   last_name: res?.data?.data[3],
        //   maps_URL: res?.data?.data[6],
        //   email: res?.data?.data[8],
        //   first_name: res?.data?.data[2],
        //   phone_no: res?.data?.data[7],
        //   twitter: res?.data?.data[10],
        //   facebook: res?.data?.data[9],
        // };
        setSheetData(res?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleViewData();
  }, []);

  const fieldsToDisplay = [
    "title",
    "field_count",
    "created_at",
    "total_records",
    "recent",
    "fetch_url",
    "fetchDays",
  ];
  // Function to capitalize first letter of a string
  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };
  // Function to handle saving changes to record count
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.updateFetchDays,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetUrl: viewdata?.fetchUrl,
          rangeName: viewdata?.title,
        },
        data: {
          fetchDays: recordCount,
        },
      });
      if (response?.data?.status === 200) {
        setEditing(!isEditing);
        // setLoading(false);

        handleViewData();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };
  // Object containing display names for fields
  const displayNames = {
    title: "Title",
    field_count: "Field Count",
    created_at: "Connected",
    total_records: "Total Records",
    recent: "Recent",
    fetch_url: "Fetch URL",
    fetchDays: "New Records Each",
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
  const goBackToElementSelection = () => {};

  return (
    <>
      {loading === true && <FullScreenLoader />}
      <Box className={classes.breads}>
        <ArrowBackIcon
          style={{ cursor: "pointer", marginRight: "8px" }}
          onClick={() => {
            history.push({
              pathname: "/integrations",
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
                pathname: "/integrations",
                state: { id: "Integrations" },
              });
            }}
          >
            Integrations
          </Typography>
          <Typography
            className="breadCrumbText1"
            // onClick={() => {
            //   history.push({
            //     pathname: "/settings",
            //     state: { id: "Integrations", type: "Google sheet" },
            //   });
            // }}
            onClick={() => {
              history.push({
                pathname: "/settings",
                state: { id: "Integrations", type: "Google sheet" },
              });
            }}
          >
            Google Sheet
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
          <Grid
            container
            spacing={1}
            justifyContent="space-around"
            style={{ paddingTop: "30px" }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.headingBox}>
                <Box className="d-flex" style={{ justifyContent: "start" }}>
                  <Typography variant="h5">Sheet Details</Typography>
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
                        xs={6}
                        className="profileBox d-flex"
                      >
                        <Typography variant="body1">
                          {capitalizeFirstLetter(displayNames[key])}
                        </Typography>
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        {key === "created_at" ? (
                          // <Typography style={{ color: "#152F40" }}>
                          //   {viewdata[key] === "Connected"
                          //     ? "Connected"
                          //     : moment(viewdata[key]).format("MM/DD/YYYY")}
                          // </Typography>
                          <Typography style={{ color: "#152F40" }}>
                            {viewdata[key] === "Connected"
                              ? "Connected"
                              : viewdata[key]
                              ? moment(viewdata[key]).format("MM/DD/YYYY")
                              : ""}
                          </Typography>
                        ) : key === "fetch_url" ? (
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
                                {viewdata[key].length > 25
                                  ? viewdata[key].substring(0, 25) + "..."
                                  : viewdata[key]}

                                {truncateUrl(viewdata[key])}
                              </a>
                            </Typography>
                          </Box>
                        ) : key === "fetchDays" ? (
                          <Box
                            className="d-flex"
                            style={{ justifyContent: "start", gap: "5px" }}
                          >
                            {viewdata?.title && (
                              <>
                                <Typography variant="h6" className="d-flex">
                                  {recordCount}{" "}
                                  {recordCount === 1 ? "Day" : "Days"}
                                </Typography>
                              </>
                            )}
                          </Box>
                        ) : (
                          <Typography style={{ color: "#152F40" }}>
                            {viewdata[key]}
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
                </Box>
              </Box>
              {sheet_type && (
                <Box className={classes.innerbox}>
                  <Typography>Selected Sheet Type</Typography>
                  <>
                    {/* <Select
                      value={sheetType}
                      fullWidth
                      style={{ marginTop: "5px" }}
                      variant="outlined"
                      displayEmpty
                      disabled
                      // onChange={(e) => {
                      //   setSheetType(e.target.value);
                      //   // console.log(e.target.value)
                      // }}
                      IconComponent={ExpandMoreIcon}
                      MenuProps={menuProps}
                      marginTop="5px"
                    >
                      <MenuItem value="" disabled>
                        Select Type
                      </MenuItem>
                      <MenuItem value="HVO">HVO</MenuItem>
                      <MenuItem value="VIDEO">VIDEO</MenuItem>
                    </Select> */}
                    <TextField
                      id="outlined-select-currency-native"
                      value={sheet_type}
                      variant="outlined"
                      disabled
                    ></TextField>
                  </>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={5} className="gridItem">
              <Box className={classes.commonBorder}>
                <Box
                  className="commonHeadingBox"
                  style={{ padding: "10px 10px 10px 20px" }}
                >
                  <Typography variant="h5">Column Headers: Fields</Typography>
                </Box>
              </Box>

              {sheetData?.map((item, idx) => (
                <Box
                  className={classes.commomInnerBox}
                  style={{
                    borderBottom:
                      idx === sheetData.length - 1
                        ? "1px solid var(--light-stroke, #ECECEC)"
                        : "none",
                    borderRadius:
                      idx === sheetData.length - 1 ? "10px" : "none",
                  }}
                  key={idx}
                >
                  <Box pt={2} pl={3} pr={2} pb={2}>
                    <Typography
                      variant="body1"
                      style={{ color: "#858585", fontWeight: 500 }}
                    >
                      {item?.value?.length > 40
                        ? `${item.value.substring(0, 45)}...`
                        : item?.value}
                    </Typography>
                    <TextField
                      id="outlined-select-currency-native"
                      value={item?.dataType}
                      variant="outlined"
                      disabled
                    ></TextField>
                    {/* <TextField
                      name="oldPassword"
                      variant="outlined"
                      placeholder="Text"
                      className="textfield"
                      fullWidth
                      // value={sheetDataUrl.customer_organization || ""}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton className="iconButton">
                      //         <ExpandMoreIcon />
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    /> */}
                  </Box>
                </Box>
              ))}
              <Box className={classes.BoxButton} mt={3}>
                {!loading && (
                  <Button
                    variant="contained"
                    className="createButton"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default ViewGoogleSheet;
