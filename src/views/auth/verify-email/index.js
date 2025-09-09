import React, { useState, useContext } from "react";
import "src/scss/main.css";
import {
    Box,
    Typography,
    TextField,
    makeStyles,
    Button,
    FormHelperText,
    Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
// Styles for the component
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: "560px",
    },
    loginLayoutForm: {
        display: "flex",
        padding: "230px 0px",
        flexDirection: "column",
        [theme.breakpoints.down("lg")]: {
            padding: "140px 0",
          },
          [theme.breakpoints.down("md")]: {
            padding: "80px 0",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "40px 0",
          },
        "& .innerbox": {
            padding: "44px",
            borderRadius: "12px",
            border: "1px solid var(--light-stroke, #ECECEC)",
            background: "var(--white, #FFF)",
            boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
        },
    },
    bottomLink2: {
        fontWeight: "500",
        fontSize: "16px",
        color: "var(--black, #152F40)",
        cursor: "pointer",
        borderRadius: "8px",
        background: "#F4F4F4",
        padding: "9px 30px !important",
    },
    Sendbtn: {
        borderRadius: '8px',
        backgroundColor: "var(--blue, #0358AC) !important",
        color: "#F2F7FF !important",
        fontSize: "16px",
        boxShadow: "none",
        height: "48px",
    },
    disbledbtn: {
        borderRadius: '8px',
        backgroundColor: "var(--stroke, #CACACA) !important",
        color: "var(--light-blue, #F2F7FF) !important",
        fontSize: "16px",
        boxShadow: "none"
    },
}));

function Login(props) {
    const history = useHistory();
    const classes = useStyles();
    const [isLoading, setLoader] = useState(false);
// Redirects the user to the login page
    const goToLogin = () => {
        history.push("/");
    };
    // Redirects the user to the forgot password page
    const goTochangeEmail = () => {
        history.push("/forget-password");
    };

    return (
        <>
            <Container maxWidth="sm" className={classes.mainContainer}>
                <Box className={classes.loginLayoutForm}>
                    <Box className="innerbox">
                        <Typography variant="h1" style={{ color: "var(--black, #152F40)", textAlign: "center", fontSize: "36px" }}>Check Your Mail</Typography>
                        <Typography variant="body1" style={{ color: "var(--grey, #858585)", marginTop: "24px", fontSize: "16px" }}>We have sent you an email. Follow the instructions to regain access to your account.</Typography>
                        <Box style={{ marginTop: "48px", marginBottom: "48px" }}>
                            <Box >
                                <Button
                                    className={classes.Sendbtn}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    onClick={goTochangeEmail}
                                >
                                    Change Email
                                </Button>
                            </Box>
                            <Box textAlign="center" mt={4} style={{ marginTop: "16px" }}>
                                <Typography
                                    className={classes.bottomLink2}
                                    onClick={goToLogin}
                                >
                                    Back To Login
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container >
        </>
    );
}

export default Login;
