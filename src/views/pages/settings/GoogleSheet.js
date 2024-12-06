import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  Breadcrumbs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  styled,
} from "@material-ui/core";
import GoogleSheetConnection from "./GoogleSheetConnection";
import Link from "@material-ui/core/Link";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import FullScreenLoader from "src/component/FullScreenLoader";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { Close } from "@material-ui/icons";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toast } from "react-toastify";
import { menuProps } from "src/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
  " & MuiInputBase-input": {
    padding: "0px !important",
  },
  GoogleSheetContainer: {
    "& .breadcrumbs": {},
    "& .Headbutton": {
      padding: "10px 15px",
      background: "#0358AC",
      color: "#F2F7FF",
      fontWeight: 500,
      fontSize: "14px",
    },
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
    "& .gridContainer": {
      "& .table": {
        borderRadius: "5px 5px 0px 0px ",
        "& .MuiTableHead-root": {
          background: "#FCFCFC",
        },
        "& .MuiTableCell-root": {
          fontSize: "14px !important",
          padding: "12px 22px 14px 24px !important",
        },
        "& .tableCellText1": {
          textDecoration: "underline",
          color: "#0358AC",
          fontWeight: 500,
          minWidth: "80px",
          cursor: "pointer",
        },
        "& .tableCellText": {
          color: "#152F40",
          fontWeight: 500,
          minWidth: "103px",
          textAlign: "center",
        },
      },
      "& .tableHead": {
        "& .MuiTableCell-head": {
          backgroundColor: "var(--light-grey2, #FCFCFC)",
          color: "var(--grey, #858585)",
          minWidth: "124px",
        },
      },
    },
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
  active: {
    color: "#709868",
    fontWeight: 500,
    textAlign: "center",
  },
  failed: {
    color: "#EC2727 !important",
    fontWeight: 500,
    textAlign: "center",
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
  selectitem: {
    color: "#000",
    border: "1px solid #ECECEC",
    height: "44px",
    marginTop: "20px",
    background: "transparent",
    borderRadius: "8px",

    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC",
    },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      display: "flex !important",
      justifyContent: "space-between !important",
      alignItems: "center !important",
    },
    "& .MuiSelect-iconOpen": {
      borderLeft: "0px !important",
      borderRight: "1px solid #ECECEC",
      transform: "rotate(360deg)",
      marginRight: "-1px !important",
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
    "& .MuiTableCell-head ": {
      lineheight: "2.5rem",
    },
  },
}));
const CustomExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  top: "3px !important", // Apply custom margin
  right: "5px !important", // Optional: custom color if needed
}));
// Function component for managing Google Sheets
const GoogleSheet = ({
  nextRoute,
  handleClick,
  setnextRoutes,
  settingRoute,
  setSettingRoute,
}) => {
  console.log("nextRoute: ", nextRoute);
  const classes = useStyles();
  const [nextRoute1, setnextRoutes1] = useState("Google Sheet");
  console.log("nextRoute1: ", nextRoute1);
  const [data, setData] = useState([]);
  console.log("data: ", data);
  const [loading, setLoading] = useState(false);
  const [pagesize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  console.log("page: ", page);
  const [assignOpen, setAssignOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userList, setUserList] = useState([]);
  const [deleteSheetId, setDeleteSheetId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState("none");
  const [isUserSelected, setIsUserSelected] = React.useState(false);
  const [disconnectSheetId, setDisconnectSheetId] = useState("");
  const [unassignOpen, setUnassignOpen] = useState(false);
  const history = useHistory();
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setUnassignOpen(false);
  };
  // Function to fetch Google Sheets data
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        setData(response?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Function to fetch all users
  const getAllUsers = async () => {
    try {
      console.log("Hello");
      const response = await axios({
        url: ApiConfig.getAllUserByAccountId,
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      if (response?.data?.status === 200) {
        setUserList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Function to assign Google Sheet to a user
  const handleAssign = async (status) => {
    try {
      const response = await axios({
        url: ApiConfig.assignUnassign,
        method: "POST",
        headers: {
          token: `${localStorage.getItem("token")}`,
          // userId: selectedUser,
        },

        data: {
          // accountId: localStorage.getItem("accountId"),
          accountSheetStatus:
            selectedUserId?.sheetStatus === "CONNECTED"
              ? "ASSIGNED"
              : selectedUserId?.sheetStatus,
          sheetId: selectedUserId?.googleSheetId,
          assignedUserId: selectedUser,
        },
      });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        setSelectedUser("none");
        handleSubmit();
        handleAssignClose();
      } else if (response?.data?.status === 205) {
        toast.success(response?.data?.message);
        setSelectedUser("none");
        handleSubmit();
        handleAssignClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setLoading(false);
      setSelectedUser("none");
      handleAssignClose();
    }
  };
  const handleUnAssign = async (status) => {
    try {
      const response = await axios({
        url: ApiConfig.assignUnassign,
        method: "POST",
        headers: {
          token: `${localStorage.getItem("token")}`,
          // userId: selectedUser,
        },

        data: {
          // accountId: localStorage.getItem("accountId"),
          accountSheetStatus: "UNASSIGNED",

          sheetId: selectedUserId?.googleSheetId,
        },
      });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        setUnassignOpen(false);
        handleSubmit();
      } else if (response?.data?.status === 205) {
        toast.success(response?.data?.message);
        setUnassignOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setLoading(false);
      setUnassignOpen(false);
    }
  };
  const deleteSheet = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/${deleteSheetId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        setLoading(false);
        handleSubmit();
        handleDeleteClose();
        toast.success("Sheet Deleted Successfully.");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      handleDeleteClose();
    }
  };
  const disconnectSheet = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.disconnectSheet,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          sheetId: disconnectSheetId,
        },
      });
      if (response?.data.status === 200) {
        setLoading(false);
        toast.success("Sheet Successfully Disconnected.");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.message);
    }
  };
  // Function to handle closing of dialog
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };
  // Function to handle closing of delete dialog
  const handleAssignClose = () => {
    setAssignOpen(false);
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);
  // Function to handle page change
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const goBackToElementSelection = () => {
    setnextRoutes("Integrations");
  };
  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.GoogleSheetContainer}>
        {nextRoute1 === "Create New" ? (
          <GoogleSheetConnection
            settingRoute={settingRoute}
            setSettingRoute={setSettingRoute}
            nextRoute={nextRoute}
            setnextRoutes={setnextRoutes}
            nextRoute1={nextRoute1}
            setnextRoutes1={setnextRoutes1}
            handleClick={handleClick}
          />
        ) : (
          <>
            {" "}
            <Box
              className="d-flex justify-space-between"
              style={{ flexWrap: "wrap", gap: "10px", marginTop: "10px" }}
            >
              <Box className="breads">
                <ArrowBackIcon
                  style={{ cursor: "pointer", marginRight: "8px" }}
                  onClick={goBackToElementSelection}
                />
                <Breadcrumbs
                  aria-label="breadcrumb"
                  className="breadcrumb d-flex"
                >
                  <Typography variant="body1" style={{ color: "#152F40" }}>
                    <Link
                      color="inherit"
                      href="/settings"
                      onClick={handleClick}
                    >
                      Settings
                    </Link>{" "}
                  </Typography>{" "}
                  <Typography
                    variant="body1"
                    style={{ color: "#152F40", marginLeft: "5px" }}
                  >
                    <Link
                      color="inherit"
                      href="/integrations"
                      onClick={handleClick}
                    >
                      Integrations
                    </Link>
                  </Typography>
                  <span className="headText"> {nextRoute}</span>
                </Breadcrumbs>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  className="Headbutton"
                  onClick={() => {
                    setnextRoutes1("Create New");
                  }}
                >
                  Create New Google Sheet Connection
                </Button>
              </Box>
            </Box>
            <Grid container className="gridContainer">
              <TableContainer className="table">
                <Table
                  aria-label="simple table"
                  style={{ border: "1px solid var(--light-stroke, #ECECEC)" }}
                >
                  <TableHead className="tableHead">
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="center">Fields</TableCell>
                      <TableCell align="center">Created On</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Total Records</TableCell>
                      <TableCell align="center">Recent</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data?.map((key, index) => (
                      <TableRow>
                        <TableCell
                          className="tableCellText1"
                          onClick={() => {
                            history.push({
                              pathname: "/viewSheets",
                              state: {
                                id: key.id,
                                nextRoute: nextRoute,
                              },
                            });
                          }}
                        >
                          {key?.title && key?.title.length > 15
                            ? `${key?.title.substring(0, 15)}...`
                            : key?.title || "--"}
                        </TableCell>

                        <TableCell className="tableCellText">
                          {key?.fields}
                        </TableCell>
                        <TableCell className="tableCellText">
                          {moment(key?.createdOn).format("MM.DD.YYYY")}
                        </TableCell>
                        <TableCell
                          className={`${
                            key?.is_sheet_connected === true
                              ? classes.active
                              : key?.is_sheet_connected === false
                              ? classes.failed
                              : ""
                          }`}
                          align="center"
                        >
                          <li>
                            {key?.is_sheet_connected === true
                              ? "Connected"
                              : "Disconnected"}
                          </li>
                        </TableCell>
                        <TableCell
                          className={`${
                            key?.status === "ASSIGNED"
                              ? classes.active
                              : classes.failed
                          }`}
                          align="center"
                        >
                          {key?.status
                            ? key?.status.charAt(0).toUpperCase() +
                              key?.status.slice(1).toLowerCase()
                            : "--"}
                        </TableCell>
                        <TableCell className="tableCellText">
                          {key?.total_records || "--"}
                        </TableCell>
                        <TableCell className="tableCellText">
                          {key?.recent}
                        </TableCell>
                        <TableCell className="tableCellText">
                          <FormControl style={{ width: "100px" }}>
                            <Select
                              style={{ marginTop: "0px" }}
                              variant="outlined"
                              className={classes.selectitem}
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
                                    pathname: "/viewSheets",
                                    state: {
                                      id: key.id,
                                      nextRoute: nextRoute,
                                    },
                                  });
                                }}
                              >
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  history.push({
                                    pathname: "/editSheets",
                                    state: {
                                      id: key.id,
                                      nextRoute: nextRoute,
                                    },
                                  });
                                }}
                              >
                                Edit
                              </MenuItem>
                              {/* {key?.assignedStatus === "ASSIGNED" ? (
                                <MenuItem
                                  onClick={() => {
                                    setSelectedUserId(key);

                                    setUnassignOpen(true);
                                  }}
                                >
                                  Unassign
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  onClick={() => {
                                    handleClose();
                                    setSelectedUserId(key);
                                    getAllUsers();
                                    setAssignOpen(true);
                                  }}
                                >
                                  Assign
                                </MenuItem>
                              )} */}
                              <MenuItem
                                onClick={() => {
                                  setDeleteSheetId(key.id);
                                  setDeleteOpen(true);
                                }}
                              >
                                {" "}
                                Delete
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {data.length == 0 && <DataNotFoundIMG />}
              </TableContainer>

              <Grid item xs={12} className="d-flex justify-end">
                {data.length > 9 && (
                  <Pagination
                    count={pagesize}
                    shape="rounded"
                    page={page}
                    color="primary"
                    onChange={handlePageChange}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <Dialog
        open={assignOpen}
        className={classes.dialog}
        onClose={handleAssignClose}
        BackdropProps={{
          style: { backdropFilter: "blur(4px)" },
        }}
        width="md"
      >
        <DialogTitle style={{ margin: "19px 150px !important" }}>
          <Typography variant="h5">Google sheet </Typography>
          <Close onClick={handleAssignClose} />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h3">Select User </Typography>
          <FormControl>
            <Select
              style={{ marginTop: "0px" }}
              variant="outlined"
              className="selectitem"
              id="choose-template"
              value={selectedUser || "none"}
              onChange={(e) => {
                setSelectedUser(e.target.value);
                setIsUserSelected(e.target.value !== "none");
              }}
              // IconComponent={ExpandMoreIcon}
              IconComponent={CustomExpandMoreIcon}
              MenuProps={menuProps}
            >
              <MenuItem value="none" disabled style={{ color: "#858585" }}>
                Select User
              </MenuItem>
              {userList?.map((data, i) => {
                return (
                  <MenuItem
                    key={i}
                    style={{ color: "#858585" }}
                    value={data?.userId}
                    name={data?.userName}
                  >
                    {data?.userName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ padding: "10px 100px" }}>
          <Button variant="contained" onClick={() => handleAssignClose()}>
            {" "}
            Cancel
          </Button>
          <Button
            style={{
              boxShadow: "none",
              backgroundColor: "#0458AC",
              color: "#fff",
            }}
            variant="contained"
            disabled={selectedUser === "none"}
            onClick={() => handleAssign()}
          >
            {loading === false ? "Assign" : <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>

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
            'Delete' button below, you will permanently delete this Sheet and
            all the tempelates linked to it from the system. This means you will
            not be able to retrieve or restore it in the future.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button variant="containedPrimary" onClick={() => deleteSheet()}>
            {" "}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={unassignOpen}
        className={classes.dialog}
        onClose={() => setUnassignOpen(false)}
      >
        <DialogTitle>
          <Typography variant="h5">
            Are you sure you want to unassign?
          </Typography>
          <Close onClick={handleDeleteClose} />
        </DialogTitle>

        <DialogActions>
          <Button variant="contained" onClick={() => setUnassignOpen(false)}>
            {" "}
            No
          </Button>
          <Button variant="containedPrimary" onClick={() => handleUnAssign()}>
            {" "}
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoogleSheet;
