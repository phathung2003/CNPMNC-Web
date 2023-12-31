import BookInfo from '../../RentManager/Get/getInfo'
import RentInfo from '../Get/bookDetail'

import { format } from 'date-fns';

export default async function fetchData(IDXe, IDDon, setData, setFormData, setCMNDImage, setTempCMND, setLicenseImage, setTempLicense, setRentData) {
    const data = await BookInfo(IDDon);
    const rentData = await RentInfo(IDXe, IDDon)
    if (data && rentData) {
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
            KhachTra: data.KhachTra,
            TinhTrang: data.TinhTrang,

            SoLuong: 0,
            SLDatTruoc: 0,

            loading: true,
        });
        setCMNDImage(`${data.IDKH.HinhCMND}`);
        setTempCMND(`${data.IDKH.HinhCMND}`);
        setLicenseImage(`${data.IDKH.HinhBangLai}`);
        setTempLicense(`${data.IDKH.HinhBangLai}`);
        setRentData(rentData)
    }
};