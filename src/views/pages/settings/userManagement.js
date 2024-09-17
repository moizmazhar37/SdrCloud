import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Box,
  IconButton,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import AddUserDrawer from "./AddUserDrawer";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import BlockIcon from "@material-ui/icons/Block";
import VisibilityIcon from "@material-ui/icons/Visibility";
// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    width: "100%",
  },
  boxModel: {
    padding: "15px",
    paddingBottom: "45px",
  },

  button: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    "@media(max-width:399px)": {
      flexDirection: "column",
    },
  },
  darkBtn: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#181C32",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Inter",
    color: "#fff",
  },
  icon: {
    backgroundColor: "#555a78 !important",
    borderRadius: "6px 6px 6px 0",
  },

  table: {
    overflowX: "auto",
    minWidth: 650,
  },
  tableContainer: {
    width: "100%",
  },

  tableCell: {
    background: "rgba(242, 244, 255, 1)",
    fontFamily: "Inter",
    fontWeight: "500 !important",
    fontSize: "16px !important",
    lineHeight: "19px",
    color: "#0F0037",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  tableRow: {
    border: "1px solid #F2F4FF !important",
    borderRadius: "2px",

    "& .MuiTableRow-root": {
      border: "1px solid #F2F4FF !important",
    },
  },
  checkBox: {
    "&$checked": {
      color: "gray", // Checked color
    },
    "&$checked + .MuiIconButton-label:after": {
      backgroundColor: "blue", // Unchecked background color
    },
  },

  tableRow1: {
    borderBottom: "1px solid #F2F4FF",
  },
  viewBtn: {
    borderRadius: "6px",
    fontSize: "12px",
    padding: "8px 10px",
  },

  tableCell1: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Inter",
    color: "#393939",
    whiteSpace: "nowrap",
    textAlign: "center",
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
  loaderCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
// Custom styles for the CustomCheckbox
const CustomCheckbox = withStyles({
  root: {
    color: "gray",
    "&$checked": {
      color: "red",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  checked: {},
})(Checkbox);
// React component for managing user management including adding, deleting, and viewing users.
const UserManagement = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userId, setUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [visiblePasswordRowId, setVisiblePasswordRowId] = useState(null);
  //Drawer logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useContext(UserContext);
  const search = user.searchUser;
   // Function to handle opening the drawer
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
// Function to handle closing the drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
 // Function to fetch all users
  const allUserHandler = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.userMangement,
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page: page,
          search: search,
        },
      });
      if (res.data.responseCode === 200) {
        setLoading(false);
        setUserData(res.data.result.docs);

        setPagesCount(res.data.result.pages);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    allUserHandler();
  }, [page, search]);

  useEffect(() => {
    if (search === "") {
      allUserHandler();
    }
  }, [search]);


  // Function to handle checkbox change for selecting users
  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;
    setSelectedUsers((prevSelectedUsers) => {
      if (isChecked) {
        return [...prevSelectedUsers, userId];
      } else {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
    });
  };
   // Function to handle selecting all users
  const handleSelectAllUsers = (event) => {
    if (event.target.checked) {
      const allUserIds = userData.map((row) => row._id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };


  useEffect(() => {
    user.setTargetComponentVisited(true);

    return () => user.setTargetComponentVisited(false);
  }, []);

  return (
    <Box id="targetElement">
      <Paper classsName={classes.tabContainer}>
        <Box className={classes.boxModel}>
          <div className={classes.button}>
            <Button
              variant="contained"
              className={classes.darkBtn}
              onClick={handleOpenDrawer}
              endIcon={<AddIcon className={classes.icon} />}
            >
              Add User
            </Button>
          
          </div>
          <div style={{ paddingTop: "12px" }}>
            <Paper className={classes.tableContainer}>
              {loading ? (
                <div className={classes.loaderCenter}>
                  <ButtonCircularProgress />
                </div>
              ) : (
                <>
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ textAlign: "left" }}>
                            {" "}
                          
                            <CustomCheckbox
                              checked={selectedUsers.length === userData.length}
                              onChange={handleSelectAllUsers}
                            />
                          </TableCell>
                          <TableCell>Sr.</TableCell>
                          <TableCell>Full Name</TableCell>
                          <TableCell>Email Address</TableCell>
                          <TableCell>Created On</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>status</TableCell>
                          <TableCell>Action</TableCell>
                        
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.map((row, index) => (
                          <TableRow key={row._id}>
                            <TableCell>
                              <Checkbox
                                className={classes.checkBox}
                                checked={selectedUsers.includes(row._id)}
                                onChange={(event) =>
                                  handleCheckboxChange(event, row._id)
                                }
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              {(page - 1) * limit + index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.firstName + " " + row.lastName
                                ? row.firstName + " " + row.lastName
                                : "-"}
                            </TableCell>
                            <TableCell>{row.email ? row.email : "-"}</TableCell>
                            <TableCell>
                              {moment(row.createdAt).format("lll")
                                ? moment(row.createdAt).format("lll")
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {row.userType ? row.userType : "-"}
                            </TableCell>
                            <TableCell>
                              {row.status ? row.status : "-"}
                            </TableCell>
                            <TableCell>
                              <IconButton style={{ padding: "0px" }}>
                                <VisibilityIcon
                                  style={{ fontSize: "17px" }}
                                />
                              </IconButton>
                              <IconButton
                                style={{ padding: "0px", marginLeft: "10px" }}
                              >
                                {row?.status === "BLOCK" ? (
                                  <BlockIcon
                                    style={{ fontSize: "17px", color: "red" }}
                                  />
                                ) : (
                                  <BlockIcon
                                    style={{ fontSize: "17px" }}
                                  />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(userData &&
                    userData.length === 0 &&
                    userData.length === undefined) ||
                    userData.length === null ||
                    (userData.length === 0 && <DataNotFoundIMG />)}
                </>
              )}
              {userData && userData.length > 0 && (
                <Pagination
                  count={pagesCount}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              )}
            </Paper>
          </div>
          <AddUserDrawer
            userDrawerOpen={isDrawerOpen}
            userDrawerClose={handleCloseDrawer}
            allUserHandler={allUserHandler}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserManagement;
