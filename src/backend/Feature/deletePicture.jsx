import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media";

export default async function DeletePicture(image) {
    const myPromise = new Promise(
        function (resolve) {
            const desertRef = ref(storage, image);

            if (image != defaultPicture) {
                deleteObject(desertRef).then(() => {
                    console.log("Xoá hình ra khỏi Firebase thành công")
                    resolve(true)
                }).catch((error) => {
                    console.log(error)
                    resolve(false)
                });
            }
            else
                resolve(true)
        });

    return myPromise;
}





