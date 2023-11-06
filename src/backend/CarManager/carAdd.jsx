import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("Car");

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";
let HinhAnh = null;

const TinhTrang = "Còn trống";

export default function handleSubmit(e, BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien, imageFile, setProgress) {
    e.preventDefault();

    if (imageFile != null && imageFile != "")
        uploadImage(BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien, imageFile, setProgress);
    else {
        HinhAnh = defaultPicture
        pushToDatabase(BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien)
    }
}

function uploadImage(BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien, image, setProgress) {

    const imageRef = ref(storage, `car/${Date.now() + v4()}`)

    const progress = uploadBytesResumable(imageRef, image)

    //Xem tiến trình tải
    progress.on("state_changed", (snapshot) => {

        //Lấy tỷ lệ phần trăm
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
        console.log("Tiến trình tải: " + progress + "%")
        setProgress(progress);
    }, (err) => console.log(err),

        //Sau khi tải xong (Lấy link)
        () => {
            getDownloadURL(progress.snapshot.ref).then(url => {
                HinhAnh = url;
                pushToDatabase(BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien);
            })
        })
}


function pushToDatabase(BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien) {
    if (result) {
        var currentdate = new Date();
        var current = [currentdate.getDate(), currentdate.getMonth() + 1, currentdate.getFullYear() % 100, currentdate.getHours(), currentdate.getMinutes(), currentdate.getSeconds()]
        let ID = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds()
        console.log(ID)

        axios
            .post(api, { ID, BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien, HinhAnh, TinhTrang })
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