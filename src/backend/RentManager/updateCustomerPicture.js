import uploadImage from "../Feature/uploadPicture"
import DeletePicture from '../Feature/deletePicture';

export default async function updateCustomerPicture(formData, Image, Progress, setReset, type) {
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
}