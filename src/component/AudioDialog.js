import { Box, Button, Dialog, DialogActions, DialogContent, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";

// Define custom styles
const useStyles = makeStyles(() => ({

  mainDialog: {
    "& .headingBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center", padding: "0 26px",
      borderBottom: '1px solid',
    },
    "& .subBox": {
      display: "flex",
      justifyContent: "center",
      gap: '10px'
    },
    "& .buttonUpload": {
      background: "#0358AC",
      color: "white",
    },
    "& .dialogAction": {
      display: "flex",
      justifyContent: "center",
      borderTop: '1px solid',
    },
    "& .labelAudio": {
      display: "flex",
      justifyContent: "center"
    },
    "& .btnSubmit": {
      backgroundColor: "#0358AC",
      color: "#fff",
      width: "100%",
      maxWidth: '220px'
    },
    "& .btnClose": {
      backgroundColor: "#858585",
      color: "#000",
      width: "100%",
      maxWidth: '220px',
    },
    "& .MuiDialogContent-root": {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }


}))


function AudioDialog({
  open, onClose, data, dataFunction, videoDuration, setOpenDialog, setAudioFile, audioFile
}) {

  const classes = useStyles();
  const [selectedAudioType, setSelectedAudioType] = useState('audio');
  const [audioScriptInput, setAudioScriptInput] = useState('');
  // Function to handle audio type change (audio file or audio script).
  const handleAudioTypeChange = (event) => {
    setSelectedAudioType(event.target.value);
    setAudioScriptInput('');
  };
  const [audioDuration, setAudioDuration] = useState(null);
 // Function to handle file change and validate audio duration.
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const audio = new Audio(reader.result);
      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        if (duration > videoDuration) {
          toast.error(`Audio duration is greater than video duration ${duration.toFixed(2)}`)
        } else {
          const base64 = reader.result;
          setAudioFile(base64);
        }
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  };
 // Function to handle form submission.
  const handleSubmit = () => {
    if (audioFile !== null) {
      toast.success("Audio file uploaded successfully.")
      onClose()

    } else {
      toast.error("Please upload audio file.")
    }


  }

  return (
    <Dialog open={open} onClose={onClose} className={classes.mainDialog} PaperProps={{ style: { width: '100%', maxWidth: '500px' } }} >
      <Box className="headingBox">
        <h2>Upload {selectedAudioType === 'audio' ? 'Audio' : 'Audio Script'}</h2>
        <h4 style={{ cursor: 'pointer' }} ><MdClose onClick={onClose} /></h4>
      </Box>
      <DialogContent>
        <RadioGroup value={selectedAudioType} onChange={handleAudioTypeChange}>
          <Box className="subBox" >
            <FormControlLabel value="audio" control={<Radio />} label="Audio" />
          </Box>
        </RadioGroup>
        {selectedAudioType === 'audioScript' ? (
          <TextField
            fullWidth
            label="Enter Audio Script"
            value={data}
            onChange={(e) => dataFunction(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            maxRows={4}
            style={{ marginTop: '10px' }}
          />

        ) : (
          <>
            {audioFile && (
              <audio
                controls
                src={audioFile}
              >
                Your browser does not support the audio tag.
              </audio>

            )}
            <input type="file" accept="audio/mp3, audio/wav" onChange={handleFileChange} id="uploadAudio" style={{ display: 'none' }} />
            <label className='labelAudio' htmlFor='uploadAudio'>
              <Button variant="contained" component='span' className='buttonUpload'>Upload Audio</Button>
            </label>
          </>
        )
        }
      </DialogContent>

      <DialogActions className='dialogAction'>
        <Button className='btnSubmit' onClick={handleSubmit} color="primary">Submit</Button>
        <Button className='btnClose' onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AudioDialog





