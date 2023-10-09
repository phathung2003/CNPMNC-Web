const check = require("./checkConnection")
const contactModel = require("./models/Contact")

const [result, port, app] = check()

<<<<<<< HEAD

if(result.call()){
    const app = express()
    app.use(express.json())
    app.use(cors())


//               Biến môi trường
    mongoose.connect(database)

    app.post("/main", (req,res) => {
        const { name, email, password} = req.body;
        contactModel.findOne({email : email}).then(
            user => {
                if(user){
                    if(user.email === email){
                        res.json("No")
                    }else{
                        contactModel.create(req.body)
                        .then(info => res.json(info))
                        .catch(err => res.json(err)) 
                        res.json("Yes")                      
                    }
                }
                else{
                    res.json("")
=======
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
>>>>>>> 3c0504d0482b7d57d165999f4f02acd4d8f814f0
                }
            }
        )
    })
<<<<<<< HEAD

    // contactModel.create(req.body)
    // .then(info => res.json(info))
    // .catch(err => res.json(err)) 
    //  res.json("Ok") 
    
=======
    

>>>>>>> 3c0504d0482b7d57d165999f4f02acd4d8f814f0
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
<<<<<<< HEAD
    
=======
>>>>>>> 3c0504d0482b7d57d165999f4f02acd4d8f814f0

    app.get("/info",(req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })


    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}



