import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useLocation } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import FullScreenLoader from "src/component/FullScreenLoader";
import Link from "@material-ui/core/Link";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  headingBox: {
    color: "#868686",
  },
  tableContainer: {
    marginTop: "15px",
  },
  table: {
    overflowX: "auto",
    minWidth: 650,
    "& .MuiTableCell-head": {
      background: "#FCFCFC",
      fontSize: "14px !important",
      color: "#858585",
      fontWeight: 500,
    },
    "& .MuiTableCell-body": {
      background: "#FFF",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
  loaderCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewEditbtn: {
    display: "flex",
    justifyContent: "center",
    "& .dividerbtn": {
      border: "1px solid #0358AC",
      height: "30px",
    },
    "& .MuiButton-root": {
      color: "#0358AC",
    },
  },
  uppersection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  nextButton: {
    height: "40px",
    borderRadius: "6px",
    padding: "0px, 12px, 0px, 12px",
    border: "1px solid #0358AC",
    color: "#F2F7FF",
    fontSize: "14px",
    backgroundColor: "#0358AC",
  },
  filtButton: {
    borderStyle: "none",
    color: "#152F40",
    fontSize: "15px",
    marginRight: theme.spacing(3),
  },
  anyDeep: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
  },
  dropdownIcon: {
    cursor: "pointer",
  },
  dropdown: {
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    border: "none",
    // width: '100%',
    Width: "60px",
  },
  searchIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    fontWeight: "bold !important",
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
      marginTop: "-49px",
      marginRight: "-66px",
      padding: "6px",
      cursor: "pointer",
      color: "#152F40",
      "@media(max-width:450px)": {
        marginRight: "-42px",
      },
    },
  },
  active: {
    color: "#709868",
    fontWeight: 500,
  },
  failed: {
    color: "#EC2727",
    fontWeight: 500,
  },

  dialogContainer: {
    "& .MuiTypography-h4": {
      color: "#152F40",
    },
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "949px",
      padding: "24px 44px",
      "@media(max-width:450px)": {
        padding: "20px",
      },
    },
    "& .mainTypo": {
      color: "#152F40",
    },
    "& .uploadBtn": {
      color: "#F2F7FF",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px",
    },
    "& .MuiButton-contained": {
      padding: "10px 55px",
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      width: "111px",
      borderRadius: "0px 6px 6px 0px",
      "@media(max-width:450px)": {
        padding: "10px",
      },
    },
    "& .btnContainer": {
      paddingTop: "16px",
    },
    "& .btnCancel": {
      width: "100%",
      backgroundColor: "#F4F4F4",
      fontWeight: 500,
      fontSize: "16px",
      fontFamily: "'Inter', sans-serif",
      color: "#152F40",
      borderRadius: "10px",
      height: "48px",
    },
    "& .btnAddInvite": {
      width: "100%",
      backgroundColor: "#0358AC",
      fontWeight: 500,
      fontSize: "16px",
      fontFamily: "'Inter', sans-serif",
      color: "#F2F7FF",
      borderRadius: "10px",
      height: "48px",
    },
    "& .gridContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    "& .MuiFormControl-root ": {
      marginTop: "6px",
    },
  },
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  companyUrl: Yup.string().required("Prospect Company is required"),
  image1: Yup.mixed().required("Image 1 is required"),
  linkedIn: Yup.string().url("Invalid URL").required("LinkedIn  is required"),
  twitter: Yup.string().url("Invalid URL").required("Twitter is required"),
  password: Yup.string().required("Password is required"),
  prospectName: Yup.string().required("Prospect Name is required"),
  user: Yup.string().required("User is required"),
  hvoUrl: Yup.string().url("Invalid URL").required("HVO URL is required"),
  videoUrl: Yup.string().url("Invalid URL").required("Video URL is required"),
  customerOrganization: Yup.string()
    .url("Invalid URL")
    .required("Customer Organization is required"),
  phoneNo: Yup.string().required("phoneNo is required"),
  finalVideoUrl: Yup.string()
    .url("Invalid URL")
    .required("finalVideoUrl is required"),
});
// Component for displaying user project list
function Errortable(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isUserList, setIsUserList] = useState([]);
  const [VideoTemplateName, setVideoTemplateName] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);

  const id = location?.state?.state?.sheetId;
  const sheetName = location?.state?.state?.sheetName;
  console.log("VideoTemplateName,", sheetId);

  const handlePageChange = (event, page) => {
    setPage(page - 1);
  };

  const errorDataList = async () => {
    setLoading(false);
    const params = {
      page: page,
      pageSize: 10 || 0,
      sheetId: id,
    };
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ErrorDataListing,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setVideoTemplateName(res?.data?.data?.videoTemplateName);
        setIsUserList(res?.data?.data?.failedCustomerData);
        setSheetId(res?.data?.data?.sheetId);
      } else if (res?.data?.status === 205) {
        // toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    errorDataList();
  }, [page, pagesize]);

  const truncateText = (text, maxLength = 30) => {
    return text?.length > maxLength
      ? `${text.slice(0, 15)}...${text.slice(-15)}`
      : text;
  };
  return (
    <>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <>
          <Box className={classes.headingBox}>
            <Typography variant="body1">
              <Link href="/Myprojects">Project Listings</Link> /{" "}
              <span style={{ color: "#0358AC" }}>Sheet All Data</span>
            </Typography>
          </Box>
          <Paper className={classes.tableContainer}>
            <TableContainer style={{ borderRadius: "7px" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer Organization</TableCell>
                    <TableCell align="center">Video Template Name</TableCell>
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isUserList &&
                    isUserList.map((data, index) => (
                      <React.Fragment key={index}>
                        <TableRow key={index}>
                          <TableCell align="center">
                            {data.CUSTOMER_ORGANIZATION
                              ? truncateText(data.CUSTOMER_ORGANIZATION)
                              : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {VideoTemplateName
                              ? truncateText(VideoTemplateName)
                              : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {data.FIRST_NAME
                              ? truncateText(
                                  data.FIRST_NAME + " " + data.LAST_NAME
                                )
                              : "N/A"}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={`${
                              data.STATUS === "FAILED" ? classes.failed : ""
                            }`}
                          >
                            {data.STATUS
                              ? data.STATUS.charAt(0).toUpperCase() +
                                data.STATUS.slice(1).toLowerCase()
                              : "Pending"}
                          </TableCell>
                          <TableCell
                            className={classes.viewEditbtn}
                            align="center"
                          >
                            <Button
                              onClick={() => {
                                history.push("/View-Myprojects", {
                                  state: {
                                    sheetId: sheetId,
                                    index: index,
                                    sheetName: sheetName,
                                  },
                                });
                              }}
                            >
                              View
                            </Button>
                            <Divider className="dividerbtn" />
                            <Button
                              onClick={() => {
                                history.push("/Edit-Myprojects", {
                                  state: {
                                    sheetId: sheetId,
                                    index: index,
                                    sheetName: sheetName,
                                  },
                                });
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {isUserList && isUserList.length === 0 && <DataNotFoundIMG />}
            {isUserList.length > 9 && (
              <Grid item xs={12} className="d-flex justify-end">
                <Pagination
                  count={pagesize}
                  shape="rounded"
                  page={page}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Grid>
            )}
          </Paper>
        </>
      )}
    </>
  );
}

export default Errortable;
