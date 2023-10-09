import { useEffect, useState } from "react";
import axios from "axios";

import checkUri from "./checkUri";
const [result, api] = checkUri("Info");

export default function infoProcess() {

    const [userInfo, setInfo] = useState([]);

    if (result) {
        useEffect(() => {
            axios.get(api)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err.data))
        }, [])
    }

    return userInfo;
}