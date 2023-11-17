import uploadImage from "../../Feature/uploadPicture"
import pushCustomerToDatabase from "../../RentManager/Post/uploadCustomer";
import pushToDatabase from "../Post/uploadForm";
import updateCustomer from "../../RentManager/updateCustomer";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate, rentList) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);

        if (confirmSave(rentList)) {

            var currentdate = new Date();
            var Pharse2 = false;
            formData.IDDon = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();

            //Người thuê xe cũ
            if (formData._idKH != "") {
                Pharse2 = await updateCustomer(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, "", "")
            }

            //Người thuê xe mới
            else {
                await uploadPicture(formData, CMNDImage, setCMNDProgress, "CMND")
                await uploadPicture(formData, licenseImage, setLicenseProgress, "License")

                var currentdate = new Date();
                formData.IDKH = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();

                Pharse2 = await pushCustomerToDatabase("CustomerAdd", formData)
            }
            if (Pharse2) {
                await pushToDatabase("BookAdd", formData, navigate)
            }

        }
        setInUploadProgress(false);
    }
}

async function uploadPicture(formData, Image, Progress, type) {
    if (Image != null && Image != "" && Image != "Default" && type == "CMND")
        formData.HinhCMND = await uploadImage(type, Image, Progress)
    if (Image != null && Image != "" && Image != "Default" && type == "License")
        formData.HinhBangLai = await uploadImage(type, Image, Progress)
}

function confirmSave(rentList) {
    if (rentList == 0) return true;
    else if (window.confirm("Đã có người đặt xe trong khoảng thời gian này ! \nBạn vẫn muốn tiếp tục tạo đơn không ?")) return true;
    return false;
}

