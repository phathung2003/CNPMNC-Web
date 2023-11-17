export default function convertToBase64(event, setItem) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => { setItem(reader.result); };
    reader.onerror = error => { console.log("Error: ", error); };
}

