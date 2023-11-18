import CarInfo from '../../CarManager/Get/carDetail'
import RentInfo from '../Get/bookDetail'

import { format } from 'date-fns';

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

export default async function fetchCar(IDParams, setData, setFormData, setRentData) {
    const data = await CarInfo(IDParams);
    const rentData = await RentInfo(IDParams);
    if (data) {
        await setRentData(rentData)
        await setData(data)
        setFormData({
            _idKH: "",
            IDKH: "",
            TenKH: "",
            NgaySinh: "",
            DiaChi: "",
            SoDienThoai: "",
            CMND: "",
            HinhCMND: defaultPicture,
            BangLai: "",
            HinhBangLai: defaultPicture,

            _idDon: "",
            IDDon: "",
            NgayBatDau: `${format(Date.now(), "yyyy-MM-dd")}`,
            NgayKetThuc: `${format(Date.now(), "yyyy-MM-dd")}`,
            KhachTra: 0,
            TinhTrang: "Đặt trước",
            _idXe: `${IDParams}`,
            
            loading: true,
            searchOn: true
        })
    }
};