import value from "../../backend/CarManager/carMain"


import axios from 'axios';
import checkUri from "../../backend/checkUri"
const [result, api] = checkUri("CarDelete");


export default function Info() {

    const carInfo = value();

    const onDelete = async (id) => {
        console.log(id)
        try {
            const res = await axios.post(api, { id });
            if (res.data.success) {
                alert(res.data.msg);
                window.location.reload(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <p>Info Pages</p>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Biển Số</th>
                        <th>Số Chỗ</th>
                        <th>Truyền Động</th>
                        <th>Nhiên Liệu</th>
                        <th>Nhiên Liệu Tiêu Hao</th>
                        <th>Mô Tả</th>
                        <th>Số Tiền</th>
                        <th>Hình Ảnh</th>
                        <th>Tình Trạng</th>
                        <th>Xoá</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        carInfo.map(info => {
                            return <tr key={info._id} >
                                <td>{info.ID}</td>
                                <td>{info.BienSo}</td>
                                <td>{info.SoCho}</td>
                                <td>{info.TruyenDong}</td>
                                <td>{info.NhienLieu}</td>
                                <td>{info.NhienLieuTieuHao}</td>
                                <td>{info.MoTa}</td>
                                <td>{info.SoTien}</td>
                                <td><img src={`${info.HinhAnh}`}></img></td>
                                <td>{info.TinhTrang}</td>
                                <td>
                                    <button onClick={(e) => onDelete(info._id)}>Xoá bài</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    );
}