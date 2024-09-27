import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "../../../context/User";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import SearchIcon from "@material-ui/icons/Search";
import { Close } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    "& .ButtonStyling": {
      display: "flex",
      margin: "25px 0px",
      gap: "10px",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
  },
  darkBtn: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#181C32",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Inter",
    color: "#fff",
    width: "100%",
    "@media(max-width:380px)": {
      padding: "7px",
      fontSize: "12px",
    },
  },
  table: {
    overflowX: "auto",
    minWidth: 650,
    "& .MuiTableCell-head": {
      background: "#FCFCFC",
      fontSize: "14px !important",
      color: "#858585",
      fontWeight: 500,
      minWidth: "129px",
    },
    "& .MuiTableCell-body": {
      background: "#FFF",
      fontSize: "14px",
      fontWeight: 500,
      minWidth: "102px",
    },
  },
  viewBtn: {
    borderRadius: "6px",
    fontSize: "12px",
    padding: "8px 12px",
    maxWidth: "max-content",

    "@media screen and (max-width:979px)": {
      fontSize: "12px",
      padding: "8px",
    },
  },
  status: {
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "Inter",

    "& span": {
      display: "inline-block",
      width: "8px",
      height: "8px",
    },
  },
  Checkbox: {
    appearance: "none",
    width: "25px",
    height: "25px",
    borderRadius: "6px",
    background: "#8e909f",
    position: "relative",
    "&:checked": {
      backgroundColor: "#181C32",
    },
    "&:checked::after": {
      content: '""',
      position: "absolute",
      top: "5px",
      left: "9px",
      width: "4px",
      height: "9px",
      border: "solid white",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
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
    padding: "0px 8px 0px 8px",
    border: "1px solid #0358AC",
    color: "#0358AC",
    fontSize: "14px",
  },
  filtButton: {
    borderStyle: "none",
    color: "#152F40",
    fontSize: "14px",
    // marginRight: theme.spacing(3),
  },
  anyDeep: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  iconColor: {
    color: "white",
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    // position: 'relative',
    // marginBottom: theme.spacing(3), // Add margin if needed
  },
  dropdownIcon: {
    cursor: "pointer",
    // Your styles for the dropdown icon go here
  },
  dropdown: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    border: "none",
    // width: '100%',
    Width: "60px",
    // Your styles for the dropdown go here
  },
  searchIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    fontWeight: "bold !important",
  },
  active: {
    color: "#709868", // Green color for active status
    fontWeight: 500,
  },
  failed: {
    color: "#EC2727", // Red color for failed status
    fontWeight: 500,
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
  tableContainer: {
    "& .MuiPaginationItem-root": {
      // Fix the selector
      backgroundColor: "#ffffff",
      color: "#0358ac",
      border: "1px solid #ECECEC",
      borderRadius: "6px",
    },
    "& .MuiSvgIcon-root": {
      border: "1px solid #ECECEC",
      backgroundColor: "#FCFCFC",
      color: "#858585",
      fill: "#858585",
      minWidth: "32px",
      height: "32px",
    },
  },
}));
// Component for managing all customer group data, including fetching project data, user data, and handling various user interactions.
const dummyData = [
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Active",
    template: "Active",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Error",
    template: "Error",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Active",
    template: "Active",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Active",
    template: "Error",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Active",
    template: "Active",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Error",
    template: "Active",
  },
  {
    projectName: "Acme Co.",
    user: "Jane Cooper",
    sent: "Cameron Williamson",
    active: "Active",
    template: "Active",
  },

  // Add more data if needed
];

function AllCustomerGroup() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [allProjectsData, setAllProjectData] = useState([]);
  console.log("allProjectsData: ", allProjectsData);

  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState("");
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [pagesize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [accountStatus, setAccountStatus] = useState("");
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState("none");
  const [tempType, setTempType] = useState("VIDEO");
  const [sheetId, setSheetId] = useState("");
  const [pagination, setPagination] = useState(false);

  const getallProjectData = async () => {
    setLoading(false);
    const params = {
      page: page,
      pageSize: 10,
      searchType: selectedOption,
      sheetType: tempType,
    };

    if (search !== "") {
      params.name = search;
    }

    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.projectListing,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setAllProjectData(res?.data?.data?.docs);
        setPageSize(res?.data?.data?.totalPageCount);
        setSheetId(res?.data?.data?.docs);
        setPagination(true);
      }
      if (res?.data?.status === 205) {
        setLoading(false);
      } else if (res?.data?.status === 400) {
        setPagination(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  const handleClear = () => {
    setSelectedOption(" ");
    setSearch("");
  };

  const handleUnAssign = async () => {
    try {
      const response = await axios({
        url: ApiConfig.assignUnassign,
        method: "POST",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },

        data: {
          accountSheetStatus: "UNASSIGNED",
          sheetId: selectedUserId?._id,
          assignedUserId: selectedUserId?.assignedUserData?._id,
        },
      });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        handleDeleteClose();
        getallProjectData();
        setSelectedUser("none");
      } else if (response?.data?.status === 205) {
        toast.success(response?.data?.message);
        handleDeleteClose();
        setSelectedUser("none");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleDeleteClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser("none");
    setSelectedUserId(null);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  useEffect(() => {
    getallProjectData();
  }, [page, search, selectedOption, tempType]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOpen(false);
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleIconClick = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const truncateText = (text, maxLength = 30) => {
    return text?.length > maxLength
      ? `${text.slice(0, 15)}...${text.slice(-15)}`
      : text;
  };

  return (
    <>
      <Box className={classes.paperContainer}>
        <Box className={classes.uppersection}>
          <div className={classes.anyDeep}>
            <div>
              <Button variant="outlined" className={classes.filtButton}>
                Filter
              </Button>
            </div>
            <div className={classes.dropdownContainer}>
              <select
                id="simple-dropdown"
                value={selectedOption}
                onChange={handleDropdownChange}
                className={classes.dropdown}
              >
                <option value="">Sort</option>
                <option value="USER"> User </option>
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
                        onClick={handleIconClick}
                      />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                onChange={(event) => setSearch(event.target.value)}
                style={{
                  border: isFocused ? "1px solid " : "1px solid grey",
                  borderRadius: "5px",
                  padding: "2px 0px 2px 12px",
                }}
              />
            </div>
          </div>
          {/* <div>
            <Button
              variant="outlined"
              className={classes.nextButton}
            // onClick={() => setAddCompanyAdminDialogueUpen(true)}
            >
              Edit
            </Button>
          </div> */}
        </Box>

        <Box className="ButtonStyling">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setTempType("VIDEO");
              handleClear();
            }}
            style={{
              background: tempType === "VIDEO" ? "#0358AC" : "#fff",
              color: tempType === "VIDEO" ? "#F2F7FF" : "#152F40",
            }}
          >
            Video
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setTempType("HVO");
              handleClear();
            }}
            style={{
              background: tempType === "HVO" ? "#0358AC" : "#fff",
              color: tempType === "HVO" ? "#F2F7FF" : "#152F40",
            }}
          >
            HVO
          </Button>
        </Box>

        <Paper className={classes.tableContainer}>
          <Box className="datatable">
            {loading ? (
              <div className={classes.loaderCenter}>
                <ButtonCircularProgress />
              </div>
            ) : (
              <Paper className={classes.tableContainer}>
                <TableContainer style={{ borderRadius: "7px" }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Sheet Name</TableCell>
                        <TableCell align="center">
                          {tempType === "VIDEO"
                            ? tempType.charAt(0).toUpperCase() +
                              tempType.slice(1).toLowerCase()
                            : tempType}{" "}
                          Template Name
                        </TableCell>

                        <TableCell align="center">User</TableCell>

                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allProjectsData &&
                        allProjectsData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {truncateText(data?.title)}
                            </TableCell>
                            <TableCell align="center">
                              {truncateText(data?.hvoTemplateName)}
                            </TableCell>
                            <TableCell align="center">
                              {data?.assignedUserData?.firstName
                                ? truncateText(
                                    data?.assignedUserData?.firstName
                                  )
                                : "-"}{" "}
                              {data?.assignedUserData?.lastName
                                ? truncateText(data?.assignedUserData?.lastName)
                                : "-"}
                            </TableCell>

                            <TableCell
                              align="center"
                              className={`${
                                data?.assignedStatus === "ASSIGNED"
                                  ? classes.active
                                  : data?.assignedStatus === "UNASSIGNED"
                                  ? classes.failed
                                  : ""
                              }`}
                            >
                              {data?.assignedStatus
                                ? data?.assignedStatus.charAt(0).toUpperCase() +
                                  data?.assignedStatus.slice(1).toLowerCase()
                                : ""}
                            </TableCell>

                            <TableCell
                              className={classes.viewEditbtn}
                              align="center"
                            >
                              <Button
                                onClick={() => {
                                  console.log();
                                  history.push("/user-myprojects", {
                                    state: {
                                      sheetId: data?._id,
                                      hvoTemplateName: data?.hvoTemplateName,
                                      sheetName: data?.title,
                                      tempType: data?.sheetType,
                                    },
                                  });
                                }}
                              >
                                View
                              </Button>
                              {/* <Divider className="dividerbtn" />
                            <Button
                              onClick={() => {
                                history.push("/user-myprojects", {
                                  state: {
                                    sheetId: data?.assignedUserData?._id,
                                    // videoTemplateId: data?.videoTemplateId,
                                    sheetName: data?.title,
                                  },
                                });
                              }}
                            >
                              Edit
                            </Button> */}
                              {/* <Divider className="dividerbtn" />
                            <Button
                              onClick={() => {
                                // var userId1 = data?.userId;
                                // var accountId1 = data?.accountId;

                                // var sheetId1 = data?.sheetId;
                                handleClose();
                                setSelectedUserId(data);
                                // getAllUsers();
                                setDeleteOpen(true);
                              }}
                            >
                              Unassign
                            </Button> */}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {allProjectsData && allProjectsData.length === 0 && (
                    <DataNotFoundIMG />
                  )}

                  {pagesize > 1 && pagination && (
                    <Pagination
                      count={pagesize}
                      shape="rounded"
                      page={page}
                      color="primary"
                      onChange={handlePageChange}
                    />
                  )}
                </TableContainer>
              </Paper>
            )}
          </Box>
        </Paper>
      </Box>

      <Dialog
        open={deleteOpen}
        className={classes.dialog}
        onClose={handleDeleteClose}
        BackdropProps={{
          style: { backdropFilter: "blur(4px)" },
        }}
        width="md"
      >
        <DialogTitle style={{ margin: "19px 150px !important" }}>
          <Close onClick={handleDeleteClose} />
        </DialogTitle>
        <DialogContent>
          <Box align="center">
            <Typography variant="h3">
              Are you sure want to Unassign?{" "}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteClose}
              autoFocus
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                handleUnAssign();
                console.log(userId, "userIduserId");
              }}
              disabled={allProjectsData?.status === "UNASSIGNED"}
            >
              Yes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllCustomerGroup;
