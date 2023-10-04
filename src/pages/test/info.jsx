import axios from "axios";
import { useEffect, useState } from "react";

const api = "http://localhost:3001/info"

export default function Info() {
    const [userInfo, setInfo] = useState([])

    useEffect(() => {
        axios.get(api)
            .then(info => setInfo(info.data))
            .catch(err => console.log(err))
    }, [])

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