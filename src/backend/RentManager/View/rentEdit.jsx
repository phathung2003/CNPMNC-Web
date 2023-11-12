import uploadImage from "../../Feature/uploadPicture"
import pushCustomerToDatabase from "../uploadCustomer";
import pushToDatabase from "../uploadForm";
import DeletePicture from '../../Feature/deletePicture';

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, setCMNDImage, setLicenseImage) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);

        await uploadPicture(formData, CMNDImage, setCMNDProgress, setCMNDImage, "CMND")
        await uploadPicture(formData, licenseImage, setLicenseProgress, setLicenseImage, "License")

        if (await pushCustomerToDatabase("CustomerEdit", formData)) {
            if (await pushToDatabase("RentEdit", formData)) {
                setCMNDProgress(undefined);
                setLicenseProgress(undefined)
            }
        }
        setInUploadProgress(false);
    }
}


async function uploadPicture(formData, Image, Progress, setReset, type) {
    if (Image != null && Image != "" && formData.HinhCMND != Image && type == "CMND") {
        const newUrl = await uploadImage(type, Image, Progress)

        if (await DeletePicture(formData.HinhCMND)) {
            formData.HinhCMND = newUrl

            setReset(formData.HinhCMND);
        }
        else
            await DeletePicture(newUrl)
    }

    if (Image != null && Image != "" && formData.HinhBangLai != Image && type == "License") {
        const newUrl = await uploadImage(type, Image, Progress)

        if (await DeletePicture(formData.HinhBangLai)) {
            formData.HinhBangLai = newUrl
            setReset(formData.HinhBangLai);
        }
        else
            await DeletePicture(newUrl)
    }
    console.log(formData.HinhCMND)
}
