/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  Breadcrumbs,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import SheetDetails from "./EditGoogleSheet";
import Link from "@material-ui/core/Link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Close } from "@material-ui/icons";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiPaper-rounded": {
      borderRadius: "16px",
    },
    "& h5": {
      textAlign: "center",
      fontSize: "30px",
      fontWeight: 700,
      color: "#152F40",
    },
    "& h4": {
      textAlign: "center",
      padding: "0px 30px",
      color: "#152F40",
      fontSize: "20px",
    },
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      gap: "20px",
      padding: "18px 10px 20px",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: "red",
      color: "#fff !important",
      boxShadow: "none",
    },
    "& .MuiButton-contained": {
      padding: "10px 40px",
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
  GoogleSheetContainer: {
    "& .headText": {
      color: "#0358AC",
    },
    "& .breads": {
      display: "flex",
      alignItems: "center",
      "& nav li": {
        margin: "0px",
      },
      "& .linkClass": {
        cursor: "pointer",
        margin: "0px 5px",
      },
    },
    "& .mainGridContainer": {
      "& .btnTextfield": {
        paddingRight: "0px",
        "& button": {
          background: "#0358AC",
          color: "white",
        },
        "& .MuiOutlinedInput-adornedEnd": {
          padding: "0px",
        },
      },
    },
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      transform: "rotate(360deg) !important",
      borderRight: "none !important",
      borderLeft: "1px solid #ECECEC !important",
      paddingLeft: "8px !important",
    },
    "& .MuiSelect-icon": {
      top: "0 !important",
      height: "40px !important",
      paddingLeft: "8px",
      color: "#152F40 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: "transparent  !important",
      border: "1px solid #ECECEC !important",
    },
  },
  menuitem: {
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      borderRight: "none !important",
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-icon": {
      top: "0 !important",
      height: "40px !important",
      paddingLeft: "8px",
      color: "#152F40 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: "transparent  !important",
      border: "1px solid #ECECEC !important",
    },
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
  },
}));

const GoogleSheetConnection = ({
  settingRoute,
  setSettingRoute,
  nextRoute,
  setnextRoutes,
  nextRoute1,
  handleClick,
  setnextRoutes1,
}) => {
  const [nextRoutes2, setNextRoutes2] = useState("Create New");
  const classes = useStyles();
  const [isSheetURLSet, setIsSheetURLSet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sheetdata, setSheetData] = useState([]);
  const [sheetType, setSheetType] = useState("");
  const [openDailog, setOpenDailog] = useState(false);
  console.log("openDailog: ", openDailog);
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  

  const handleClose = () => {
    setOpenDailog(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      "scott-account@scott-project-416709.iam.gserviceaccount.com"
    );
    toast.success("Email copied to clipboard!");
  };

  const handleBackClick2 = () => {
    setnextRoutes1("Google Sheet");
  };

  const handleSubmit = async (values, setFieldValue) => {
    console.log(values, "efkef");

    try {
      setLoading(true);
      console.log(values.userList)
      const response = await Axios({
        url: ApiConfig.fetchSheet,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          rangeName: values.sheetName,
          sheetUrl: values.sheetURL,
          sheetType: sheetType,
          assignedUser: values.userList,
        },
      });

      if (response?.status === 200) {
        history.push("/editSheets", {
          state: { id: response?.data?.id },
        });
        console.log(response);
        setSheetData(response?.data);

        toast.success("Successfully connected to Google Sheet");
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
        setLoading(false);
        // setOpenDailog(true);
        toast.error(error?.response?.data?.detail);
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await Axios({
        url: ApiConfig.getAllUserByAccountId,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // if (response?.data?.status === 200) {
        setUserList(response?.data);
      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFetchButtonClick = () => {
    setIsSheetURLSet(true);
  };

  const validationSchema = Yup.object().shape({
    sheetName: Yup.string()
      .trim()
      .required(
        "Sheet name is required and must be between 1 and 150 characters long."
      )
      .min(1, "Sheet name must be at least 1 character long.")
      .max(150, "Sheet name must be at most 150 characters long."),
    sheetType: Yup.string().required("Please select sheet type."),
    sheetURL: Yup.string()
      .required(
        "A valid Google Sheets URL is required. (e.g., https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit)"
      )
      .matches(
        /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\/?.*$/,
        "A valid Google Sheets URL is required. (e.g., https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit)"
      ),
    userList: Yup.string().required("Please select User."),
  });
  const goBackToElementSelection = () => {
    setnextRoutes1("Google Sheet");
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Box className={classes.GoogleSheetContainer}>
        {loading && <FullScreenLoader />}
        {nextRoutes2 === "Sheet Details" ? (
          <SheetDetails
            settingRoute={settingRoute}
            setSettingRoute={setSettingRoute}
            nextRoute={nextRoute}
            nextRoute1={nextRoute1}
            setnextRoutes={setnextRoutes}
            nextRoutes2={nextRoutes2}
            setNextRoutes2={setNextRoutes2}
            handleClick={handleClick}
            sheetData1={sheetdata}
          />
        ) : (
          <>
            <Box className="breads">
              <ArrowBackIcon
                style={{ cursor: "pointer", marginRight: "8px" }}
                onClick={goBackToElementSelection}
              />
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="body1" style={{ color: "#152F40" }}>
                  <Link
                    color="inherit"
                    href="/pp-settings"
                    onClick={handleClick}
                  >
                    Settings{" "}
                  </Link>
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "#152F40", marginLeft: "5px" }}
                >
                  <Link
                    color="inherit"
                    href="/integration"
                    onClick={handleClick}
                  >
                    Integration
                  </Link>
                </Typography>{" "}
                <Link onClick={handleBackClick2} className="linkClass">
                  {nextRoute}
                </Link>
                <span className="headText"> {nextRoute1}</span>
              </Breadcrumbs>
            </Box>
            <Formik
              initialValues={{
                sheetType: "",
                sheetName: "",
                sheetURL: "",
                userList: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setFieldValue }) => {
                handleSubmit(values, setFieldValue);
              }}
            >
              {({ handleBlur, handleChange, values, isValid }) => (
                <Form>
                  <Grid container spacing={2} className="mainGridContainer">
                    <Grid item lg={3} xs={12}>
                      <Box mt={4}>
                        <Typography>Select User</Typography>
                        <Field
                          name="userList"
                          as="select"
                          fullWidth
                          marginTop="20px"
                        >
                          {({ field, form }) => (
                            <>
                              <Select
                                {...field}
                                fullWidth
                                style={{ marginTop: "5px" }}
                                variant="outlined"
                                displayEmpty
                                onChange={(e) => {
                                  form.setFieldValue(
                                    field.name,
                                    e.target.value
                                  );
                                  // setSelectedUser(e.target.value);
                                }}
                                IconComponent={ExpandMoreIcon}
                                MenuProps={menuProps}
                                marginTop="5px"
                              >
                                <MenuItem value="" disabled>
                                  Select User
                                </MenuItem>
                                {userList?.map((data, i) => {
                                  return (
                                    <MenuItem
                                      key={i}
                                      style={{ color: "#858585" }}
                                      value={data?.id}
                                      name={data?.first_name}
                                    >
                                      {data?.first_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {form.errors.userList &&
                                form.touched.userList && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      marginTop: "7px",
                                    }}
                                  >
                                    {form.errors.userList}
                                  </div>
                                )}
                            </>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                      <Box mt={4}>
                        <Typography>Select Sheet Type</Typography>
                        <Field
                          name="sheetType"
                          as="select"
                          fullWidth
                          marginTop="20px"
                        >
                          {({ field, form }) => (
                            <>
                              <Select
                                {...field}
                                fullWidth
                                style={{ marginTop: "5px" }}
                                variant="outlined"
                                displayEmpty
                                disabled={!values.userList}
                                onChange={(e) => {
                                  form.setFieldValue(
                                    field.name,
                                    e.target.value
                                  );
                                  setSheetType(e.target.value);
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
                              {form.errors.sheetType &&
                                form.touched.sheetType && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      marginTop: "7px",
                                    }}
                                  >
                                    {form.errors.sheetType}
                                  </div>
                                )}
                            </>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                      <Box mt={4}>
                        <Typography>Google Sheet Name</Typography>
                        <Field name="sheetName">
                          {({ field, form }) => (
                            <div>
                              <TextField
                                {...field}
                                variant="outlined"
                                className="btnTextfield"
                                placeholder="Enter SDRCloud.ai Sheet Name"
                                disabled={!values.sheetType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                inputProps={{
                                  maxLength: 151,
                                }}
                              />
                              {form.errors.sheetName &&
                                form.touched.sheetName && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      marginTop: "7px",
                                    }}
                                  >
                                    {form.errors.sheetName}
                                  </div>
                                )}
                            </div>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <Box mt={4}>
                        <Typography>Google Sheet URL</Typography>
                        <Field name="sheetURL">
                          {({ field, form }) => (
                            <div>
                              <TextField
                                {...field}
                                variant="outlined"
                                className="btnTextfield"
                                disabled={!values.sheetType}
                                placeholder="Enter SDRCloud.ai Sheet URL"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={!isValid}
                                        onClick={handleFetchButtonClick}
                                      >
                                        Fetch
                                      </Button>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              {form.errors.sheetURL &&
                                form.touched.sheetURL && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      marginTop: "7px",
                                    }}
                                  >
                                    {form.errors.sheetURL}
                                  </div>
                                )}
                            </div>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>

      <Dialog
        open={openDailog}
        className={classes.dialog}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="h5">Warning</Typography>
          <Close onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4">
            Kindly share the Excel sheet with us at{" "}
            <span
              onClick={handleCopy}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              scott-account@scott-project-416709.iam.gserviceaccount.com
            </span>
            . This will allow our system to process your file and automatically
            add the generated URL link directly into the sheet.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="containedPrimary" onClick={() => handleClose()}>
            {" "}
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoogleSheetConnection;
