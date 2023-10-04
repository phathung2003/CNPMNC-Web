const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const uri = "mongodb+srv://phathung2003:27012003@thuexe.moxyghb.mongodb.net/Test"
const port = 3001;
const contactModel = require("./models/Contact")


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(uri)

app.post('/contact', (req,res) => {
    contactModel.create(req.body)
    .then(info => res.json(info))
    .catch(err => res.json(err))
})

app.post("/main", (req,res) => {
    const {email, password} = req.body;
    contactModel.findOne({email : email}).then(
        user => {
            if(user){
                if(user.password === password){
                    res.json("Ok")
                }else{
                    res.json("Sai mật khẩu")
                }
            }
            else{
                res.json("Không có tài khoản")
            }
        }
    )
})

app.get("/info",(req,res) => {
    contactModel.find()
    .then(info => res.json(info))
    .catch(err => res.json(err))
})

app.listen(port, () =>{
    console.log("Server khởi động tại port " + port)
})
