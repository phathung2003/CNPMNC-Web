import { useEffect, useState } from "react";
import axios from "axios";

import checkUri from "../../checkUri";

const [result, api] = checkUri("AccountMain");

export default function infoProcess() {

    const [accountInfo, setInfo] = useState([]);

    if (result) {
        useEffect(() => {
            axios.get(api)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err.data))
        }, [])

    }
    return accountInfo;
}