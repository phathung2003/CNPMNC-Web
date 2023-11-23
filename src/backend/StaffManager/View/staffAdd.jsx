import uploadImage from "../../Feature/uploadPicture"
import pushEmployee from "../Post/uploadEmployee";
import pushAccount from "../Post/uploadAccount";
import IDGenerate from "../../Dashboard/getID";

export default async function handleSubmit(e, formData, image, setProgress, inUploadProgress, setInUploadProgress) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);
        if (image != null && image != "" && image != "Default")
            formData.Avatar = await uploadImage("Employee", image, setProgress)

        var [ID, Current] = await IDGenerate(formData.ChucVu);
        
        formData.IDNV = ID;
        formData.SoLuong = Current;
        formData.TenTaiKhoan = ID;

        if (await pushEmployee("StaffAdd", formData)) {
            if (await pushAccount("AccountAdd", formData)) {
                window.location.reload(false);
            }
        }


        setInUploadProgress(false);
    }
}

