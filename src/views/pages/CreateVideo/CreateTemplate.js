import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
  InputAdornment,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
// import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import WarningIcon from "@material-ui/icons/Warning";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import { UserContext } from "../../../context/User";
import { MenuItem, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StaticDyanamicFile from "./StaticDyanamicFile";
import ImageVideo from "./Imagevideo";
import { Clock } from "react-feather";
import Summary from "./Summary";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Close } from "@material-ui/icons";
import { menuProps } from "src/utils";
import ViewElement from "./ViewElement";
import { Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullScreenLoader from "src/component/FullScreenLoader";
import * as Yup from "yup";
//Custom Style of CreateTempate page
const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    padding: "24px",
    "& .MuiDialog-paperScrollPaper": {
      padding: "24px",
    },
  },
  heading: {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  maindiv: {
    "& .MuiPopover-paper": {
      marginTop: "85px",
    },
    marginTop: "10px",
    "& .nameBox": {
      border: "1px solid #ECECEC",
      borderRadius: "10px",
      padding: "12px 16px",
      "& .MuiButton-textPrimary": {
        color: "#0358AC",
      },
    },
    "& .nameBox2": {
      border: "1px solid #ECECEC",
      marginTop: "5px",
      borderRadius: "10px",
      padding: "5px 16px",
      "& .MuiButton-textPrimary": {
        color: "#0358AC",
      },
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px !important",
    },
    "& .gridcontainer": {
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "15px",
      width: "100%",
      margin: "0px",
    },
    "& .gridcontainerside": {
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "24px",
      display: "flex",
      width: "100%",
      margin: "0px",
      "& .MuiFormControl-root": {
        marginTop: "0px",
      },
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
    "& .sheetbtn": {
      borderRadius: "6px ",
      cursor: "pointer",
      background: " #0358AC",
      color: "white",
      marginTop: "5px",
      height: "42px",
      width: "100%",
    },
    "& .sheetbtnDisables": {
      borderRadius: " 6px",
      background: "#F4F4F4",
      marginTop: "5px",
      color: "black",
      height: "42px",
      width: "100px",
    },
    "& .gridcontainersecond": {
      display: "flex",
    },
    "& .secondmaingrid": {
      marginTop: "20px",
    },
    "& .secondmaingridBox": {
      borderRadius: "12px",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "16px 24px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      "& .MuiButton-root": {
        color: "#152F40",
        background: "transparent",
        fontSize: "16px",
      },
      "& .MuiButton-contained": {
        color: "#fff",
        background: "#0358AC",
        fontSize: "16px",
        height: "48px",
      },
    },
    "& .middleBox": {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      minHeight: "400px",
      alignItems: "center",
      color: "#858585",
    },
    "& .secondmaingridbtn": {
      marginTop: "10px",
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
    },
    "& .gridnumberbox": {
      borderRadius: "8px",
      background: "#F4F4F4",
      width: "40px",
      border: "2px solid transparent",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#858585",
    },
    "& .gridnumberbox1": {
      borderRadius: "8px",
      background: "#fff",
      border: "2px solid",
      width: "38px",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#0358AC",
    },
    "& .gridnumberbox2": {
      borderRadius: "8px",
      background: "#0358AC",
      border: "2px solid transparent",
      width: "40px",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
    },
    "& .endIconbtn": {
      display: "inherit",
      marginLeft: "8px",
      marginRight: " -4px",
      borderLeft: "1px solid black",
      height: "42px !important",
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
      "& .MuiInputBase-input.Mui-disabled": {
        opacity: 0.5,

        background: "#F4F4F4 !important",

        "& .MuiInputBase-input": {
          fontSize: "16px",
          fontWeight: 500,
          color: "#DEDEDE",
        },
      },
    },
    "& .addelementbox": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: "32px",
      padding: "19px",
      flexDirection: "column",
      "& .MuiButton-outlined": {
        fontSize: "16px",
        fontWeight: 500,
        borderRadius: "8px",
        marginTop: "32px",
        color: "#152F40",
        borderColor: "#0358AC",
        padding: "10px 15px",
      },
    },
    "& .selectitemsecond": {
      color: "#152F40",
      border: "1px solid #ECECEC",
      background: "transparent",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        fontSize: "16px",
        fontWeight: 500,
        color: "black",
        color: "black",
      },
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& .MuiSelect-iconOpen": {
        borderLeft: "0px !important",
        borderRight: "1px solid #ECECEC",
        transform: "rotate(360deg)",
        transform: "rotate(360deg)",
        marginRight: "-1px !important",
      },
      "& .MuiSelect-icon": {
        top: 0,
        height: "46px",
        color: "#152F40",
        paddingLeft: "8px",
        paddingLeft: "8px",
      },
      "& .MuiInputBase-input.Mui-disabled": {
        opacity: 0.5,

        background: "#F4F4F4 !important",

        "& .MuiInputBase-input": {
          fontSize: "16px",
          fontWeight: 500,
          color: "#DEDEDE",
        },
      },
    },
    "& .buttonSave": {
      "& .MuiButton-contained": {
        color: "#152F40",
        background: "transparent",
      },
    },
  },
  elementCard: {
    border: "1px solid #ECECEC",
    borderRadius: "10px",
    padding: "6px 16px",
    background: "#F2F7FF",
    color: "#0358AC",
    "& .MuiButton-outlined": {
      borderRadius: "50px",
      color: "#0358AC",
    },
    "& h5": {
      color: "#152F40",
    },
    "& .MuiTypography-body1": {
      fontSize: "12px",
    },
  },
  onclick: {
    marginLeft: "98%",
    marginTop: "-8px",
  },
  sheetbtnDisables: {
    borderRadius: " 6px",
    background: "#F4F4F4",
    marginTop: "5px",
    color: "black",
    height: "42px",
    width: "100px",
    display: "flex",
    justifyContent: "center",
    " & .MuiDialogActions-root": {
      display: "flex",
      justifyContent: "center",
    },
  },
  sheetbtn: {
    borderRadius: "6px ",
    background: " #0358AC",
    color: "white",
    marginTop: "5px",
    height: "42px",
    width: "100px",
    " & .MuiDialogActions-root": {
      display: "flex",
      justifyContent: "center",
    },
  },
  addCategory: {
    " & .MuiDialog-paperWidthSm": { width: "610px", height: "202px" },
  },
  dialogebtn: {
    "& .savebtn": {
      borderRadius: "6px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "6px",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
  },
}));

// Component for creating a new template
const CreateTemplate = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [templateParams, setTemplateParams] = useState({});
  console.log("templateParams: ", templateParams);
  const [viewParams, setViewParams] = useState({});
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedOptionside, setSelectedOptionSide] = useState([]);
  const [elementType, setElementType] = useState(
    props?.location?.state || "none"
  );
  console.log("elementType: ", elementType);
  const [linkObject, setLinkObject] = useState([]);
  console.log("linkObject: ", linkObject);
  const [typeIndex, setTypeIndex] = useState();
  const [templateName, setTemplateName] = useState("");
  const [saveName, setSaveName] = useState(false);
  console.log("saveName: ", saveName);
  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState(user?.category);
  console.log("Category: ", Category);
  const [videoRefral, setVideoRefral] = useState();
  console.log("videoRefral: ", videoRefral);
  const [editType, setEditType] = useState("Create");
  const [openDialog, setOpenDialog] = useState(false);
  const [elementID, setElementID] = useState("");
  const [viewData, setViewData] = useState({});
  const [sheetData, setSheetData] = useState([]);
  console.log("sheetData: ", sheetData);
  const [connectedSheet, setConnectedSheet] = useState("none");
  console.log("connectedSheet: ", connectedSheet);
  const handleSheet = (event) => {
    console.log(event, "eventeventeventnewest");
    setConnectedSheet(event.target.value);
  };
  const [isTemplateNameEmpty, setIsTemplateNameEmpty] = useState(false);
  const [active, setActive] = useState(false);
  const [previewData, setPreviewData] = useState("");
  console.log("previewData: ", previewData);
  const [editSheet, setEditSheet] = useState(false);
  console.log("editSheet: ", editSheet);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [elements, setElements] = useState([
    { id: 1, name: "Element 1" },
    { id: 2, name: "Element 2" },
    { id: 3, name: "Element 3" },
    { id: 4, name: "Element 4" },
  ]);
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string()
        // .required(
        //   "Category is required."
        // )
        .max(
          20,
          "Category is required and must be between 2 and 20 characters."
        )
        .min(2, "Category is required and must be between 2 and 20 characters"),
      // .matches(
      //   /^[A-Za-z]{2,20}(?:\s[A-Za-z]{2,20})*$/,
      //   "Category is required and must be between 2 and 20 characters, containing only alphabetic characters."
      // ),
    }),
    onSubmit: (values) => {
      handleAddNewCategory(values.category);
      setIsDialogOpen(false);
    },
  });
  const handleAddNewCategory = (values) => {
    addCategory(values);
    console.log(newCategory, "newCategory");

    setIsDialogOpen(false);
    setNewCategory("");
  };
  const getVdoCategories = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllCategories,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setCategory(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (values) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.addCategory,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          categoryName: values,
        },
      });
      if (res?.data?.status === 200) {
        getVdoCategories();
        setLoading(false);

        formik.resetForm();
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);

        // else if (res?.data?.status === 205) {
        //   toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteCategory,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          categoryId,
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        getVdoCategories();
        setLoading(false);
      } else if (res?.data?.status === 205) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setError("");
      setNewCategory("");
    }
  }, [isDialogOpen]);
  const handleClose = () => {
    setError("");
    setNewCategory("");
    setIsDialogOpen(false);
  };
  // Update category state when user context changes
  useEffect(() => {
    setCategory(user?.category);
  }, [user?.category]);
  // Function to handle link data
  const linkData = (data) => {
    if (data != undefined) {
      setLinkObject((prevState) => [...prevState, data]);
    }
  };

  const handleSaveClick = () => {
    if (templateName.length !== 0 && selectedOption === "none") {
      toast.error("Please select a category.");
    }
  };
  const handleconnect = () => {
    if (connectedSheet === "" || connectedSheet === "none") {
      toast.error("Please connect a google sheet.");
    }
  };

  const handleScreen = (type) => {
    setElementType(type);
  };
  // Function to get summary type
  const getSummary = (type) => {
    setElementType(type);
  };
  // Function to handle change event for elements
  const handleChange = (event, elementId, index) => {
    setElementType(
      videoRefral.find((data) => data.element_Id === event.target.value)
        ?.element_Name
    );
    setElementID(event.target.value);
    setSelectedOptionSide((prevState) => ({
      ...prevState,
      [elementId]: event.target.value,
    }));
    setTypeIndex(index);
  };
  // Function to add a new element
  const handleAddElement = () => {
    const newElementId = elements.length + 1;
    const newElement = { id: newElementId, name: `Element ${newElementId}` };
    setElements([...elements, newElement]);
  };
  // Function to update query parameters in URL
  const updateQueryParams = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("templateId", value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };
  // Validation schema for User form

  const CreateVdoTemplate = async () => {
    setLoading(false);
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    if (editType === "Create") {
      try {
        setLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.createVdoTemplate,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          data: {
            categoryId: selectedOption,
            videoTemplateName: templateName,
            templateType: "VIDEO",
          },
        });
        if (res?.data?.status === 200 || res?.data?.status === 201) {
          setLoading(false);
          updateQueryParams(res?.data?.data?.videoTemplateId);
          setSaveName(true);
          getTemplateByID(res?.data?.data?.videoTemplateId);
          setElementType("summary");
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    } else if (editType === "Edit") {
      try {
        setLoading(true);
        const res = await axios({
          method: "PUT",
          url: ApiConfig.updateTemplateVideo,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            templateId: templateId,
          },
          data: {
            categoryId: selectedOption,
            videoTemplateName: templateName,
          },
        });

        if (res?.data?.status === 200 || res?.data?.status === 201) {
          setLoading(false);
          setSaveName(true);
          getTemplateByID(templateId);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    }
  };
  // Function to get all video referral types
  const getAllVideoRefTypes = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllVideoRefTypes,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setVideoRefral(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to get template details by template ID
  const getTemplateByID = async (value) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getTemplatebyID,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          templateId: value,
        },
      });
      if (res?.status === 200) {
        setTemplateParams((prevState) => ({
          ...prevState,
          ...res?.data?.data?.getVideo,
        }));
        setSaveName(true);
        setSelectedOption(res?.data?.data?.categoryId);
        setLinkObject(res?.data?.data?.getVideo?.videoTemplateReferrals);
        if (res?.data?.data?.sheet && res?.data?.data?.sheet !== null) {
          setEditSheet(true);
        }
        const videoTemplateReferrals =
          res?.data?.data?.getVideo?.videoTemplateReferrals;
        setElements(
          videoTemplateReferrals && videoTemplateReferrals.length !== 0
            ? videoTemplateReferrals
            : [
              { id: 1, name: "Element 1" },
              { id: 2, name: "Element 2" },
              { id: 3, name: "Element 3" },
              { id: 4, name: "Element 4" },
            ]
        );

        setTemplateName(res?.data?.data?.getVideo?.videoTemplateName);
        setViewParams((prevState) => ({
          ...prevState,
          ...res?.data?.data?.sheet,
        }));
        setConnectedSheet(res?.data?.data?.sheet.googleSheetsId);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to get connected sheet details
  const getConnectedSheet = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.connectedSheetVideo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setSheetData(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const [videoUrl, setVideoUrl] = useState("");
  const [creationInProgress, setCreationInProgress] = useState(false);
  console.log("videoUrl: ", videoUrl);
  const getPreviewdata = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        // url: ApiConfig.previewVideo,
        url: `${ApiConfig.previewVideo}?videoTemplateId=${templateParams?.videoTemplateId}`,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        const data = res?.data?.data;

        // Check if video is already created
        if (data.video_url) {
          setVideoUrl(data.video_url);
          setCreationInProgress(false); // Video is ready, not in progress
        } else {
          setCreationInProgress(true); // Video creation has started
        }
      }
    } catch (error) {
      console.log(error, "error in the get preview API");
    } finally {
      setLoading(false);
    }
  };
  // Function to update template overview data
  const templateOverview = async (value) => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.updateTemplatePreview,
        headers: {
          token: `
          ${localStorage.getItem("token")}`,
        },
        data: {
          categoryId: selectedOption,
          companyName: value?.companyName,
          dynamicUrlForPreview: value?.dynamicURL,
          prospectName: value?.prospectName,
          templateType: "VIDEO",
          userId: localStorage.getItem("_id"),
          videoTemplateId: templateId,
          videoTemplateName: templateName,
        },
      });
      if (res?.status === 200) {
        setLoading(false);
        getTemplateByID(templateId);
        setOpenDialog(false);
        toast.success("Successfully Save!");
      }
    } catch (error) {
      // debugger;
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to reload template data
  const reloadData = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    if (templateId) {
      getTemplateByID(templateId);
    }
  };
  // useEffect hook to fetch initial data
  useEffect(() => {
    getVdoCategories();
    getConnectedSheet();
    getAllVideoRefTypes();
    setConnectedSheet(viewParams?.googleSheetsId);
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    if (templateId) {
      getTemplateByID(templateId);
    }
  }, []);
  // Function to handle deletion of query parameters in URL
  const handleDeleteParameter = () => {
    const urlWithoutParameter = window.location.href.split("?")[0];
    history.push(urlWithoutParameter);
  };
  // Function to handle change event for template title
  const handleChangetitle = (event, name) => {
    setSelectedOption(event.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState("none");
  const connectSheet = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    try {
      // setConnectionStatus("CONNECT");
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.connectSheetTOTemplateVideo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          connectionStatus: connectionStatus,
          sheetId: connectedSheet,
          templateId: templateId,
          type: "VIDEO",
        },
      });
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        setLoading(false);
        toast.success(res?.data?.message);
        // setEditSheet(true);
        setActive(true);
        getTemplateByID(templateId);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to disconnect sheet from template
  const disconnectSheet = () => {
    setEditSheet(false);
    setActive(false);
    // toast.success("Disconnected successfully!");
  };
  // Function to handle view action
  const handleView = async (data) => {
    setElementType("VIEW");
    setViewData(data);
  };
  const connectionHandler = () => {
    setConnectionStatus("CONNECT");
  };
  const disConnectionHandler = () => {
    setConnectionStatus("DISCONNECT");
    disconnectSheet();
  };
  const handleEditButtonClick = () => {
    // Add your logic for handling the edit button click here
    if (selectedCategory) {
      alert(`Selected Category: ${selectedCategoryName}`);
    } else {
      alert("Please select a category.");
    }
  };
  const formatCategoryName = (name) => {
    if (!name) return "";

    // Convert to lowercase and then capitalize the first letter of each word
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to handle onBlur event for template name input
  const handleBlur = () => {
    setIsTemplateNameEmpty(templateName.trim() === "");
  };
  useEffect(() => {
    if (connectionStatus === "CONNECT" || connectionStatus === "DISCONNECT") {
      connectSheet();
    }
    if (connectionStatus === "CONNECT") {
      setEditSheet(true);
    }
  }, [connectionStatus]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("handleOpen: ", handleOpen);
    setOpen(true);
    // fetchVideo();
  };

  const handleClose2 = () => {
    setVideoUrl(null);
    setOpen(false);
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Grid item xs={12}>
        <Typography style={{ color: "#152f40" }}>
          Template /{" "}
          <span style={{ color: "#0358AC" }}> New Video Template</span>
        </Typography>
      </Grid>
      <Grid container spacing={3} className={classes.maindiv}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2} className="gridcontainer">
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              lg={5}
              className="gridcontainersecond"
            >
              {saveName ? (
                <Box className="nameBox" width={"100%"}>
                  <Typography style={{ color: "#858585" }}>Category</Typography>
                  <Box className="d-flex justify-space-between">
                    <Typography style={{ color: "#152F40", fontSize: "16px" }}>
                      {templateParams?.categoryName}
                    </Typography>
                    <Button
                      varinat="standard"
                      color="primary"
                      onClick={() => {
                        setSaveName(false);
                        setEditType("Edit");
                      }}
                    >
                      edit
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box width={"100%"}>
                  <Typography style={{ color: "rgb(21, 47, 64)" }}>
                    Category
                  </Typography>
                  <FormControl>
                    <Select
                      style={{ marginTop: "0px" }}
                      variant="outlined"
                      className="selectitem"
                      id="choose-template"
                      value={selectedCategory}
                      MenuProps={menuProps}
                      onChange={(e) => {
                        handleChangetitle(e);
                        setSelectedCategory(e.target.value);
                        setSelectedCategoryName(e.target.name);
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem value="none" disabled>
                        Select Category
                      </MenuItem>
                      {Category?.map((data, i) => (
                        <MenuItem
                          divider
                          key={i}
                          style={{
                            color: "#858585",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                          value={data?._id}
                          name={data?.category_Name}
                        >
                          {data?.category_Name}
                          {data?._id !== selectedCategory && (
                            <IconButton
                              edge="end"
                              onClick={() => deleteCategory(data?._id)}
                              disabled={loading} // Optional: disable button when loading
                              style={{ marginRight: "20px" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </MenuItem>
                      ))}
                      <MenuItem
                        style={{ color: "#0358AC", fontWeight: "bold" }}
                        onClick={() => setIsDialogOpen(true)}
                      >
                        + Add New Category
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              {saveName ? (
                <Box className="nameBox">
                  <Typography style={{ color: "#858585" }}>
                    Template Name
                  </Typography>
                  <Box className="d-flex justify-space-between">
                    <Typography
                      style={{
                        color: "#152F40",
                        fontSize: "16px",
                        wordBreak: "break-all",
                      }}
                    >
                      {templateParams?.videoTemplateName}
                    </Typography>
                    <Button
                      varinat="standard"
                      color="primary"
                      onClick={() => {
                        setSaveName(false);
                        setEditType("Edit");
                      }}
                    >
                      edit
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography style={{ color: "#152F40" }}>
                    Template Name
                  </Typography>

                  <TextField
                    variant="outlined"
                    placeholder="Enter Template Name"
                    value={templateName}
                    onBlur={handleBlur}
                    onChange={(e) => setTemplateName(e.target.value)}
                    inputProps={{ maxLength: 50 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div onClick={handleSaveClick}>
                            <Button
                              className={`${templateName === "" || selectedOption === "none"
                                  ? "savebtnDisables"
                                  : "savebtn"
                                }`}
                              disabled={
                                templateName === "" || selectedOption === "none"
                              }
                              onClick={() => CreateVdoTemplate()}
                            >
                              Save
                            </Button>
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {isTemplateNameEmpty && (
                    <Typography style={{ color: "red" }}>
                      Template Name is required
                    </Typography>
                  )}
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ color: "#152F40" }}>Ingestion</Typography>
              <div style={{ display: "flex", gap: "16px" }}>
                {editSheet === true ? (
                  <>
                    <Box
                      className="d-flex justify-space-between nameBox2"
                      style={{ width: "100%" }}
                    >
                      <Typography>{viewParams && viewParams?.title}</Typography>

                      <ButtonGroup variant="text">
                        <Button
                          varinat="standard"
                          color="primary"
                          onClick={() =>
                            window.open(viewParams && viewParams?.fetchUrl)
                          }
                        >
                          View
                        </Button>
                        <Button
                          style={{ color: "#0358AC" }}
                          variant="standard"
                          color="primary"
                          onClick={disConnectionHandler}
                        >
                          Disconnect
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </>
                ) : (
                  <>
                    <FormControl>
                      <Select
                        style={{ marginTop: "0px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        disabled={
                          new URLSearchParams(window.location.search).get(
                            "templateId"
                          ) === null
                        }
                        value={connectedSheet}
                        onChange={handleSheet}
                        name=""
                        IconComponent={ExpandMoreIcon}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              marginTop: 80,
                            },
                          },
                        }}
                      >
                        <MenuItem value="none" disabled>
                          Select Ingestion Source
                        </MenuItem>
                        {sheetData?.map((data, i) => {
                          return (
                            <MenuItem
                              key={i}
                              style={{ color: "#858585" }}
                              value={data?._id}
                              name={data?.title}
                            >
                              {data?.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <div onClick={handleconnect}>
                      <Button
                        disabled={
                          connectedSheet === "" || connectedSheet === "none"
                        }
                        className={`${connectedSheet === "" || connectedSheet === "none"
                            ? "sheetbtnDisables"
                            : "sheetbtn"
                          }`}
                        varinat="standard"
                        color="primary"
                        onClick={connectionHandler}
                      >
                        Connect
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} className="secondmaingrid">
            {elementType === "STATICURL" || elementType === "DYNAMICURL" ? (
              <StaticDyanamicFile
                elementType={elementType}
                linkData={linkData}
                elementID={elementID}
                linkObject={linkObject}
                typeIndex={typeIndex}
                reloadData={reloadData}
                handleScreen={handleScreen}
                getSummary={getSummary}
                setElementType={setElementType}
                viewParams={viewParams}
              />
            ) : elementType === "UPLOADIMAGE" ||
              elementType === "VIDEOCLIPS" ? (
              <ImageVideo
                elementType={elementType}
                linkData={linkData}
                linkObject={linkObject}
                elementID={elementID}
                reloadData={reloadData}
                typeIndex={typeIndex}
                handleScreen={handleScreen}
                getSummary={getSummary}
                viewParams={viewParams}
              />
            ) : elementType === "summary" ? (
              <Summary
                linkObject={linkObject}
                sheetData={sheetData}
                reloadData={reloadData}
                sheetId={templateParams?.sheetId}
                templateParams={templateParams}
                viewParams={viewParams}
                getTemplateByID={getTemplateByID}
              />
            ) : elementType === "VIEW" ? (
              <ViewElement linkObject={viewData} getSummary={getSummary} />
            ) : linkObject?.length === 0 ? (
              <></>
            ) : (
              <Box
                className="secondmaingridBox"
                style={{ textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  style={{ padding: "13px 24px" }}
                  disabled={linkObject?.length === 0}
                  onClick={() => {
                    setElementType("summary");
                  }}
                >
                  Summary
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className="gridcontainerside"
          >
            {elements?.map((element, index) => (
              <React.Fragment key={element?.id}>
                {/* {linkObject[index]?.sequence === index + 1 ? ( */}
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <Box className="gridnumberbox1">
                    <Typography>{index + 1}</Typography>
                  </Box>
                </Grid>
                {/* ) : linkObject?.length + 1 == element?.id ? (
                  <Grid item xs={2} sm={1} md={2} lg={2}>
                    <Box className="gridnumberbox2">
                      <Typography>{element?.id}</Typography>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={2} sm={1} md={2} lg={2}>
                    <Box className="gridnumberbox">
                      <Typography>{element?.id}</Typography>
                    </Box>
                  </Grid>
                )} */}

                <Grid
                  item
                  xs={10}
                  sm={11}
                  md={10}
                  lg={10}
                  align="right"
                  style={{ padding: "10px" }}
                >
                  <FormControl style={{ width: "97%", textAlign: "left" }}>
                    {linkObject && linkObject[index]?.sequence === index + 1 ? (
                      <>
                        <Typography variant="h5" style={{ color: "#0358AC" }}>
                          {element.name ? element.name : `Element ${index + 1}`}
                        </Typography>
                        <div className={classes.elementCard}>
                          <div className="d-flex justify-space-between">
                            <Typography variant="h5">
                              {linkObject[index]?.elementId?.element_Name ===
                                "STATICURL" && "Static URL"}
                              {linkObject[index]?.elementId?.element_Name ===
                                "DYNAMICURL" && "Dynamic URL"}
                              {linkObject[index]?.elementId?.element_Name ===
                                "UPLOADIMAGE" && "Upload Image"}
                              {linkObject[index]?.elementId?.element_Name ===
                                "VIDEOCLIPS" && "Video Clips"}
                            </Typography>

                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleView(linkObject[index]);
                              }}
                            >
                              View
                            </Button>
                          </div>
                          <Typography variant="body1">
                            <Clock width={"14px"} height={"14px"} />{" "}
                            {linkObject[index]?.duration}sec &nbsp;|
                            {linkObject[index]?.elementId?.element_Name ===
                              "UPLOADIMAGE" ||
                              linkObject[index]?.elementId?.element_Name ===
                              "VIDEOCLIPS" ? (
                              <></>
                            ) : (
                              <>
                                Scroll -{" "}
                                {linkObject[index]?.scrollEnabled === true
                                  ? "Yes"
                                  : "No"}{" "}
                                &nbsp;|
                              </>
                            )}
                            Audio - Yes
                          </Typography>
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography variant="h5" style={{ color: "#858585" }}>
                          {element.name}
                        </Typography>
                        <Select
                          variant="outlined"
                          MenuProps={menuProps}
                          className="selectitemsecond"
                          disabled={
                            new URLSearchParams(window.location.search).get(
                              "templateId"
                            ) === null || !viewParams?.fetchUrl
                          }
                          id={`choose-template-${element.id}`}
                          value={selectedOptionside[element.id] || " "}
                          onChange={(event) =>
                            handleChange(event, element.id, index)
                          }
                          IconComponent={ExpandMoreIcon}
                        >
                          <MenuItem value=" " disabled>
                            Choose type
                          </MenuItem>
                          {videoRefral?.map((item, i) => (
                            <MenuItem
                              style={{ color: "#858585" }}
                              value={item?.element_Id}
                              divider
                            >
                              {item?.element_Name === "STATICURL" &&
                                "Static URL"}
                              {item?.element_Name === "DYNAMICURL" &&
                                "Dynamic URL"}
                              {item?.element_Name === "UPLOADIMAGE" &&
                                "Upload Image"}
                              {item?.element_Name === "VIDEOCLIPS" &&
                                "Video Clips"}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </FormControl>
                </Grid>
              </React.Fragment>
            ))}
            <Box className="addelementbox">
              <Button
                disabled={
                  new URLSearchParams(window.location.search).get(
                    "templateId"
                  ) === null
                }
                style={{ color: "black", fontSize: "16px" }}
                onClick={handleAddElement}
              >
                + Add New Element
              </Button>

              <Button
                variant="outlined"
                fullWidth
                style={{ marginTop: "35px" }}
                disabled={
                  new URLSearchParams(window.location.search).get(
                    "templateId"
                  ) === null || !viewParams?.fetchUrl
                }
                onClick={() => {
                  // setOpenDialog(true);
                  handleOpen();
                  getPreviewdata();
                }}
              // onClick={handleOpen}
              >
                Progress Overview
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Dialog fullWidth maxWidth="sm" open={openDialog}>
        <Formik
          enableReinitialize
          initialValues={{
            FirstName: previewData?.FIRST_NAME || "",
            LastName: previewData?.LAST_NAME || "",
            Email: previewData?.EMAIL || "",
            Companyurl: previewData?.COMPANYURL || "",
            FaceBookUrl: previewData?.FACEBOOK || "",
            LinkedinUrl: previewData?.LINKEDIN || "",
            TwitterUrl: previewData?.TWITTER || "",
            customerorganization: previewData?.CUSTOMER_ORGANIZATION || "",
          }}
        >
          <Form>
            <DialogContent>
              <Close
                className={classes.onclick}
                onClick={() => setOpenDialog(false)}
              />
              <Typography style={{ color: "#152F40" }}>
                Progress Overview /
                <span style={{ color: "#0358AC" }}> Preview AI Video</span>
              </Typography>
              <Typography
                variant="h4"
                style={{
                  color: "#152F40",
                  marginTop: "16px",
                  textAlign: "center",
                }}
              >
                Preview Data
              </Typography>
              <Box mt={3}>
                <Typography style={{ color: "black" }}>First Name </Typography>
                <Field
                  type="text"
                  name="FirstName"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Last Name</Typography>
                <Field
                  type="text"
                  name="LastName"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Email</Typography>
                <Field
                  type="text"
                  name="Email"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>
                  Customer Organization
                </Typography>
                <Field
                  type="text"
                  name="customerorganization"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Company Url</Typography>
                <Field
                  type="text"
                  name="Companyurl"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Facebook Url</Typography>
                <Field
                  type="text"
                  name="FaceBookUrl"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Linkedin Url</Typography>
                <Field
                  type="text"
                  name="LinkedinUrl"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box mt={2}>
                <Typography style={{ color: "black" }}>Twitter Url</Typography>
                <Field
                  type="text"
                  name="TwitterUrl"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
            </DialogContent>
            <DialogActions
              className="d-flex"
              style={{ padding: "8px 25px 18px" }}
            >
              <Button
                variant="contained"
                color="default"
                onClick={() => setOpenDialog(false)}
                fullWidth
                style={{
                  background: "#F4F4F4",
                  color: "black",
                  fontSize: "16px",
                  fontWeight: 500,
                  height: "45px",
                }}
              >
                Back
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          formik.resetForm();
        }}
        aria-labelledby="add-category-dialog-title"
        aria-describedby="add-category-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="add-category-dialog-title"
          style={{
            color: "rgb(3, 88, 172)",
            padding: "36px 24px 8px 24px",
            fontWeight: "bold",
          }}
        >
          Add New Category
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsDialogOpen(false);
              formik.resetForm();
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "gray",
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              placeholder="Enter Category"
              variant="outlined"
              fullWidth
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="dense"
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              inputProps={{ maxLength: 21 }}
            />
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "18px 24px",
              }}
              className={classes.dialogebtn}
            >
              <Button
                className="savebtnDisables"
                onClick={() => {
                  setIsDialogOpen(false);
                  formik.resetForm();
                }}
                variant="outlined"
                // color="secondary"
                style={{ marginRight: "8px" }}
              >
                Cancel
              </Button>
              <Button
                className={`${!formik.isValid || !formik.dirty
                    ? "savebtnDisables"
                    : "savebtn"
                  }`}
                type="submit"
                variant="contained"
                // color="primary"
                disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose2}
        maxWidth="md"
        fullWidth
        // style={{ padding: "24px" }}
        className={classes.dialogTitle}
      >
        <DialogTitle>
          <Box
            style={{
              textAlign: "center",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VideoLibraryIcon
              style={{ fontSize: 30, marginRight: 10, color: "#3f51b5" }}
            />
            Video Overview
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gridGap={20}
          >
            {loading ? (
              <>
                <CircularProgress style={{ marginBottom: 10 }} />
                <Typography className="heading" variant="h6" align="center">
                  Loading...
                </Typography>
              </>
            ) : creationInProgress ? (
              <>
                <WarningIcon
                  style={{ fontSize: 40, color: "#FFA726", marginBottom: 10 }}
                />
                <Typography className="heading" variant="h6" align="center">
                  Video creation has started. It'll take some time. Please check
                  back later.
                </Typography>
              </>
            ) : videoUrl ? (
              <Box
                style={{
                  width: "100%",
                  maxWidth: "800px", // Maximum width for larger screens
                  maxHeight: "450px", // Maximum height to maintain aspect ratio
                  overflow: "hidden",
                  position: "relative",
                  paddingBottom: "56.25%", // 16:9 aspect ratio
                }}
              >
                <video
                  controls
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ) : (
              <>
                <ErrorOutlineIcon
                  style={{ fontSize: 40, color: "#4caf50", marginBottom: 10 }}
                />
                <Typography className="heading" variant="h6" align="center">
                  No video available.
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTemplate;
