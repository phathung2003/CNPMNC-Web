import CarInfo from '../../CarManager/Get/carDetail'
import { format } from 'date-fns';

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

export default async function fetchCar(IDParams, setData, setFormData, navigate, page) {
    const data = await CarInfo(IDParams);
    if (data) {
        if (data.TinhTrang != "Còn trống" && page === "Rent")
            navigate(`/Rent/Detail/${data.IDDon._id}`)
        else {
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
                SoLuong: 0,
                _idXe: `${IDParams}`,
                TinhTrang: "Hoạt động",
                loading: true,
                searchOn: true
            })
        }
    }
};