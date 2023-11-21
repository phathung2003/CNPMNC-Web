import axios from 'axios';
import checkUri from "../checkUri"
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { v4 } from 'uuid'

import DeletePicture from '../Feature/deletePicture';

const [result, api] = checkUri("TaiKhoanAdd");

export default async function handleSubmit(e, formData, imageNV, setNVProgress) {
    e.preventDefault();

    if (imageNV != null && imageNV != "" && formData.Avatar != imageNV && imageNV != "Default") {
        await uploadImage(formData, imageNV, setNVProgress);
    }
    // if (imageCMND && imageCMND !== "" && imageCMND !== "Default") {
    //     await uploadImage(formData, imageCMND, setCMNDProgess, 'HinhCMND');
    // }
    pushToDatabase(formData);
}

function uploadImage(formData,image, setProgress) {
    return new Promise((resolve, reject) => {

        if (!image || image === "Default") {
            // Resolve immediately if image is not present or is "Default"
            resolve();
            return;
        }

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
                const DeleteResult = DeletePicture(formData.Avatar);
                if (DeleteResult) {
                    formData.Avatar = url;
                    resolve();
                }
            }).catch((err) => {
                console.error(err);
                    reject(err); // Reject on error getting download URL
            });
        })
    })
}

async function pushToDatabase(formData) {
    if (result) {
        
        var Avatar = formData.Avatar;
        var TenTaiKhoan = formData.TenTaiKhoan; 
        var MatKhau = formData.MatKhau;
        var ChucVu = formData.ChucVu;
        var TinhTrang = formData.TinhTrang;
        var IDNV = formData.IDNV;
        
        console.log(TenTaiKhoan)
        console.log(Avatar)
        console.log(MatKhau)
        console.log(ChucVu)
        console.log(IDNV)
        console.log(IDNV)
        axios.post(api, { TenTaiKhoan, MatKhau, ChucVu, Avatar ,TinhTrang})
            .then((result) => {
                console.log(result)
                console.log(result.data);
                console.log(result.data.IDNV);
                console.log(result.data.Avatar);
                alert("Lưu thành công !");
                window.location.reload(false);
                console.log('Lưu Thành Công !');
            })
            .catch((err) => {
                console.log(err);
                console.log('An error occurred. Please try again later.');
            });
    } else {
        console.log("Link API bị lỗi");
    }
}
