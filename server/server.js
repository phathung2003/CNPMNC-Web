const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const XeRoute = require('./routes/Xe')
const SoDatXeRoute = require('./routes/SoDatXe');
const SoXeRoute = require('./routes/SoXe')
const KhachHangRoute = require('./routes/KhachHang');

const XeModel = require("./models/Xe");
const KhachHangModel = require("./models/KhachHang");
const SoXeModel = require("./models/SoXe");

const mongoose = require("mongoose");
const params = require('params');
const ObjectId = mongoose.Types.ObjectId;

if(result){
    app.post('/contact', (req,res) => {``
        
        const {name, email, password} = req.body;
        contactModel.findOne({email : email}).then(
            user => {
                if(user){
                        res.json("Tài khoản đã tồn tại")
                }
                else{
                    contactModel.create(req.body)
                    .then(info => res.json(info))
                    .catch(err => res.json(err))
                }
            }
        )
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

    app.get("/info", async (req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })
    
    //--------- Xử lý quản lý xe ---------///
    app.use('/Car', XeRoute)

    //--------- Xử lý quản lý sổ đặt xe ---------///
    app.use('/Book', SoDatXeRoute);

    //--------- Xử lý quản lý sổ xe (Khách hàng) ---------//
    app.use('/Customer', KhachHangRoute);
    
    //--------- Xử lý quản lý sổ xe (Sổ xe) ---------//
    app.use('/Rent', SoXeRoute)

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}