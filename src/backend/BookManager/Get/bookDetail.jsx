import axios from "axios";
import checkUri from "../../checkUri";

const [result, api] = checkUri("BookDetail");

export default async function infoProcess(ID) {
    var data;
    if (result) {
        await axios.get(`${api}/${ID} `)
            .then(info => data = info.data)
            .catch(err => console.log(err.data))
    }
    return data;
}