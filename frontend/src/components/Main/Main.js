import { useState } from "react";
import "./main.css";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const sizes = {
  small: "256x256",
  medium: "512x512",
  large: "1024x1024",
};

const Main = () => {
   const [prompt, setPrompt] = useState("");
   const [size, setSize] = useState(sizes.small);
   const [open, setOpen] = useState(false);
   const [img, setImg] = useState("");
   const [loading, setLoading] = useState(false);
 
   const clickHandler = async () => {
     try {
       if (prompt === "") {
         setOpen(true);
         return;
       }
       setLoading(true);
       const form = { prompt, size };
      //  console.log(form);
 
       const response = await axios.post("http://localhost:4000/generate/", form, {
         // headers: {
         //   Accept: "application/json",
         //   "Content-Type": "application/json",
         //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
         // },
       });
       console.log(response.data);
       const imgSrc = response.data.src;
       setImg(imgSrc);
       setLoading(false);
     } catch (error) {
       console.error(error);
       setOpen(true);
       setLoading(false);
     }
   };
 
   // rest of the component
 

  //
  return (
    <div className="main">
      <Stack spacing={1} className="main-stack">
        <TextField
          label="Prompt"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Size</InputLabel>
          <Select
            value={size}
            label="Size"
            onChange={(e) => setSize(e.target.value)}
          >
            <MenuItem value={sizes.small}>small</MenuItem>
            <MenuItem value={sizes.medium}>medium</MenuItem>
            <MenuItem value={sizes.large}>large</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={clickHandler}
            sx={{ mt: "1rem" }}
          >
            Generate New Image
          </Button>
        </FormControl>
      </Stack>
      {loading && <CircularProgress color="success" sx={{ mt: "1rem" }} />}
      {img !== "" && <img src={img} alt="img" />}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Note archived"
      >
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
