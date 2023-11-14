import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

export default async function uploadPicture(location, image, setProgress) {
    const myPromise = new Promise(
        function (resolve) {

            const imageRef = ref(storage, `${location}/${Date.now() + v4()}`)

            const progress = uploadBytesResumable(imageRef, image)

            //Xem tiến trình tải
            progress.on("state_changed", (snapshot) => {

                //Lấy tỷ lệ phần trăm
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log(`Tiến trình tải hình vào ${location}: ` + progress + "%")
                setProgress(progress);
            }, (err) => console.log(err),

                //Sau khi tải xong (Lấy link)
                () => {
                    getDownloadURL(progress.snapshot.ref).then(url => {
                         resolve(url); 
                        })
                })

        });

    return myPromise;
}