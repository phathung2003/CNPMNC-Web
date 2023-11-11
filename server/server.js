const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const XeModel = require("./models/Xe");
const KhachHangModel = require("./models/KhachHang");

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

    app.get("/info",(req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })
    
    //--------- Xử lý quản lý xe ---------///
    
    app.post('/CarAdd', async (req,res) => {
        await XeModel.create(req.body)
        .then(() => res.json({success: true, msg: 'Thêm xe thành công'}))
        .catch(() => res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' }))
    })


    app.post('/CarDelete', async (req, res) => {
        const {id} = req.body;
        await XeModel.deleteOne({ _id : `${id}`})
        .then(() => res.json({ success: true, msg: 'Xoá xe thành công' }))
        .catch(() => res.json({ success: false, msg: 'Xoá xe thất bại. Vui lòng thử lại sau !' }))
    });

    app.post('/CarEdit', async (req, res) => {
        const {IDXe, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang} = req.body;
        await XeModel.updateOne({ _id : `${IDXe}`},{
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

    app.get("/CarMain", async (req,res) => {
        await XeModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })

    //--------- Xử lý quản lý sổ xe ---------///
    app.post('/CustomerAdd', async (req,res) => {
        await KhachHangModel.create(req.body)
        .then(() => res.json({success: true, msg: 'Thêm xe thành công'}))
        .catch(() => res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' }))
    })

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}



