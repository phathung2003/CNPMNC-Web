import { storage } from "../firebase";

import { ref, deleteObject } from "firebase/storage";

import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("CarDelete");

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default async function onDelete(id, HinhAnh) {
    try {
        if (window.confirm("Bạn có muốn xoá xe này ?")) {
            if (result) {
                const res = await axios.post(api, { id });
                if (res.data.success) {
                    // Xoá file hình trong Firebase
                    const deleteResult = await DeletePicture(HinhAnh)
                    alert(res.data.msg);
                    window.location.reload(false);
                }
            }
            else
                console.log("Link API bị lỗi")
        }
    }
    catch (err) {
        console.error(err);
    }
}

function DeletePicture(image) {
    const desertRef = ref(storage, image);

    if (image != defaultPicture) {
        deleteObject(desertRef).then(() => {
            console.log("Xoá thành công")
            return true;
        }).catch((error) => { console.log("Xoá thất bại"); return false; });
    }
}