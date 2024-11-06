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
  MenuItem,
  FormControl,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  Select,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { Close } from "@material-ui/icons";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "../../../context/User";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddUser from "./AddUser";
import { toast, ToastContainer } from "react-toastify";
import { menuProps } from "src/utils";
import { Pagination } from "@material-ui/lab";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
//Custom css of Index Component
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    "& .adduserBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "150px",
      width: "208px",
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
        minWidth: "100px",
      },
      "& .MuiTableCell-body": {
        color: "var(--black, #152F40)",
        fontWeight: "500",
      },
      "& .MuiTableCell-root": {
        padding: "12px 22px 14px 24px !important",
      },
    },
    "& .ViewButton": {
      boxShadow: "none",
    },
    "& .MuiPaginationItem-root": {
      // Fix the selector
      backgroundColor: "#ffffff",
      color: "#0358ac",
      border: "1px solid #ECECEC",
      borderRadius: "6px",
    },
    // "& .MuiSvgIcon-root": {
    //   border: "1px solid #ECECEC",
    //   backgroundColor: "#FCFCFC",
    //   color: "#858585",
    //   fill: "#858585",
    //   minWidth: "32px",
    //   height: "32px",
    // },
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
      padding: "0px 30px",
      color: "#152F40",
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
      paddingLeft: "8px",
      height: "40px",
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

function CompanyUserList() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  console.log("location: ", location);
  const [companyuserlist, setCompanyUserList] = useState([]);
  console.log("companyuserlist: ", companyuserlist);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adduser, setAddUser] = useState(false);
  const [Id, setId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Function to fetch all projects from the API and update the state with the retrieved data
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const sliceUserName = (name) => {
    if (name.length > 15) {
      const firstPart = name.slice(0, 7);
      const secondPart = name.slice(-7);
      return `${firstPart}...${secondPart}`;
    }
    return name;
  };
  const allProjectsHandler = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllUsers,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          page: page,
          size: pageSize,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setCompanyUserList(res?.data?.data?.list);
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

  // useEffect hook to execute allProjectsHandler() when dependencies change
  useEffect(() => {
    allProjectsHandler();
  }, [page]);

  // Function to toggle the state of the drawer (open/close)
  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to toggle the state of adding a user (open/close)
  const handleAddUserClose = () => {
    setAddUser(!adduser);
  };
  // Function to handle click event and open user actions menu
  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  // Function to close user actions menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };
  // Function to open the delete confirmation popup
  const handleOpenPopUp = () => {
    setDeleteOpen(true);
  };
  // Function to close the delete confirmation popup
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  // Function to handle deletion of a user
  const handleDelete = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteUser,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          userIdToDelte: selectedUserId,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        setDeleteOpen(false);
        setSelectedUserId(null);
        allProjectsHandler();
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location?.state == true) {
      allProjectsHandler();
    }
  }, [location]);

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
          <Typography variant="body1">Add User </Typography>
        </Box>

        <AddUser
          adduser={adduser}
          handleAddUserClose={handleAddUserClose}
          companyuserlist={companyuserlist}
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
                  style={{ border: "1px solid var(--light-stroke, #ECECEC)" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Account Creation Date</TableCell>
                      <TableCell>Projects</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>Errors</TableCell>
                      <TableCell>Archived</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companyuserlist?.map((key, index) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {sliceUserName(
                            key.firstName
                              ? key.firstName +
                                  (key.lastName ? ` ${key.lastName}` : "")
                              : "--"
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(key?.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key.projects !== null && key.projects !== undefined
                            ? key.projects
                            : "--"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key.active !== null && key.active !== undefined
                            ? key.active
                            : "--"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key.errors !== null && key.errors !== undefined
                            ? key.errors
                            : "--"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {key.archived !== null && key.archived !== undefined
                            ? key.archived
                            : "--"}
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
                                    pathname: "/Viewuser",
                                    state: { userid: key?.userId },
                                  });
                                }}
                              >
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setSelectedUserId(key?.userId);
                                  setDeleteOpen(true);
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {pageCount > 1 && (
                  <Grid item xs={12} className="d-flex justify-end">
                    <Pagination
                      count={pageCount}
                      shape="rounded"
                      page={page}
                      color="primary"
                      onChange={handlePageChange}
                    />
                  </Grid>
                )}
              </TableContainer>
              {(companyuserlist &&
                companyuserlist.length === 0 &&
                companyuserlist.length === undefined) ||
                companyuserlist.length === null ||
                (companyuserlist.length === 0 && <DataNotFoundIMG />)}
            </>
          )}
        </Box>
      </Box>

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
            'Delete' button below, you will permanently remove the user from the
            system. This means you will not be able to retrieve or restore it in
            the future.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button variant="containedPrimary" onClick={() => handleDelete()}>
            {loading === false ? "Delete" : <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default CompanyUserList;
