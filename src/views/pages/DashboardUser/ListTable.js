import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import PlaceIcon from "@material-ui/icons/Place";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
// Custom styles
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
      color: " #152F40",
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
    color: "#EC2727 !important",
    fontWeight: 500,
  },
}));
// ListTable component definition
const ListTable = () => {
  const classes = useStyles();
  const history = useHistory();

  const [tempType, setTempType] = useState("VIDEO");
  const [page, setPage] = useState(0);
  const [pagesize, setPageSize] = useState(10);
  const [isUserList, setIsUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoTemplete, setVideoTemplete] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [errorData, setErrorData] = useState("");

  const handlePageChange = (event, page) => {
    setPage(page - 1);
  };
  const userListApi = async () => {
    setLoading(false);
    const params = {
      page: page,
      pageSize: 10 || 0,
      templateType: tempType,
    };

    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.userProjectListing,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        console.log("isuserList", res?.data?.data?.list);
        setIsUserList(res?.data?.data?.list);
        setErrorData(res?.data?.data);
        setSheetUrl(res?.data?.data?.list[0]?.sheetUrl);
        setVideoTemplete(res?.data?.data?.list[0]?.videoTemplateId);
        setPageSize(res?.data?.data?.pageCount);
      } else if (res?.data?.status === 205) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    userListApi();
  }, [page, pagesize, tempType]);

  return (
    <>
      <Box style={{ display: "flex", margin: "25px 0px", gap: "10px" }}>
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
      <Paper className={classes.tabContainer}>
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
                      <TableCell align="center">
                        {tempType === "VIDEO" ? "Video" : "Hvo"} Template Name
                      </TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">User</TableCell>
                      <TableCell align="center">
                        {tempType === "VIDEO" ? "Video" : "Hvo"}
                      </TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isUserList &&
                      isUserList.map((data, index) => (
                        <React.Fragment key={index}>
                          {data.projectListing.map((project, projectIndex) => (
                            <TableRow key={projectIndex}>
                              <TableCell align="center">
                                {data.videoTemplateName
                                  ? data.videoTemplateName
                                  : ""}
                              </TableCell>
                              <TableCell align="center">
                                {data.sheetName ? data.sheetName : ""}
                              </TableCell>
                              <TableCell align="center">
                                {project.CUSTOMER_ORGANIZATION}
                              </TableCell>
                              {tempType === "HVO" && (
                                <TableCell align="center">
                                  <PlaceIcon style={{ color: "black" }} />
                                </TableCell>
                              )}
                              {tempType === "VIDEO" && (
                                <TableCell align="center">
                                  <VisibilityIcon style={{ color: "black" }} />
                                  <WatchLaterIcon style={{ color: "black" }} />
                                </TableCell>
                              )}
                              <TableCell
                                className={classes.viewEditbtn}
                                align="center"
                              >
                                <Button
                                  onClick={() => {
                                    history.push("/view-myproject", {
                                      state: {
                                        errorData:
                                          errorData?.list[0]?.projectListing[
                                            projectIndex
                                          ],
                                        sheetUrl: sheetUrl,
                                        videoTemplete: videoTemplete,
                                      },
                                    });
                                  }}
                                >
                                  View
                                </Button>
                                <Divider className="dividerbtn" />
                                <Button
                                  onClick={() => {
                                    history.push("/view-myproject", {
                                      state: {
                                        errorData:
                                          errorData?.list[0]?.projectListing[
                                            projectIndex
                                          ],
                                        sheetUrl: sheetUrl,
                                        videoTemplete: videoTemplete,
                                      },
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
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
                    page={page + 1}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </Grid>
              )}
            </Paper>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default ListTable;
