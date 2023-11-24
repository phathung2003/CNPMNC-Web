import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

const default1Picture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_vehicle.png?alt=media";
const default2Picture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media";
const default3Picture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_user.png?alt=media";

export default async function DeletePicture(image) {
    const myPromise = new Promise(
        function (resolve) {
            const desertRef = ref(storage, image);

            if (image != default1Picture && image != default2Picture && image != default3Picture) {
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





