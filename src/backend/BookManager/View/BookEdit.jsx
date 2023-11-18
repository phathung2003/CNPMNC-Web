import updateCustomer from "../../RentManager/updateCustomer";
import pushToDatabase from "../../RentManager/Post/uploadForm";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, setCMNDImage, setLicenseImage, rentList, navigate, type) {
    console.log(rentList)
    e.preventDefault();
    if (!inUploadProgress) {

        if (confirmSave(rentList, type)) {
            setInUploadProgress(true);

            if (await updateCustomer(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, setCMNDImage, setLicenseImage)) {
                if (await pushToDatabase("BookEdit", formData)) {
                    setCMNDProgress(undefined);
                    setLicenseProgress(undefined)
                }
            }
        }
        setInUploadProgress(false);
    }

}

function confirmSave(rentList, type) {
    if (rentList == 0) return true;
    else if (window.confirm("Đã có người đặt xe trong khoảng thời gian này ! \nBạn vẫn muốn tiếp tục tạo đơn không ?")) return true;
    return false;
}