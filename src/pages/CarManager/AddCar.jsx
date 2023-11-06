import { useState } from "react";
import "../../css/Detail.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

//Xử lý backend
import handleSubmit from "../../backend/CarManager/carAdd";

export default function AddCar() {
    const [image, setFile] = useState();
    const [BienSo, setBienSo] = useState("");
    const [SoCho, setSoCho] = useState("");
    const [TruyenDong, setTruyenDong] = useState("");
    const [NhienLieu, setNhienLieu] = useState("");
    const [NhienLieuTieuHao, setNhienLieuTieuHao] = useState("");
    const [MoTa, setMoTa] = useState("");
    const [SoTien, setSoTien] = useState("");

    const [Progress, setProgress] = useState();

    const onFileChange = (event) => {
        // Updating the state 
        setFile(event.target.files[0]);
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, BienSo, SoCho, TruyenDong, NhienLieu, NhienLieuTieuHao, MoTa, SoTien, image, setProgress)}>

                <input type="file" name="HinhAnh" onChange={onFileChange} />
                <ProgressBar now={Progress} label={`${Progress != 100 ? Progress != undefined ? Progress + "%" : "" : "Tải thành công"}`} />

                <p>Biển số</p>
                <input type="text" name="BienSo" onChange={(e) => setBienSo(e.target.value)} />

                <p>Số chỗ</p>
                <input type="text" name="SoCho" onChange={(e) => setSoCho(e.target.value)} />


                <p>Truyền động</p>
                <input type="text" name="TruyenDong" onChange={(e) => setTruyenDong(e.target.value)} />

                <p>Nhiên liệu</p>
                <input type="text" name="NhienLieu" onChange={(e) => setNhienLieu(e.target.value)} />

                <p>Nhiên liệu tiêu hao</p>
                <input type="text" name="MoTa" onChange={(e) => setNhienLieuTieuHao(e.target.value)} />

                <p>Mô tả</p>
                <input type="text" name="NhienLieuTieuHao" onChange={(e) => setMoTa(e.target.value)} />

                <p>Số tiền</p>
                <input type="text" name="SoTien" onChange={(e) => setSoTien(e.target.value)} />

                <button type="submit">Upload</button>
            </form>

        </>
    );
}

// function convertToBase64(e) {
//     console.log(e);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//         console.log(reader.result); //Base64encoded string
//         setImage(reader.result);
//     };
//     reader.onerror = error => {
//         console.log("Error: ", error);
//     };
// }





// //Imgur

// const onFileUpload = async () => {
//     // Client ID
//     const clientId = "ed8804237167f35",
//         auth = "Client-ID " + clientId;

//     // Creating an object of formData
//     const formData = new FormData();

//     // Adding our image to formData
//     formData.append("file", file);

//     // Making the post request
//     await fetch("https://api.imgur.com/3/upload", {
//         // API Endpoint
//         method: "POST", // HTTP Method
//         body: formData, // Data to be sent
//         headers: {
//             // Setting header
//             Authorization: auth,
//             Accept: "application/json",
//         },
//     })
//         // Handling success
//         .then((res) => res.data.success == true ? alert("image uploaded") : alert("Failed") && console.log(res.data.link))
//         .catch((err) => alert("Failed") && console.log(err));
// };
