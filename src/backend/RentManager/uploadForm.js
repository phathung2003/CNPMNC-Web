import axios from 'axios';
import checkUri from "../checkUri"

export default async function uploadForm(apiType, formData) {
    const myPromise = new Promise(
        function (resolve) {
            try{
    
                const [result, api] = checkUri(apiType);

                if (result) {
                    var IDDon = formData.IDDon;
                    var NgayBatDau = new Date(formData.NgayBatDau).getTime();
                    var NgayKetThuc = new Date(formData.NgayKetThuc).getTime();
                    var TinhTrang = "Hoạt động";
                    var IDXe = formData.IDXe;
                    var IDKH = formData._idKH

                    axios.post(`${api}/${formData._idDon}`, {IDDon, NgayBatDau, NgayKetThuc, TinhTrang, IDXe, IDKH})
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