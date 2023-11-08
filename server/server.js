const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const carModel = require("./models/Car");

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
        console.log(req.body)
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
    
    //--------- Xử lý quản lý xe ---------///
    
    app.post('/carAdd', async (req,res) => {
        await carModel.create(req.body)
        .then(() => res.json({success: true, msg: 'Thêm xe thành công'}))
        .catch(() => res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' }))
    })


    app.post('/carDelete', async (req, res) => {
        const {id} = req.body;
        await carModel.deleteOne({ _id : `${id}`})
        .then(() => res.json({ success: true, msg: 'Xoá xe thành công' }))
        .catch(() => res.json({ success: false, msg: 'Xoá xe thất bại. Vui lòng thử lại sau !' }))
    });

    app.post('/carEdit', async (req, res) => {
        const {ID, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang} = req.body;
        await carModel.updateOne({ _id : `${ID}`},{
            $set: {
                TenXe : TenXe,
                BienSo :  BienSo,
                SoCho : SoCho,
                TruyenDong : TruyenDong,
                NhienLieu : NhienLieu,
                MoTa : MoTa,
                SoTien : SoTien,
                HinhAnh : HinhAnh,
                TinhTrang : TinhTrang,
            }
        })
        .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))
        .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))
    });

    app.get("/carMain", async (req,res) => {
        await carModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}



