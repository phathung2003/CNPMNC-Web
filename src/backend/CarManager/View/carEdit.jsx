import uploadImage from "../../Feature/uploadPicture"
import pushToDatabase from "../uploadCar";
import DeletePicture from '../../Feature/deletePicture';

export default async function handleSubmit(e, formData, image, setFile, setProgress, inUploadProgress, setInUploadProgress) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);

        if (image != null && image != "" && formData.HinhAnh != image && image != "Default") {
            const newUrl = await uploadImage("car", image, setProgress)

            if (await DeletePicture(formData.HinhAnh)) {
                formData.HinhAnh = newUrl
                setFile(formData.HinhAnh);
            }
            else
                await DeletePicture(newUrl)
        }



        formData.ID = formData._id;
        await pushToDatabase("CarEdit", formData)
        setProgress(undefined);
        setInUploadProgress(false);
    }
}