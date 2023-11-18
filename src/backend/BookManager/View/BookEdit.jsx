import updateCustomer from "../../RentManager/updateCustomer";
import pushToDatabase from "../../RentManager/Post/uploadForm";
import cancelForm from "../Post/cancelForm";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, setCMNDImage, setLicenseImage, rentList, navigate, type) {
    console.log(rentList)
    e.preventDefault();
    if (!inUploadProgress) {
        if (confirmSave(rentList, type)) {
            setInUploadProgress(true);

            if (await updateCustomer(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, setCMNDImage, setLicenseImage)) {
                if (type == "Cancel") {
                    if (await cancelForm("BookCancel", formData)) { navigate("/Book") }
                }
                else if (await pushToDatabase("RentEdit", formData)) {
                    setCMNDProgress(undefined);
                    setLicenseProgress(undefined)
                }
            }
        }
        setInUploadProgress(false);
    }

}

function confirmSave(rentList, type) {
    if (type === "Cancel") return true;
    else if (rentList == 0) return true;
    else if (window.confirm("Đã có người đặt xe trong khoảng thời gian này ! \nBạn vẫn muốn tiếp tục tạo đơn không ?")) return true;
    return false;
}