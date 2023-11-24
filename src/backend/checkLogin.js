import axios from 'axios';
import checkUri from "./checkUri"
const [result, api] = checkUri("Main");

export default function checkLogin(e, email, password, setError, setLogin,setName, setRole){
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
        setError('Hãy nhập thông tin đầy đủ.')
        return;
    }
    
    if (result) {
        axios 
            .post(api, { email, password })
            .then((result) => {
                if (result.data.TenTaiKhoan === email && result.data.MatKhau === password) {
                    setLogin(true);
                    setName(result.data.IDNV.TenNV);
                    setRole(result.data.ChucVu);
                } 
                else {
                    setError('Mật khẩu hoặc tài khoản sai. Hãy nhập lại.');
                }
            })
            .catch((err) => {
                console.log(err);
                setError('An error occurred. Please try again later.');
            });
    }
    else {setError('F12 để biết thông tin')}
};