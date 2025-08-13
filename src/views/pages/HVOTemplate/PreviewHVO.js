import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  makeStyles,
  Hidden,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import 'animate.css/animate.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import ApiConfig from "src/config/APIConfig";
import { IoIosArrowForward } from "react-icons/io";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { values } from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom";
import FullScreenLoader from "src/component/FullScreenLoader";
import { toast } from "react-toastify";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  main: {
    // width: "100%",
    "& .middleMain": {
      padding: "12px",
    },
    overflow: "hidden",
    "& .MuiToolbar-regular": {
      minHeight: "60px !important",
      height: "100%",
      padding: "10px 15px",
    },
    "& .heroSection": {
      marginTop: "100px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "30px", // Extra small screens
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "50px", // Small screens
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "75px", // Medium screens
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "100px", // Large screens
      },
      marginBottom: "20px",
      "& h1": {
        fontSize: "54px",
        color: "#0358AC",
      },
      "& h2": {
        marginTop: "16px",
        fontSize: "28px",
        color: "#152F40",
      },
      "& .MuiTypography-body1": {
        fontSize: "16px",
        color: "#152F40",
        marginTop: "16px",
      },
      "& img": {
        maxWidth: "100%",
        height: "350px",
      },
      "& .MuiButton-contained": {
        background: "#0358AC",
        color: "white",
        fontSize: "14px",
        fontWeight: 300,
        marginTop: "24px",
      },
      "& .iconsContainer": {
        color: "white",
        fontSize: "16px",
        fontWeight: 300,
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        width: "150px",
      },
      "& .icons": {
        padding: "10px",
        // background: "#0358AC",
      },
      "& .btn": {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "50px",
        alignItems: "baseline",
        "& .demobtn": {
          cursor: "pointer",
          textTransform: "none",
          display: "flex",
          alignItems: "end",
          gap: "10px",
          fontSize: "12px",
          lineHeight: "12px",
          textTransform: "uppercase",
        },
      },
    },
    "& .heroSection1": {
      marginTop: "100px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "30px", // Extra small screens
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "30px", // Small screens
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "30px", // Medium screens
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "30px", // Large screens
      },
      marginBottom: "20px",
      "& h1": {
        fontSize: "54px",
        color: "#0358AC",
      },
      "& h2": {
        marginTop: "16px",
        fontSize: "28px",
        color: "#152F40",
      },
      "& .MuiTypography-body1": {
        fontSize: "16px",
        color: "#152F40",
        marginTop: "16px",
      },
      "& img": {
        maxWidth: "100%",
        height: "350px",
      },
      "& .MuiButton-contained": {
        background: "#0358AC",
        color: "white",
        fontSize: "14px",
        fontWeight: 300,
        marginTop: "24px",
      },
      "& .iconsContainer": {
        color: "white",
        fontSize: "16px",
        fontWeight: 300,
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        width: "150px",
      },
      "& .icons": {
        padding: "10px",
        // background: "#0358AC",
      },
      "& .btn": {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "50px",
        alignItems: "baseline",
        "& .demobtn": {
          cursor: "pointer",
          textTransform: "none",
          display: "flex",
          alignItems: "end",
          gap: "10px",
          fontSize: "12px",
          lineHeight: "12px",
          textTransform: "uppercase",
        },
      },
    },
    "& .AppBarCss": {
      position: "static !important",
      "& .MuiAppBar-positionFixed": {
        position: "static !important",
      },
    },
  },

  floatingBannerContainer: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "30px 0",
  },
  floatingBannerScroller: {
    display: "flex",
    whiteSpace: "nowrap",
    animation: "$floatRightToLeft 30s linear infinite",
  },
  floatingBannerItem: {
    display: "inline-flex",
    padding: "0 20px",
    alignItems: "center",
  },
  "@keyframes floatRightToLeft": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-50%)",
    },
  },

  LandingSlider: {
    "& .slick-track": {
      display: "flex",
      gap: "60px",
      alignItems: "center",
      color: "white",
      whiteSpace: "nowrap",
      fontSize: "32px",
    },
    "& .slick-slide": {
      display: "inline-block", // Ensures items are inline
      float: "left",
      width: "auto !important", // Ensures items adjust their width
      height: "auto", // Allows for variable height based on content
    },
    "& .slick-list": {
      overflow: "hidden", // Prevent overflow issues
    },
  },
  banner2: {
    // marginTop: "100px",

    display: "flex",
    gap: "60px",
    alignItems: "center",

    color: "white",
    fontSize: "32px",
  },
  specificGridItem: {
    paddingLeft: "30px",
    paddingTop: "20px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingTop: 0,
    },
  },
}));

function PreviewHVO(props) {
  console.log("props: ", props);
  const { customerId, templateId } = useParams();
  const classes = useStyles();
  const [pageData, setPageData] = useState([]);
  const [filteredFooterSection, setFilteredFooterSection] = useState();
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const [tenant, setTenant] = useState("");
  const [accountData, setAccountData] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isCustomerPreviewRoute = location.pathname.includes("/preview-url");

  // Fetch data for the "/preview-hvo" route
  const fetchHVOPreviewData = async () => {
    const storedTemplateId = localStorage.getItem("templateId");
    console.log("storedTemplateId: ", storedTemplateId);

    if (storedTemplateId) {
      try {
        setLoading(true);
        const res = await axios({
          method: "GET",
          url: `${ApiConfig.previewHVOwithsheetdata}/${storedTemplateId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res?.status === 200 || res?.status === 201) {
          setLoading(false);
          const elementsList = res?.data;

          // Sort the elements by sequence value
          const sortedElements = [...elementsList].sort((a, b) => {
            // Convert sequence strings to numbers for proper comparison
            const seqA = parseInt(a?.values?.sequence) || 0;
            const seqB = parseInt(b?.values?.sequence) || 0;
            return seqA - seqB;
          });

          setPageData(sortedElements);
          const filteredFooter = sortedElements.filter(
            (item) => item?.sectionName === "FOOTER"
          );
          setFilteredFooterSection(filteredFooter);
        }
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch data for the "/preview-url/:customerId" route
  const fetchCustomerPreviewData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getHVO}/${customerId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          customerTemplateId: customerId,
        },
      });

      if (res?.status === 200 || res?.status === 201) {
        setLoading(false);
        console.log(res?.data);
        const elementsList = res?.data?.data_list;

        // Sort the elements by sequence value, same as in previewHVO route
        const sortedElements = [...elementsList].sort((a, b) => {
          // Convert sequence strings to numbers for proper comparison
          const seqA = parseInt(a?.values?.sequence) || 0;
          const seqB = parseInt(b?.values?.sequence) || 0;
          return seqA - seqB;
        });

        setPageData(sortedElements);
        setTenant(res?.data?.tenant_id);
        const filteredFooter = sortedElements.filter(
          (item) => item?.sectionName === "FOOTER"
        );
        setFilteredFooterSection(filteredFooter);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
    });

    if (isCustomerPreviewRoute) {
      fetchCustomerPreviewData();
    } else {
      fetchHVOPreviewData();
    }
  }, [isCustomerPreviewRoute, customerId]);

  useEffect(() => {
    // Only add the tracking script if we're on the customer preview route
    if (isCustomerPreviewRoute) {
      const script = document.createElement("script");
      script.src =
        "https://storage.googleapis.com/static-data-for-sdrc/scripts/tracker_d26331ec-e390-4c61-afb9-56795bb856cf.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isCustomerPreviewRoute]);

  const settings = {
    infinite: true,
    speed: 40000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    // variableWidth: true,
    pauseOnHover: false,
    prevArrow: <></>,
    nextArrow: <></>,
  };
  const settings2 = {
    prevArrow: <></>,
    nextArrow: <></>,
  };
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter1 = (index) => setHoveredIndex(index);
  const handleMouseLeave1 = () => setHoveredIndex(null);
  const [hoveredContact, setHoveredContact] = useState(false);
  const handleMouseEnterContact = () => setHoveredContact(true);
  const handleMouseLeaveContact = () => setHoveredContact(false);
  const [showVideo, setShowVideo] = useState(false);

  const getAccountData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.companyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });

      if (res?.data?.status === 200) {
        setLoading(false);
        const data = res?.data;
        setAccountData(data?.data);
        // setAccountId(res?.data?.data?.accountId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);
  return (
    <>
      {loading && <FullScreenLoader />}
      <div className={classes.main}>
        {pageData?.map((item, index) => (
          <Box className={classes.middleMain}>
            {item?.sectionName === "HEADER" && (
              <AppBar
                style={{ position: "static !important" }}
                className="AppBarCss"
              >
                <Container>
                  <Toolbar>
                    <img
                      src={item?.values?.company_logo}
                      alt="logo"
                      height={"60px"}
                      width={"100px"}
                    />
                    {item?.values?.header_logo && (
                      <>
                        <span
                          style={{
                            color: "#2f2f2f",
                            fontSize: "25px",
                            fontWeight: 500,
                            padding: "0px 15px",
                          }}
                        >
                          +
                        </span>
                        <img
                          src={item?.values?.header_logo}
                          alt="logo"
                          height={"60px"}
                          width={"60px"}
                        />
                      </>
                    )}
                  </Toolbar>
                </Container>
              </AppBar>
            )}
            {item?.sectionName === "HERO" && (
              <>
                <Container>
                  <Grid container className="heroSection1">
                    <Grid
                      item
                      sm={5}
                      xs={12}
                      style={{ paddingRight: "30px" }}
                      className="d-flex column alignstart"
                    >
                      {item?.values?.headline1 &&
                        item?.values?.headline1 !== "None" && (
                          <Typography
                            style={{
                              color: item?.values?.headline1_color,
                              fontWeight: 900,
                              wordBreak: "break-word",
                              fontSize: `${item?.values?.headline1_size}px`,
                            }}
                            variant="h3"
                          >
                            {item?.values?.headline1}
                          </Typography>
                        )}

                      {item?.values?.headline2 &&
                        item?.values?.headline2 !== "None" && (
                          <Typography
                            style={{
                              color: item?.values?.headline2_color,
                              fontSize: `${item?.values?.headline2_size}px`,
                              fontWeight: 800,
                              wordBreak: "break-word",
                              marginTop: "8px",
                              lineHeight: "35px",
                            }}
                            variant="h1"
                          >
                            {item?.values?.headline2}
                          </Typography>
                        )}

                      {item?.values?.body_text &&
                        item?.values?.body_text !== "None" && (
                          <Typography
                            style={{
                              color: item?.values?.body_text_color,
                              lineHeight: "30px",
                              wordBreak: "break-word",
                              fontSize: `${item?.values?.body_text_size}px`,
                            }}
                            variant="body1"
                            dangerouslySetInnerHTML={{
                              __html: item?.values?.body_text,
                            }}
                          />
                        )}

                      <Box className="btn">
                        <Button
                          style={{
                            color: item?.values?.cta_button_text_color,
                            backgroundColor: item?.values?.cta_button_color,
                            padding: "10px 30px",
                            textTransform: "none",
                          }}
                          onClick={() =>
                            window.open(
                              item?.values?.dynamic_url
                                ? item?.values?.dynamic_url
                                : item?.values?.dynamic_url
                            )
                          }
                          variant="contained"
                        >
                          {item?.values?.cta_button_text}
                        </Button>

                        {item?.values?.demo_button_text && (
                          <Button
                            className="demobtn"
                            style={{
                              backgroundColor: item?.values?.demo_button_color,
                              color: item?.values?.demo_button_text_color,
                              textTransform: "none",
                              fontSize: "14px",
                              border: `1px solid ${item?.values?.demo_button_color}`,
                              borderRadius: "4px",
                              padding: "13px 22px",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                            onClick={() =>
                              window.open(
                                item?.values?.dynamic_url_demo
                                  ? item?.values?.dynamic_url_demo
                                  : item?.values?.static_url
                              )
                            }
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {item?.values?.demo_button_text}
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      sm={7}
                      xs={12}
                      align="center"
                      // style={{ paddingTop: "50px" }}
                    >
                      {(() => {
                        const heroImg = item?.values?.hero_img;
                        const thumbnail = item?.values?.thumbnail;
                        
                        // Helper functions
                        const isVideoFile = (url) => {
                          return url && (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg"));
                        };
                        
                        const isYouTubeLink = (url) => {
                          return url && (url.includes("youtube.com/watch") || url.includes("youtu.be/"));
                        };
                        
                        const isGoogleDriveLink = (url) => {
                          return url && url.includes("drive.google.com");
                        };
                        
                        const getYouTubeEmbedUrl = (url) => {
                          let videoId;
                          if (url.includes("youtube.com/watch")) {
                            videoId = url.split("v=")[1]?.split("&")[0];
                          } else if (url.includes("youtu.be/")) {
                            videoId = url.split("youtu.be/")[1]?.split("?")[0];
                          }
                          return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
                        };
                        
                        const getGoogleDriveEmbedUrl = (url) => {
                          if (url.includes("/file/d/")) {
                            const fileId = url.split("/file/d/")[1]?.split("/")[0];
                            return `https://drive.google.com/file/d/${fileId}/preview`;
                          }
                          return url;
                        };

                        // Render logic for videos and images
                        if (heroImg && (isVideoFile(heroImg) || isYouTubeLink(heroImg) || isGoogleDriveLink(heroImg))) {
                          if (isVideoFile(heroImg)) {
                            return (
                              <div
                                style={{
                                  marginTop: "60px",
                                  maxWidth: "100%",
                                  width: "100%",
                                  height: "400px",
                                  backgroundColor: "#000",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                data-aos="zoom-in"
                              >
                                <video
                                  src={heroImg}
                                  poster={thumbnail}
                                  controls
                                  loop
                                  muted
                                  playsInline
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            );
                          } else if (isYouTubeLink(heroImg)) {
                            return (
                              <iframe
                                src={getYouTubeEmbedUrl(heroImg)}
                                title="YouTube video"
                                allowFullScreen
                                style={{
                                  marginTop: "60px",
                                  maxWidth: "100%",
                                  width: "100%",
                                  height: "400px",
                                  borderRadius: "10px",
                                  border: "none",
                                }}
                                data-aos="zoom-in"
                              />
                            );
                          } else if (isGoogleDriveLink(heroImg)) {
                            return (
                              <iframe
                                src={getGoogleDriveEmbedUrl(heroImg)}
                                title="Google Drive video"
                                allowFullScreen
                                style={{
                                  marginTop: "60px",
                                  maxWidth: "100%",
                                  width: "100%",
                                  height: "400px",
                                  borderRadius: "10px",
                                  border: "none",
                                }}
                                data-aos="zoom-in"
                              />
                            );
                          }
                        }
                        
                        // Default image rendering
                        return (
                          <img
                            src={
                              item?.values?.hero_img
                                ? item?.values?.hero_img
                                : item?.values?.static_image
                            }
                            alt="hero"
                            style={{
                              marginTop: "60px",
                              maxWidth: "100%",
                              borderRadius: "10px",
                            }}
                            data-aos="zoom-in"
                          />
                        );
                      })()}
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
            {item?.sectionName === "HIGHLIGHT_BANNER" && (
              <>
                <div
                  className={classes.floatingBannerContainer}
                  style={{ background: item?.values?.banner_color }}
                >
                  <div className={classes.floatingBannerScroller}>
                    {Array.from({ length: 18 }).map((_, index) => (
                      <div
                        className={classes.floatingBannerItem}
                        style={{
                          color: `${item?.values?.banner_text_color || "#FFF"}`,
                          fontSize: `${
                            item?.values?.banner_text_size || "16"
                          }px`,
                        }}
                        key={index}
                      >
                        {item?.values?.banner_text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADD VIDEO SECTION WITH CENTERED VIDEO */}
                {pageData?.find(
                  (videoItem) => videoItem?.sectionName === "HVO_VIDEO"
                ) && (
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "40px 0",
                    }}
                  >
                    <video
                      width="60%" // Adjust size as needed
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        display: "block",
                      }}
                    >
                      <source
                        src={
                          pageData?.find(
                            (videoItem) =>
                              videoItem?.sectionName === "HVO_VIDEO"
                          )?.values?.video
                        }
                        type="video/mp4"
                      />
                    </video>
                  </Container>
                )}
              </>
            )}

            {item?.sectionName === "RIGHT_TEXT_LEFT_IMAGE" && (
              <>
                <Container>
                  <Grid container className="heroSection">
                    <Grid item md={6} xs={12} align="center">
                      <img
                        style={{ aspectRatio: "3/2", objectFit: "contain" }}
                        src={
                          item?.values?.left_image_right_text
                            ? item?.values?.left_image_right_text
                            : item?.values?.static_image
                        }
                        alt="img"
                        data-aos="zoom-in"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      className={`${classes.specificGridItem} d-flex column alignstart`}
                    >
                      {item?.values?.headline1 &&
                        item?.values?.headline1 !== "None" && (
                          <Typography
                            variant="h1"
                            style={{
                              fontSize: `${item?.values?.headline1_size}px`,
                              color: item?.values?.headline1_color,
                            }}
                          >
                            {item?.values?.headline1}
                          </Typography>
                        )}

                      {item?.values?.headline2 &&
                        item?.values?.headline2 !== "None" && (
                          <Typography
                            variant="h2"
                            // data-aos="fade-up"
                            style={{
                              fontSize: `${item?.values?.headline2_size}px`,
                              color: item?.values?.headline2_color,
                              fontWeight: 700,
                            }}
                          >
                            {item?.values?.headline2}
                          </Typography>
                        )}

                      {item?.values?.body_text &&
                        item?.values?.body_text !== "None" && (
                          <Typography
                            variant="body1"
                            // data-aos="fade-up"
                            style={{
                              wordBreak: "break-word",
                              fontSize: `${item?.values?.body_text_size}px`,
                              color: item?.values?.body_text_color,
                              lineHeight: "30px",
                            }}
                          dangerouslySetInnerHTML={{
                              __html: item?.values?.body_text,
                            }}
                          />
                        )}

                      {item?.values?.cta_button_text && 
                        item?.values?.cta_button_text !== "None" && 
                        item?.values?.cta_url && 
                        item?.values?.cta_url !== "None" && (
                        <Button
                          variant="contained"
                          onClick={() => {
                            const url = item?.values?.cta_url.startsWith('http') 
                              ? item?.values?.cta_url 
                              : `https://${item?.values?.cta_url}`;
                            window.open(url, '_blank');
                          }}
                          style={{
                            backgroundColor: item?.values?.cta_button_bg_color || "#0358AC",
                            color: item?.values?.cta_button_text_color || "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            marginTop: "24px",
                            padding: "12px 24px",
                            textTransform: "none",
                            borderRadius: "6px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            '&:hover': {
                              opacity: 0.9,
                            }
                          }}
                        >
                          {item?.values?.cta_button_text}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
            {item?.sectionName === "HIGHLIGHT_BANNER2" && (
              <>
                <Box
                  style={{ background: item?.values?.banner_color }}
                  className={classes.banner2}
                >
                  <Container
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                    }}
                  >
                    {" "}
                    {item?.values?.banner_text &&
                      item?.values?.banner_text !== "None" && (
                        <Typography
                          variant="h3"
                          style={{
                            fontWeight: 700,
                            color: item?.values?.banner_text_color,
                            fontSize: `${
                              item?.values?.banner2_text_size || "30"
                            }px`,
                          }}
                          display="flex"
                          key={index}
                        >
                          {item?.values?.banner_text}
                        </Typography>
                      )}
                    <a
                      href={
                        item?.values?.static_url
                          ? item?.values?.static_url
                          : item?.values?.static_url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        style={{
                          backgroundColor: item?.values?.cta_button_color,
                          fontSize: "12px",
                          fontWeight: 200,
                          padding: "10px 20px",
                          display: "flex",
                          whiteSpace: "nowrap",
                          color: item?.values?.banner_button_text_color,
                        }}
                      >
                        {item?.values?.cta_button_text}
                      </Button>
                    </a>
                  </Container>
                </Box>
              </>
            )}
            {item?.sectionName === "LEFT_TEXT_RIGHT_IMAGE" && (
              <>
                <Container>
                  <Grid container className="heroSection">
                    <Grid
                      item
                      sm={6}
                      xs={12}
                      className="d-flex column alignstart"
                      style={{ paddingRight: "30px" }}
                    >
                      {item?.values?.headline1 &&
                        item?.values?.headline1 !== "None" && (
                          <Typography
                            variant="h3"
                            // data-aos="fade-up"
                            style={{
                              fontSize: `${item?.values?.headline1_size}px`,
                              color: item?.values?.headline1_color,
                              fontWeight: 900,
                              lineHeight: "30px",
                            }}
                          >
                            {item?.values?.headline1}
                          </Typography>
                        )}

                      {item?.values?.headline2 &&
                        item?.values?.headline2 !== "None" && (
                          <Typography
                            variant="h1"
                            // data-aos="fade-up"
                            style={{
                              fontSize: `${item?.values?.headline2_size}px`,
                              color: item?.values?.headline2_color,
                              fontWeight: 700,
                              paddingTop:
                                item?.values?.headline1 &&
                                item?.values?.headline1 !== "None"
                                  ? "10px"
                                  : "0",
                            }}
                          >
                            {item?.values?.headline2}
                          </Typography>
                        )}

                      {item?.values?.body_text &&
                        item?.values?.body_text !== "None" && (
                          <Typography
                            variant="body1"
                            // data-aos="fade-up"
                            style={{
                              wordBreak: "break-word",
                              fontSize: `${item?.values?.body_text_size}px`,
                              color: item?.values?.body_text_color,
                              lineHeight: "30px",
                            }}
                          dangerouslySetInnerHTML={{
                              __html: item?.values?.body_text,
                            }}
                          />
                        )}

                      {item?.values?.cta_button_text && 
                        item?.values?.cta_button_text !== "None" && 
                        item?.values?.cta_url && 
                        item?.values?.cta_url !== "None" && (
                        <Button
                          variant="contained"
                          onClick={() => {
                            const url = item?.values?.cta_url.startsWith('http') 
                              ? item?.values?.cta_url 
                              : `https://${item?.values?.cta_url}`;
                            window.open(url, '_blank');
                          }}
                          style={{
                            backgroundColor: item?.values?.cta_button_bg_color || "#0358AC",
                            color: item?.values?.cta_button_text_color || "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            marginTop: "24px",
                            padding: "12px 24px",
                            textTransform: "none",
                            borderRadius: "6px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            '&:hover': {
                              opacity: 0.9,
                            }
                          }}
                        >
                          {item?.values?.cta_button_text}
                        </Button>
                      )}
                    </Grid>
                    <Grid item sm={6} xs={12} align="center">
                      <img
                        src={
                          item?.values?.left_text_right_image_url
                            ? item?.values?.left_text_right_image_url
                            : item?.values?.static_image
                        }
                        alt="img"
                        data-aos="zoom-in"
                      />
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}

            {item?.sectionName === "FOOTER" && (
              <>
                <Box
                  style={{
                    backgroundColor:
                      item?.values?.footer_background_color || "#ffffff",
                    padding: "10px 0px",
                  }}
                >
                  <Container>
                    <Grid
                      style={{
                        marginTop: "40px",
                        marginBottom: "40px",
                      }}
                      container
                      className="heroSection"
                    >
                      <Grid item sm={4} xs={12}>
                        <Typography
                          variant="h2"
                          style={{
                            fontSize: `${
                              item?.values?.footer_heading_size || "18"
                            }px`,
                            color:
                              item?.values?.footer_text_heading_color ||
                              "#000000",
                            marginBottom: "30px",
                          }}
                        >
                          CONTACT
                        </Typography>
                        <span
                          variant="body1"
                          style={{
                            color: hoveredContact
                              ? item?.values?.footer_text_hover_color ||
                                "#666666"
                              : item?.values?.footer_text_color || "#333333",
                            marginTop: "32px",
                            fontSize: `${
                              item?.values?.footer_text_size || "14"
                            }px`,
                            cursor: "default",
                          }}
                          onMouseEnter={handleMouseEnterContact}
                          onMouseLeave={handleMouseLeaveContact}
                        >
                          Sales:{" "}
                          {item?.values?.footerLinks?.footerContact || ""}
                        </span>

                        <Box
                          className="iconsContainer"
                          style={{ marginBottom: "20px" }}
                        >
                          {" "}
                          {item?.values?.facebook_link && (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={item?.values?.facebook_link}
                              aria-label="Facebook"
                            >
                              <FaFacebookF
                                style={{
                                  backgroundColor:
                                    item?.values
                                      ?.social_icon_background_color ||
                                    "#000000",
                                  color:
                                    item?.values?.social_icon_color ||
                                    "#ffffff",
                                }}
                                className="icons"
                              />
                            </a>
                          )}
                          {item?.values?.linkedin_link && (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={item?.values?.linkedin_link}
                              aria-label="LinkedIn"
                            >
                              <FaLinkedinIn
                                style={{
                                  backgroundColor:
                                    item?.values
                                      ?.social_icon_background_color ||
                                    "#000000",
                                  color:
                                    item?.values?.social_icon_color ||
                                    "#ffffff",
                                }}
                                className="icons"
                              />
                            </a>
                          )}
                          {item?.values?.instagram_link && (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={item?.values?.instagram_link}
                              aria-label="Instagram"
                            >
                              <FaInstagram
                                style={{
                                  backgroundColor:
                                    item?.values
                                      ?.social_icon_background_color ||
                                    "#000000",
                                  color:
                                    item?.values?.social_icon_color ||
                                    "#ffffff",
                                }}
                                className="icons"
                              />
                            </a>
                          )}
                        </Box>

                        {/* Footer links as buttons in a single row */}
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          {(() => {
                            // Handle both string JSON and direct array formats
                            let footerLinks = [];
                            try {
                              if (item?.values?.footer_links) {
                                if (
                                  typeof item.values.footer_links === "string"
                                ) {
                                  footerLinks = JSON.parse(
                                    item.values.footer_links
                                  );
                                } else if (
                                  Array.isArray(item.values.footer_links)
                                ) {
                                  footerLinks = item.values.footer_links;
                                }
                              }
                            } catch (e) {
                              console.error("Error parsing footer links:", e);
                              footerLinks = [];
                            }

                            return footerLinks.map((link, index) => (
                              <Button
                                key={index}
                                variant="contained"
                                href={link.url}
                                target="_blank"
                                style={{
                                  backgroundColor:
                                    hoveredButtonIndex === index
                                      ? item?.values?.footer_text_hover_color ||
                                        "#666666"
                                      : item?.values
                                          ?.social_icon_background_color ||
                                        "#000000",
                                  color:
                                    item?.values?.social_icon_color ||
                                    "#ffffff",
                                  fontSize: `${
                                    item?.values?.footer_text_size &&
                                    parseInt(item?.values?.footer_text_size) > 0
                                      ? item?.values?.footer_text_size
                                      : "10"
                                  }px`,
                                  textTransform: "none",
                                  padding: "6px 12px",
                                  borderRadius: "4px",
                                  minWidth: "auto",
                                }}
                                onMouseEnter={() =>
                                  setHoveredButtonIndex(index)
                                }
                                onMouseLeave={() => setHoveredButtonIndex(null)}
                              >
                                {link.name}
                              </Button>
                            ));
                          })()}
                        </Box>
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <Typography
                          variant="h2"
                          style={{
                            fontSize: `${
                              item?.values?.footer_heading_size || "18"
                            }px`,
                            color:
                              item?.values?.footer_text_heading_color ||
                              "#000000",
                          }}
                        >
                          LEGAL
                        </Typography>
                        <Box
                          style={{ display: "flex", flexDirection: "column" }}
                          marginTop={"26px"}
                        >
                          {/* Legacy code for footerlinks */}
                          {(() => {
                            const footerlinks =
                              item?.values?.footerLinks?.footerlinks;
                            if (
                              Array.isArray(footerlinks) &&
                              footerlinks.length > 0
                            ) {
                              return footerlinks.map((item1, index) => (
                                <span
                                  key={index}
                                  style={{
                                    marginBottom: "8px",
                                    lineHeight: "1.5",
                                  }}
                                >
                                  <a
                                    href={item1?.trackingLinkName}
                                    target="_blank"
                                    style={{
                                      color:
                                        hoveredIndex === index
                                          ? item?.values
                                              ?.footer_text_hover_color ||
                                            "#666666"
                                          : item?.values?.footer_text_color ||
                                            "#333333",
                                      fontSize: `${
                                        item?.values?.footer_text_size &&
                                        parseInt(
                                          item?.values?.footer_text_size
                                        ) > 0
                                          ? item?.values?.footer_text_size
                                          : "10"
                                      }px`,
                                      textDecoration: "none",
                                    }}
                                    onMouseEnter={() =>
                                      handleMouseEnter1(index)
                                    }
                                    onMouseLeave={handleMouseLeave1}
                                  >
                                    {item1?.link}
                                  </a>
                                </span>
                              ));
                            }
                            return null;
                          })()}
                        </Box>

                        {(item?.values?.accountName ||
                          item?.values?.account_name) &&
                          item?.values?.account_name !== "None" && (
                            <Typography
                              variant="body1"
                              style={{
                                color:
                                  item?.values?.benchmark_color || "#333333",
                                fontSize: `${
                                  item?.values?.benchmar_size || "14"
                                }px`,
                                fontWeight: 400,
                              }}
                            >
                              {item?.values?.accountName ||
                                item?.values?.account_name ||
                                "Company"}
                              . All rights reserved.
                            </Typography>
                          )}
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            {/* Find the header section to get logos */}
                            {(() => {
                              const headerSection = pageData?.find(
                                (headerItem) => headerItem?.sectionName === "HEADER"
                              );
                              
                              if (!headerSection) return null;
                              
                              return (
                                <>
                                  {headerSection?.values?.company_logo && (
                                    <img
                                      src={headerSection.values.company_logo}
                                      alt="Company Logo"
                                      style={{
                                        height: "40px",
                                        width: "auto",
                                        maxWidth: "80px",
                                        objectFit: "contain",
                                      }}
                                    />
                                  )}
                                  {headerSection?.values?.header_logo && (
                                    <>
                                      <span
                                        style={{
                                          color: item?.values?.footer_text_color || "#666666",
                                          fontSize: "20px",
                                          fontWeight: 500,
                                        }}
                                      >
                                        +
                                      </span>
                                      <img
                                        src={headerSection.values.header_logo}
                                        alt="Partner Logo"
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </>
                                  )}
                                </>
                              );
                            })()}
                          </Box>
                          
                          {/* Powered by text */}
                          <Typography
                            variant="body2"
                            style={{
                              color: item?.values?.footer_text_color || "#666666",
                              fontSize: `${item?.values?.footer_text_size || "12"}px`,
                              fontStyle: "italic",
                              opacity: 0.8,
                            }}
                          >
                            Powered by
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              </>
            )}
          </Box>
        ))}
      </div>
    </>
  );
}

export default PreviewHVO;
