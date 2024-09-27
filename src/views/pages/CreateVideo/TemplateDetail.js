import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    makeStyles,
    Modal,
    InputAdornment,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import { SketchPicker } from "react-color";
import axios from "axios";
import { Copy } from "react-feather";
import { CgColorPicker } from "react-icons/cg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
    menuitem: {
        "& .MuiSelect-iconOutlined": {
            borderLeft: "1px solid #ECECEC !important",
        },
        "& .MuiSelect-iconOpen": {
            borderRight: "none !important",
            borderLeft: "1px solid #ECECEC !important",
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
        "& .dynamicFieldsBox": {
            border: "1px solid #ECECEC",
            borderRadius: "8px",
            background: "#FCFCFC",
            height: "calc(100% - 32px)",
            gap: "12px",
        },
        "& .error": {
            fontSize: "12px",
            color: "red",
        },
        "& .label": {
            color: "#152F40",
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
        "& .ctabtn": {
            fontSize: "14px",
            marginTop: "-10px !important",
        },
        "& .ctabtntext": {
            marginTop: "-10px !important",
        },
        "& .MuiFormControl-marginNormal": {
            marginTop: "5px !important",
        },
        "& .MuiIconButton-root": {
            height: "40px",
            padding: "10px",
        },
        "& .sizeField": {
            "& .MuiFormControl-root": {
                width: "46px !important",
            },
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
    colorpicker: {
        width: "100% !important",
        maxWidth: "300px !important",
        padding: "5px 15px 5px",
    },
    colorpickerbtndiv: {
        gap: "15px",
        marginTop: "15px",
        display: "flex",
        justifyContent: "center",

        "& .MuiButton-outlined": {
            color: "#F2F7FF",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500 !important",
            backgroundColor: "#0358AC",
            boxShadow: "none !important",
        },
        "& .MuiButton-contained": {
            color: "#152F40",
            width: "100%",
            fontSize: "15px",
            fontWeight: "500 !important",
            backgroundColor: "#dfd9d9",
            boxShadow: "none !important",
        },
    },
    hinttext: {
        display: "flex",
        justifyContent: "end",
        color: "gray",
        fontSize: "12px",
        marginTop: "5px",
        paddingLeft: "28px",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
}));

function TemplateDetail({ showTemplateDetail }) {
    const classes = useStyles();
    const [templateDetails, setTemplateDetails] = useState("");
    const [nextButton, setNextButton] = useState(false);
    const [templateTitle, setTemplateTitle] = useState("");
    const [meetingDescription, setMeetingDescription] = useState("");
    const [meetingText, setMeetingText] = useState("");
    const [loading, setLoading] = useState(false);
    const [companyDetails, setCompanyDetails] = useState("");

    // Error state for validations
    const [errors, setErrors] = useState({
        templateTitle: "",
        meetingDescription: "",
        meetingText: "",
    });

    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("templateId");

    const handleCopy = (text) => {
        const formattedText = `[${text}]`;
        navigator.clipboard
            .writeText(formattedText)
            .then(() => {
                toast.success("Text copied to clipboard.", {
                    autoClose: 500,
                });
            })
            .catch((err) => {
                toast.error("Unable to copy text to clipboard.", {
                    autoClose: 500,
                });
            });
    };

    const validateField = (name, value) => {
        if (value.length < 2) {
            return "Minimum 2 characters required.";
        } else if (value.length > 100) {
            return "Maximum 100 characters allowed.";
        }
        return "";
    };

    const handleInputChange = (field, value) => {
        const error = validateField(field, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));

        if (field === "templateTitle") setTemplateTitle(value);
        if (field === "meetingDescription") setMeetingDescription(value);
        if (field === "meetingText") setMeetingText(value);
    };

    const getSheetType = async (templateId) => {
        try {
            setLoading(true);
            const res = await axios({
                method: "GET",
                url: ApiConfig.getsheettype,
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
                params: {
                    hvoId: templateId,
                },
            });
            if (res.data.status === 200) {
                setCompanyDetails(res?.data?.data?.data);
            }
        } catch (error) {
            console.log("error");
        } finally {
            setLoading(false);
        }
    };

    const getCustomVdoTemplate = async (templateId) => {
        try {
            setLoading(true);
            const res = await axios({
                method: "GET",
                url: ApiConfig.getCustomVdoTemplate,
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
                params: {
                    videoTemplateId: templateId,
                },
            });
            if (res.data.status === 200) {
                setTemplateDetails(res?.data?.data);
                setTemplateTitle(res?.data?.data?.TemplateTitle);
                setMeetingDescription(res?.data?.data?.meetingDescription);
                setMeetingText(res?.data?.data?.meetingButtonText);
            }
        } catch (error) {
            console.log("error");
        } finally {
            setLoading(false);
        }
    };

    const customVdoTemplate = async () => {
        try {
            setLoading(true);
            const res = await axios({
                method: "POST",
                url: ApiConfig.customVdoTemplate,
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
                params: {
                    videoTemplateId: templateId,
                },
                data: {
                    title: templateTitle,
                    description: meetingDescription,
                    buttonText: meetingText,
                },
            });

            if (res?.data?.status === 200 || res?.data?.status === 201) {
                setLoading(false);
                setNextButton(true);
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Check if all fields are filled and valid
    const isFormValid = () => {
        return (
            templateTitle !== "" &&
            meetingDescription !== "" &&
            meetingText !== "" &&
            !errors.templateTitle &&
            !errors.meetingDescription &&
            !errors.meetingText
        );
    };

    useEffect(() => {
        getCustomVdoTemplate(templateId);
        getSheetType(templateId);
    }, [templateId]);

    return (
        <Box className={classes.secondmaingridBox}>
            <Box style={{ marginTop: "12px" }}>
                <Grid container spacing={2}>
                    <Grid item sx={12} sm={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <Typography className="label">Template title</Typography>
                                <TextField
                                    fullWidth
                                    value={templateTitle}
                                    onChange={(e) => handleInputChange("templateTitle", e.target.value)}
                                    variant="outlined"
                                    style={{ marginTop: "2px" }}
                                    inputProps={{
                                        maxLength: 101,  // Limit input to 100 characters
                                    }}
                                    placeholder="Enter your template Title"
                                    error={Boolean(errors.templateTitle)}
                                    helperText={errors.templateTitle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Typography className="label">Meeting description</Typography>
                                <TextField
                                    fullWidth
                                    value={meetingDescription}
                                    onChange={(e) => handleInputChange("meetingDescription", e.target.value)}
                                    variant="outlined"
                                    style={{ marginTop: "2px" }}
                                    placeholder="Enter meeting description"
                                    error={Boolean(errors.meetingDescription)}
                                    helperText={errors.meetingDescription}
                                    inputProps={{
                                        maxLength: 101,  // Limit input to 100 characters
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Typography className="label">Meeting button text</Typography>
                                <TextField
                                    fullWidth
                                    value={meetingText}
                                    onChange={(e) => handleInputChange("meetingText", e.target.value)}
                                    variant="outlined"
                                    style={{ marginTop: "2px" }}
                                    placeholder="Enter meeting button text"
                                    error={Boolean(errors.meetingText)}
                                    helperText={errors.meetingText}
                                    inputProps={{
                                        maxLength: 101,  // Limit input to 100 characters
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sx={12} sm={4}>
                        <Box className="dynamicFieldsBox d-flex column alignstart justify-start" p={2}>
                            <Typography className="label">Copy to Add Dynamic Fields</Typography>
                            <div style={{ height: "260px", overflowY: "auto" }}>
                                {companyDetails && companyDetails?.map((sheetfield, ind) => (
                                    <Tooltip title={sheetfield?.value || "Copy Text"} arrow key={ind}>
                                        <TextField
                                            fullWidth
                                            value={sheetfield?.value}
                                            variant="outlined"
                                            placeholder={sheetfield?.value}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => handleCopy(sheetfield?.value)}>
                                                            <Copy style={{ color: "#858585" }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                <Box className="secondmaingridbtn" mt={2}>
                    <Button
                        className={`${nextButton === true ? "savebtnDisables" : "savebtn"}`}
                        disabled={!isFormValid() || nextButton === true}
                        variant="contained"
                        onClick={customVdoTemplate}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        className={`${nextButton === false ? "savebtnDisables" : "savebtn"}`}
                        disabled={nextButton === false}
                        onClick={showTemplateDetail}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}


export default TemplateDetail;
