import CarInfo from '../Get/carDetail'

export default async function fetchCar(IDParams, setFormData, setFile, setTemp) {
    const data = await CarInfo(IDParams);
    if (data) {
        setFormData({
            _id: data._id,
            IDXe: data.IDXe,
            TenXe: data.TenXe,
            BienSo: data.BienSo,

            SoCho: data.SoCho,
            SoChoTemp: data.SoCho,

            TruyenDong: data.TruyenDong,
            NhienLieu: data.NhienLieu,
            MoTa: data.MoTa,
            SoTien: data.SoTien,
            HinhAnh: data.HinhAnh,
            TinhTrang: data.TinhTrang,
            IDDon: data.IDDon,

            SoLuong: 0,

            loading: true
        })
        setFile(data.HinhAnh)
        setTemp(data.HinhAnh)
    }
};