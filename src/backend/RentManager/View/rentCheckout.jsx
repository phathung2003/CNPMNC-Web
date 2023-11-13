
import axios from 'axios';
import checkUri from "../../checkUri"
const [result, api] = checkUri("RentCheckout");
export default async function handleSubmit(e, formData, inUploadProgress, setInUploadProgress, navigate) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);

        try {
            if (result) {
                axios.post(`${api}/${formData._idXe}/${formData._idDon}`)
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

        setInUploadProgress(false);
    }
}