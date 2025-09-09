import React, { useState, useRef } from "react";
import { Box, Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddDescriptionDrawer from "./AddDescriptionDrawer";
import AddScreenDrawer from "./AddScreenDrawer";
import ContentEditable from 'react-contenteditable';
// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      padding: "13px 13px",
      color: "rgba(15, 0, 55, 0.20) !important",
    },
  },
  background: {
    backgroundColor: "green",
  },
  paperContainer: {
    marginTop: "0rem",
    width: "94%",
    padding: "0px 20px 0 36px",
  },
  tabContainer: {
    width: "100%",
  },
  boxModel: {
    padding: "25px",
    height: "590px"
  },

  imgContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    border: "1px solid rgba(24, 28, 50, 0.20)",
    borderRadius: "5px",
  },

  templateImg: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  editImg: {
    position: "absolute",
    top: "10px",
    right: "15px",
    cursor: "pointer",
  },
  plusImgContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F6F9FD",
    border: "1px solid rgba(24, 28, 50, 0.20)",
    borderRadius: "5px",

    "& img": {
      cursor: "pointer",
    },
  },

  gridContainerMain: {
    marginTop: "1rem",
  },
  gridLg: {
    height: "497px",
  },
  templateEditor: {
    width: "100%",
    height: "100%",
    border: "1px solid rgba(48, 50, 54, 0.20)",
    background: "#F6F9FD",
    borderRadius: "6px",
  },
  gridSm: {
    height: "155px",
  },
  manyBtnsContainer: {
    marginTop: "1rem",
    width: "100%",
    gap: "10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    "& .MuiButton-root": {
      whiteSpace: "pre",
      marginBottom: "5px",
      marginRight: "5px",
      "@media(max-width:735px)": {
        width: "100%",
      },
    },
  },
  darkBtn: {
    padding: "8px 12px",
    borderRadius: " 6px",
    border: "1px solid rgba(24, 28, 50, 0.10)",
    background: "#181C32",
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "12px",
  },
  secondaryBtn: {
    background: "rgba(24, 28, 50, 0.10)",
    borderRadius: " 6px",
    border: "1px solid rgba(24, 28, 50, 0.10)",
    padding: "8px 12px",
    color: "#181C32",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "12px",
  },
  Logodiv: {
    border: "1px dashed #0F0037",
    width: "100%",
    height: "60px",
    maxWidth: "183px"
  },
  TitleDiv: {
    width: "100%",
    border: "1px dashed #0F0037",
  },
  headerSection: {
    display: "flex",
    padding: "16px 21px",
    gap: "5%",
    height:"60px"
  },
  inputHtml: {
    height: "55px",
    textAlign: "center"
  },
  inputContentHtml: {
    height: "269px",
    textAlign: "center"
  },
  bodyContent: {
    border: "1px dashed #0F0037",
    margin: "0 22px"
  },
  inputEndContentHtml: {
    paddingLeft: "539px",
    height: "82px",
    textAlign: "end"
  }
}));
// Component for managing template audio settings and editing.
const TemplateAudio = (props) => {
  const contentEditable = useRef(null);
  const [editTemplate, setEditTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState(false)
  const [descDrawerOpen, setDescDrawerOpen] = useState(false);
  const [html, setHtml] = useState('');

 // Function to handle opening and closing of description drawer
  const handleDescDrawerClose = () => {
    setDescDrawerOpen(!descDrawerOpen);
  };
  const handleDescDrawerOpen = () => {
    setDescDrawerOpen(true);
  };
// Function to handle editing template
  const handleEditTemplate = () => {
    setEditTemplate(true);
  };
    // Function to handle changes in contentEditable
  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };
    // Function to handle blur event in contentEditable
  const handleBlur = () => {
    console.log(html);
  };
  const [addUserDrawerOpen , setAddUserDrawerOpen] = useState(false);
 // Function to handle opening and closing of add user drawer
 const handleAddUserDrawerOpen = () => {
  setAddUserDrawerOpen(true);
 };
 const handleAddUserDrawerClose = () => {
  setAddUserDrawerOpen(!addUserDrawerOpen);
 };
  // makeStyles hook for defining styles
  const classes = useStyles();
  return (
    <Box>
      <Paper className={classes.tabContainer}>
        <Box className={classes.boxModel}>
          {editTemplate ? (
            <>
             <Typography variant="h6" style={{ color: "rgba(57, 57, 57, 1)" }}>
        <span style={{ fontWeight: "600" }}>Edit Template</span> (All the
        editable section are highlighted with dotted lines)
      </Typography>
              <Grid container spacing={2} className={classes.gridContainerMain}>
                <Grid item xs={12} sm={12} md={9} className={classes.gridLg}>
                  <Box className={classes.templateEditor}>
                    <Box className={classes.headerSection}>
                      <div className={classes.Logodiv}>
                        <ContentEditable
                          innerRef={contentEditable}
                          html={html} 
                          disabled={false} 
                          onChange={handleChange}
                          tagName="article" 
                          onBlur={handleBlur}
                          maxLength={20}
                          className={classes.inputHtml}
                        />
                      </div>
                      <div className={classes.TitleDiv}>
                        <ContentEditable
                          innerRef={contentEditable}
                          html={html} 
                          disabled={false}
                          onChange={handleChange}
                          tagName="article" 
                          onBlur={handleBlur}
                          className={classes.inputHtml}
                        />
                      </div>
                    </Box>
                    <Box className={classes.bodyContent}>
                      <ContentEditable
                        innerRef={contentEditable}
                        html={html}
                        disabled={false}
                        onChange={handleChange} 
                        tagName="article"
                        onBlur={handleBlur}
                        className={classes.inputContentHtml}
                      />
                    </Box>
                    <Box className={classes.bodyContent} style={{ marginTop: "18px" }}>
                      <ContentEditable
                        innerRef={contentEditable}
                        html={html} 
                        disabled={false} 
                        onChange={handleChange} 
                        tagName="article" 
                        onBlur={handleBlur}
                        className={classes.inputEndContentHtml}
                      />
                    </Box>
                  </Box>
                  <Box className={classes.manyBtnsContainer}>
                    <Button variant="contained" color="primary">
                      Save Changes
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDescDrawerOpen}
                    >
                      Add audio description
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"

                    >
                      Preview
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                    >
                      Save Video
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "auto" }}
                      startIcon={<img src="images/cloud-add.svg" alt="cloud_img" />}
                    >
                      Upload audio
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} className={classes.gridSm}>
                  <Box className={classes.plusImgContainer}>
                    <img src="images/plus-squared.svg" alt="plus-squared" />
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : newTemplate ?
            (<>
              <Typography variant="h5" >
              <span style={{fontWeight:"600"}}>Edit Template</span> (All the editable section are highlighted with
                dotted lines)
              </Typography>
              <Grid container spacing={2} className={classes.gridContainerMain}>
                <Grid item xs={12} sm={9} md={9} className={classes.gridLg}>
                  <Box className={classes.templateEditor} onClick={handleAddUserDrawerOpen}>
                    <Box className={classes.plusImgContainer}>
                      <img src="images/plus-squared.svg" alt="plus-squared" />
                    </Box>
                  </Box>
                  <Box className={classes.manyBtnsContainer}>
                    <Button variant="contained" color="primary">
                      Save Changes
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDescDrawerOpen}
                    >
                      Add audio description
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                    >
                      Save Video
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "auto" }}
                      startIcon={<img src="images/cloud-add.svg" alt="cloud_img" />}
                    >
                      Upload audio
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={3} className={classes.gridSm}>
                  <Box className={classes.plusImgContainer}>
                    <img src="images/plus-squared.svg" alt="plus-squared" />
                  </Box>
                </Grid>
              </Grid>
            </>) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <Box className={classes.imgContainer}>
                    <img
                      src="images/template_img.png"
                      alt=""
                      className={classes.templateImg}
                    />
                    <img
                      src="images/message-edit.svg"
                      alt="edit_img"
                      className={classes.editImg}
                      onClick={handleEditTemplate}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Box className={classes.plusImgContainer}>
                    <img src="images/plus-squared.svg" alt="plus-squared" onClick={() => { setNewTemplate(true) }} />
                  </Box>
                </Grid>
              </Grid>
            )}
        </Box>
      </Paper>
      <AddDescriptionDrawer
        descDrawerOpen={descDrawerOpen}
        descDrawerClose={handleDescDrawerClose}
      />
        <AddScreenDrawer
    addUserDrawerOpen = {addUserDrawerOpen}
    addUserDrawerClose = {handleAddUserDrawerClose}
      />

    </Box>
  );
};

export default TemplateAudio;
