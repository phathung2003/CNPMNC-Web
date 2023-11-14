import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("StaffEdit");

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { v4 } from 'uuid'

import DeletePicture from '../Feature/deletePicture';

export default function handleSubmit(e, formData, image, setProgress) {
    e.preventDefault();

    if (image != null && image != "" && formData.HinhAnh != image && image != "Default")
        uploadImage(formData, image, setProgress);
    else {
        pushToDatabase(formData)
    }
}

function uploadImage(formData, image, setProgress) {

    const imageRef = ref(storage, `staff/${Date.now() + v4()}`)

    const progress = uploadBytesResumable(imageRef, image)

    //Xem tiến trình tải
    progress.on("state_changed", (snapshot) => {
        //Lấy tỷ lệ phần trăm
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log("Tiến trình tải: " + progress + "%")
        setProgress(progress);
    }, (err) => console.log(err),

        //Sau khi tải xong (Lấy link)
        () => {
            getDownloadURL(progress.snapshot.ref).then(url => {
                const DeleteResult = DeletePicture(formData.HinhAnh);
                if (DeleteResult) {
                    formData.HinhAnh = url;
                    pushToDatabase(formData)
                };
            })
        })
}


function pushToDatabase(formData) {
    if (result) {

        var ID = formData._id;
        var Avatar = formData.Avatar;
        var TenNV = formData.TenNV;
        var NgaySinh = formData.NgaySinh; 
        var DiaChi = formData.DiaChi;
        var SoDienThoai = formData.SoDienThoai;
        var CMND = formData.CMND;
        var HinhCMND = formData.HinhCMND;

        axios
            .post(api, { ID, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND})
            .then((result) => {
                console.log(result.data);
                alert("Lưu thành công !")
                console.log('Lưu Thành Công !');
            })
            .catch((err) => {
                console.log(err);
                console.log('An error occurred. Please try again later.');
            });
    }
    else
        console.log("Link API bị lỗi")
}

