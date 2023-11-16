import updateCustomer from "../../RentManager/updateCustomer";
import pushToDatabase from "../../RentManager/Post/uploadForm";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate, TienCoc) {
    e.preventDefault();

    if (!inUploadProgress) {

        setInUploadProgress(true);

        if (formData.KhachTra == "")
            formData.KhachTra = 0

        if (confirmSave(formData, TienCoc)) {
            formData.TinhTrang = "Hoạt động"
            if (await updateCustomer(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, "", "")) {
                if (await pushToDatabase("BookCreateRent", formData)) {
                    navigate(`/Rent/Detail/${formData._idDon}`)
                }
            }
        }
        setInUploadProgress(false);
    }
}

function confirmSave(formData, TienCoc) {
    let ConLai = TienCoc - formData.KhachTra
    if (ConLai <= 0) return true;

    else if (window.confirm("Khách hàng vẫn còn thiếu " + ConLai.toLocaleString('vi-VN') + "đ tiền cọc trước. \nBạn vẫn muốn tiếp tục tạo đơn ?")) return true;

    return false;
}

