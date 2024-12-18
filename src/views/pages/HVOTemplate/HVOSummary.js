import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { AiTwotoneDelete } from "react-icons/ai";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";

const useStyles = makeStyles((theme) => ({
  main: {
    "& .MuiButton-outlined": {
      border: "1px solid #0358AC",
      borderRadius: "8px",
      color: "#152F40",
    },
  },
  elementBox: {
    border: "1px solid #ECECEC",
    borderRadius: "8px",
    padding: "16px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  img: {
    width: "90%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  placeholderBox: {
    width: "90%",
    height: "180px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#888",
  },
  deleteButton: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    fontSize: "48px",
    color: "red",
    padding: "8px",
  },
  dialog: {
    "& .MuiPaper-rounded": { borderRadius: "16px" },
    "& h5, & h4": { textAlign: "center", color: "#152F40" },
    "& .MuiDialogActions-root": { justifyContent: "center", gap: "20px" },
  },
}));

function HVOSummary({ linkObject, reload, price, balance }) {
  const classes = useStyles();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [creationProcess, setCreationProcess] = useState("");
  const templateId = new URLSearchParams(window.location.search).get(
    "templateId"
  );

  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleProceed = () => {
    createHVO();
    handleClosePopup();
  };

  // Helper function to get section label
  const getSectionLabel = (type, index, sectionCount) => {
    const sectionLabels = {
      header: `Header Section ${index + 1}`,
      hero: `Hero Section ${index + 1}`,
      highlightBanner: `Highlight Banner Section ${index + 1}`,
      rightTextLeftImage: `Right Text Left Image Section ${index + 1}`,
      leftTextRightImage: `Left Text Right Image Section ${index + 1}`,
      footer: `Footer Section ${index + 1}`,
    };

    return (
      sectionLabels[type] ||
      `${type.charAt(0).toUpperCase() + type.slice(1)} Section ${index + 1}`
    );
  };

  // Helper function to check if image exists
  const hasValidImage = (section) => {
    const imageFields = ["static_image", "company_logo", "hero_img"];

    return imageFields.some(
      (field) =>
        section[field] &&
        section[field].trim() !== "" &&
        !section[field].includes("[") // Exclude placeholder strings
    );
  };

  // Helper function to get image preview
  const getImagePreview = (section) => {
    const imageFields = ["static_image", "company_logo", "hero_img"];

    for (let field of imageFields) {
      if (
        section[field] &&
        section[field].trim() !== "" &&
        !section[field].includes("[")
      ) {
        return section[field];
      }
    }

    return null;
  };

  useEffect(() => {
    const mergeSections = (sectionsObject) => {
      const allSections = [];

      // Define the order of sections as they appear in the JSON
      const sectionTypes = [
        "headerSections",
        "heroSections",
        "highlightBannerSections",
        "rightTextLeftImageSections",
        "highlightBanner2Sections",
        "leftTextRightImageSections",
        "footerSections",
      ];

      // Iterate through section types in order
      sectionTypes.forEach((sectionKey) => {
        const sections = sectionsObject[sectionKey];
        if (Array.isArray(sections)) {
          const sectionType = sectionKey.replace(/Sections$/, "");
          sections.forEach((item, index) => {
            allSections.push({
              ...item,
              type: sectionType,
            });
          });
        }
      });

      return allSections;
    };

    const mergedSections = mergeSections(linkObject);

    // Count sections by type to help with consistent labeling
    const sectionTypeCounts = {};
    const labeledSections = mergedSections.map((section) => {
      // Initialize count for this section type if not exists
      sectionTypeCounts[section.type] =
        (sectionTypeCounts[section.type] || 0) + 1;

      // Get the index for this specific type
      const typeIndex = sectionTypeCounts[section.type] - 1;

      return {
        ...section,
        label: getSectionLabel(
          section.type,
          typeIndex,
          sectionTypeCounts[section.type]
        ),
        hasImage: hasValidImage(section),
      };
    });

    setSections(labeledSections);
  }, [linkObject]);

  const handleDeleteSection = async () => {
    setLoading(true);
    try {
      await axios.delete(ApiConfig.deleteSectionById, {
        headers: { token: localStorage.getItem("token") },
        params: { templateId, sectionId },
      });
      setSections((prev) => prev.filter((section) => section.id !== sectionId));
      toast.success("Section deleted successfully");
      reload();
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Failed to delete section");
    } finally {
      setLoading(false);
      setDeleteOpen(false);
    }
  };

  const createHVO = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: `${ApiConfig.createHVO}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const status = res?.status;

      if (status === 200 || status === 201) {
        toast.success("HVO Created Successfully");
        console.log(res?.data);
        // Refresh the HVO template status
        getHVOTemplate();
      } else if (status === 205) {
        toast.error(res?.data?.message);
      } else if (status === 400) {
        toast.error(res?.data?.message || "Bad Request");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getHVOTemplate = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.hvoStatus}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setCreationProcess(res?.data);
        console.log(
          "ssdjfsopufeosdfu7r9wr0+++++++++++++++++++=",
          creationProcess
        );
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHVOTemplate();
  }, []);

  // const getHVOTemplate = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios({
  //       method: "GET",
  //       url: ApiConfig.getHVO,
  //       headers: {
  //         Authorization: `Beaerer ${localStorage.getItem("token")}`,
  //       },
  //       params: { hvoTemplateId: templateId },
  //     });
  //     if (res?.status === 200) {
  //       setCreationProcess(res?.data?.data?.templateData?.creationStatus);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getHVOTemplate();
  // }, []);

  return (
    <div className={classes.main}>
      {loading && <FullScreenLoader />}
      <Grid container spacing={3}>
        {sections.map((item, i) => (
          <Grid item md={6} sm={6} xs={12} key={item.id || i}>
            <div>
              <Box className={classes.elementBox}>
                <Typography variant="h6" style={{ color: "#0358AC" }}>
                  {item.label}
                </Typography>

                {item.hasImage ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    src={getImagePreview(item)}
                    alt={`${item.label} Image`}
                    className={classes.img}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={classes.placeholderBox}>
                    No Image Available
                  </div>
                )}

                <IconButton
                  className={classes.deleteButton}
                  onClick={() => {
                    setSectionId(item.id);
                    setDeleteOpen(true);
                  }}
                >
                  <AiTwotoneDelete color="red" />
                </IconButton>
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>

      {sections.length > 0 && (
        <Grid container justifyContent="flex-end" style={{ marginTop: "16px" }}>
          <Button
            onClick={handleOpenPopup}
            variant="outlined"
            style={{ height: "48px" }}
            disabled={creationProcess}
          >
            {creationProcess ? "Published" : "Create HVO"}
          </Button>
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>Confirm HVO Creation</DialogTitle>
            <DialogContent>
              <p>Your balance: ${balance.toFixed(2)}</p>
              <p>Total price for generating HVOs: ${price.toFixed(4)}</p>
              <p>Please confirm if you want to proceed</p>
              <p>
                {balance >= price
                  ? "You have sufficient balance to create the videos."
                  : "Your balance is insufficient to create the videos."}
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClosePopup}
                style={{
                  backgroundColor: "#044D80",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                style={{
                  backgroundColor: "#044D80",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "15px",
                }}
                disabled={balance < price}
              >
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}

      <Dialog
        open={deleteOpen}
        className={classes.dialog}
        onClose={() => setDeleteOpen(false)}
      >
        <DialogTitle>
          <Typography variant="h5">Warning: Permanent Deletion</Typography>
          <Close onClick={() => setDeleteOpen(false)} />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4">
            This action is irreversible. Confirm deletion to permanently remove
            the section.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteSection}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HVOSummary;
