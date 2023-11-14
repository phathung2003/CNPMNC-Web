import axios from 'axios';
import checkUri from "../checkUri"

export default async function uploadForm(apiType, formData) {
    const myPromise = new Promise(
        function (resolve) {
            try{
    
                const [result, api] = checkUri(apiType);
                // _id: `${location.state._id}`,
                // IDNV: `${location.state.IDNV}`,
                // TenNV: `${location.state.TenNV}`,
                // NgaySinh: `${location.state.NgaySinh}`,
                // DiaChi: `${location.state.DiaChi}`,
                // CMND: `${location.state.CMND}`,
                // SoDienThoai: `${location.SoDienThoai}`,
                // HinhCMND: `${location.state.HinhCMND}`,
                // Avatar: `${location.state.Avatar}`
                if (result) {
                    var IDNV = formData.IDNV;
                    var TenNV = formData.TenNV
                    var NgaySinh = formData.NgaySinh
                    var DiaChi = formData.DiaChi;
                    var CMND = formData.CMND;
                    var SoDienThoai = formData.SoDienThoai;
                    var HinhCMND = formData.HinhCMND;
                    var Avatar = formData.Avatar;

                    axios
                    .post(api, { IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND})
                    .then((result) => {
                        
                        console.log(result.data.Avatar)
                        console.log(result.data.HinhCMND)
                        alert("Lưu thành công !")
                        window.location.reload(false);
                        console.log('Lưu Thành Công !');
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
        }catch{resolve(false);}
    });

    return myPromise;
}