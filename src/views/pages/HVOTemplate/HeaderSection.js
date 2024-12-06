import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Add } from "@material-ui/icons";
import { menuProps } from "src/utils";
import { toast } from "react-toastify";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import FullScreenLoader from "src/component/FullScreenLoader";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  menuitem: {
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      borderLeft: "0px !important",
      borderRight: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-icon": {
      top: "0 !important",
      height: "40px !important",
      paddingLeft: "8px",
      color: "#152F40 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: "transparent  !important",
      border: "1px solid #ECECEC !important",
    },
  },
  secondmaingridBox: {
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 22px",
    border: "1px solid var(--light-stroke, #ECECEC)",

    "& .MuiButton-root": {
      color: "#152F40",
      background: "transparent",
      height: "42px",
      fontSize: "16px",
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      height: "48px",
      fontSize: "16px",
    },
    "& .heading": {
      fontSize: "14px",
      color: "#0358AC",
    },
    "& .label": {
      color: "#152F40",
    },
    "& .MuiFormControl-root": {
      marginTop: "24px",
    },
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "0px 6px 6px 0px",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
  },
  menuitemSecond: {
    width: "100%",
    justifyContent: "space-between",
    border: "1px solid black",
    height: "100%",
    height: "45px",
    marginTop: "6px",
    color: "var(--black, #152F40)",
    borderRadius: "6px",
  },
}));
function HeaderSection({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  videoRefral,
  reload,
  templateId,
  viewParamsData,
}) {
  console.log("elementType: ", elementType);
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState("");
  const [sectionData, setSectionData] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(null);
  const [nextButton, setNextButton] = useState(false);
  const [sectionId1, setSectionId1] = useState();
  const [logoSet, setLogoSet] = useState();
  const [firstRowData, setFirstRowData] = useState("");
  const [matchData, setMatchData] = useState("");
  const [accountData, setAccountData] = useState("");
  console.log(accountData, "matchData");
  console.log(firstRowData, "firstRowData");
  // const [logos, setLogos] = useState({
  //   Logo1: null,
  //   Logo2: null,
  // });
  const [logos, setLogos] = useState();

  const history = useHistory();
  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
  };

  // console.log(typeIndex)
  const searchParams = new URLSearchParams(window.location.search);
  // const templateId = searchParams.get("templateId");

  const handleFileInputChange = async (e) => {
    // Fetch the image from the URL
    const response = await fetch(e);
    const blob = await response.blob();
    console.log(blob);

    // Create a FileReader instance
    const reader = new FileReader();

    // Read the blob as a data URL
    reader.onload = () => {
      const base64String = reader.result;
      console.log(base64String); // This will be the base64 string of the image
      setLogos(base64String); // Assuming setLogos updates state or performs necessary action
    };

    reader.onerror = (error) => {
      console.error("Error reading the file", error);
    };

    reader.readAsDataURL(blob);
  };

  const handleIconButtonClick = (key) => {
    setSelectedOption(key);
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (selectedOption && selectedOption !== "none" && firstRowData) {
      const matchedData = firstRowData[selectedOption];
      if (matchedData) {
        setMatchData(matchedData);
      }
    }
  }, [selectedOption, firstRowData]);

  const handleChangetitle = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setMatchData("");
  };
  const sheetFirstRowData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getFirstRowData,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: viewParamsData?.googleSheetsId,
        },
      });
      if (res?.data?.status === 200) {
        console.log(res?.data?.data?.data);
        setFirstRowData(res?.data?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetData = async () => {
    if (logos !== null) {
      try {
        setLoading(true);
        const res = await Axios({
          method: "POST",
          url: ApiConfig.headerSection,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            headerLogo: selectedOption,
            companyLogo: accountData?.logo,
            sequence: typeIndex + 1,
            hvoTemplateId: templateId,
          },
        });
        if (res?.status === 200) {
          console.log(res);
          toast.success("Section saved successfully");
          setLoading(false);
          reload();
          setNextButton(true);
        }
        handleNext();
      } catch (error) {
        toast.error(error?.response?.data?.message, "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please upload logo.");
    }
  };

  const getSheetType = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiConfig.headers}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setLogoSet(res?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const getAccountData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        setLoading(false);
        const data = res?.data;
        setAccountData(data);
        // setAccountId(res?.data?.data?.accountId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };



  useEffect(() => {
    getAccountData();
    getSheetType();
    sheetFirstRowData();
  }, []);

  useEffect(() => {
    linkData(sectionData);
    handleReset();
  }, [sectionData]);
  const handleReset = () => {
    setLogo(null);
    setSelectedOption("none");
  };
  const submitSummary = async () => {
    try {
      await handleSetData(); // Wait for handleSetData to complete
      getSummary("summary");
    } catch (error) {
      console.error("Error in handleSetData:", error);
    }
  };
  return (
    <Box className={classes.secondmaingridBox}>
      {loading === true && <FullScreenLoader />}

      <Box style={{ marginTop: "12px" }}>
        <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon
            style={{ cursor: "pointer", marginRight: "8px", fontSize: "large" }}
            onClick={goBackToElementSelection}
          />
          <Typography className="heading">
            Header | Section {typeIndex + 1}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography className="label">Your Logo (Top Left)</Typography>
            <Box className="d-flex justify-start" mt={"24px"}>
              <Box
                style={{
                  maxWidth: "150px",
                  width: "100%",
                  marginRight: "10px",
                }}
              >
                <img src={accountData?.logo} width={100} height={100} />
              </Box>
              {matchData && (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FiPlus />
                  <Box
                    style={{
                      maxWidth: " 85px",
                      maxHeight: "85px",
                      width: " 100%",
                      height: "100%",
                      marginLeft: "10px",
                    }}
                  >
                    <img src={matchData} width={"100%"} alt="Selected" />
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className="label">Optional: Dynamic Logo</Typography>
            <FormControl>
              <Select
                variant="outlined"
                className="selectitem"
                id="choose-template"
                fullWidth
                MenuProps={menuProps}
                value={selectedOption}
                onChange={(e) => handleChangetitle(e)}
                name=""
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="none" disabled>
                  Select Logo
                </MenuItem>
                <MenuItem value="none">Select None</MenuItem>
                {logoSet
                  ?.filter((item) => item?.dataType === "Logo")
                  ?.map((item) => (
                    <MenuItem
                      value={item?.value}
                    // onClick={(e) => {
                    //   console.log(e);
                    // }}
                    >
                      {item?.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box className="secondmaingridbtn" mt={2}>
          <Button
            className={`${nextButton === true ? "savebtnDisables" : "savebtn"}`}
            disabled={nextButton === true}
            variant="contained"
            onClick={() => handleSetData()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            className={`${nextButton === false ? "savebtnDisables" : "savebtn"
              }`}
            disabled={nextButton === false}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HeaderSection;
