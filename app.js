const express = require("express")
const bodyParser= require("body-parser");
const { log } = require("console");
const app= express();

let items=["Buy Food","Need Food"];
let workItems=[]
// set the view engine to ejs
app.set('view engine', 'ejs');

//using body parser for post request 
app.use(bodyParser.urlencoded({extended:true}))

//To use CSS file
app.use(express.static("public"))

app.get("/",function(req,res){
    let today = new Date();
    let options={
        weekday : "long",
        day : "numeric",
        month :"long"
    }
   // res.send("hi")
   let day = today.toLocaleDateString("en-US",options)
    res.render("list",{listTitle:day, newListItem: items});
})


app.post("/", function(req,res){
  let item=  req.body.newItem;
  console.log(req.body.list);
  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
  items.push(item)
  res.redirect("/")
  }
  
})

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List", newListItem: workItems})
})



app.listen(3000, function(){
    console.log("Server run on port 3000")
})