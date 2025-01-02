import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig"; 

const useProspects = (page, selectedOption, tempType, search = "") => {
  const [loading, setLoading] = useState(false);
  const [allProjectData, setAllProjectData] = useState({ video_templates: [], hvo_templates: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = {
        page,
        pageSize: 10,
        searchType: selectedOption,
        sheetType: tempType,
      };

      if (search !== "") {
        params.name = search;
      }

      try {
        const res = await axios({
          method: "GET",
          url: `${ApiConfig.prospects}/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res?.status === 200) {
          setAllProjectData(res.data);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, selectedOption, tempType, search]);

  const transformData = (data, type) => {
    return data?.map((item) => ({
      templateName: item.template_name,
      sheetName: item.sheet_name,
      user: item.user,
      status: item.status || "--",
      action: "View",
    }));
  };

  const getTransformedData = () => {
    const videoData = transformData(allProjectData.video_templates, "video");
    const hvoData = transformData(allProjectData.hvo_templates, "hvo");
    return { videoData, hvoData };
  };

  return {
    loading,
    allProjectData,
    getTransformedData,
  };
};

export default useProspects;
