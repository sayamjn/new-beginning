import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);





app.get("/", (req, res) => {
   return res.status(200).send("Server is up");
});

app.post("/generate", async (req, res) => {
   const { prompt, size } = req.body;

   const imageSize =
     size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
 
   try {
     const response = await openai.createImage({
       prompt,
       n: 1,
       size: imageSize,
     });
 
     const imageUrl = response.data.data[0].url;
 
     res.status(200).json({
       success: true,
       data: imageUrl,
     });
   } catch (error) {
     if (error.response) {
       console.log(error.response.status);
       console.log(error.response.data);
     } else {
       console.log(error.message);
     }
 
     res.status(400).json({
       success: false,
       error: 'The image could not be generated',
     });
   }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});

// const server = () => {
//    db()
//    app.listen(PORT,()=>{
//        console.log("you are listening to port: ", PORT)

//    })
// }

// server()