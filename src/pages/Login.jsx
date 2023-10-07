import { Link } from "react-router-dom";


export default function Login() {
    return (
        <div>
            <div>
                <h1>Login</h1>
                <div>
                    <input type="email"/>
                    <label htmlFor="">Your email</label>
                </div>
                <div>
                    <input type="email" />
                    <label htmlFor="">Your email</label>
                </div>
                <div>
                    <input type="checkbok" name="" id="" />
                    <label htmlFor="Remember me"></label>
                    <span>Quên mật khẩu?</span>
                </div>
                <button type="submit">Login</button>
                <div>
                    <span>Người dùng mới? <Link to='/Register'>Create an Account</Link></span>
                </div>
            </div>
        </div>
    )
}
