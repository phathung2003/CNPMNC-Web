import uploadImage from "../../Feature/uploadPicture"
import pushCustomerToDatabase from "../uploadCustomer";
import pushToDatabase from "../uploadForm";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate) {
    e.preventDefault();
    if (!inUploadProgress) {
        setInUploadProgress(true);


        await uploadPicture(formData, CMNDImage, setCMNDProgress, "CMND")
        await uploadPicture(formData, licenseImage, setLicenseProgress, "License")

        var currentdate = new Date();
        formData.IDKH = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();

        if (await pushCustomerToDatabase("CustomerAdd", formData)) {
            formData.IDDon = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();
            if (await pushToDatabase("RentAdd", formData)) {
                navigate("/Rent")
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
