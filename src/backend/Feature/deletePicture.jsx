import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default async function DeletePicture(image) {
    const desertRef = ref(storage, image);

    if (image != defaultPicture) {
        deleteObject(desertRef).then(() => {
            console.log("Xoá thành công")
            return true;
        }).catch((error) => { console.log(error); return false; });
    }
}