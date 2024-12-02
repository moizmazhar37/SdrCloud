import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  SvgIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { Close } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "../../../context/User";
import { CloudCircle } from "@material-ui/icons";
import { Clock } from "react-feather";
import HeaderSection from "./HeaderSection";
import HeroSection from "./HeroSection";
import BannerScetion from "./BannerScetion";
import LeftTextSection from "./LeftTextSection";
import RightTextSection from "./RightTextSection";
import HVOSummary from "./HVOSummary";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { menuProps } from "src/utils";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import EditElement from "./EditElement";
import ViewElement from "src/views/pages/HVOTemplate/ViewElement";
import Footer from "./Footer";
import { IoClose } from "react-icons/io5";
import BannerSection2 from "./BannerSection2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  maindiv: {
    "& .sheetbtn": {
      borderRadius: "6px ",
      background: " #0358AC",
      color: "white",
      marginTop: "5px",
      height: "42px",
      width: "100px",
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
    "& .sheetbtnDisables": {
      borderRadius: " 6px",
      background: "#F4F4F4",
      marginTop: "5px",
      color: "black",
      height: "42px",
      width: "100px",
    },
    "& .MuiPopover-paper": {
      marginTop: "85px !important",
    },
    marginTop: "10px",
    "& .nameBox": {
      border: "1px solid #ECECEC",
      borderRadius: "10px",
      padding: "7px 10px",
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
    "& .gridcontainersecond": {
      display: "flex",
      alignItems: "end",
    },
    "& .secondmaingrid": {
      marginTop: "20px",
      height: "100%",
      // minHeight: "450px",
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
        height: "48px",
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
      marginTop: "20px",
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
      width: "40px",
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
      color: "#858585 !important",
      border: "1px solid #ECECEC",
      height: "44px",
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
      "& .MuiInputBase-input": {
        color: "#858585 !important",
      },
    },
    "& .addelementbox": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: "32px",
      padding: "8px",
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
      // height: "40px",
      background: "transparent",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        fontSize: "16px",
        fontWeight: 500,
        color: "#000 !important",
      },
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& .MuiSelect-iconOpen": {
        borderLeft: "0px !important",
        borderRight: "1px solid #ECECEC",
        transform: "rotate(360deg)",
        marginRight: "-1px important",
      },
      "& .MuiSelect-icon": {
        top: 0,
        height: "46px",
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
    "& .buttonSave": {
      "& .MuiButton-contained": {
        color: "#152F40",
        background: "transparent",
      },
    },
  },
  elementCard: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    background: "#F2F7FF",
    border: "1px solid #ECECEC",
    borderRadius: "10px",
    padding: "12px 16px",
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
  breads: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& nav li": {
      margin: "0px",
    },
    "& .breadCrumbText": {
      color: "#0358AC",
      margin: "0px 5px",
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

const CreateHVOTemplate = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedCategoryName, setSelectedCategoryName] = useState("none");
  const [selectedOptionside, setSelectedOptionSide] = useState("");
  const [elementType, setElementType] = useState(
    props?.location?.state || "none"
  );
  const [linkObject, setLinkObject] = useState([]);
  console.log("🚀 ~ linkObject:", linkObject);
  const [typeIndex, setTypeIndex] = useState();
  const [templateName, setTemplateName] = useState("");
  const [saveName, setSaveName] = useState(false);
  const [editType, setEditType] = useState("Create");
  const [templateParams, setTemplateParams] = useState({});
  const [connetedSheet, SetConnectedSheet] = useState("none");
  console.log("connetedSheet11", connetedSheet);
  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState([]);
  const [videoRefral, setVideoRefral] = useState();
  const [sectionId1, setSectionId] = useState();
  const [sheetData, setSheetData] = useState([]);
  const [active, setActive] = useState(false);
  const [editSheet, setEditSheet] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [isTemplateNameEmpty, setIsTemplateNameEmpty] = useState(false);
  const [viewParams, setViewParams] = useState({});
  console.log("🚀 ~ viewParams:", viewParams);
  const [newlyCategory, setNewlyCategory] = useState(null);
  const [viewData, setViewData] = useState({});
  const [editData, setEditData] = useState({});
  const [renderComponent, setRenderComponent] = useState(false);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  console.log("isSheetConnected: ", isSheetConnected);

  const [elements, setElements] = useState([
    { id: 1, name: "Section 1" },
    { id: 2, name: "Section 2" },
    { id: 3, name: "Section 3" },
    { id: 4, name: "Section 4" },
  ]);
  const [footerData, setFooterData] = useState([]);
  const [instaLink, setInstaLink] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");
  useEffect(() => {
    setCategory(user?.category);
  }, [user?.category]);

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string()
        .trim()
        .max(
          25,
          "Category is required and must be between 2 and 25 characters."
        )
        .min(2, "Category is required and must be between 2 and 25 characters"),
    }),
    onSubmit: (values) => {
      handleAddNewCategory(values.category);
      setIsDialogOpen(false);
    },
  });
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleAddNewCategory = (values) => {
    addCategory(values);

    setIsDialogOpen(false);
    setNewCategory("");
  };
  const handleSheet = (event) => {
    SetConnectedSheet(event.target.value);
  };
  const handleconnect = () => {
    if (connetedSheet === "" || connetedSheet === "none") {
      toast.error("Please connect a google sheet.");
    }
  };
  const handleChangetitle = (event) => {
    setSelectedOption(event.target.value);

    setSelectedCategoryName(event.target.value);
  };
  const disconnectSheet = () => {
    setEditSheet(false);
    setActive(false);
  };
  const connectionHandler = async () => {
    await connectSheet("CONNECT");
    setIsSheetConnected(true); // Set to true when connected
  };
  const disConnectionHandler = async () => {
    await disconnectSheet();
    await connectSheet("DISCONNECT");
    setIsSheetConnected(false); // Set to false when disconnected
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
        setIsShow(true);
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
        setIsShow(false);
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
  const getVdoCategories = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllCategories,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setCategory(res?.data);
        setNewlyCategory(res?.data[res?.data.length - 1]);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const connectSheet = async (status) => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.connectSheetTOTemplate,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          connectionStatus: status,
          sheetId: connetedSheet,
          templateId: templateId,
          type: "HVO",
        },
      });
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        setLoading(false);
        getHVOTemplate(templateId);
        if (status === "CONNECT") {
          setConnectionStatus("CONNECT");
          setEditSheet(true);

          toast.success("Sheet successfully connected!");
        } else if (status === "DISCONNECT") {
          setConnectionStatus("DISCONNECT");
          toast.success("Sheet successfully disconnected!");
        }
        getConnectedSheet();
      } else if (res?.data?.status === 205) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const linkData = (data) => {
    if (data != undefined) {
      setLinkObject((prevState) => [...prevState, data]);
    }
  };
  const handleScreen = (type) => {
    setElementType(type);
  };
  const getSummary = (type) => {
    setElementType(type);
  };
  const handleView = async (data) => {
    setElementType("VIEW");
    setViewData(data);
  };
  const handleEdit = async (data) => {
    setElementType("Edit");
    setEditData(data);
    setRenderComponent(!renderComponent);
  };
  const checkIfHeaderSelected = () => {
    return Object.values(selectedOptionside).includes(1);
  };
  const handleChange = (event, elementId, index) => {
    setElementType(
      videoRefral.find((data) => data.sectionId === event.target.value)
        ?.sectionName
    );

    setSelectedOptionSide((prevState) => ({
      ...prevState,
      [elementId]: event.target.value,
    }));
    setTypeIndex(index);
    // setElementName(prevState => ({
    //     ...prevState,videoRefral.find((data) => data.id === event.target.value)?.name)
  };
  const handleSelectChange = (event, elementId, index) => {
    const value = event.target.value;
    if (value === "1" || (value === 1 && checkIfHeaderSelected())) {
      toast.error("You cannot select more than one HEADER.");
      return;
    }
    handleChange(event, elementId, index);
    setIsShow(false);
  };
  const handleAddElement = () => {
    const newElementId = elements.length + 1;
    const newElement = { id: newElementId, name: `Section ${newElementId}` };
    setElements([...elements, newElement]);
    setIsShow(false);
  };
  const updateQueryParams = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("templateId", value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };
  const getHVOTemplate = async (value) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getHVO,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: { hvoTemplateId: value },
      });
      if (res?.status === 200) {
        setSaveName(true);
        setTemplateParams((prevState) => ({
          ...prevState,
          ...res?.data?.data?.templateData,
        }));

        setViewParams((prevState) => ({
          ...prevState,
          ...res?.data?.data?.sheet,
        }));
        SetConnectedSheet(res?.data?.data?.sheet.googleSheetsId);
        setLinkObject(res?.data?.data?.elementsList);

        if (res?.data?.data?.sheet !== null) {
          setEditSheet(true);
        }

        const sections = res?.data?.data?.elementsList;
        setSectionId(res?.data?.data?.templateData?.elementsList);
        setElements(
          sections && sections.length !== 0
            ? sections
            : [
                { id: 1, name: "Section 1" },
                { id: 2, name: "Section 2" },
                { id: 3, name: "Section 3" },
                { id: 4, name: "Section 4" },
                // { id: 5, name: "Section 5" },
                // { id: 6, name: "Section 6" },
              ]
        );
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const CreateVdoTemplate = async () => {
    setLoading(false);
    if (editType === "Create") {
      try {
        setLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.createVdoTemplate,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            categoryId: selectedOption,
            hvoTemplateName: templateName,
            templateType: "HVO",
          },
        });
        if (res?.status === 200 || res?.status === 201) {
          toast.success("Template Created Successfully");
          setLoading(false);
          updateQueryParams(res?.data?.hvoId);
          setSaveName(true);
          getHVOTemplate(res?.data?.hvoId);
        } else if (res?.status === 205) {
          toast.error("Some error occured");
        }
      } catch (error) {
        console.log(error, "error");
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else if (editType === "Edit") {
      try {
        setLoading(true);
        const res = await axios({
          method: "PUT",
          url: ApiConfig.updateHVOTemplate,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            hvoTemplateId: templateId,
          },
          data: {
            categoryId: selectedOption,
            hvoTemplateName: templateName,
          },
        });
        if (res?.data?.status === 200 || res?.data?.status === 201) {
          setLoading(false);
          setSaveName(true);
          getHVOTemplate(templateId);
        }
      } catch (error) {
        console.log(error, "error");
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const getpreviewdata = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.previewHVOwithsheetdata,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          hvoTemplateId: templateId,
        },
      });
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        setLoading(false);
        const elementsList = res?.data?.data?.dataList;
        localStorage.setItem("templateId", templateId);
        localStorage.setItem("previewData", JSON.stringify(elementsList));
        window.open("/preview-hvo", "_blank");
      } else if (res?.data?.status === 205) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleBlur = () => {
    setIsTemplateNameEmpty(templateName.trim() === "");
  };
  const reload = () => {
    getHVOTemplate(templateId);
  };
  const getConnectedSheet = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.connectedSheet,
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
  const sectionType = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.sectionType,
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
  const GetFooterLink = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllFooterLink,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setFooterData(res?.data?.data?.footerlinks);
        setLinkedInLink(res?.data?.data?.linkedinlink);
        setFbLink(res?.data?.data?.facebooklink);
        setInstaLink(res?.data?.data?.instagramlink);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getVdoCategories();
    SetConnectedSheet(viewParams?.googleSheetsId);
    getConnectedSheet();
    sectionType();
    GetFooterLink();
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");
    if (templateId) {
      getHVOTemplate(templateId);
    }
    console.log("jsdh", viewParams?.fetchUrl);
  }, []);
  useEffect(() => {
    if (isShow && Category.length > 0) {
      const lastCategory = Category[0];
      setSelectedOption(lastCategory._id);
      handleChangetitle({ target: { value: lastCategory.id } });
    }
  }, [isShow, Category, handleChangetitle]);
  useEffect(() => {
    setIsSheetConnected(true);
  }, [viewParams]);

  return (
    <>
      {loading && <FullScreenLoader />}
      <Grid item xs={12}>
        <Box className={classes.breads}>
          <ArrowBackIcon
            style={{ color: "black", cursor: "pointer", fontSize: "large" }}
            onClick={() => {
              history.push("/CreateTemplate");
            }}
          />
          <Typography style={{ color: "#152f40" }}>
            Template /{" "}
            <span style={{ color: "#0358AC" }}> New HVO Template</span>
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={3} className={classes.maindiv}>
        <Grid item xs={12} sm={12} md={7} lg={8}>
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
                      {templateParams?.category_name}
                    </Typography>
                    <Button
                      varinat="standard"
                      color="primary"
                      onClick={() => {
                        setSaveName(false);
                        setEditType("Edit");
                        setSelectedOption(templateParams?.categoryId);
                        setTemplateName(templateParams?.hvoTemplateName);
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
                      placeholder="Select Category"
                      value={selectedOption}
                      MenuProps={menuProps}
                      onChange={(e) => {
                        handleChangetitle(e);
                        setIsShow(false);
                        setSelectedOption(e.target.value);
                      }}
                      IconComponent={ExpandMoreIcon}
                      renderValue={(selected) => {
                        const selectedCategory = Category.find(
                          (category) => category._id === selected
                        );
                        return (
                          <div style={{ color: "black" }}>
                            {selectedCategory?.category_Name ||
                              "Select Category"}
                          </div>
                        );
                      }}
                    >
                      <MenuItem
                        style={{ color: "#0358AC", fontWeight: "bold" }}
                        onClick={() => setIsDialogOpen(true)}
                      >
                        + Add New Category
                      </MenuItem>
                      {/* <MenuItem value="none" disabled>
                        Select Category
                      </MenuItem> */}

                      {Category.filter(
                        (data) =>
                          !["Startup", "SMB", "MM", "ENT"].includes(
                            data.category_name
                          )
                      ).map((data, i) => (
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
                          value={data?.id}
                          name={data?.category_name}
                        >
                          {data?.category_name}
                          <IconButton
                            edge="end"
                            onClick={() => deleteCategory(data?.id)}
                            disabled={loading}
                            style={{ marginRight: "20px" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </MenuItem>
                      ))}

                      {["Startup", "SMB", "MM", "ENT"].map(
                        (category_name, i) => {
                          const category = Category.find(
                            (cat) => cat.category_name === category_name
                          );
                          return (
                            category && (
                              <MenuItem
                                divider
                                key={`predefined-${i}`}
                                style={{
                                  color: "#858585",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                                value={category.id}
                                name={category.category_name}
                              >
                                {category.category_name}
                              </MenuItem>
                            )
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={7} lg={7}>
              {saveName ? (
                <Box className="nameBox">
                  <Typography style={{ color: "#858585" }}>
                    Template Name
                  </Typography>
                  <Box className="d-flex justify-space-between">
                    <Tooltip title={templateParams?.hvoTemplateName || ""}>
                      <Typography
                        style={{
                          color: "#152F40",
                          fontSize: "16px",
                          wordBreak: "break-all",
                        }}
                      >
                        {templateParams?.hvoTemplateName
                          ? templateParams.hvoTemplateName.length > 40
                            ? `${templateParams.hvoTemplateName.slice(
                                0,
                                40
                              )}...`
                            : templateParams.hvoTemplateName
                          : ""}
                      </Typography>
                    </Tooltip>
                    <Button
                      varinat="standard"
                      color="primary"
                      onClick={() => {
                        setSaveName(false);
                        setSelectedOption(templateParams?.categoryId);
                        setTemplateName(templateParams?.hvoTemplateName);
                        setSelectedOption(templateParams?.categoryId);
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
                    onChange={(e) =>
                      setTemplateName(e.target.value.trimStart())
                    }
                    inputProps={{ maxLength: 50 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            className={`${
                              templateName.trim() === "" ||
                              selectedOption === "none"
                                ? "savebtnDisables"
                                : "savebtn"
                            }`}
                            disabled={
                              templateName.trim() === "" ||
                              selectedOption === "none"
                            }
                            onClick={() => CreateVdoTemplate()}
                          >
                            Save
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {isTemplateNameEmpty && (
                    <Typography
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "4px",
                        marginLeft: "2px",
                        fontSize: "14px",
                      }}
                    >
                      Template Name is required.
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
                      <Typography
                        style={{ color: "#152F40", fontSize: "14px" }}
                      >
                        {viewParams && viewParams?.title}
                      </Typography>

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
                          varinat="standard"
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
                        value={connetedSheet || "none"}
                        onChange={(e) => handleSheet(e)}
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
                        renderValue={(selected) => {
                          // Always show placeholder if the value is "none"
                          if (selected === "none" || !selected) {
                            return (
                              <span style={{ color: "#858585" }}>
                                Select Ingestion Source
                              </span>
                            );
                          }
                          return (
                            <span style={{ color: "black" }}>
                              {
                                sheetData.find((item) => item._id === selected)
                                  ?.title
                              }
                            </span>
                          );
                        }}
                      >
                        <MenuItem
                          value="none"
                          disabled
                          style={{ color: "#858585" }}
                        >
                          Select Ingestion Source
                        </MenuItem>
                        {sheetData?.map((data, i) => (
                          <MenuItem
                            key={i}
                            style={{ color: "black" }}
                            value={data?._id}
                            name={data?.title}
                          >
                            {data?.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <div onClick={handleconnect}>
                      <Button
                        disabled={!connetedSheet}
                        className={`${
                          connetedSheet ? "sheetbtn" : "sheetbtnDisables"
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

          <Grid className="secondmaingrid">
            {elementType === "HEADER" ? (
              <>
                <HeaderSection
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  templateId={templateId}
                  getSummary={getSummary}
                  sectionId1={sectionId1}
                  viewParamsData={viewParams}
                />
              </>
            ) : elementType === "HERO" ? (
              <>
                <HeroSection
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "HIGHLIGHT_BANNER" ? (
              <>
                <BannerScetion
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "LEFT_TEXT_RIGHT_IMAGE" ? (
              <>
                <LeftTextSection
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "HIGHLIGHT_BANNER2" ? (
              <>
                <BannerSection2
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "RIGHT_TEXT_LEFT_IMAGE" ? (
              <>
                <RightTextSection
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "FOOTER" ? (
              <>
                <Footer
                  elementType={elementType}
                  reload={reload}
                  linkObject={linkObject}
                  videoRefral={videoRefral}
                  linkData={linkData}
                  typeIndex={typeIndex}
                  handleScreen={handleScreen}
                  getSummary={getSummary}
                />
              </>
            ) : elementType === "summary" ? (
              <>
                <HVOSummary
                  linkObject={linkObject}
                  reload={reload}
                  viewParams={viewParams}
                />
              </>
            ) : elementType === "Edit" ? (
              <EditElement
                footerData={footerData}
                instaLink={instaLink}
                fbLink={fbLink}
                linkedInLink={linkedInLink}
                linkObject={editData}
                getSummary={getSummary}
                templateId={templateId}
                videoRefral={videoRefral}
                elementType={elementType}
                typeIndex={typeIndex}
                handleScreen={handleScreen}
                reload={reload}
                sectionId1={sectionId1}
                getHVOTemplate={getHVOTemplate}
                setLoading={setLoading}
                loading={loading}
                renderComponent={renderComponent}
                viewParamsData={viewParams}
              />
            ) : elementType === "VIEW" ? (
              <ViewElement
                footerData={footerData}
                instaLink={instaLink}
                fbLink={fbLink}
                linkedInLink={linkedInLink}
                linkObject={viewData}
                getSummary={getSummary}
                templateId={templateId}
              />
            ) : linkObject?.length === 0 ? (
              <></>
            ) : (
              <HVOSummary linkObject={linkObject} viewParams={viewParams} />
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={4}>
          <Grid container spacing={2} className="gridcontainerside">
            {elements.map((element, index) => (
              <React.Fragment key={element.id}>
                {/* {linkObject[index]?.sequence === index + 1 ? ( */}
                <Grid item xs={12} sm={12} md={2}>
                  <Box className="gridnumberbox1">
                    <Typography>{index + 1}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={10}>
                  <FormControl>
                    {linkObject.length > 0 &&
                    linkObject[index]?.index === index ? (
                      <>
                        <Typography variant="h5" style={{ color: "#0358AC" }}>
                          Section {index + 1}
                        </Typography>

                        <div className={classes.elementCard}>
                          <div>
                            <Typography
                              variant="h5"
                              style={{ wordBreak: "break-all" }}
                            >
                              {linkObject[index]?.sectionType?.sectionName ===
                              "HIGHLIGHT_BANNER2"
                                ? "HIGHLIGHT_BANNER 2"
                                : linkObject[index]?.sectionType?.sectionName}
                            </Typography>
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleView(linkObject[index]);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleEdit(linkObject[index]);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography variant="h5" style={{ color: "#858585" }}>
                          {element.name}
                        </Typography>

                        <Select
                          variant="outlined"
                          className="selectitemsecond"
                          id={`choose-template-${element.id}`}
                          MenuProps={menuProps}
                          value={selectedOptionside[element.id] || " "}
                          // onChange={(event) =>
                          //   handleChange(event, element.id, index)
                          // }
                          onChange={(event) =>
                            handleSelectChange(event, element.id, index)
                          }
                          IconComponent={ExpandMoreIcon}
                          disabled={
                            new URLSearchParams(window.location.search).get(
                              "templateId"
                            ) === null ||
                            !viewParams?.fetchUrl ||
                            !isSheetConnected
                          }
                        >
                          <MenuItem
                            style={{ color: "#858585" }}
                            divider
                            value=" "
                          >
                            Choose type
                          </MenuItem>

                          {videoRefral?.map((item, i) => (
                            <MenuItem
                              style={{ color: "#858585" }}
                              value={item?.sectionId}
                              onClick={() => setElementType(item?.sectionName)}
                              divider
                            >
                              {item?.sectionName === "HEADER" && "Header"}
                              {item?.sectionName === "HERO" && "Hero"}
                              {item?.sectionName === "HIGHLIGHT_BANNER" &&
                                "Highlight Banner"}
                              {item?.sectionName === "HIGHLIGHT_BANNER2" &&
                                "Highlight Banner 2"}
                              {item?.sectionName === "LEFT_TEXT_RIGHT_IMAGE" &&
                                "Left Text | Right Image"}

                              {item?.sectionName === "RIGHT_TEXT_LEFT_IMAGE" &&
                                "Right Text | Left Image"}
                              {item?.sectionName === "FOOTER" && "Footer"}
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
                style={{ color: "black", fontSize: "18px" }}
                onClick={handleAddElement}
                disabled={!isSheetConnected}
              >
                + Add New Section
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled={
                  new URLSearchParams(window.location.search).get(
                    "templateId"
                  ) === null ||
                  !viewParams?.fetchUrl ||
                  linkObject.length <= 0
                }
                onClick={() => {
                  getpreviewdata();
                }}
              >
                Preview Template
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

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
              // onChange={(e) => {
              //   formik.setFieldValue(
              //     "category",
              //     e.target.value.replace(/\s+$/, "")
              //   );
              // }}
              onBlur={formik.handleBlur}
              margin="dense"
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              inputProps={{ maxLength: 26 }}
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
                className={`${
                  !formik.isValid || !formik.dirty
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
    </>
  );
};

export default CreateHVOTemplate;
