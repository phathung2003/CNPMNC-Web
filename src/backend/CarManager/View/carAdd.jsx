import uploadImage from "../../Feature/uploadPicture"
import pushToDatabase from "../Post/uploadCar";
import IDGenerate from "../../Dashboard/getID";

export default async function handleSubmit(e, formData, image, setProgress, inUploadProgress, setInUploadProgress) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);
        if (image != null && image != "" && image != "Default")
            formData.HinhAnh = await uploadImage("Car", image, setProgress)

        var [ID, Current] = await IDGenerate(formData.SoCho);
        formData.IDXe = ID;
        formData.SoLuong = Current;

        if (await pushToDatabase("CarAdd", formData))
            window.location.reload(false);

        setInUploadProgress(false);
    }
}

