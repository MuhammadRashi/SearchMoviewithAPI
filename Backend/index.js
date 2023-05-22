const express = require("express");
const app =express();
const userList=[{name: "Test" }];
const cors=require("cors");
const movieList=require('./movies.json');

app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{
    // res.json(movieList);  --return full movie list
    // console.log(req.query);
    const {movieName} = req.query;

    const filteredList = movieList.filter(movie=>movie.title.toLowerCase().includes(movieName.toLowerCase()));
    // console.log(movieName);
    
    res.json(filteredList);

})

app.post("/api/movies",(req,res)=>{
    // res.json(movieList);  --return full movie list
    // console.log(req.query);
    const {movieName} = req.body;
        movieList.push({
            id:Date.now(),
            title:movieName,
            poster_path:"",
        })
    console.log(movieName)
    res.json(movieList);

})



const PORT = 3005;

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});