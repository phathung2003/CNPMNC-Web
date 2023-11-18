import axios from "axios";
import checkUri from "../../checkUri";

const [result, api] = checkUri("BookDetail");

export default async function infoProcess(IDXe, IDDon) {
    if (IDDon == undefined)
        IDDon = ""
    var data;
    if (result) {
        await axios.get(`${api}/${IDXe}/${IDDon} `)
            .then(info => data = info.data)
            .catch(err => console.log(err.data))
    }
    return data;
}