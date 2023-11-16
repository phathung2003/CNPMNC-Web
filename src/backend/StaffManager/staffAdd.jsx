import axios from 'axios';
import checkUri from "../checkUri"
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

const [result, api] = checkUri("StaffAdd");

export default async function handleSubmit(e, formData, imageNV, imageCMND, setNVProgress, setCMNDProgess) {
    e.preventDefault();

    if (imageNV && imageNV !== "" && imageNV !== "Default") {
        await uploadImage(formData, imageNV, setNVProgress, 'Avatar');
    }
    if (imageCMND && imageCMND !== "" && imageCMND !== "Default") {
        await uploadImage(formData, imageCMND, setCMNDProgess, 'HinhCMND');
    }

    pushToDatabase(formData);
}

function uploadImage(formData, image, setProgress, formFieldKey) {
    return new Promise((resolve, reject) => {
        if (!image || image === "Default") {
            // Resolve immediately if image is not present or is "Default"
            resolve();
            return;
        }

        const imageRef = ref(storage, `staff/${Date.now() + v4()}`);
        const progress = uploadBytesResumable(imageRef, image);

        progress.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log("Upload progress: " + progress + "%");
                setProgress(progress);
            },
            (err) => {
                console.error(err);
                reject(err); // Reject on error
            },
            () => {
                getDownloadURL(progress.snapshot.ref).then(url => {
                    // Use formFieldKey to set the appropriate form field
                    formData[formFieldKey] = url;
                    resolve(); // Resolve on successful upload
                }).catch((err) => {
                    console.error(err);
                    reject(err); // Reject on error getting download URL
                });
            }
        );
    });
}

function pushToDatabase(formData) {
    if (result) {
        var currentdate = new Date();
        var IDNV = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds()

        var Avatar = formData.Avatar;
        var TenNV = formData.TenNV;
        var NgaySinh = formData.NgaySinh;
        var DiaChi = formData.DiaChi;
        var SoDienThoai = formData.SoDienThoai;
        var CMND = formData.CMND;
        var HinhCMND = formData.HinhCMND;

        axios.post(api, { IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND })
            .then((result) => {
                console.log(result.data.IDNV)
                console.log(result.data);
                console.log(result.data.Avatar);
                console.log(result.data.HinhCMND);
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
