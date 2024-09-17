import React, { useEffect, useState } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Logo from "src/component/Logo";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
  },
  logoContainer: {
    top: 35,
    left: 57,
    zIndex: 10,
  },
  loginLayoutBox: {
    background: "#fff",
    // padding: "44px",
    display: "flex",
    zIndex: "9",
    position: "relative",
    justifyContent: "center",
    height: "100vh",
    "& .loginLayoutBoxImg": {
      width: "50%",
      zIndex: "1",
      position: "fixed",
      backgroundSize: "cover",
      // backgroundImage: "url(./images/image.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
      right: 0,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      "& h1": {
        fontSize: "65px",
      },
    },
  },
  loginContentLayoutBox: {
    background: "#fff",
    position: "absolute",
    left: 0,
    width: "50%",
    position: "fixed",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: "55px 0 55px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "45px 0 45px",
    },
  },
  MainLayout: {
    minHeight: "calc(100vh - 72px)",
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  console.log(history.location);
  const [accountImage, setAccountImage] = useState("");
  console.log("accountImage", accountImage);
  const fetchCompanyData = async () => {
    try {
      // setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getuserlogo,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      if (res?.data?.status === 200) {
        setAccountImage(res?.data?.data?.loginImage);
        // setLoading(false);

        // setCompanyName(res?.data?.data?.companyName);
        // setCompanyURL(res?.data?.data?.companyUrl);
      } else if (res?.data?.status === 205) {
        // setLoading(false);
      } else {
        // setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <Box className={classes.loginLayoutBox}>
      <Box className={classes.loginContentLayoutBox}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            alignItems: "center",
            minHeight: "890px",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
      {accountImage && (
        <Box className="loginLayoutBoxImg">
          <img src={accountImage} />
        </Box>
      )}
    </Box>
  );
};

export default MainLayout;
