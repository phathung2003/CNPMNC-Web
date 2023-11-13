import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("CarDelete");

import DeletePicture from '../Feature/deletePicture';

export default async function onDelete(id, HinhAnh) {
    try {
        if (window.confirm("Bạn có muốn xoá xe này ?")) {
            if (await deleteCar(id)) {

                // Xoá file hình trong Firebase
                await DeletePicture(HinhAnh)
                window.location.reload(false);
            }
        }
    }
    catch (err) {
        alert("Xoá xe thất bại. Vui lòng thử lại sau !")
        console.error(err);
    }
}

async function deleteCar(id) {
    const myPromise = new Promise(
        function (resolve) {
            if (result) {
                axios.post(api, { id }).then((result) => {
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
            else {
                alert("Đường dẫn kết nối bị lỗi!")
                console.log("Đường dẫn API bị lỗi")
                resolve(false);
            }
        });
    return myPromise;
}
