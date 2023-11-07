import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("CarEdit");

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid'

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default function handleSubmit(e, formData, image, setProgress) {
    e.preventDefault();

    if (image != null && image != "" && formData.HinhAnh != image && image != "Default")
        uploadImage(formData, image, setProgress);
    else {
        pushToDatabase(formData)
    }
}

function uploadImage(formData, image, setProgress) {

    const imageRef = ref(storage, `car/${Date.now() + v4()}`)

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
                console.log(formData.HinhAnh)
                const DeleteResult = DeletePicture(formData.HinhAnh);
                if (DeleteResult) {
                    formData.HinhAnh = url;
                    pushToDatabase(formData)
                }
                ;
                // }
            })
        })
}


function pushToDatabase(formData) {
    if (result) {

        var ID = formData._id;
        var TenXe = formData.TenXe;
        var BienSo = formData.BienSo;
        var SoCho = formData.SoCho;
        var TruyenDong = formData.TruyenDong;
        var NhienLieu = formData.NhienLieu;
        var MoTa = formData.MoTa;
        var SoTien = formData.SoTien;
        var HinhAnh = formData.HinhAnh;
        var TinhTrang = formData.TinhTrang;

        axios
            .post(api, { ID, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang })
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

async function DeletePicture(image) {
    const desertRef = ref(storage, image);

    if (image != defaultPicture) {
        deleteObject(desertRef).then(() => {
            console.log("Xoá thành công")
            return true;
        }).catch((error) => { console.log("Xoá thất bại"); return false; });
    }
}