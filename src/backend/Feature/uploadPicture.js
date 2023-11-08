import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

export default async function uploadPicture(image, setProgress) {
    const myPromise = new Promise(
        function (resolve) {

            const imageRef = ref(storage, `car/${Date.now() + v4()}`)

            const progress = uploadBytesResumable(imageRef, image)

            //Xem tiến trình tải
            progress.on("state_changed", (snapshot) => {

                //Lấy tỷ lệ phần trăm
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log("Tiến trình tải: " + progress + "%")
                setProgress(progress);
            }, (err) => console.log(err),

                //Sau khi tải xong (Lấy link)
                () => {
                    getDownloadURL(progress.snapshot.ref).then(url => { resolve(url); })
                })

        });

    return myPromise;
}


// //Lưu hình trên Imgur 

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

