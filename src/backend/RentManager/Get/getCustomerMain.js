import axios from "axios";
import checkUri from "../../checkUri";

const [result, api] = checkUri("CustomerMain");

export default async function getCustomerInfo() {
    var customerData
    if (result) {
        await axios.get(`${api}/`)
            .then(info => customerData = info.data)
            .catch(err => console.log(err.data))
    }
    return customerData;
}