import axios from 'axios';
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

import DeletePicture from '../Feature/deletePicture';

const [result, api] = checkUri("StaffEdit");

export default async function handleSubmit(e, formData, imageNV, setNVProgress, imageCMND, setCMNDProgess) {
    e.preventDefault();

    if (imageNV != null && imageNV != "" && formData.Avatar != imageNV && imageNV != "Default") {
        await uploadImage(formData, imageNV, setNVProgress, 'Avatar');
    } if (imageCMND != null && imageCMND != "" && formData.HinhCMND != imageCMND && imageCMND != "Default") {
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
                    const DeleteResult = DeletePicture(formData[formFieldKey]);
                    if (DeleteResult) {
                        formData[formFieldKey] = url;
                        resolve();
                    }
                }).catch((err) => {
                    console.error(err);
                    reject(err); // Reject on error getting download URL
                });
            })
    })
}

function pushToDatabase(formData) {
    if (result) {
        var IDNV = formData._id;

        var Avatar = formData.Avatar;
        var TenNV = formData.TenNV;
        var NgaySinh = formData.NgaySinh;

        const DeleteResult = DeletePicture(formData[formFieldKey]);
        try {
            if (DeleteResult) {
                formData[formFieldKey] = url;
                resolve();
            }
        }).catch ((err) => {
            console.error(err);
            reject(err); // Reject on error getting download URL
        });
    })
})
}

function pushToDatabase(formData) {
    if (result) {
        var IDNV = formData._id;

        var Avatar = formData.Avatar;
        var TenNV = formData.TenNV;
<<<<<<< HEAD
        var NgaySinh = formData.NgaySinh;
>>>>>>> 84aaed1 (fix mainStaff)
=======
        var NgaySinh = formData.NgaySinh;
>>>>>>> f3f017d (fix edit staff and add staff image)
        var DiaChi = formData.DiaChi;
        var SoDienThoai = formData.SoDienThoai;
        var CMND = formData.CMND;
        var HinhCMND = formData.HinhCMND;

<<<<<<< HEAD
<<<<<<< HEAD

        axios.post(api, { IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND })
            .then((result) => {
                console.log(result.data.TenNV)
                console.log(result.data);
                alert("Cập nhật thành công !");
                window.location.reload(true);
                console.log('Cập nhật Thành Công !');
            })
            .catch((err) => {
                console.error(err);
                console.log('An error occurred. Please try again later.');
            });
    } else {
        console.log("Link API bị lỗi");
    }
}
=======
        axios
            .post(api, { ID, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND})
=======

        axios.post(api, { IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND })
>>>>>>> f3f017d (fix edit staff and add staff image)
            .then((result) => {
    console.log(result.data.TenNV)
    console.log(result.data);
    alert("Cập nhật thành công !");
    window.location.reload(true);
    console.log('Cập nhật Thành Công !');
})
    .catch((err) => {
        console.error(err);
        console.log('An error occurred. Please try again later.');
    });
    } else {
    console.log("Link API bị lỗi");
}
}
<<<<<<< HEAD

>>>>>>> 84aaed1 (fix mainStaff)
=======
>>>>>>> f3f017d (fix edit staff and add staff image)
import axios from 'axios';
import checkUri from "../checkUri";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

import DeletePicture from '../Feature/deletePicture';

const [result, api] = checkUri("StaffEdit");

export default async function handleSubmit(e, formData, imageNV, setNVProgress, imageCMND, setCMNDProgess) {
    e.preventDefault();

    if (imageNV != null && imageNV != "" && formData.Avatar != imageNV && imageNV != "Default") {
        await uploadImage(formData, imageNV, setNVProgress, 'Avatar');
    } if (imageCMND != null && imageCMND != "" && formData.HinhCMND != imageCMND && imageCMND != "Default") {
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
                    const DeleteResult = DeletePicture(formData[formFieldKey]);
                    if (DeleteResult) {
                        formData[formFieldKey] = url;
                        resolve();
                    }
                }).catch((err) => {
                    console.error(err);
                    reject(err); // Reject on error getting download URL
                });
            })
    })
}

function pushToDatabase(formData) {
    if (result) {
        var IDNV = formData._id;

        var Avatar = formData.Avatar;
        var TenNV = formData.TenNV;
        var NgaySinh = formData.NgaySinh;
        var DiaChi = formData.DiaChi;
        var SoDienThoai = formData.SoDienThoai;
        var CMND = formData.CMND;
        var HinhCMND = formData.HinhCMND;


        axios.post(api, { IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND })
            .then((result) => {
                console.log(result.data.TenNV)
                console.log(result.data);
                alert("Cập nhật thành công !");
                window.location.reload(true);
                console.log('Cập nhật Thành Công !');
            })
            .catch((err) => {
                console.error(err);
                console.log('An error occurred. Please try again later.');
            });
    } else {
        console.log("Link API bị lỗi");
    }
}
import axios from 'axios';
import checkUri from "../checkUri"
const [result, api] = checkUri("StaffEdit");

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
            .post(api, { ID, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND })
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

