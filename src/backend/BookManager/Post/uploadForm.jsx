import axios from 'axios';
import checkUri from "../../checkUri"

export default async function uploadForm(apiType, formData, navigate) {
    const myPromise = new Promise(
        function (resolve) {
            try {

                const [result, api] = checkUri(apiType);

                if (result) {
                    var IDDon = formData.IDDon;
                    var NgayBatDau = new Date(formData.NgayBatDau).getTime();
                    var NgayKetThuc = new Date(formData.NgayKetThuc).getTime();
                    var TinhTrang = formData.TinhTrang;
                    var KhachTra = formData.KhachTra;
                    var IDXe = formData._idXe;
                    var IDKH = formData._idKH

                    axios.post(`${api}/${formData._idXe}/${formData._idDon}/${formData.SoLuong}/${formData.SLDatTruoc}`, { IDDon, NgayBatDau, NgayKetThuc, TinhTrang, KhachTra, IDXe, IDKH })
                        .then((result) => {
                            if (result.data.success) {
                                alert("Tạo đơn đặt trước thành công")
                                console.log("Tạo đơn đặt trước thành công")
                                navigate(`/Book/Detail/${IDXe}/${result.data.msg}`)
                            }
                            else {
                                alert(result.data.msg)
                                console.log(result.data.msg)
                            }
                            resolve(result.data.success);
                        })
                        .catch((err) => {
                            alert("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !")
                            console.log(err);
                            console.log("Kết nối đến máy chủ thất bại. Vui lòng thử lại sau !");
                            resolve(false);
                        });
                }

                else {
                    alert("Đường dẫn kết nối bị lỗi!")
                    console.log("Đường dẫn API bị lỗi")
                    resolve(false);
                }
            } catch { resolve(false); }
        });

    return myPromise;
}