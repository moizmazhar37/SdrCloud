import React, { useContext } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";

// Define custom styles
const useStyles = makeStyles((theme) => ({
    mainbox: {
        display: "grid",
        border: "1px solid black",
        height: "100vh",
        "& .firstinnerdiv": {
            display: "flex",
            border: "1px solid red",
        },
        "& .firstdiv": {
            display: "grid",
            border: "1px solid red",
            width: "50%",
        },
        "& .seconddiv": {
            display: "grid",
            border: "1px solid red",
            width: "50%",
        },

    },
}));

const LogoPosition = () => {
    const classes = useStyles();
    const history = useHistory();
    const user = useContext(UserContext);

    return (
        <>
            <Box className={classes.mainbox}>
                <div className="firstinnerdiv">

                    <div>

                    </div>
                    <div className="firstdiv">
                        <Typography>1</Typography>

                    </div>

                    <div className="seconddiv" >
                        <Typography>2</Typography>
                    </div>

                </div>

                <div className="firstinnerdiv">

                    <div className="firstdiv">
                        <Typography>3</Typography>
                    </div>

                    <div className="seconddiv" >
                        <Typography>4</Typography>
                    </div>

                </div>

            </Box>
            <div className={classes.middlediv}>
                <Typography>0</Typography>
            </div>
        </>
    );
};

export default LogoPosition;
