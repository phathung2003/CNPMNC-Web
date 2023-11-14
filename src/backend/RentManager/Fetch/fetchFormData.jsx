import RentInfo from '../GET/getInfo'
import { format } from 'date-fns';

export default async function fetchData(IDParams, setData, setFormData, setCMNDImage, setTempCMND, setLicenseImage, setTempLicense, navigate) {
    const data = await RentInfo(IDParams);
    if (data) {
        if (data.IDXe.TinhTrang == "Còn trống") {
            navigate("/Rent")
        }
        else {
            setData(data)
            setFormData({
                //Thông tin Khách Hàng
                _idKH: data.IDKH._id,
                IDKH: data.IDKH.IDKH,
                TenKH: data.IDKH.TenKH,
                NgaySinh: `${data.IDKH.NgaySinh != null ? format(data.IDKH.NgaySinh, "yyyy-MM-dd") : ""}`,
                DiaChi: data.IDKH.DiaChi,
                SoDienThoai: data.IDKH.SoDienThoai,
                CMND: data.IDKH.CMND,
                HinhCMND: data.IDKH.HinhCMND,
                BangLai: data.IDKH.BangLai,
                HinhBangLai: data.IDKH.HinhBangLai,

                //Thông tin xe
                _idXe: data.IDXe._id,

                //Thông tin đơn thuê
                _idDon: data._id,
                IDDon: data.IDDon,
                NgayBatDau: `${format(data.NgayBatDau, "yyyy-MM-dd")}`,
                NgayKetThuc: `${format(data.NgayKetThuc, "yyyy-MM-dd")}`,
                KhachTra: 0,
                TinhTrang: data.TinhTrang,

                loading: true,
            });
            setCMNDImage(`${data.IDKH.HinhCMND}`);
            setTempCMND(`${data.IDKH.HinhCMND}`);
            setLicenseImage(`${data.IDKH.HinhBangLai}`);
            setTempLicense(`${data.IDKH.HinhBangLai}`);
        }
    }
};