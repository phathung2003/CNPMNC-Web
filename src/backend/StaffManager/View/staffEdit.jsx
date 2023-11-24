import uploadImage from "../../Feature/uploadPicture"
import DeletePicture from '../../Feature/deletePicture';
import pushEmployee from "../Post/uploadEmployee";
import pushAccount from "../Post/uploadAccount";
import IDGenerate from "../../Dashboard/getID";

export default async function handleSubmit(e, formData, image, setFile, setProgress, inUploadProgress, setInUploadProgress) {
    e.preventDefault();
    if (!inUploadProgress) {
        setInUploadProgress(true);
        console.log(formData.Avatar)

        if (image != null && image != "" && formData.Avatar != image && image != "Default") {
            const newUrl = await uploadImage("Employee", image, setProgress)
            console.log(newUrl)
            if (await DeletePicture(formData.Avatar)) {
                formData.Avatar = newUrl
                setFile(newUrl);
            }
            else
                await DeletePicture(newUrl)
        }

        if (formData.tempChucVu != formData.ChucVu) {
            var [ID, Current] = await IDGenerate(formData.ChucVu);
            formData.IDNV = ID;
            formData.SoLuong = Current;
        }

        if (await pushEmployee("StaffEdit", formData)) {
            if (await pushAccount("AccountEdit", formData)) {
                window.location.reload(false);
            }
        }
        setProgress(undefined);
        setInUploadProgress(false);

        // window.location.reload(false);
    }
}