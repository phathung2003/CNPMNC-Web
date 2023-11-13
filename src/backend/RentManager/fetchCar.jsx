import CarInfo from '../CarManager/carInfo'
import { format } from 'date-fns';

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

export default async function fetchCar(IDParams, setData, setFormData, navigate) {
    const data = await CarInfo(IDParams);
    if (data) {
        if (data.TinhTrang != "Còn trống")
            navigate(`/Rent/Detail/${data.IDDon._id}`)
        else {
            await setData(data)
            const a = {
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
                TraTruoc: 0,
                _idXe: `${IDParams}`,
                loading: true
            }
            setFormData(a)
        }
    }
};