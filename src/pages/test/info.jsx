import axios from "axios";
import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_INFO

export default function Info() {
    const [userInfo, setInfo] = useState([])

<<<<<<< HEAD
    if (api !== undefined) {
        useEffect(() => {
            axios.get(api)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err))
        }, [])
    }
    else {
        console.log("Bạn thiếu file .env hoặc file .env không hợp lệ để truyền dữ liệu")
    }
=======
    useEffect(() => {
        axios.get(api)
            .then(info => setInfo(info.data))
            .catch(err => console.log(err))
    }, [])
>>>>>>> 974def3 (Save Login Progress)

    return (
        <div>
            <p>Info Pages</p>

            <table>
                <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        userInfo.map(info => {
                            return <tr>
                                <td>{info.name}</td>
                                <td>{info.email}</td>
                                <td>{info.password}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    );
}