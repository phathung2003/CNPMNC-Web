import { useEffect, useState } from "react";
import axios from "axios";

import checkUri from "../../checkUri";

const [result, api] = checkUri("CarMain");

export default function infoProcess() {

    const [carInfo, setInfo] = useState([]);

    if (result) {
        useEffect(() => {
            axios.get(api)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err.data))
        }, [])
        
    }
    console.log(carInfo)
    
    return carInfo;
}