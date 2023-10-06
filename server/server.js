//Khai báo để chạy biến môi trường
require('dotenv').config()


const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const result = require("./checkConnection")
const contactModel = require("./models/Contact")

const database = process.env.DATABASE_TEST;
const port = process.env.PORT;


if(result.call()){
    const app = express()
    app.use(express.json())
    app.use(cors())


//               Biến môi trường
    mongoose.connect(database)

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

    try{
        app.listen(port, () =>{console.log("Server khởi động tại port " + port)})
    }
    catch{console.log("Server khởi động thất bại")}
}



