import axios from 'axios';
import checkUri from "./checkUri"
const [result, api] = checkUri("Main");

export default function checkLogin(e, email, password, setError, navigate){
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
                console.log(result.data);
                if (result.data === 'Ok') {
                    navigate('/info');
                } else {
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