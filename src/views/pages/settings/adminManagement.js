import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddAdminDrawer from "./AddAdminDrawer";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
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
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import moment from "moment";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { UserContext } from "src/context/User";
import BlockIcon from "@material-ui/icons/Block";
import VisibilityIcon from "@material-ui/icons/Visibility";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    width: "100%",
  },
  boxModel: {
    padding: "15px",
    paddingBottom: "45px",
  },
  mainDiv: {},
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
  CheckBox: {
    color: "#181C32 !important",
  },

  tableRow1: {
    borderBottom: "1px solid #F2F4FF",
  },
  viewBtn: {
    borderRadius: "6px",
    fontSize: "12px",
    padding: "8px 10px",
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
}));
// Styles for the CustomCheckbox
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
// Function component for AdminManagement
const AdminManagement = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const search = user.searchUser;
 // Function to handle opening the drawer for adding admin
  const handleOpenDrawer = () => {
    setAdminDrawerOpen(true);
  };
  // Function to handle closing the drawer for adding admin
  const handleCloseDrawer = () => {
    setAdminDrawerOpen(false);
  };
 // Function to fetch sub-admin list
  const subAmdinListHandler = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getSubAdminList,
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
        setAdminData(res.data.result.docs);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    subAmdinListHandler();
  }, [search, page]);
 
// Function to handle checkbox change
  const handleCheckboxChange = (event, userId) => {
    console.log(userId, "AdminId");
    const isChecked = event.target.checked;
    setSelectedAdmins((prevselectedAdmins) => {
      if (isChecked) {
        return [...prevselectedAdmins, userId];
      } else {
        return prevselectedAdmins.filter((id) => id !== userId);
      }
    });
  };
  // Function to handle selecting all admins
  const handleSelectAllAdmins = (event) => {
    if (event.target.checked) {
      const allUserIds = adminData.map((row) => row._id);
      setSelectedAdmins(allUserIds);
    } else {
      setSelectedAdmins([]);
    }
  };

// Effect hook to execute on component mount and unmount
  useEffect(() => {
    user.setTargetComponentVisited(true);
    return () => user.setTargetComponentVisited(false);
  }, []);

  return (
    <Paper classsName={classes.tabContainer}>
      <Box className={classes.boxModel}>
        <div className={classes.mainDiv}>
          <div className={classes.button}>
            <Button
              variant="contained"
              className={classes.darkBtn}
              endIcon={<AddIcon className={classes.icon} />}
              onClick={handleOpenDrawer}
            >
              Add Sub Admin
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
                              checked={
                                selectedAdmins.length === adminData?.length
                              }
                              onChange={handleSelectAllAdmins}
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
                        {adminData?.map((row, index) => (
                          <TableRow key={row.Name}>
                            <TableCell>
                              <Checkbox
                                className={classes.checkBox}
                                checked={selectedAdmins.includes(row._id)}
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
                  {(adminData &&
                    adminData?.length === 0 &&
                    adminData?.length === undefined) ||
                    adminData?.length === null ||
                    (adminData?.length === 0 && <DataNotFoundIMG />)}
                </>
              )}
              {adminData && adminData?.length > 0 && (
                <Pagination
                  count={pagesCount}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              )}
            </Paper>
          </div>
          <AddAdminDrawer
            adminDrawerOpen={adminDrawerOpen}
            adminDrawerClose={handleCloseDrawer}
            subAmdinListHandler={subAmdinListHandler}
          />
        </div>
      </Box>
    </Paper>
  );
};

export default AdminManagement;
