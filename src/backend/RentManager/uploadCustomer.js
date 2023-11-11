import axios from 'axios';
import checkUri from "../checkUri"

export default async function uploadCar(apiType, formData) {

    const myPromise = new Promise(
        function (resolve) {
            try{
                const [result, api] = checkUri(apiType);

                if (result) {
                    var IDKH = formData.IDKH;
                    var TenKH = formData.TenKH;
                    var NgaySinh = new Date(formData.NgaySinh).getTime();
                    var DiaChi = formData.DiaChi;
                    var SoDienThoai = formData.SoDienThoai
                    var CMND = formData.CMND;
                    var HinhCMND = formData.HinhCMND
                    var BangLai = formData.BangLai;
                    var HinhBangLai = formData.HinhBangLai;
     
                    axios.post(api, { IDKH, TenKH, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND, BangLai, HinhBangLai})
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
        }catch{resolve(false);}
    });

    return myPromise;
}