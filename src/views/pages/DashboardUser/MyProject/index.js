import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "../../../../context/User";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CloseIcon from "@material-ui/icons/Close";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { VscEyeClosed } from "react-icons/vsc";
import ViewProjects from "../../MyProjects/ViewProject";
import UserViewProject from "./Viewprojects";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import FullScreenLoader from "src/component/FullScreenLoader";
import { useLocation } from "react-router-dom";
// Styles for the component
const useStyles = makeStyles((theme) => ({
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
    justifyContent: "end",
    alignItems: "center",
    marginBottom: "15px",
    marginTop: "10px",
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
  projectmanually: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: "12px",
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
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "20px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
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
    padding: "5px",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "-40px",
      marginRight: "-55px",
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
  mainBox: {
    "& .country-list": {
      background: "#FFF !important",
      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
  },
}));

const validationSchema = Yup.object().shape({
  customerId: Yup.string().required("Customer Id is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  // email: Yup.string().required( /^(?!.*\.\.)(?!.*[@.]$)[a-zA-Z0-9][a-zA-Z0-9._+-]{0,252}@(?=[^.]*[A-Za-z])[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,63}$/,'Email is required'),
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Please enter your email address.")
    .max(254, "Email should not exceed 254 characters.")
    .matches(
      /^(?!.*\.\.)(?!.*[@.]$)[a-zA-Z0-9][a-zA-Z0-9._+-]{0,252}@(?=[^.]*[A-Za-z])[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,254}$/,
      "Invalid email"
    ),
  companyUrl: Yup.string().required("Prospect Company is required"),
  image1: Yup.mixed().required("Image 1 is required"),
  // image2: Yup.mixed().required('Image 2 is required'),
  linkedIn: Yup.string().url("Invalid URL").required("LinkedIn  is required"),
  twitter: Yup.string().url("Invalid URL").required("Twitter is required"),
  mapsUrl: Yup.string().url("Invalid URL").required("Map Url is required"),
  facebook: Yup.string().url("Invalid URL").required("Facebook is required"),
  // password: Yup.string().required('Password is required'),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}(?!.*\s)$/,
      "Please enter a valid password. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and should be 8-16 characters long without any spaces."
    )
    // .matches(/\s/g, '',"space block")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("Password is required.")
    .max(16, "Password should not exceed 16 characters.")
    .min(8, "Password must be a minimum of 8 characters."),
  // prospectName: Yup.string().required('Prospect Name is required'),
  // user: Yup.string().required('User is required'),
  hvoUrl: Yup.string().url("Invalid URL").required("HVO URL is required"),
  // videoUrl: Yup.string().url('Invalid URL').required('Video URL is required'),
  customerOrganization: Yup.string()
    .required("Customer Organization is required")
    .max(60, "Customer Organization should not exceed 60 characters."),
  phoneNo: Yup.string().required("Phone No. is required"),
  // finalVideoUrl: Yup.string().url("Invalid URL"),
  // .required("FinalVideoUrl is required"),
});
// Component for displaying user project list
function UserProjectList() {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [fieldValue, setFieldValue] = useState({ value: "", dataType: "" });
  const [sheetData, setSheetData] = useState();
  console.log("sheetData: ", sheetData);
  const [sheetId, setSheetId] = useState(location?.state?.state?.sheetId);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  console.log("loading: ", loading);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSheet, setSelectedSheet] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedType, setUpdatedType] = useState(null);
  const [isUserList, setIsUserList] = useState([]);
  console.log("isUserList: ", isUserList);
  const [videoTemplete, setVideoTemplete] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [errorSheetId, setErrorSheetId] = useState("");
  const [userData, setUserData] = useState({});
  const [sheetName, setSheetName] = useState("");
  const [CUSTOMER_ID, setCUSTOMER_ID] = useState("");
  const [errorData, setErrorData] = useState("");

  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(null);
  const [isFocuseds, setIsFocuseds] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showimagename, setShowImageName] = useState(null);
  const [search, setSearch] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle dropdown change;
  const handleDropdownSheet = (event) => {
    setSelectedSheet(event.target.value);
    setIsOpen(false);
  };
  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setIsOpen(false);
  // };
  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Function to handle add new project button click
  const handleAddNewProjectClick = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleCloseDialog1 = () => {
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCloseDialog2 = () => {
    setData();
    setOpenDialog(false);
  };
  const handleOpenDialog = (type) => {
    setUpdatedType(type);
    setOpen(true);
    // Set selected file based on the type of image being edited
    if (type === "LOGIN_SCREEN_IMAGE") {
      setSelectedFile(userData.loginImage);
      {
        console.log("userData", userData);
      }
    } else if (type === "ACCOUNT_LOGO") {
      setSelectedFile(userData.accountLogo);
    }
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const userListApi = async () => {
    // setLoading(true);
    const params = {
      page: page,
      pageSize: 10,
    };
    if (location?.state?.state?.sheetId) {
      params.sheetId = location?.state?.state?.sheetId;
    }
    if (location?.state?.state?.tempType) {
      params.tempType = location?.state?.state?.tempType;
    }
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.userProjectListing,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setIsUserList(res?.data?.data);
        setErrorData(res?.data?.data);
        setSheetUrl(res?.data?.data?.list[0]?.sheetUrl);
        setErrorSheetId(res?.data?.data?.list[0]?.sheetId);
        setSheetName(res?.data?.data?.list[0]?.sheetName);
        setCUSTOMER_ID(res?.data?.data?.list[0]?.CUSTOMER_ID);
        setVideoTemplete(res?.data?.data?.list[0]?.videoTemplateId);
        setPageSize(res?.data?.data?.pageCount);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const getAllSheet = async () => {
    try {
      // setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllSheet,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetId,
        },
      });
      if (res?.status === 200) {
        setSheetData(res?.data?.data);
        setFieldValue(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      // setLoading(false);
    }
  };
  const [statusFields, setStatusFields] = useState(null);
  const [urlField, serUrlField] = useState(null);
  useEffect(() => {
    if (sheetData && sheetData.length > 0) {
      setStatusFields(
        sheetData
          .filter((item) => item.dataType.includes("Status (Required)"))
          .map((item) => item.value)[0]
      );
      serUrlField(
        sheetData
          .filter((item) => item.dataType.includes("HVO URL (Required)"))
          .map((item) => item.value)[0]
      );
    }
  }, [sheetData]);

  useEffect(() => {
    getAllSheet();
    userListApi();
  }, [page]);
  const [data, setData] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    companyUrl: "",
    image1: "",
    image2: "",
    linkedIn: "",
    twitter: "",
    password: "",
    hvoUrl: "",
    videoUrl: "",
    customerOrganization: "",
    phoneNo: "",
    finalVideoUrl: "",
    Maps_URL: "",
    facebook: "",
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values Submitted: ", values);
  };

  const handleChangeField = (e, idx, item) => {
    const { value } = e.target;

    const updatedFieldValues = [...fieldValue];

    updatedFieldValues[idx] = {
      ...updatedFieldValues[idx],
      dataType: value,
      value: item?.value,
    };
    console.log(updatedFieldValues, "updatedFieldValuesupdatedFieldValues");
    // Set the updated state
    setFieldValue(updatedFieldValues);
  };

  const AddProjectManually = async (values) => {
    try {
      setFormLoading(true);
      // Transform fieldValue into a single object instead of an array of objects
      const dataToSend = fieldValue.reduce((acc, item) => {
        acc[item.value] = item.dataType;
        return acc;
      }, {});

      // setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.addProjectManually,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          sheetId: errorSheetId,
        },
        data: dataToSend, // Sending data as an object
      });

      if (res.data.status === 200) {
        setFormLoading(false);
        toast.success(res?.data?.message);
        handleCloseDialog2();
        await userListApi();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleIconClicks = () => {
    setIsFocuseds(true);
  };
  const handleBlur = () => {
    setIsFocuseds(false);
  };

  const handleChangeInput = (e, inputName) => {
    const update = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [inputName]: update,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setIsImageChanged(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = reader.result;
        setFileName(event.target.result);
        setSelectedFile(event.target.result);
        setShowImageName(file?.name);
        setData((prevUserData) => ({
          ...prevUserData,
          LOGO: base64Image,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const update = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [setFieldValue]: update,
    }));
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      handleFileUpload({ target: { files: [file] } });
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png,image/gif,image/jpg",
  });
  if (!sheetData || sheetData.length === 0) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <Box className={classes.paperContainer}>
        <Box className={classes.uppersection}>
          {/* <div className={classes.anyDeep}>
            <div>
              <Typography variant="outlined" className={classes.filtButton}>
                Filter
              </Typography>
            </div>
            <div className={classes.dropdownContainer}>
              <select
                id="simple-dropdown"
                value={selectedOption}
                onChange={handleDropdownChange}
                className={classes.dropdown}
              >
                <option value="">Sort</option>
                <option value="TEMPLATE"> Template</option>
                <option value="NAME"> Name </option>
              </select>
            </div>

            <div style={{ display: "flex" }}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          color: "black",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={handleIconClicks}
                      />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                onFocus={() => setIsFocuseds(true)}
                onBlur={handleBlur}
                onChange={(event) => setSearch(event.target.value)}
                style={{
                  border: isFocuseds ? "1px solid " : "1px solid grey",
                  borderRadius: "5px",
                  padding: "2px 0px 2px 12px",
                }}
              />
            </div>
          </div> */}
          <Box>
            {localStorage.getItem("userType") === "USER" && (
              <Button
                variant="outlined"
                className={classes.nextButton}
                onClick={handleAddNewProjectClick}
              >
                Add New Project Manually
              </Button>
            )}
          </Box>
        </Box>
        <Box style={{ display: "flex", margin: "25px 0px", gap: "10px" }}></Box>
        {loading ? (
          <div>
            <FullScreenLoader />
          </div>
        ) : (
          <Paper className={classes.tableContainer}>
            <Box className="datatable">
              <Paper className={classes.tableContainer}>
                <TableContainer style={{ borderRadius: "7px" }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Sheet Name</TableCell>

                        <TableCell align="center">Hvo Template Name</TableCell>
                        {/* <TableCell align="center">
                          Customer Organization
                        </TableCell> */}

                        {/* <TableCell align="center">Template Type</TableCell> */}

                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Hvo Template Link</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isUserList &&
                        isUserList?.list?.map((data, index) => (
                          <React.Fragment key={index}>
                            {data?.projectListing?.map(
                              (project, projectIndex) => (
                                <TableRow key={projectIndex}>
                                  <TableCell align="center">
                                    {data.sheetName ? data.sheetName : ""}
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.hvoTemplateName
                                      ? data.hvoTemplateName
                                      : ""}
                                  </TableCell>
                                  {/* <TableCell align="center">
                                    {project.CUSTOMER_ORGANIZATION}
                                  </TableCell> */}
                                  {/* <TableCell align="center">
                                    {data.templateType ? data.templateType : ""}
                                  </TableCell> */}
                                  <TableCell
                                    align="center"
                                    className={`${
                                      project?.[statusFields] === "FAILED"
                                        ? classes.failed
                                        : ""
                                    }`}
                                  >
                                    {project?.[statusFields]
                                      ? project?.[statusFields]
                                          .charAt(0)
                                          .toUpperCase() +
                                        project?.[statusFields]
                                          .slice(1)
                                          .toLowerCase()
                                      : "Pending"}
                                  </TableCell>
                                  <TableCell align="center">
                                    {project?.[urlField] ? (
                                      <a
                                        style={{
                                          color: "rgb(3, 88, 172)",
                                          textDecoration: "none",
                                        }}
                                        href={project?.[urlField]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Link
                                      </a>
                                    ) : (
                                      "--"
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className={classes.viewEditbtn}
                                    align="center"
                                  >
                                    <Button
                                      onClick={() => {
                                        history.push("/View-Myproject", {
                                          state: {
                                            errorData:
                                              errorData?.list[0]
                                                ?.projectListing[projectIndex],
                                            sheetUrl: sheetUrl,
                                            ErrorSheetId: errorSheetId,
                                            sheetName: sheetName,
                                            CUSTOMER_ID: CUSTOMER_ID,
                                            videoTemplete: videoTemplete,
                                            projectIndex: projectIndex,
                                          },
                                        });
                                      }}
                                    >
                                      View
                                    </Button>
                                    {/* <Divider className="dividerbtn" />
                                    <Button
                                      onClick={() => {
                                        history.push("/Edit-Myproject", {
                                          state: {
                                            errorData:
                                              errorData?.list[0]
                                                ?.projectListing[projectIndex],
                                            sheetUrl: sheetUrl,
                                            ErrorSheetId: errorSheetId,
                                            sheetName: sheetName,
                                            CUSTOMER_ID: CUSTOMER_ID,
                                            videoTemplete: videoTemplete,
                                            projectIndex: projectIndex,
                                          },
                                        });
                                      }}
                                    >
                                      Edit
                                    </Button> */}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                  {isUserList && pagesize > 1 && (
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
                </TableContainer>
                {isUserList && isUserList?.list?.length === 0 && (
                  <DataNotFoundIMG />
                )}
              </Paper>
            </Box>
          </Paper>
        )}
        <Formik
          initialValues={{ data }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                className={classes.dialogContainer}
              >
                <Box className={classes.CrossIcon}>
                  <RxCross2
                    className="closeicon"
                    onClick={handleCloseDialog2}
                  />
                </Box>
                <Box className={classes.mainBox}>
                  <Box pb={3}>
                    <Typography variant="h4">Add Project Manually</Typography>
                  </Box>

                  <Grid container spacing={4}>
                    {sheetData &&
                      sheetData?.map((item, idx) =>
                        item?.dataType == "HVO URL (Required)" ||
                        item?.dataType == "Error (Required)" ||
                        item?.dataType == "Status (Required)" ? (
                          <></>
                        ) : (
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            sm={12}
                            className="gridContainer"
                          >
                            <Box>
                              <Typography className="mainTypo" variant="body1">
                                {item.value}
                              </Typography>
                              <TextField
                                placeholder={item?.dataType || ""}
                                // placeholder="Enter Your Data"
                                type="text"
                                variant="outlined"
                                fullWidth
                                name={item.value}
                                // value={data.customerId}
                                // value={fieldValue[idx]?.dataType || ""}
                                onChange={(e) =>
                                  handleChangeField(e, idx, item)
                                }
                              />
                            </Box>
                          </Grid>
                        )
                      )}
                  </Grid>

                  <Grid container spacing={4} className="btnContainer">
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <Button
                        variant="contained"
                        className="btnCancel"
                        onClick={handleCloseDialog2}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <Button
                        variant="contained"
                        className="btnAddInvite"
                        onClick={AddProjectManually}
                        type="submit"
                      >
                        {formLoading ? (
                          <ButtonCircularProgress />
                        ) : (
                          "Add Project"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Dialog>
            </Form>
          )}
        </Formik>

        <Dialog open={open} className={classes.mainDialog}>
          <Box className={classes.CrossIcon}>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon className="closeicon" />
            </IconButton>
          </Box>
          <Typography variant="body1" className={classes.dialogHeading}>
            {updatedType === "LOGIN_SCREEN_IMAGE"
              ? "Login Screen Image"
              : "Account Logo"}
          </Typography>
          {selectedFile ? (
            <Box style={{ minHeight: "300px", margin: "0 44px" }}>
              <img
                src={selectedFile}
                alt="Preview"
                style={{ width: "100%", maxHeight: "300px" }}
              />
            </Box>
          ) : (
            <Box className={classes.dialogBtnBox} {...getRootProps()}>
              <input
                {...getInputProps()}
                style={{ display: "none" }}
                id="upload-input"
              />
              <Typography variant="body1" className="dialogTypo">
                Click to add image from your device
              </Typography>
              <label htmlFor="upload-input">
                <Button component="span" className="btnUpload">
                  Upload
                </Button>
              </label>
            </Box>
          )}
          <Box className={classes.btnConatainer}>
            <Button onClick={handleCloseDialog1} className="btnCancel">
              Cancel
            </Button>
            <Button
              onClick={
                !isImageChanged
                  ? () => setSelectedFile(null)
                  : handleCloseDialog1
              }
              className="btnSave"
            >
              {loading === false ? (
                !isImageChanged ? (
                  "Change Image"
                ) : (
                  "Save"
                )
              ) : (
                <ButtonCircularProgress />
              )}
            </Button>
          </Box>
        </Dialog>
      </Box>
    </>
  );
}

export default UserProjectList;
