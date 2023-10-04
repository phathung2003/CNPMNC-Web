//Khai báo để chạy biến môi trường
require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const contactModel = require("./models/Contact")


const app = express()
app.use(express.json())
app.use(cors())

//               Biến môi trường
mongoose.connect(process.env.DATABASE_TEST)

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

app.listen(process.env.PORT, () =>{
    console.log("Server khởi động tại port " + process.env.PORT)
})
