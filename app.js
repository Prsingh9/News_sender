const express=require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");
const { log } = require("console");


const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (request,response)=>{
    response.sendFile(__dirname + "/signup.html");
})

app.post("/",(request,response)=>{

    const firstName=request.body.fName;
    const lastName=request.body.Lname;
    const email=request.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData= JSON.stringify(data);

    const url='https://us21.api.mailchimp.com/3.0/lists/24ed37c0cb';

    const options={
        method:"POST",
        auth:"Prabhakar:c5373224c3a18ab4d3cdaf6ac15bea58-us21"
    }

    const req= https.request(url, options, (res)=>{

        if(res.statusCode==200){
            response.sendFile(__dirname+"/success.html");
        }
        else{
            response.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    req.write(jsonData);
    req.end();
   
});

app.post("/failure",(request,response)=>{
    response.redirect("/");
})

app.listen(process.env.PORT || 4000,()=>{
    console.log("server is running on port 4000");
})

//api key
// c5373224c3a18ab4d3cdaf6ac15bea58-us21

//list id
//24ed37c0cb

