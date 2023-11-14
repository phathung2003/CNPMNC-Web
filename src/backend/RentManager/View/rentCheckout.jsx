
import axios from 'axios';
import checkUri from "../../checkUri"
const [result, api] = checkUri("RentCheckout");
export default async function handleSubmit(e, formData, inUploadProgress, setInUploadProgress, navigate, originalMoney, totalLeft) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);
        if (confirmSave(totalLeft)) {
            try {
                if (result) {
                    formData.KhachTra += originalMoney
                    axios.post(`${api}/${formData._idXe}/${formData._idDon}`, formData)
                        .then((result) => {
                            alert(result.data.msg)
                            console.log(result.data.msg);
                            navigate("/Rent")
                        })
                        .catch((err) => {
                            alert("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !")
                            console.log(err);
                            console.log("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !");
                        });
                }

                else {
                    alert("Đường dẫn kết nối bị lỗi!")
                    console.log("Đường dẫn API bị lỗi")
                    resolve(false);
                }
            } catch { alert("Đường dẫn kết nối bị lỗi!") }
        }


        setInUploadProgress(false);
    }
}

function confirmSave(totalLeft) {
    if (totalLeft <= 0) return true;
    else if (window.confirm("Khách hàng vẫn còn thiếu " + totalLeft.toLocaleString('vi-VN') + "đ tiền thuê. \nBạn vẫn muốn tiếp tục thanh toán ?")) return true;
    return false;
}