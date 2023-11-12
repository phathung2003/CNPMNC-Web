import uploadImage from "../../Feature/uploadPicture"
import pushCustomerToDatabase from "../uploadCustomer";
import pushToDatabase from "../uploadForm";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate) {
    e.preventDefault();
    if (!inUploadProgress) {
        setInUploadProgress(true);

        await uploadPicture(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress)

        var currentdate = new Date();
        formData.IDKH = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();
        if (await pushCustomerToDatabase("CustomerAdd", formData)) {
            console.log("Pharse 1 Completed")

            if (await pushToDatabase("RentAdd", formData)) {
                navigate("/Rent")
            }
        }
        setInUploadProgress(false);
    }
}

async function uploadPicture(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress) {
    if (CMNDImage != null && CMNDImage != "" && CMNDImage != "Default")
        formData.CMNDImage = await uploadImage("CMND", CMNDImage, setCMNDProgress)

    if (licenseImage != null && licenseImage != "" && licenseImage != "Default")
        formData.licenseImage = await uploadImage("License", licenseImage, setLicenseProgress)
}
