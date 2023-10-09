import value from "../../backend/infoProcess"


export default function Info() {

    const userInfo = value();

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
                            return <tr key={info._id} >
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