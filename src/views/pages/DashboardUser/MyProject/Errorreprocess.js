// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   InputLabel,
//   Grid,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Typography,
//   InputAdornment,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { RxCross2 } from "react-icons/rx";
// import FullScreenLoader from "src/component/FullScreenLoader";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import CloseIcon from "@material-ui/icons/Close";
// import axios from "axios";
// import IconButton from "@material-ui/core/IconButton";
// import ApiConfig from "src/config/APIConfig";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { useHistory } from "react-router-dom";
// // Styles for the component
// const useStyles = makeStyles((theme) => ({
//   DialogMain: {
//     "& .MuiDialog-paperWidthSm": {
//       maxWidth: "70%",
//     },
//   },
//   savecancelbtn: {
//     justifyContent: "center",
//     padding: "25px 0px 30px",
//     "& .canclereprocessbtn": {
//       display: "flex",
//       gap: "1rem",
//       alignItems: "center",
//     },
//     "& .MuiButton-contained": {
//       padding: "9px 30px",
//       fontSize: "15px",
//     },
//     "& .MuiButton-containedPrimary": {
//       backgroundColor: "var(--blue, #0358AC)",
//       color: "white !important",
//     },
//   },
//   CrossIcon: {
//     display: "flex",
//     justifyContent: "end",
//     padding: "5px",
//     "& .closeicon": {
//       width: "24px",
//       height: "24px",
//       border: "1px solid #ECECEC",
//       background: "#FFFFFF",
//       borderRadius: "50%",
//       position: "fixed",
//       marginTop: "-21px",
//       marginRight: "-17px",
//       padding: "6px",
//       cursor: "pointer",
//     },
//   },
//   DialogTitleFirst: {
//     textAlign: "center",
//     "& span": {
//       color: "#0358AC",
//     },
//     "& h2": {
//       fontSize: "24px",
//       fontWeight: 600,
//     },
//   },
//   innerallinfoform: {
//     "& .MuiFormControl-marginNormal": {
//       marginTop: "1px",
//       marginBottom: "16px",
//     },
//     "& .savebtn": {
//       borderRadius: "0px 6px 6px 0px",
//       background: " #0358AC",
//       color: "white",
//       height: "42px",
//       width: "100px",
//     },
//     "& .MuiOutlinedInput-adornedEnd": {
//       paddingRight: "0px",
//     },
//     "& .imageuploadbox": {
//       "& label": {
//         marginTop: "0px",
//       },
//     },
//   },
//   error: {
//     color: "red !important",
//     fontSize: "12px !important",
//   },
//   mainDialog: {
//     "& .MuiDialog-paperWidthSm": {
//       maxWidth: "721px !important",
//       width: "100% !important",
//       height: "567px",
//       borderRadius: "12px",
//     },
//   },
//   CrossIcon: {
//     display: "flex",
//     justifyContent: "end",
//     // padding: "5px",
//     "& .closeicon": {
//       width: "24px",
//       height: "24px",
//       border: "1px solid #ECECEC",
//       background: "#FFFFFF",
//       borderRadius: "50%",
//       position: "fixed",
//       marginTop: "-19px",
//       marginRight: "-13px",
//       padding: "6px",
//       cursor: "pointer",
//     },
//   },
//   dialogBtnBox: {
//     padding: "130px 123px",
//     textAlign: "center",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     border: "2px dashed #CACACA",
//     borderRadius: "10px",
//     borderSpacing: "10px",
//     margin: "-11px 44px",
//     "& .dialogTypo": {
//       color: "#858585",
//       fontSize: "14px",
//       width: "100%",
//       maxWidth: "273px",
//     },
//     "& .btnUpload": {
//       backgroundColor: "#0358AC",
//       color: "#F2F7FF",
//       height: "40px",
//       width: "80px",
//       marginTop: "17px",
//     },
//   },
//   btnConatainer: {
//     display: "flex",
//     gap: "16px",
//     // padding: "24px 44px 32px 44px",
//     padding: "35px 44px 32px 44px",
//     "& .btnCancel": {
//       backgroundColor: "#F4F4F4",
//       color: "#152F40",
//       width: "100%",
//       maxWidth: "266.5px",
//       height: "48px",
//       borderRadius: "8px",
//     },
//     "& .btnSave": {
//       backgroundColor: "#0358AC",
//       color: "#F2F7FF",
//       width: "100%",
//       maxWidth: "266.5px",
//       height: "48px",
//       borderRadius: "8px",
//     },
//   },
//   dialogHeading: {
//     marginTop: "-15px",
//     padding: "0px 44px 24px 44px",
//     color: "#152F40",
//     fontSize: "18px",
//     fontWeight: 500,
//     "& .btnCancel": {
//       backgroundColor: "#F4F4F4",
//       color: "#152F40",
//       borderRadius: "8px",
//     },
//     "& .btnSave": {
//       backgroundColor: "#0358AC",
//       color: "#F2F7FF",
//       borderRadius: "8px",
//     },
//   },
// }));
// function UserErrorReprocess({
//   reprocessOpen,
//   handleReprocessClose,
//   sheetUrl,
//   sheetName,
//   CUSTOMER_ID,
//   projectIndex,
//   ErrorData,
//   sheetId,
//   SheetData,
// }) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const history = useHistory();
//   const classes = useStyles();

//   const [firstRowData, setFirstRowData] = useState({});
//   console.log("firstRowData: ", firstRowData);

//   const sheetFirstRowData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios({
//         method: "GET",
//         url: ApiConfig.getRowData,
//         headers: {
//           token: `${localStorage.getItem("token")}`,
//         },
//         params: {
//           googleSheetId: sheetId,
//           row: projectIndex,
//         },
//       });
//       if (res?.data?.status === 200) {
//         setFirstRowData(res?.data?.data);
//       }
//     } catch (error) {
//       console.log("error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     sheetFirstRowData();
//   }, []);
//   // const initialValues = SheetData.reduce((acc, item) => {
//   //   if (
//   //     item?.dataType !== "HVO URL (Required)" &&
//   //     item?.dataType !== "Error (Required)" &&
//   //     item?.dataType !== "Final video URL (Required)" &&
//   //     item?.dataType !== "Status (Required)"
//   //   ) {
//   //     acc[item.value] = ErrorData[item.value] || "";
//   //   }
//   //   return acc;
//   // }, {});
//   // Initialize form values based on `firstRowData`
//   // Initialize form values based on `firstRowData`

//   const handleCancel = () => {
//     console.log("Cancel button clicked");
//     handleReprocessClose();
//   };

//   // const handleSubmit = async (values, { setSubmitting }) => {
//   //   try {
//   //     setSubmitting(true);
//   //     console.log(values, "values");
//   //     await PostProjectDetails(values);
//   //     handleReprocessClose();
//   //   } catch (error) {
//   //     console.log("Submission error:", error);
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };

//   const PostProjectDetails = async (values) => {
//     console.log("PostProjectDetails: we are outside try");
//     try {
//       console.log("PostProjectDetails: we are inside try");
//       setLoading(true);
//       const formattedData = Object.keys(values).map((key) => ({
//         data: values[key],
//         row: key,
//       }));

//       console.log("res: we are just before this res");
//       const res = await axios({
//         method: "PUT",
//         url: ApiConfig.PostProjectDetails,
//         headers: {
//           token: `${localStorage.getItem("token")}`,
//         },
//         params: {
//           sheetURL: sheetUrl,
//           sheetName: sheetName,
//           customerId: CUSTOMER_ID,
//         },
//         data: formattedData,
//       });
//       console.log("res: ", res);

//       if (res?.data?.status === 200) {
//         userListApi();
//       }
//     } catch (error) {
//       console.log(error, "rerror  we are just before this res");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const userListApi = async () => {
//     const params = {
//       page: 0,
//       pageSize: 10 || 0,
//       templateType: "VIDEO",
//       sortBy: "",
//       name: "",
//     };
//     try {
//       setLoading(true);
//       const res = await axios({
//         method: "GET",
//         url: ApiConfig.userProjectListing,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           userId: localStorage.getItem("_id"),
//         },
//         params: params,
//       });
//       if (res?.data?.status === 200) {
//         setLoading(false);
//         const errorData = res?.data?.data;
//         const sheetUrl = res?.data?.data?.list[0]?.sheetUrl;
//         const sheetName = res?.data?.data?.list[0]?.sheetName;
//         const CUSTOMER_ID = res?.data?.data?.list[0]?.CUSTOMER_ID;
//         const videoTemplete = res?.data?.data?.list[0]?.videoTemplateId;

//         history.push("/View-Myproject", {
//           state: {
//             errorData: errorData?.list[0]?.projectListing[projectIndex],
//             sheetUrl: sheetUrl,
//             sheetName: sheetName,
//             CUSTOMER_ID: CUSTOMER_ID,
//             videoTemplete: videoTemplete,
//             projectIndex: projectIndex,
//           },
//         });
//       } else if (res?.data?.status === 205) {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   const initialValues = firstRowData
//     ? Object.keys(firstRowData).reduce((acc, key) => {
//         acc[key] = firstRowData[key] || "";
//         return acc;
//       }, {})
//     : {};
//   // Define Yup validation schema
//   const validationSchema = Yup.object().shape(
//     Object.keys(firstRowData).reduce((acc, key) => {
//       acc[key] = Yup.string().required("This is required");
//       return acc;
//     }, {})
//   );

//   return (
//     <>
//       {loading && <FullScreenLoader />}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         enableReinitialize
//         initialStatus={{
//           success: false,
//           successMsg: "",
//         }}
//         // onSubmit={handleSubmit}
//         onSubmit={(values, { setSubmitting, resetForm }) => {
//           setSubmitting(true);
//           PostProjectDetails(values, resetForm);
//           setSubmitting(false);
//         }}
//       >
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           isSubmitting,
//           handleSubmit,
//           isValid,
//           dirty,
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <Dialog
//               fullWidth
//               maxWidth="sm"
//               open={reprocessopen}
//               onClose={handleReprocessClose}
//               className={classes.DialogMain}
//             >
//               <Box className={classes.CrossIcon}>
//                 <RxCross2 className="closeicon" onClick={handleCancel} />
//               </Box>
//               <DialogTitle className={classes.DialogTitleFirst} variant="h2">
//                 You are still missing information to create media.
//                 <br />
//                 <span>Project Details</span>
//               </DialogTitle>
//               <DialogContent>
//                 <Grid container spacing={4}>
//                   {Object.entries(firstRowData)?.map(([key, value]) => (
//                     <Grid item xs={12} md={6} lg={6} sm={12} key={key}>
//                       <Box>
//                         <Typography className="mainTypo" variant="body1">
//                           {key}
//                         </Typography>
//                         <TextField
//                           type="text"
//                           variant="outlined"
//                           fullWidth
//                           name={key}
//                           value={values[key]}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={!!(values[key] === "" && dirty)}
//                           helperText={
//                             <ErrorMessage name={key} component="div" />
//                           }
//                         />
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </DialogContent>
//               <DialogActions className={classes.savecancelbtn}>
//                 <Box fullWidth className="canclereprocessbtn">
//                   <Button
//                     variant="contained"
//                     color="default"
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     disabled={!isValid || !dirty}
//                   >
//                     {/* Reprocess */}
//                     {loading === false ? (
//                       " Reprocess"
//                     ) : (
//                       <ButtonCircularProgress />
//                     )}
//                   </Button>
//                 </Box>
//               </DialogActions>
//             </Dialog>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// }

// export default UserErrorReprocess;
