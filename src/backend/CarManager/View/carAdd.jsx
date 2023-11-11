import uploadImage from "../../Feature/uploadPicture"
import pushToDatabase from "../uploadCar";

export default async function handleSubmit(e, formData, image, setProgress, inUploadProgress, setInUploadProgress) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);
        if (image != null && image != "" && image != "Default")
            formData.HinhAnh = await uploadImage("Car", image, setProgress)

        var currentdate = new Date();
        formData.IDXe = currentdate.getDate() * 86400 + (currentdate.getMonth() + 1) * 2678400 + currentdate.getFullYear() * 32140800 + currentdate.getHours() * 3600 + currentdate.getMinutes() * 60 + currentdate.getSeconds();

        if (await pushToDatabase("CarAdd", formData))
            window.location.reload(false);

        setInUploadProgress(false);
    }
}

