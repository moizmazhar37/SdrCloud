import React, { useState, useEffect, useContext, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  styled,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Autocomplete, Pagination } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { GrFilter } from "react-icons/gr";
import { menuProps } from "src/utils";
import { Close } from "@material-ui/icons";
import FullScreenLoader from "src/component/FullScreenLoader";

// Styles for the component

const useStyles = makeStyles((theme) => ({
  listbox: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    paddingRight: "0px",
  },
  paperContainer: {
    "& .adduserBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "180px",
      width: "200px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "8px 10px 8px 10px",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        margin: "0px auto",
      },
      "& p": {
        textAlign: "center",
        marginTop: "20px",
        color: "#152F40",
        marginBottom: "10px",
      },
    },
    "& .datatable": {
      marginTop: "16px",
      width: "100%",
      "& .MuiTableCell-head": {
        backgroundColor: "var(--light-grey2, #FCFCFC)",
        color: "var(--grey, #858585)",
        // textAlign: "center",
        minWidth: "117px",
        fontSize: "14px !important",
        "&:first-child": {
          padding: "12px 6px 14px 16px",
        },
      },
      "& .MuiTableCell-body": {
        color: "var(--black, #152F40)",
        fontWeight: "500",
        // textAlign: "center",
        minWidth: "103px",
      },
    },
    "& .ViewButton": {
      boxShadow: "none",
    },
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
      color: "#fff !important",
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
  // selectitem: {
  //   color: "#152F40",
  //   border: "1px solid #ECECEC",
  //   height: "44px",
  //   marginTop: "20px",
  //   background: "transparent",
  //   borderRadius: "8px",
  //   "& .MuiSelect-iconOutlined": {
  //     borderLeft: "1px solid #ECECEC",
  //     marginRight: "-5px !important",
  //   },
  //   "& .MuiSelect-iconOpen": {
  //     borderLeft: "1px solid #ECECEC",
  //     // borderRight: "1px solid #ECECEC",
  //     transform: "rotate(360deg)",
  //     marginRight: "-5px !important",
  //   },
  //   "& .MuiSelect-icon": {
  //     top: 0,
  //     height: "40px",
  //     paddingLeft: "8px",
  //     color: "#152F40",
  //   },
  //   "& .MuiPopover-paper": {
  //     marginTop: "85px",
  //   },
  //   "& .MuiTableCell-head ": {
  //     lineheight: "2.5rem",
  //   },
  // },

  sidebarfilter: {
    marginTop: "16px",
    width: "100%",
    border: "1px solid var(--light-stroke, #ECECEC)",
    height: "100%",
    maxHeight: "504px",
    borderRadius: "6px",
    "& .MuiTableCell-head": {
      backgroundColor: "var(--light-grey2, #FCFCFC)",
      color: "var(--grey, #858585)",
    },
    "& .MuiTableCell-body": {
      color: "var(--black, #152F40)",
      fontWeight: "500",
    },
    "& .firstinnerdiv": {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 11px 9px 24px",
      alignItems: "center",
      backgroundColor: "var(--light-grey2, #FCFCFC)",
      borderBottom: "1px solid var(--light-stroke, #ECECEC)",
    },
    "& .thirdinnerdiv": {
      "& .AutocompleteCss": {
        menuItem: {
          color: "#152F40",
          fontSize: "14px",
          fontWeight: 400,
        },
        "&  .MuiAutocomplete-popupIndicatorOpen": {
          transform: "none !important",
        },
        "& .MuiIconButton-root:hover": {
          background: "none !important",
        },
        popupIcon: {
          transform: "none",
          opacity: "0.5 !important",
          height: "45px",
        },
        "& .MuiAutocomplete-inputRoot": {
          padding: 0,
        },
        "& .MuiAutocomplete-input": {
          padding: 0,
        },
      },
      "& .MuiSelect-icon": {
        top: "0",
        color: "#152F40",
        height: "40px",
        paddingLeft: "8px",
        marginLeft: "1px",
      },
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& p": {
        color: "#152F40",
        fontWeight: 400,
      },
    },
    "& .Fourthinnerdiv": {
      "& .MuiSelect-icon": {
        top: "0",
        color: "#152F40",
        height: "40px",
        paddingLeft: "8px",
      },
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& p": {
        color: "#152F40",
        fontWeight: 400,
      },
    },
    "& .secondinnerdiv": {
      "& p": {
        color: "#152F40",
        fontWeight: 400,
      },
    },
    "& p": {
      color: "#858585",
      fontWeight: "500",
    },
    "& .menuTextfield": {
      height: "48px",
      borderRadius: "8px",
      marginTop: "6px",
      marginBottom: "8px",
      "& .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
        {
          color: "#858585 !important",
        },
    },
    "& .selectitem": {
      color: "#858585 !important",
      border: "1px solid #ECECEC",
      height: "42px",
      background: "transparent",
      borderRadius: "8px",
      marginTop: "6px",
      marginBottom: "8px",
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& .MuiSelect-iconOpen": {
        borderLeft: "0px !important",
        borderRight: "none",
        transform: "rotate(360deg)",
        marginRight: "-1px !important",
        borderLeft: "1px solid #ECECEC",
      },
      "& .MuiSelect-icon": {
        top: 0,
        height: "40px",
        paddingLeft: "8px",
        color: "#152F40",
      },
      "& .MuiPopover-paper": {
        marginTop: "85px",
      },
      "& .MuiInputBase-input": {
        color: "#858585 !important",
      },
    },
    "& .filter": {
      color: " #858585",
    },
    "& .filterDisables": {
      color: "#0358AC",
    },
  },
  viewEditbtn: {
    display: "flex",
    justifyContent: "center",
    "& .dividerbtn": {
      border: "1px solid #152f40a3",

      height: "28px",
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16.8px",
    },
    "& .MuiButton-root": {
      color: "#0358AC",
      fontWeight: "600 !important",
    },
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC",
    },
    "& .MuiSelect-iconOpen": {
      borderLeft: "none !important",
      borderRight: "1px solid #ECECEC",
    },
    "& .selectitem": {
      color: "#152F40",
      border: "1px solid #ECECEC",
      height: "44px",
      marginTop: "20px",
      background: "transparent",
      borderRadius: "8px",
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
        marginRight: "-5px !important",
      },
      "& .MuiSelect-iconOpen": {
        borderLeft: "1px solid #ECECEC !important",
        borderRight: "none !important",
        transform: "rotate(360deg)",
        marginRight: "-5px !important",
      },
      "& .MuiSelect-icon": {
        top: 0,
        height: "40px",
        paddingLeft: "8px",
        color: "#152F40",
      },
      "& .MuiPopover-paper": {
        marginTop: "85px",
      },
    },
  },
  active: {
    color: "#709868 !important", // Green color for active status
    fontWeight: 500,
  },
  failed: {
    color: "#EC2727 !important", // Red color for failed status
    fontWeight: 500,
  },
  paginationGrid: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
    "& .MuiSvgIcon-root": {
      border: "1px solid #ECECEC",
      backgroundColor: "#FCFCFC",
      color: "#858585",
      fill: "#858585",
      minWidth: "32px",
      height: "32px",
    },
    "& .MuiPaginationItem-root": {
      // Fix the selector
      backgroundColor: "#ffffff",
      color: "#0358ac",
      border: "1px solid #ECECEC",
      borderRadius: "6px",
    },
  },
  tablerows: {
    "& .MuiTableCell-root": {
      padding: "15px 16px 15px 16px",
      "&:last-child": {
        padding: "15px 21px 15px 16px",
      },
    },
  },
}));

function SuperAdminAccount() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [ppadminList, setPPAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [adduser, setAddUser] = useState(false);
  const [searchAccountName, setSearchAccountName] = useState("");
  const [searchPPAdmin, setSearchPPAdmin] = useState([]);
  const [searchStatus, setSearchStatus] = useState("none");
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedPPAdmin, setSelectedPPAdmin] = useState("none");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [ppuserlist, setppUserList] = useState([]);
  const [accountStatus, setAccountStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const autocompleteRef = useRef(null);
  const [open, setOpen] = useState(false);

  const isAnyFieldNotEmpty =
    searchAccountName.trim() !== "" ||
    selectedPPAdmin !== "none" ||
    searchStatus !== "none";
  const handleClearFilters = () => {
    setSearchAccountName("");
    setSelectedPPAdmin("none");
    setSearchStatus("none");
    PPadminuserlist();
    PPUsers();
  };
  const PPadminuserlist = async () => {
    setLoading(true);
    try {
      let params = {
        page: pagenumber,
        size: 7,
      };
      if (searchAccountName.trim() !== "") {
        params.accountName = searchAccountName.trim();
      }
      if (selectedPPAdmin && selectedPPAdmin !== "none") {
        params.ppAdmin = selectedPPAdmin;
      }
      if (searchStatus.trim() !== "" && searchStatus !== "none") {
        params.status = searchStatus.trim();
      }

      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllPPUsers,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setPPAdminList(res?.data?.data?.list);
        setPageSize(res?.data?.data?.pageCount);
      } else if (res?.data?.status === 205) {
        toast.error("No PP Admin Found");
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const PPUsers = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ppadminUserListNew,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setSearchPPAdmin(res?.data?.data?.ppAdminList);
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  const handleBlock = async () => {
    let newAccountStatus =
      selectedUserId?.status === "ACTIVE" ? "BLOCK" : "ACTIVE";

    setLoading(true);
    try {
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.blockUnblockAccount,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          accountId: selectedUserId?.accountId,
          accountStatus: newAccountStatus,
        },
      });
      if (res?.data?.status === 200 || res?.data?.status === 205) {
        toast.success(res?.data?.message);
        handleDeleteClose();
        PPadminuserlist();
      }
      // else if (res?.data?.status === 205) {
      //   toast.success(res?.data?.message);
      //   handleDeleteClose();
      //   PPadminuserlist();
      // }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTxt(searchAccountName);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchAccountName]);

  useEffect(() => {
    PPadminuserlist();
    PPUsers();
  }, [pagenumber, pageSize, searchTxt, searchStatus, selectedPPAdmin]);

  const handleAccountNameChange = (event) => {
    setActive(true);
    setSearchAccountName(event.target.value);
    setPageNumber(1);
    if (searchAccountName.length === 0) {
      setActive(false);
    }
  };
  const selectRef = useRef(null);

  const handlePPAdminChange = (event) => {
    setSelectedPPAdmin(event);
    setPageNumber(1);
  };

  const handleInputChange = (event) => {
    const input = event.target.value.trim();
    const searchUsers =
      input === ""
        ? []
        : searchPPAdmin.filter(
            (user) => user.name.toLowerCase() === input.toLowerCase()
          );
    setSearchPPAdmin(searchUsers);
  };

  const handleStatusChange = (event) => {
    setSearchStatus(event.target.value);
    setPageNumber(1);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const handlePageChange = (event, pagenumber) => {
    setPageNumber(pagenumber);
  };
  console.log("selectedUserIdselectedUserId", ppadminList);
  const handleChange = (newValue) => {
    console.log(newValue, "uyguyguy");
    handlePPAdminChange(newValue);
  };
  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      height: 40, // Decreased height
      fontSize: "0.75rem", // Smaller font size if needed
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.85rem", // Smaller label font size
    },
  }));

  // Style for the dropdown options
  const CustomOption = styled("li")(({ theme }) => ({
    padding: theme.spacing(0.5, 1), // Reduced padding
    height: 40, // Decreased height
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem", // Smaller font size for options
  }));
  const CustomPaper = styled("div")(({ theme }) => ({
    maxHeight: 180, // Set the max height for the dropdown list
    overflowY: "auto", // Enable vertical scrolling
    background: "#fff",
    opacity: 1,
    border: "1px solid rgb(236, 236, 236)",
    padding: "0px 10px",
  }));

  return (
    <>
      <Box className={classes.paperContainer}>
        <Box
          className="adduserBox"
          onClick={() => {
            setAddUser(true);
            history.push("/PP-create");
          }}
        >
          <div className="d-flex">
            <img src="images/AddUserImage.png" alt="AddUser" />
          </div>
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            Create New Account
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <Box className={classes.sidebarfilter}>
              <div className="firstinnerdiv">
                <div style={{ gap: "4px", display: "flex" }}>
                  <GrFilter
                    className={`${
                      !isAnyFieldNotEmpty ? "filter" : "filterDisables"
                    }`}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <Typography
                    variant="body1"
                    className={`${
                      !isAnyFieldNotEmpty ? "filter" : "filterDisables"
                    }`}
                  >
                    Filter Accounts
                  </Typography>
                </div>
                <Button
                  style={{ color: "#0358AC" }}
                  onClick={handleClearFilters}
                  disabled={!isAnyFieldNotEmpty}
                >
                  Clear
                </Button>
              </div>
              <Box style={{ padding: "12px 24px" }}>
                <div className="secondinnerdiv">
                  <Typography variant="body1">
                    Search by Account Name
                  </Typography>
                  <TextField
                    className="menuTextfield"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter Account Name"
                    value={searchAccountName}
                    onChange={handleAccountNameChange}
                  />
                </div>
                <div className="thirdinnerdiv">
                  <Typography>Search by SDRCloud.ai Admin</Typography>
                  <Box ref={autocompleteRef}>
                    <Autocomplete
                      className="AutocompleteCss"
                      classes={{ listbox: classes.listbox }}
                      value={
                        searchPPAdmin.find(
                          (user) => user.userId === selectedPPAdmin
                        ) || null
                      }
                      onChange={(event, newValue) => {
                        if (newValue) {
                          handleChange(newValue.userId);
                        } else {
                          handleChange("none");
                        }
                      }}
                      inputValue={searchTerm}
                      onInputChange={(event, newInputValue) => {
                        setSearchTerm(newInputValue);
                        if (!newInputValue) {
                          setSelectedPPAdmin(""); // Clear the selected value when input is cleared
                        }
                      }}
                      onBlur={() => {
                        // Clear input field when it loses focus
                        if (!selectedPPAdmin) {
                          setSearchTerm(""); // Clear search input if no selection is made
                        }
                      }}
                      options={searchPPAdmin}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.userId === value.userId
                      }
                      disableClearable
                      noOptionsText="No PP Admin"
                      popupIcon={
                        <ExpandMoreIcon
                          className="popupIcon"
                          style={{
                            borderLeft: "1px solid #E7E7E7",
                            height: "42px",
                            fontSize: "15px",
                            color: "rgb(21, 47, 64,0.94)",
                            // fontWeight: 150,
                            width: "73%",
                            marginLeft: "-2px",
                            transform: "none",
                            pointerEvents: "none",
                            transition: "transform 0.3s ease-in-out",
                            paddingLeft: "6px",
                          }}
                        />
                      }
                      PaperComponent={CustomPaper}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          variant="outlined"
                          placeholder="Select PP Admin"
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            classes: { root: classes.autocompleteInputRoot },
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <MenuItem {...props} className={classes.menuItem}>
                          {option.name}
                        </MenuItem>
                      )}
                    />
                  </Box>
                </div>

                <div className="Fourthinnerdiv">
                  <Typography style={{ marginTop: "10px" }}>
                    Search by Status
                  </Typography>
                  <FormControl style={{ marginTop: "0px" }}>
                    <Select
                      variant="outlined"
                      className="selectitem"
                      id="choose-template"
                      MenuProps={menuProps}
                      value={searchStatus}
                      onChange={handleStatusChange}
                      onOpen={handleOpen}
                      onClose={handleClose1}
                      IconComponent={(props) => (
                        <ExpandMoreIcon
                          {...props}
                          style={{
                            fontSize: "26px",
                            position: "absolute",
                            right: "10px",
                            top: "0%",
                            transform: "none",
                            transition: "transform 0.3s ease-in-out",
                            pointerEvents: "none",
                            borderRight: "none !important",
                            height: "100%",
                          }}
                        />
                      )}
                      renderValue={(selected) => {
                        if (selected === "none") {
                          return (
                            <span style={{ color: "gray" }}>Select Status</span>
                          );
                        }
                        return (
                          <span style={{ color: "black" }}>
                            {selected === "BLOCK"
                              ? "Blocked"
                              : selected === " "
                              ? "All"
                              : selected.charAt(0).toUpperCase() +
                                selected.slice(1).toLowerCase()}
                          </span>
                        );
                      }}
                    >
                      <MenuItem value="none" disabled>
                        Select Status
                      </MenuItem>
                      <MenuItem value=" ">All</MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="BLOCK">Blocked</MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="EXPIRED">Expired</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <Box className="datatable">
              {loading ? (
                <div>
                  <ButtonCircularProgress />
                </div>
              ) : (
                <>
                  <TableContainer style={{ borderRadius: "6px" }}>
                    <Table
                      aria-label="simple table"
                      style={{
                        border: "1px solid var(--light-stroke, #ECECEC)",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Account Name</TableCell>
                          <TableCell align="center">PP Admin</TableCell>
                          <TableCell align="center">Users</TableCell>
                          <TableCell align="center">
                            Account Creation Date
                          </TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {(ppadminList &&
                        ppadminList?.length === 0 &&
                        ppadminList?.length === undefined) ||
                        ppadminList?.length === null ||
                        (ppadminList?.length === 0 && (
                          <TableCell colSpan={6}>
                            <DataNotFoundIMG />
                          </TableCell>
                        ))}
                      <TableBody>
                        {ppadminList?.map((key, index) => (
                          <TableRow className={classes.tablerows}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {key?.accountName && key?.accountName.length > 20
                                ? `${key?.accountName.slice(0, 10)}...`
                                : key?.accountName || "--"}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {key?.ppAdmin && key?.ppAdmin.length > 20
                                ? `${key?.ppAdmin.slice(0, 20)}...`
                                : key?.ppAdmin || "--"}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {key?.users === 0 ? 0 : key?.users}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(key?.startDate).toLocaleDateString()}
                            </TableCell>

                            <TableCell
                              align="center"
                              className={`${
                                key?.status === "ACTIVE"
                                  ? classes.active
                                  : key?.status === "BLOCK"
                                  ? classes.failed
                                  : ""
                              }`}
                            >
                              <li>
                                {key?.status === "BLOCK"
                                  ? "Blocked"
                                  : key?.status
                                  ? key.status.charAt(0).toUpperCase() +
                                    key.status.slice(1).toLowerCase()
                                  : "--"}
                              </li>
                            </TableCell>
                            <TableCell className={classes.viewEditbtn}>
                              <FormControl style={{ width: "100px" }}>
                                <Select
                                  style={{ marginTop: "0px" }}
                                  variant="outlined"
                                  className="selectitem"
                                  id="choose-template"
                                  value={"none"}
                                  MenuProps={menuProps}
                                  name=""
                                  IconComponent={ExpandMoreIcon}
                                >
                                  <MenuItem
                                    value="none"
                                    onClick={() => {
                                      history.push({
                                        pathname: "/View-PP-createaccount",
                                        state: { accountId: key?.accountId },
                                      });
                                    }}
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      history.push({
                                        pathname: "/Edit-PP-createaccount",
                                        state: {
                                          accountId: key?.accountId,
                                          detail: key,
                                        },
                                      });
                                    }}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    disabled={
                                      key?.status !== "ACTIVE" &&
                                      key?.status !== "BLOCK"
                                    }
                                    onClick={() => {
                                      handleClose();
                                      setSelectedUserId(key);
                                      setDeleteOpen(true);
                                    }}
                                  >
                                    {key?.status === "ACTIVE"
                                      ? "Block"
                                      : key?.status === "BLOCK"
                                      ? "Unblock"
                                      : ""}
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid item xs={12} className={classes.paginationGrid}>
                    {pageSize > 1 && (
                      <Pagination
                        count={pageSize}
                        shape="rounded"
                        page={pagenumber}
                        color="primary"
                        onChange={handlePageChange}
                        sx={{
                          "& .MuiPaginationItem-root": {
                            border: "1px solid #000", // Apply border to each pagination item
                          },
                        }}
                      />
                    )}
                  </Grid>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {}

      <Dialog
        open={deleteOpen}
        className={classes.dialog}
        onClose={handleDeleteClose}
        BackdropProps={{
          style: { backdropFilter: "blur(4px)" },
        }}
      >
        <DialogTitle>
          <Typography variant="h5">Warning: Block/Unblock </Typography>
          <Close onClick={handleDeleteClose} />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4">
            Are you sure you want to{" "}
            {selectedUserId?.status === "ACTIVE" ? "block" : "unblock"} this
            Account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button
            style={{ boxShadow: "none" }}
            variant="contained"
            color="primary"
            onClick={() => handleBlock()}
          >
            {loading === false ? (
              selectedUserId?.status === "ACTIVE" ? (
                "Block"
              ) : (
                "Unblock"
              )
            ) : (
              <ButtonCircularProgress />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SuperAdminAccount;
