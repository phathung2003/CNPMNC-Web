import { useParams } from "react-router-dom"
import RentInfo from "../../backend/RentManager/getInfo"
import { useEffect } from "react";
import { useState } from "react";
import { setIn } from "formik";
//---------------------------------------------//
export default function testing() {
    const params = useParams();
    const IDParams = params.id;
    const [data, setData] = useState(null);

    //Transfer from API
    useEffect(() => {
        const fetchData = async () => {
            const result = await RentInfo(IDParams);
            if (result) {setData(result);}
        };
        fetchData();
    }, []);





    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông tin Khách Hàng</h1>
            <p>_idKH: {data.IDKH._id}</p>
            <p>IDKH: {data.IDKH.IDKH}</p>
            <p>HoTen: {data.IDKH.TenKH}</p>
            <p>NgaySinh: {data.IDKH.NgaySinh}</p>

            <p>DiaChi: {data.IDKH.DiaChi}</p>
            <p>SoDienThoai: {data.IDKH.SoDienThoai}</p>
            <p>CMND: {data.IDKH.CMND}</p>

            <p>HinhCMND: {data.IDKH.HinhCMND}</p>
            <p>BangLai: {data.IDKH.HinhBangLai}</p>
            <p>HinhBangLai: {data.IDKH.HinhBangLai}</p>

            <h1>Thông tin xe</h1>
            <p>_idXe: {data.IDXe._id} </p>
            <p>IDXe: {data.IDXe.IDXe}</p>
            <p>TenXe: {data.IDXe.TenXe}</p>
            <p>BienSo: {data.IDXe.BienSo}</p>

            <p>SoCho: {data.IDXe.SoCho}</p>
            <p>TruyenDong: {data.IDXe.TruyenDong}</p>
            <p>NhienLieu: {data.IDXe.NhienLieu}</p>
            <p>MoTa: {data.IDXe.MoTa}</p>
            <p>SoTien: {data.IDXe.SoTien}</p>
            <p>HinhAnh: {data.IDXe.HinhAnh}</p>
            <p>TinhTrang: {data.IDXe.TinhTrang}</p>

            <h1>Thông tin đơn thuê</h1>
            <p>_idDon: {data._id} </p>
            <p>IDDon: {data.IDDon}</p>
            <p>NgayBatDau: {data.NgayBatDau}</p>
            <p>NgayKetThuc: {data.NgayKetThuc}</p>
            <p>TinhTrang: {data.TinhTrang}</p>
            {/* Hiển thị các trường khác nếu cần */}
        </div>
    );

}

