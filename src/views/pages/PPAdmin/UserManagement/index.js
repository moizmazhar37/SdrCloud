import React, { useState, useEffect, useContext } from "react";
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
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { Close } from "@material-ui/icons";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ViewUser from "./View";
import AddUser from "./AddUser";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    "& .adduserBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "200px",
      width: "200px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "20px 10px 20px 10px",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        margin: "0px auto",
        marginTop: "16px",
      },
      "& p": {
        textAlign: "center",
        marginTop: "10px",
      },
    },

    "& .datatable": {
      marginTop: "24px",
      width: "100%",
      "& .MuiTableCell-head": {
        backgroundColor: "var(--light-grey2, #FCFCFC)",
        color: "var(--grey, #858585)",
        fontSize: "14px !important",
      },
      "& .MuiTableCell-body": {
        color: "var(--black, #152F40)",
        fontWeight: "500",
        minWidth: "65px",
      },
      "& .MuiPaginationItem-root": {
        // Fix the selector
        backgroundColor: "#ffffff",
        color: "#0358ac",
        border: "1px solid #ECECEC",
        borderRadius: "6px",
      },
      "& .MuiSvgIcon-root": {
        // border: "1px solid #ECECEC",
        backgroundColor: "#FCFCFC",
        color: "#858585",
        fill: "#858585",
        // minWidth: "32px",
        // height: "32px",
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
      width: "139px",
      height: "48px",
      fontSize: "16px",
    },
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "14px",
      width: "139px",
      height: "48px",
      fontSize: "16px",
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
      top: "-10px",
      top: "-10px",
      padding: "5px",
      background: "white",
      border: "thin solid #ECECEC",
      borderRadius: "50px",
      right: "-5px",
      right: "-5px",
      cursor: "pointer",
    },
  },
  selectitem: {
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
      borderLeft: "1px solid #ECECEC",
      // borderRight: "1px solid #ECECEC",
      transform: "rotate(360deg)",
      marginRight: "-5px !important",
    },
    "& .MuiSelect-icon": {
      top: 0,
      height: "40px",
      padding: "0px 5px ",
      color: "#152F40",
    },
    "& .MuiPopover-paper": {
      marginTop: "85px",
    },
    "& .MuiTableCell-head ": {
      lineheight: "2.5rem",
    },
  },
  active: {
    color: "#709868 !important", // Green color for active status
    fontWeight: 500,
  },
  failed: {
    color: "#EC2727 !important",
    fontWeight: 500,
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
  tablerows: {
    "& .MuiTableCell-root": {
      padding: "21px 6px 21px 45px",
    },
  },
}));
// Function to fetch and display PP admin user list with pagination
function PPuserlist() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [ppuserlist, setppUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adduser, setAddUser] = useState(false);
  const [Id, setId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [viewss, setViewss] = useState(true);
  const [suspendStatus, setSuspendStatus] = useState("");

  console.log("ppuserlist", ppuserlist);
  // Retrieves PP admin users list from the server and updates state
  const PPUsers = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ppadminUserList,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          page: pagenumber,
          size: 8,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setppUserList(res?.data?.data?.list);
        setPageSize(res?.data?.data?.totalCounts);
        setPageCount(res?.data?.data?.pageCount);
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    PPUsers();
  }, [pagenumber, pageSize]);
  // Closes the drawer sidebar
  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };
  // Toggles the add user modal
  const handleAddUserClose = () => {
    setAddUser(!adduser);
  };

  // Redirects to the edit PPAdmin page with specified user data
  const handleOpenUser = (ppuserlist, viewss) => {
    history.push({
      pathname: "/edit-PPAdmin",
      state: { ppuserlist, viewss },
    });
  };
  // Redirects to the edit PPAdmin page with specified user data for editing
  const handleEditUser = (ppuserlist) => {
    history.push({
      pathname: "/edit-PPAdmin",
      state: { ppuserlist },
    });
  };
  // Closes the menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };
  // Closes the delete confirmation dialog
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  // Deletes a PP admin user by making an API call
  const handleDeletePPAdmin = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.deletePPAdmin,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          userIdToDelete: selectedUserId,
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setLoading(false);
        setDeleteOpen(false);
        setSelectedUserId(null);
        PPUsers();
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  // Handles page change event in pagination
  const handlePageChange = (event, pagenumber) => {
    setPageNumber(pagenumber);
  };

  return (
    <>
      <Box className={classes.paperContainer}>
        <Box
          className="adduserBox"
          onClick={() => {
            setAddUser(true);
          }}
        >
          <div className="d-flex">
            <img src="images/AddUserImage.png" alt="AddUser" />
          </div>
          <Typography
            variant="body1"
            style={{ fontWeight: 500, color: "#152F40" }}
          >
            Create New <br />
            SDRCloud.ai Admin{" "}
          </Typography>
        </Box>

        <AddUser
          adduser={adduser}
          handleAddUserClose={handleAddUserClose}
          ppuserlist={ppuserlist}
          PPUsers={PPUsers}
          id={Id}
          roleid={roleId}
        />

        <Box className="datatable">
          {loading ? (
            <div>
              <ButtonCircularProgress />
            </div>
          ) : (
            <>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  style={{
                    border: "1px solid var(--light-stroke, #ECECEC !important)",
                  }}
                >
                  <TableHead>
                    <TableRow style={{ paddingLeft: "15px" }}>
                      <TableCell style={{ paddingLeft: "45px" }}>
                        Admin Name
                      </TableCell>
                      <TableCell style={{ paddingLeft: "45px" }}>
                        Email
                      </TableCell>
                      <TableCell style={{ paddingLeft: "45px" }}>
                        Phone
                      </TableCell>
                      <TableCell style={{ paddingLeft: "45px" }}>
                        Account Creation Date
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", paddingLeft: "45px" }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", paddingLeft: "45px" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {(ppuserlist &&
                    ppuserlist.length === 0 &&
                    ppuserlist.length === undefined) ||
                    ppuserlist.length === null ||
                    (ppuserlist?.length === 0 && (
                      <TableCell colSpan={6}>
                        <DataNotFoundIMG />
                      </TableCell>
                    ))}
                  <TableBody>
                    {ppuserlist?.map((key, index) => (
                      <TableRow className={classes.tablerows}>
                        <TableCell component="th" scope="row">
                          {key?.name && key.name.length > 20
                            ? `${key.name.slice(0, 20)}...`
                            : key?.name || "--"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key?.email
                            ? key.email.length > 20
                              ? `${key.email.slice(0, 5)}...${key.email.slice(
                                  -15
                                )}`
                              : key.email
                            : "--"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key?.phoneNo && key.phoneNo.length > 14
                            ? `${key.phoneNo.slice(0, 14)}...`
                            : key?.phoneNo || "--"}
                        </TableCell>
                        <TableCell>
                          {new Date(key?.createdDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "center" }}
                          className={`${
                            key.userStatus === "ACTIVE"
                              ? classes.active
                              : key.userStatus === "DELETE"
                              ? classes.failed
                              : ""
                          }`}
                        >
                          <li>
                            {key?.userStatus
                              ? key.userStatus === "DELETE"
                                ? "Inactive"
                                : key.userStatus.charAt(0).toUpperCase() +
                                  key.userStatus.slice(1).toLowerCase()
                              : "--"}
                          </li>
                        </TableCell>
                        <TableCell className={classes.viewEditbtn}>
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
                                onClick={() => handleOpenUser(key, viewss)}
                              >
                                View
                              </MenuItem>
                              <MenuItem onClick={() => handleEditUser(key)}>
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setSelectedUserId(key?.userId);
                                  setDeleteOpen(true);
                                  setSuspendStatus(key.userStatus);
                                }}
                              >
                                {key.userStatus === "DELETE"
                                  ? "Unsuspend"
                                  : "Suspend"}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  shape="rounded"
                  page={pagenumber}
                  color="primary"
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        </Box>
      </Box>

      {isEditClicked && (
        <ViewUser
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          ppuserlist={ppuserlist}
          id={Id}
          roleid={roleId}
          // onClose={handleViewUserClose}
        />
      )}
      <Dialog
        open={deleteOpen}
        className={classes.dialog}
        onClose={handleDeleteClose}
        BackdropProps={{
          style: { backdropFilter: "blur(4px)" },
        }}
      >
        <DialogTitle>
          {/* <Typography variant="h5">Warning: Permanent Suspend</Typography> */}
          <Close onClick={handleDeleteClose} />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4">
            Are you sure want to{" "}
            {suspendStatus === "DELETE" ? "Unsuspend" : "Suspend"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button
            style={{ boxShadow: "none" }}
            variant="containedPrimary"
            onClick={() => handleDeletePPAdmin()}
          >
            {loading === false ? (
              suspendStatus === "DELETE" ? (
                "Unsuspend"
              ) : (
                "Suspend"
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
export default PPuserlist;
