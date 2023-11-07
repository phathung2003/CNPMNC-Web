import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("CarDelete");

import DeletePicture from '../Feature/deletePicture';

export default async function onDelete(id, HinhAnh) {
    try {
        if (window.confirm("Bạn có muốn xoá xe này ?")) {
            if (result) {
                const res = await axios.post(api, { id });
                if (res.data.success) {
                    // Xoá file hình trong Firebase
                    DeletePicture(HinhAnh)
                    alert(res.data.msg);
                    window.location.reload(false);
                }
            }
            else
                console.log("Link API bị lỗi")
        }
    }
    catch (err) { console.error(err); }
}

