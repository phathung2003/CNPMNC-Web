import { useEffect, useState } from "react";
import axios from "axios";

import checkUri from "../../checkUri";

const [result, api] = checkUri("CustomerMain");

export default function getCustomerInfo() {
    const [customerInfo, setInfo] = useState([]);

    if (result) {
        useEffect(() => {
            axios.get(`${api}/`)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err.data))
        }, [])
    }
    return customerInfo;
}