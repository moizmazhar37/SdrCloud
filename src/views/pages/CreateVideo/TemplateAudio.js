import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { Menu, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";
import { UserContext } from "../../../context/User";
import { menuProps } from "src/utils";
import { Pagination } from "@material-ui/lab";
import { toast } from "react-toastify";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    paddingLeft: "0px",
    height: "100%",
    padding: "5px",
    boxShadow: "none",
    "& .templatebox": {
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
      "& p": {
        marginTop: "24px",
        textAlign: "center",
        fontWeight: "500",
      },
      "&:hover": {
        borderRadius: "12px",
        border: "1px solid var(--blue, #0358AC)",
        background: "#FFF",
      },
    },
    "& .ButtonStyling": {
      display: "flex",
      margin: "25px 0px",
      gap: "10px",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
  },
  table: {
    overflowX: "auto",
    marginTop: "24px",
    background: "none",
    border: "1px solid #ECECEC",
    borderRadius: "6px",
    "& .MuiTableCell-head": {
      fontSize: "14px !important",
      minWidth: "90px",
    },
    "& .tableCellText": {
      color: "#152F40",
      fontFamily: "Inter",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .MuiTableCell-head": {
      background: "#FCFCFC",
    },
    "& .MuiTableCell-root": {
      padding: "12px 30px 14px 30px !important",
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
  tableBox: {
    borderRadius: "24px",
    border: "1px solid var(--green, #7DC371)",
    background: "var(--light-green, #F4FFF4)",
    display: "flex",
    width: "100%",
    height: "20px",
    justifyContent: "center",
    padding: "10px 20px",
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
      height: "40px",
      paddingLeft: "8px",
      color: "#152F40",
    },
    "& .MuiPopover-paper": {
      marginTop: "85px",
    },
  },
}));

const TemplateAudio = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const category = user?.category;
  const [pagesize, setPageSize] = useState(1);
  const [page, setPage] = useState(1);
  const [templateList, setTemplateList] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [tempType, setTempType] = useState("VIDEO");
  const [loading, setLoading] = useState(false);
  // Function to handle closing the delete dialog
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  console.log(templateList, "templateList++");
  // Function to get the list of video templates
  const getTemplateList = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.getTemplateList,
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
          // userId: localStorage.getItem("_id"),
        },
        params: {
          page: page || 1,
          pageSize: 10,
        },
      });
      if (response?.data?.status === 200) {
        setTemplateList(response?.data?.data?.list);
        setPageSize(response?.data?.data?.totalPageCount);
      }
    } catch (error) {
      setTemplateList([]);
    } finally {
      setLoading(false);
    }
  };
  // Function to get the list of HVO templates
  const getHVOTemplateList = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: ApiConfig.hvoList,
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          page: page || 1,
          pageSize: 10,
        },
      });
      if (response?.data?.status === 200) {
        setTemplateList(response?.data?.data?.hvoTemplate);
        setPageSize(response?.data?.data?.totalPageCount);
      }
    } catch (error) {
      setTemplateList([]);
    } finally {
      setLoading(false);
    }
  };
  // Function to delete a template
  const deleteTemplate = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${
          tempType === "VIDEO"
            ? ApiConfig.deletedVideoTemplateById
            : ApiConfig.deleteHVO
        }`,
        method: "DELETE",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          templateId: deleteId,
        },
      });
      if (response?.data?.status === 200) {
        setLoading(false);

        if (tempType === "VIDEO") {
          getTemplateList();
        } else if (tempType === "HVO") {
          getHVOTemplateList();
        }
        handleDeleteClose();
        toast.success("Template Deleted Successfully");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      handleDeleteClose();
      setTemplateList([]);
    }
  };
  // Function to duplicate a template
  const duplicateTemplate = async (value) => {
    setLoading(true);
    const params =
      tempType === "VIDEO" ? { templateId: value } : { hvoTemplateId: value };
    try {
      const response = await axios({
        url: `${
          tempType === "VIDEO"
            ? ApiConfig.duplicateTemplateVideo
            : ApiConfig.duplicateTemplateHVO
        }`,
        method: "POST",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: params,
      });
      if (response?.data?.status === 200) {
        setLoading(false);
        if (tempType === "VIDEO") {
          getTemplateList();
        } else if (tempType === "HVO") {
          getHVOTemplateList();
        }
        handleDeleteClose();
        toast.success(response?.data?.message);
      } else {
        setLoading(false);
      }
    } catch (error) {
      handleDeleteClose();
      setTemplateList([]);
      setLoading(false);
    }
  };
  // useEffect to fetch templates when the page changes
  useEffect(() => {
    if (tempType === "VIDEO") {
      getTemplateList();
    } else if (tempType === "HVO") {
      getHVOTemplateList();
    }
  }, [page, tempType]);
  // // useEffect to fetch templates when the template type changes
  // useEffect(() => {
  //   if (tempType === "VIDEO") {
  //     getTemplateList();
  //   } else if (tempType === "HVO") {
  //     getHVOTemplateList();
  //   }
  // }, [tempType]);

  const [anchorEl, setAnchorEl] = useState(null);
  // Function to handle clicking to open the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Function to handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // {
  //   console.log(category, "category");
  // }
  // const categoryMapping = {
  //   1: "STARTUP",
  //   2: "MIDMARKET",
  //   3: "SMALLBUSINESS",
  //   4: "VIDEOCLIPS",
  // };
  // Function to handle changing the page
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  // const getCategoryName = (categoryId) => {
  //   return categoryMapping[categoryId] || "Unknown Category";
  // };

  return (
    <Paper className={classes.tabContainer}>
      <Box className="section-flex">
        <Box
          className="templatebox"
          onClick={() => {
            history.push("/createtemplate&Video");
          }}
        >
          <div className="d-flex">
            <img src="images/video.png" alt="video" />
          </div>

          <Typography variant="body1">Create New Video Template</Typography>
        </Box>

        <Box
          className="templatebox"
          onClick={() => {
            history.push("/Create-hvo-template");
          }}
        >
          <div className="d-flex">
            <img src="images/Hvo.png" alt="HVO" />
          </div>
          <Typography variant="body1">Create New HVO Template</Typography>
        </Box>
      </Box>

      <Box className="ButtonStyling">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setTempType("VIDEO");
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
          }}
          style={{
            background: tempType === "HVO" ? "#0358AC" : "#fff",
            color: tempType === "HVO" ? "#F2F7FF" : "#152F40",
          }}
        >
          HVO
        </Button>
      </Box>
      <TableContainer className={classes.table}>
        {loading ? (
          <ButtonCircularProgress />
        ) : (
          <>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Template Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell align="center">Categories</TableCell>
                  <TableCell align="center">Total Records</TableCell>
                  <TableCell align="center">Sent</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {templateList &&
                  tempType === "VIDEO" &&
                  templateList?.map((key, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCellText">
                        <Tooltip title={key?.videoTemplateName || ""}>
                          <span>
                            {key?.videoTemplateName &&
                            key?.videoTemplateName.length > 20
                              ? `${key?.videoTemplateName.slice(0, 20)}...`
                              : key?.videoTemplateName || "--"}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="tableCellText">
                        {key.templateType ? key.templateType : "--"}
                      </TableCell>
                      <TableCell className="tableCellText">
                        {new Date(key?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="tableCellText">
                        <Box className={classes.tableBox}>
                          {key?.categoryName}
                        </Box>
                      </TableCell>
                      <TableCell className="tableCellText" align="center">
                        {key.totalRecords ? key.totalRecords : "--"}
                      </TableCell>
                      <TableCell className="tableCellText" align="center">
                        {key.sent ? key.sent : "--"}
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
                                  pathname: `/createtemplate&Video`,
                                  state: "summary",
                                  search: `templateId=${key?.videoTemplateId}`,
                                });
                              }}
                            >
                              View
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                duplicateTemplate(key?.videoTemplateId);
                              }}
                            >
                              Duplicate
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                setDeleteId(key?.videoTemplateId);
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
                {templateList &&
                  tempType === "HVO" &&
                  templateList?.map((key, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCellText">
                        <Tooltip title={key?.hvoTemplateName || ""}>
                          <span>
                            {key?.hvoTemplateName &&
                            key?.hvoTemplateName.length > 20
                              ? `${key?.hvoTemplateName.slice(0, 20)}...`
                              : key?.hvoTemplateName || "--"}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="tableCellText">
                        {key.templateType ? key.templateType : "--"}
                      </TableCell>
                      <TableCell className="tableCellText">
                        {moment(key.createdAt).format("MM.DD.YYYY")}
                      </TableCell>
                      <TableCell className="tableCellText">
                        <Box className={classes.tableBox}>
                          {key.categoryName ? key.categoryName : "--"}
                        </Box>
                      </TableCell>
                      <TableCell className="tableCellText" align="center">
                        {key.totalRecords ? key.totalRecords : "--"}
                      </TableCell>
                      <TableCell className="tableCellText" align="center">
                        {key.sendCount ? key.sendCount : "--"}
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
                                  pathname: `/Create-hvo-template`,
                                  state: "summary",
                                  search: `templateId=${key?.hvoId}`,
                                });
                              }}
                            >
                              View
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                duplicateTemplate(key?.hvoId);
                              }}
                            >
                              Duplicate
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                setDeleteId(key?.hvoId);
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
            {templateList && templateList.length === 0 && <DataNotFoundIMG />}

            {pagesize > 1 && (
              <Grid
                item
                xs={12}
                className="d-flex justify-end"
                style={{ marginTop: "16px", marginBottom: "16px" }}
              >
                <Pagination
                  count={pagesize}
                  shape="rounded"
                  page={page}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Grid>
            )}
          </>
        )}
      </TableContainer>

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
            'Delete' button below, you will permanently remove this template
            from the system. This means you will not be able to retrieve or
            restore it in the future.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            {" "}
            Cancel
          </Button>
          <Button variant="containedPrimary" onClick={() => deleteTemplate()}>
            {" "}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TemplateAudio;
