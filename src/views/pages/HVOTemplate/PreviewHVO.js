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
import { useParams } from "react-router-dom";
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
  LandingSlider: {
    // marginTop: "100px",
    "& .slick-track": {
      display: "flex",
      gap: "60px",
      alignItems: "center",
      // height: "100px !important",
      // background: "#0358AC",
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
    // height: "100px !important",
    // background: "#0358AC",
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

function PreviewHVO(location) {
  console.log("location: ", location);
  const { customerId, templateId } = useParams();
  const classes = useStyles();
  const [pageData, setPageData] = useState([]);
  const [filteredFooterSection, setFilteredFooterSection] = useState();
  console.log("filteredFooterSection: ", filteredFooterSection);
  console.log(useParams, "useParams");
  console.log(pageData, "pageData");
  const [accountData, setAccountData] = useState("");

  const iconMap = {
    Facebook: FaFacebookF,
    Linkedin: FaLinkedinIn,
    Instagram: FaInstagram,
    Twitter: FaTwitter,
  };

  // useEffect(() => {
  //   if (location?.location?.state && location?.location?.state?.linkObject) {
  //     console.log(location.location?.state.linkObject, "state linkObject");
  //     setPageData(location?.location?.state?.linkObject);
  //     const filteredFooter = location?.location?.state?.linkObject?.filter(
  //       (item) => item?.sectionName == "FOOTER"
  //     );
  //     setFilteresdFooterSection(filteredFooter);
  //   }
  //   AOS.init();
  //   // fetchPreviewData();
  // }, [location]);
  // AOS.init({
  //   duration: 800, // Duration of the animation
  //   offset: 100, // Offset (in pixels) from the top of the element when animation starts
  // });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const storedTemplateId = localStorage.getItem("templateId"); // Get templateId from localStorage
      console.log("storedTemplateId: ", storedTemplateId);

      if (storedTemplateId) {
        try {
          setLoading(true);
          const res = await axios({
            method: "POST",
            url: ApiConfig.previewHVOwithsheetdata,
            headers: {
              token: `${localStorage.getItem("token")}`,
            },
            params: {
              hvoTemplateId: storedTemplateId,
            },
          });
          if (res?.data?.status === 200 || res?.data?.status === 201) {
            setLoading(false);
            const elementsList = res?.data?.data?.dataList;
            setPageData(elementsList);
            const filteredFooter = elementsList.filter(
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

    fetchData();

    AOS.init({
      duration: 800,
      offset: 100,
    });
  }, []);

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
    // infinite: true,
    // speed: 10000,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // cssEase: "linear",
    // variableWidth: true,
    // pauseOnHover: false,
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
                      src={accountData?.accountDetails?.accountLogo}
                      alt="logo"
                      height={"60px"}
                      width={"100px"}
                    />
                    {item?.values?.headerLogo && (
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
                          src={item?.values?.headerLogo}
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
                      <Typography
                        style={{
                          color: item?.values?.headline1Color,
                          fontWeight: 900,
                          wordBreak: "break-word",
                          fontSize: `${item?.values?.headline1Size}px`,
                        }}
                        variant="h3"
                        // data-aos="fade-up"
                      >
                        {/* <span
                          style={{
                            color: item?.values?.headline1Color,
                            fontWeight: 300,
                          }}
                        >
                          Welcome{" "}
                        </span> */}
                        {item?.values?.headline1}
                      </Typography>
                      <Typography
                        style={{
                          color: item?.values?.headline2Color,
                          fontSize: `${item?.values?.headline2Size}px`,
                          fontWeight: 800,
                          wordBreak: "break-word",
                          marginTop: "8px",
                          lineHeight: "35px",
                        }}
                        variant="h1"
                        // data-aos="fade-up"
                      >
                        {item?.values?.headline2}
                      </Typography>
                      <Typography
                        style={{
                          color: item?.values?.bodyTextColor,
                          lineHeight: "30px",
                          wordBreak: "break-word",
                          fontSize: `${item?.values?.bodyTextSize}px`,
                        }}
                        variant="body1"
                        // data-aos="fade-up"
                      >
                        {item?.values?.bodyText}
                      </Typography>
                      <Box className="btn">
                        <Button
                          style={{
                            color: item?.values?.ctaButtonTextColor,
                            backgroundColor: item?.values?.ctaButtonColor,
                            padding: "10px 30px",
                            textTransform: "none",
                          }}
                          onClick={() =>
                            window.open(
                              item?.values?.dynamicUrl
                                ? item?.values?.dynamicUrl
                                : item?.values?.staticUrl
                            )
                          }
                          variant="contained"
                          // data-aos="fade-up"
                        >
                          {item?.values?.ctaButtonText}
                        </Button>

                        {item?.values?.demoButtonText && (
                          <Typography
                            className="demobtn"
                            style={{
                              color: hovered
                                ? item?.values?.demoButtonColor
                                : item?.values?.demoButtonTextColor,
                              textTransform: "none",
                              fontSize: "14px",
                            }}
                            onClick={() =>
                              window.open(
                                item?.values?.dynamicUrlDemo
                                  ? item?.values?.dynamicUrlDemo
                                  : item?.values?.staticUrlDemo
                              )
                            }
                            variant="text"
                            // data-aos="fade-up"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {item?.values?.demoButtonText}
                            {/* {"  "}
                            <IoIosArrowForward /> */}
                          </Typography>
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
                      <img
                        src={
                          item?.values?.heroImg
                            ? item?.values?.heroImg
                            : item?.values?.staticImage
                        }
                        alt="img"
                        data-aos="zoom-in"
                        style={{ marginTop: "60px" }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
            {item?.sectionName === "HIGHLIGHT_BANNER" && (
              <>
                {item?.values?.scorll == true ? (
                  <Slider
                    {...settings}
                    style={{ background: item?.values?.bannerColor }}
                    className={classes.LandingSlider}
                  >
                    {}
                    {Array.from({ length: 18 }).map((_, index) => (
                      <Box
                        sx={{
                          color: `${
                            item?.values?.bannerTextColor || "#FFF"
                          } !important`,
                          fontSize: `${
                            item?.values?.bannerTextSize || "16"
                          }px !important`,
                          paddingTop: "30px",
                          paddingBottom: "30px",
                        }}
                        display="flex"
                        key={index}
                      >
                        {item?.values?.bannerText}
                      </Box>
                    ))}
                  </Slider>
                ) : (
                  <Slider
                    {...settings2}
                    style={{ background: item?.values?.bannerColor }}
                    className={classes.LandingSlider}
                  >
                    {}
                    {Array.from({ length: 18 }).map((_, index) => (
                      <Box
                        sx={{
                          color: `${
                            item?.values?.bannerTextColor || "#FFF"
                          } !important`,
                          fontSize: `${
                            item?.values?.bannerTextSize || "16"
                          }px !important`,
                          paddingTop: "30px",
                          paddingBottom: "30px",
                        }}
                        display="flex"
                        key={index}
                      >
                        {item?.values?.bannerText}
                      </Box>
                    ))}
                  </Slider>
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
                          item?.values?.leftImageRightText
                            ? item?.values?.leftImageRightText
                            : item?.values?.staticImage
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
                      <Typography
                        variant="h1"
                        // data-aos="fade-up"
                        style={{
                          fontSize: `${item?.values?.headline1Size}px`,
                          color: item?.values?.headline1Color,
                        }}
                      >
                        {item?.values?.headline1}
                      </Typography>
                      <Typography
                        variant="h2"
                        // data-aos="fade-up"
                        style={{
                          fontSize: `${item?.values?.headline2Size}px`,
                          color: item?.values?.headline2Color,
                          fontWeight: 700,
                        }}
                      >
                        {item?.values?.headline2}
                      </Typography>
                      <Typography
                        variant="body1"
                        // data-aos="fade-up"
                        style={{
                          wordBreak: "break-word",
                          fontSize: `${item?.values?.bodyTextSize}px`,
                          color: item?.values?.bodyTextColor,
                          lineHeight: "30px",
                        }}
                      >
                        {" "}
                        {item?.values?.bodyText}
                      </Typography>

                      {/* <Typography
                      variant="body1"
                      data-aos="fade-up"
                      style={{ wordBreak: "break-word" }}
                    >
                      {item?.bodyText}
                    </Typography> */}
                      {/* <Button
                      variant="contained"
                      data-aos="fade-up"
                      style={{
                        backgroundColor: item?.values?.ctaButtonColor,
                        color: item?.values?.ctaButtonTextColor,
                      }}
                      onClick={() =>
                        window.open(
                          item?.values?.staticUrl
                            ? item?.values?.staticUrl
                            : item?.values?.dynamcUrl
                        )
                      }
                    >
                      {item?.values?.ctaButtonText}
                    </Button> */}
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
            {item?.sectionName === "HIGHLIGHT_BANNER2" && (
              <>
                <Box
                  style={{ background: item?.values?.bannerColor }}
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
                    <Typography
                      variant="h3"
                      style={{
                        fontWeight: 700,
                        color: item?.values?.bannerTextColor,
                        fontSize: `${item?.values?.banner2TextSize || "30"}px`,
                      }}
                      display="flex"
                      key={index}
                    >
                      {item?.values?.bannerText}
                    </Typography>
                    <a
                      href={
                        item?.values?.staticUrl
                          ? item?.values?.staticUrl
                          : item?.values?.dynamicUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        style={{
                          backgroundColor: item?.values?.ctaButtonColor,
                          fontSize: "12px",
                          fontWeight: 200,
                          padding: "10px 20px",
                          display: "flex",
                          whiteSpace: "nowrap",
                          color: item?.values?.bannerButtonTextColor,
                        }}
                      >
                        {item?.values?.ctaButtonText}
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
                      <Typography
                        variant="h3"
                        // data-aos="fade-up"
                        style={{
                          fontSize: `${item?.values?.headline1Size}px`,
                          color: item?.values?.headline1Color,
                          fontWeight: 900,
                          lineHeight: "30px",
                        }}
                      >
                        {item?.values?.headline1}
                      </Typography>
                      <Typography
                        variant="h1"
                        // data-aos="fade-up"
                        style={{
                          fontSize: `${item?.values?.headline2Size}px`,
                          color: item?.values?.headline2Color,
                          fontWeight: 700,
                          paddingTop: "10px",
                        }}
                      >
                        {item?.values?.headline2}
                      </Typography>
                      <Typography
                        variant="body1"
                        // data-aos="fade-up"
                        style={{
                          wordBreak: "break-word",
                          fontSize: `${item?.values?.bodyTextSize}px`,
                          color: item?.values?.bodyTextColor,
                          lineHeight: "30px",
                        }}
                      >
                        {item?.values?.bodyText}
                      </Typography>

                      {/* <Button
                      onClick={() =>
                        window.open(
                          item?.values?.staticUrl
                            ? item?.values?.staticUrl
                            : item?.values?.dynamicUrl
                        )
                      }
                      style={{
                        backgroundColor: item?.values?.ctaButtonColor,
                        color: item?.values?.ctaButtonTextColor,
                      }}
                      variant="contained"
                      data-aos="fade-up"
                    >
                      {item?.values?.ctaButtonText}
                    </Button> */}
                    </Grid>
                    <Grid item sm={6} xs={12} align="center">
                      <img
                        src={
                          item?.values?.leftTextRightImageUrl
                            ? item?.values?.leftTextRightImageUrl
                            : item?.values?.staticImage
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
                    backgroundColor: item?.values?.footerBackgroundColor,
                    padding: "10px 0px",
                  }}
                >
                  <Container>
                    <Grid
                      style={{
                        // backgroundColor: "#173057",
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
                            fontSize: `${item?.values?.footerHeadingSize}px`,
                            color: item?.values?.footerTextHeadingColor,
                            marginBottom: "30px",
                          }}
                        >
                          CONTACT
                        </Typography>
                        <span
                          variant="body1"
                          style={{
                            color: hoveredContact
                              ? item?.values?.footerTextHoverColor
                              : item?.values?.footerTextColor,
                            marginTop: "32px",
                            fontSize: `${item?.values?.footerTextSize}px`,
                            cursor: "default",
                          }}
                          onMouseEnter={handleMouseEnterContact}
                          onMouseLeave={handleMouseLeaveContact}
                        >
                          Sales: {item?.values?.footerLinks?.footerContact}
                        </span>
                        {/* <Typography
                        variant="body1"
                        style={{
                          color: item?.values?.leftFooterTextColor,
                          marginTop: "12px",
                          // fontSize:
                          //   typeof item?.headline1Size === "number"
                          //     ? `${item.headline1Size}px`
                          //     : item?.headline1Size,
                        }}
                      >
                        {item?.values?.leftFooterText2}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          color: item?.values?.leftFooterTextColor,
                          marginTop: "12px",
                          // fontSize:
                          //   typeof item?.headline1Size === "number"
                          //     ? `${item.headline1Size}px`
                          //     : item?.headline1Size,
                        }}
                      >
                        {item?.values?.leftFooterText3}
                      </Typography> */}

                        <Box className="iconsContainer">
                          {" "}
                          {/* {item?.values?.socialIcons?.map((data, index) => (
                          {data?.socialMediaIcon1=="Instagram"?<FaInstagram className="icons" />:data?.socialMediaIcon1==?<FaLinkedinIn className="icons" />}
                        ))} */}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              item?.values?.footerLinks?.facebooklink || "#"
                            }
                            aria-label="Instagram"
                          >
                            <FaFacebookF
                              style={{
                                backgroundColor:
                                  item?.values?.socialIconBackgroundColor,
                                color: item?.values?.socialIconColor,
                              }}
                              className="icons"
                            />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              item?.values?.footerLinks?.linkedinlink || "#"
                            }
                            aria-label="Instagram"
                          >
                            <FaLinkedinIn
                              style={{
                                backgroundColor:
                                  item?.values?.socialIconBackgroundColor,
                                color: item?.values?.socialIconColor,
                              }}
                              className="icons"
                            />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              item?.values?.footerLinks?.instagramlink || "#"
                            }
                            aria-label="Instagram"
                          >
                            <FaInstagram
                              style={{
                                backgroundColor:
                                  item?.values?.socialIconBackgroundColor,
                                color: item?.values?.socialIconColor,
                              }}
                              className="icons"
                            />
                          </a>
                        </Box>
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <Typography
                          variant="h2"
                          style={{
                            fontSize: `${item?.values?.footerHeadingSize}px`,
                            color: item?.values?.footerTextHeadingColor,
                          }}
                        >
                          LEGAL
                        </Typography>
                        <Box
                          style={{ display: "flex", flexDirection: "column" }}
                          marginTop={"26px"}
                        >
                          {item?.values?.footerLinks?.footerlinks?.map(
                            (item1, index) => (
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
                                        ? item?.values?.footerTextHoverColor
                                        : item?.values?.footerTextColor,
                                    fontSize: `${item?.values?.footerTextSize}px`,
                                    textDecoration: "none",
                                  }}
                                  onMouseEnter={() => handleMouseEnter1(index)}
                                  onMouseLeave={handleMouseLeave1}
                                >
                                  {item1?.link}
                                </a>
                              </span>
                            )
                          )}
                        </Box>

                        <Typography
                          variant="body1"
                          style={{
                            color: item?.values?.benchmarkColor,
                            fontSize: `${item?.values?.benchmarkSize}px`,
                            fontWeight: 400,
                          }}
                        >
                          {item?.values?.accountName}. All rights reserved.
                        </Typography>
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <Hidden xsDown>
                          {" "}
                          {/* This will hide the content on xs devices */}
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src="/FooterImage.png" alt="FooterImage" />
                          </Box>
                        </Hidden>
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
