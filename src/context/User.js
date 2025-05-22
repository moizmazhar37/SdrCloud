import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import ApiConfig from "../config/APIConfig";
import { AuthContext } from "./Auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const UserContext = createContext();

export default function AuthProvider(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [StatusData, setStatusData] = useState({});
  const [value, setValue] = React.useState("My Profile");
  const [profileData, setProfileData] = useState(null);
  console.log("profileData: ", profileData);
  const [coverData, setCoverData] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [category, setCategory] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [isTargetComponentVisited, setIsTargetComponentVisited] =
    useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  // Function to handle setting the template ID
  const handleTempleId = (values) => {
    setTemplateId(values?.id);
  };
  // Restructure allData for the required format
  const restructuredData = allData.map((value) => {
    const templateData = value?.allTemplateGet;
    const organisationId = value?._id;
    const organisationName = value?.organizationName;
    const organisatonLogo = value?.organizationLogo;
    const prospectName = value?.prospectName;
    const userId = value?.userId;
    // Extract and filter templates based on the template ID
    const extractedTemplates = templateData.flatMap((template) =>
      template.template.map((item) => ({
        media: item.media,
        type: item.type,
        title: item.title,
        description: item.description,
        footer: item.footer,
        audioDescription: item.audioUrl ? "" : item.audioDescription,
        audioUrl: item.audioUrl ? item.audioUrl : "",

        _id: template._id,
        audioScript: "",
      }))
    );
    const filterTemplatesData = extractedTemplates
      .map((item) =>
        item._id === templateId
          ? {
              media: item.media,
              type: item.type,
              title: item.title,
              description: item.description,
              footer: item.footer,
              audioDescription: item.audioUrl ? "" : item.audioDescription,
              audioUrl: item.audioUrl ? item.audioUrl : "",
              // _id: item._id,
              audioScript: "",
            }
          : null
      )
      .filter(Boolean);

    return {
      company_name: profileData?.companyName || "",
      templateID: templateId,
      organization: {
        organizationId: organisationId,
        organizationName: organisationName,
        prospectName: prospectName,
        // "organisatonLogo":organisatonLogo,
      },
      template: filterTemplatesData,
      // "userId":userId
    };
  });
  // Function to handle viewing project by ID
  const viewProjectHandlerById = async (values) => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllProjectById,
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          projectId: values.ProjectId,
        },
      });
      if (res.data.responseCode === 200) {
        setLoading(false);
        const newData = res.data.result.projectResult[0];
        const { datavalue, index, ProjectId } = values;

        if (datavalue === false) {
          setAllData((prevData) =>
            prevData.filter((item) => item.index !== index)
          );
        } else {
          // Include allTemplateGet in the newData object
          newData.allTemplateGet = res.data.result.allTemplateGet;

          // Update state by appending the new data to the existing allData
          setAllData((prevData) => [
            ...prevData,
            { ...newData, datavalue, index, ProjectId },
          ]);
        }
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  // Function to get video categories
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
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to set target component visited status
  const setTargetComponentVisited = (value) => {
    setIsTargetComponentVisited(value);
  };
  // Function to get profile data
  const getProfilehandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        const data = res?.data;
        const userType = localStorage.getItem("userType");
        if (userType == "SUBADMIN" || userType == "USER")
          localStorage.setItem("tenant_id", data?.tenant_id);

        setProfileData(data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("creatturAccessToken");
        history.push("/");
        auth.userLogIn(false, "");
        toast.success("Session Logout");
      }
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (auth.userLoggedIn === true) {
      if (userType == "SUBADMIN" || userType == "USER") {
        getVdoCategories();
      }
      getProfilehandler();
    }
  }, [auth?.userLoggedIn]);
  // Update search results
  const updateSearchResults = (results) => {
    setSearchResult(results);
  };
  // Update search user results
  const updateSearchUser = (result) => {
    setSearchUser(result);
  };
  // Update current page
  const updatePage = (results) => {
    setPage(results);
  };
  // Update total pages count
  const updatePagesCount = (results) => {
    setPagesCount(results);
  };
  // Handle key up event for search input
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" && searchUser === "") {
      setSearchUser([]);
      setSearchResult([]);
    } else if (e.key === "Backspace" && searchResult === "") {
      setSearchResult([]);
    }
  };

  let data = {
    setValue,
    value,
    setStatusData,
    StatusData,
    profileData,
    category,
    coverData,
    searchResult,
    updateSearchResults,
    page,
    updatePage,
    pagesCount,
    getVdoCategories,
    setCategory,
    updatePagesCount,
    isTargetComponentVisited,
    setTargetComponentVisited,
    setSearchUser,
    searchUser,
    updateSearchUser,
    handleKeyUp,
    // getHandlerLogoOrCover,
    getProfilehandler,
    setProfileData,
    setCoverData,
    allData,
    restructuredData,
    loading,
    viewProjectHandlerById: (values) => {
      viewProjectHandlerById(values);
    },
    handleTempleId: (values) => {
      handleTempleId(values);
    },
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
