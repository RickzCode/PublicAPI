import express from "express";
import axios from "axios";
import bodyParser from "body-parser"
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    //Step 1 - Make the get route work and render the index.ejs file.
    res.render("index.ejs")
  });

  app.get("/random", async (req,res)=> {
    try {
        const result = await axios.get("https://api.jikan.moe/v4" + "/random/anime");
        res.render("index.ejs", {
            title : result.data.data.title,
            imgUrl : result.data.data.images.jpg.image_url,
         });
      } catch (error) {
        res.status(404).send(error.message);
      }
  });

  app.post("/search", async (req,res)=>{
    const query = req.body.query;
    try{
        const result = await axios.get("https://api.jikan.moe/v4/anime", {
            params: {
                q : query
            },
        });
        res.render("index.ejs", { 
            results: result.data.data, 
            query 
        });
    } catch(error){
        res.status(404).send(error.message);
    }
  })
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });