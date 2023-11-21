import axios from 'axios';
import checkUri from "../../checkUri"

export default async function uploadCar(apiType, formData) {
    const myPromise = new Promise(
        function (resolve) {

            const [result, api] = checkUri(apiType);

        if (result) {
            var IDXe = formData.IDXe;
            var TenXe = formData.TenXe;
            var BienSo = formData.BienSo;
            var SoCho = formData.SoCho;
            var TruyenDong = formData.TruyenDong;
            var NhienLieu = formData.NhienLieu;
            var MoTa = formData.MoTa;
            var SoTien = formData.SoTien;
            var HinhAnh = formData.HinhAnh;
            var TinhTrang = formData.TinhTrang;
            var IDDon = formData.IDDon;

           
        axios.post(`${api}/${formData._id}/${formData.SoLuong}`, { IDXe, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang, IDDon })
            .then((result) => {
                alert(result.data.msg)
                console.log(result.data.msg);
                resolve(result.data.success);
            })
            .catch((err) => {
                alert("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !")
                console.log(err);
                console.log("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !");
                resolve(false);
            });
        }
        else{
            alert("Đường dẫn kết nối bị lỗi!")
            console.log("Đường dẫn API bị lỗi")
            resolve(false);
        }
        });
    return myPromise;
}