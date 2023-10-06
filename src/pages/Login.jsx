import { Link } from "react-router-dom";
import App from "../App";

export default function Login() {
    return (
        <div >
            
            <div className="bg-stale-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filler backdrop-blur-sm bg-opacity-30 relative" >
                <h1 className="text-4xl text-whitefont-bold text-center md-6">Đăng nhập</h1>
                <form action="">
                <div className="relavite my-4">
                <label htmlFor="" >Email của bạn</label>
                    <input type="email" className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-non focus:ring-0 focus:text-black focus:border-blue-600 peer"/>
                    
                </div>
                <div className="relavite my-4" >
                <label htmlFor="" >Mật khẩu</label>
                    <input type="email" className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-non focus:ring-0 focus:text-black focus:border-blue-600 peer"/>
                    
                </div>
                <div>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="Remember me" ></label>
                    <span>Quên mật khẩu?</span>
                </div>
                <button type="submit">Login</button>
                <div>
                    <span>Người dùng mới? <Link to='/Register'>Create an Account</Link></span>
                </div>
                </form>
            </div>
        </div>
    )
}
